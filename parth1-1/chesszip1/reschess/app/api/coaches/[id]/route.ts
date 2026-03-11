import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Coach from '@/models/Coach';

// GET /api/coaches/[id] — Get single coach (Admin only)
export const GET = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid coach ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const coach = await Coach.findById(id).lean();

    if (!coach) {
      return NextResponse.json(
        { error: 'Coach not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: coach });
  } catch (error) {
    console.error('GET /api/coaches/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// PUT /api/coaches/[id] — Update coach (Admin only)
const updateCoachSchema = z.object({
  name: z.string().min(1).trim().optional(),
  email: z.string().email().optional(),
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
  rating: z.number().min(0).max(5).optional(),
  isActive: z.boolean().optional(),
});

export const PUT = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid coach ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = updateCoachSchema.parse(body);

    await dbConnect();

    const coach = await Coach.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!coach) {
      return NextResponse.json(
        { error: 'Coach not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: coach });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('PUT /api/coaches/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// DELETE /api/coaches/[id] — Soft delete coach (Admin only)
export const DELETE = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid coach ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const coach = await Coach.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!coach) {
      return NextResponse.json(
        { error: 'Coach not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Coach deactivated successfully',
    });
  } catch (error) {
    console.error('DELETE /api/coaches/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
