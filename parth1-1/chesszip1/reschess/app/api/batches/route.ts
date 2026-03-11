import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Batch from '@/models/Batch';

// GET /api/batches — List batches (Admin only)
export const GET = withAuth(async (req: NextRequest, _context) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const [batches, total] = await Promise.all([
      Batch.find(filter)
        .populate('coachId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Batch.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: batches,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/batches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// POST /api/batches — Create batch (Admin only)
const createBatchSchema = z.object({
  name: z.string().min(1, 'Batch name is required').trim(),
  coachId: z.string().min(1, 'Coach ID is required'),
  type: z.enum(['1-1', 'group']).optional(),
  level: z.string().optional(),
  schedule: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  })).optional(),
  maxStudents: z.number().int().min(1).optional(),
  startDate: z.string().optional(),
  description: z.string().optional(),
});

export const POST = withAuth(async (req: NextRequest, _context) => {
  try {
    const body = await req.json();
    const data = createBatchSchema.parse(body);

    await dbConnect();

    const batchData: Record<string, unknown> = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : new Date(),
    };

    const batch = await Batch.create(batchData);

    // Populate coach details before returning
    const populatedBatch = await Batch.findById(batch._id)
      .populate('coachId', 'name email')
      .lean();

    return NextResponse.json(
      { success: true, data: populatedBatch },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/batches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
