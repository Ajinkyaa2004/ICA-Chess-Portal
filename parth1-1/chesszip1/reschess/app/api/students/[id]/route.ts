import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Student from '@/models/Student';

// GET /api/students/[id] — Get single student (Admin only)
export const GET = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const student = await Student.findById(id)
      .populate('batchIds', 'name type level status')
      .lean();

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    console.error('GET /api/students/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// PUT /api/students/[id] — Update student (Admin only)
const updateStudentSchema = z.object({
  name: z.string().min(1).trim().optional(),
  age: z.number().int().min(3).max(100).optional(),
  parentName: z.string().min(1).trim().optional(),
  parentEmail: z.string().email().optional(),
  parentPhone: z.string().min(1).trim().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  studentType: z.enum(['1-1', 'group']).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  status: z.enum(['ACTIVE', 'PAUSED', 'CANCELLED']).optional(),
  notes: z.string().optional(),
});

export const PUT = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = updateStudentSchema.parse(body);

    await dbConnect();

    const student = await Student.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).populate('batchIds', 'name type level status');

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('PUT /api/students/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// DELETE /api/students/[id] — Soft delete student (Admin only)
export const DELETE = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { status: 'CANCELLED' } },
      { new: true }
    );

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Student cancelled successfully',
    });
  } catch (error) {
    console.error('DELETE /api/students/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
