import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Demo from '@/models/Demo';

// GET /api/demos/[id] — Get single demo (Admin only)
export const GET = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid demo ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const demo = await Demo.findById(id)
      .populate('coachId', 'name email phone')
      .populate('convertedStudentId', 'name')
      .lean();

    if (!demo) {
      return NextResponse.json(
        { error: 'Demo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: demo });
  } catch (error) {
    console.error('GET /api/demos/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// PUT /api/demos/[id] — Update demo (Admin only)
const updateDemoSchema = z.object({
  status: z.enum([
    'BOOKED', 'ATTENDED', 'NO_SHOW', 'RESCHEDULED', 'CANCELLED',
    'INTERESTED', 'NOT_INTERESTED', 'PAYMENT_PENDING', 'CONVERTED', 'DROPPED',
  ]).optional(),
  notes: z.string().optional(),
  coachId: z.string().optional(),
  followUpDate: z.string().datetime().nullable().optional(),
  preferredDate: z.string().datetime().optional(),
  preferredTime: z.string().optional(),
  level: z.string().optional(),
  convertedStudentId: z.string().optional(),
});

export const PUT = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid demo ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = updateDemoSchema.parse(body);

    await dbConnect();

    // Build update object, converting string dates to Date objects
    const updateData: Record<string, unknown> = { ...data };
    if (data.followUpDate !== undefined) {
      updateData.followUpDate = data.followUpDate ? new Date(data.followUpDate) : null;
    }
    if (data.preferredDate) {
      updateData.preferredDate = new Date(data.preferredDate);
    }
    if (data.coachId) {
      if (!mongoose.Types.ObjectId.isValid(data.coachId)) {
        return NextResponse.json(
          { error: 'Invalid coach ID' },
          { status: 400 }
        );
      }
    }

    const demo = await Demo.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('coachId', 'name email');

    if (!demo) {
      return NextResponse.json(
        { error: 'Demo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: demo });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('PUT /api/demos/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
