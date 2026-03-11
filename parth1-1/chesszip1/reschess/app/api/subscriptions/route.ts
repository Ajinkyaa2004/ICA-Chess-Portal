import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Subscription from '@/models/Subscription';

// GET /api/subscriptions — List subscriptions (Admin only)
export const GET = withAuth(async (req: NextRequest, _context) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');
    const studentId = searchParams.get('studentId');

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (status) {
      filter.status = status;
    }
    if (studentId) {
      filter.studentId = studentId;
    }

    const [subscriptions, total] = await Promise.all([
      Subscription.find(filter)
        .populate('studentId', 'name parentName parentEmail')
        .populate('batchId', 'name type level')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Subscription.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: subscriptions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/subscriptions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// POST /api/subscriptions — Create subscription (Admin only)
const createSubscriptionSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  batchId: z.string().min(1, 'Batch ID is required'),
  plan: z.enum(['monthly', 'quarterly', 'semi-annual', 'annual']),
  amount: z.number().positive('Amount must be positive'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  status: z.enum(['ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED', 'PENDING']).optional(),
  autoRenew: z.boolean().optional(),
});

export const POST = withAuth(async (req: NextRequest, _context) => {
  try {
    const body = await req.json();
    const data = createSubscriptionSchema.parse(body);

    await dbConnect();

    const subscription = await Subscription.create({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: data.status || 'PENDING',
      autoRenew: data.autoRenew ?? false,
    });

    const populatedSubscription = await Subscription.findById(subscription._id)
      .populate('studentId', 'name parentName parentEmail')
      .populate('batchId', 'name type level')
      .lean();

    return NextResponse.json(
      { success: true, data: populatedSubscription },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/subscriptions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
