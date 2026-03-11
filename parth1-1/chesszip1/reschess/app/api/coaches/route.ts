import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import { hashPassword } from '@/lib/auth';
import Coach from '@/models/Coach';
import Account from '@/models/Account';

// GET /api/coaches — List all coaches (Admin only)
export const GET = withAuth(async (req: NextRequest, _context) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (isActive !== null && isActive !== undefined && isActive !== '') {
      filter.isActive = isActive === 'true';
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const [coaches, total] = await Promise.all([
      Coach.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Coach.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: coaches,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/coaches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// POST /api/coaches — Create a coach (Admin only)
const createCoachSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  specialization: z.array(z.string()).optional(),
  experience: z.number().min(0).optional(),
  monthlyRate: z.number().min(0).optional(),
  ratePerSession: z.number().min(0).optional(),
  bio: z.string().optional(),
  availability: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  })).optional(),
});

export const POST = withAuth(async (req: NextRequest, _context) => {
  try {
    const body = await req.json();
    const data = createCoachSchema.parse(body);

    await dbConnect();

    // Check if account already exists
    const existingAccount = await Account.findOne({ email: data.email.toLowerCase() });
    if (existingAccount) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Create Account with role COACH and default password
    const defaultPassword = 'Welcome@123';
    const passwordHash = await hashPassword(defaultPassword);

    const account = await Account.create({
      email: data.email.toLowerCase(),
      passwordHash,
      role: 'COACH',
      name: data.name,
      isActive: true,
    });

    // Create Coach linked to account
    const coach = await Coach.create({
      accountId: account._id,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || '',
      specialization: data.specialization || [],
      experience: data.experience || 0,
      monthlyRate: data.monthlyRate || 0,
      ratePerSession: data.ratePerSession || 0,
      bio: data.bio || '',
      availability: data.availability || [],
    });

    return NextResponse.json(
      { success: true, data: coach },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/coaches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
