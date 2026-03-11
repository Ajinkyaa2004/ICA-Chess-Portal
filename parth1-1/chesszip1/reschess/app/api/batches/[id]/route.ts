import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Batch from '@/models/Batch';

// GET /api/batches/[id] — Get batch with coach and student details (Admin only)
export const GET = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid batch ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const batch = await Batch.findById(id)
      .populate('coachId', 'name email phone')
      .populate('studentIds', 'name age level status parentName parentEmail')
      .lean();

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: batch });
  } catch (error) {
    console.error('GET /api/batches/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// PUT /api/batches/[id] — Update batch (Admin only)
const updateBatchSchema = z.object({
  name: z.string().min(1).trim().optional(),
  coachId: z.string().optional(),
  type: z.enum(['1-1', 'group']).optional(),
  level: z.string().optional(),
  schedule: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  })).optional(),
  maxStudents: z.number().int().min(1).optional(),
  status: z.enum(['ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED']).optional(),
  startDate: z.string().optional(),
  description: z.string().optional(),
});

export const PUT = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid batch ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = updateBatchSchema.parse(body);

    await dbConnect();

    const updateData: Record<string, unknown> = { ...data };
    if (data.startDate) {
      updateData.startDate = new Date(data.startDate);
    }

    const batch = await Batch.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('coachId', 'name email')
      .populate('studentIds', 'name age level status');

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: batch });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('PUT /api/batches/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// DELETE /api/batches/[id] — Soft delete batch (Admin only)
export const DELETE = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid batch ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const batch = await Batch.findByIdAndUpdate(
      id,
      { $set: { status: 'CANCELLED' } },
      { new: true }
    );

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Batch cancelled successfully',
    });
  } catch (error) {
    console.error('DELETE /api/batches/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
