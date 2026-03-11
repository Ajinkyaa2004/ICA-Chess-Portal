import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Batch from '@/models/Batch';
import Student from '@/models/Student';

// GET /api/batches/[id]/students — List students in batch (Admin only)
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
      .populate('studentIds', 'name age level status parentName parentEmail parentPhone')
      .lean();

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: batch.studentIds,
    });
  } catch (error) {
    console.error('GET /api/batches/[id]/students error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// POST /api/batches/[id]/students — Add student to batch (Admin only)
const addStudentSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
});

export const POST = withAuth(async (req: NextRequest, context) => {
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
    const { studentId } = addStudentSchema.parse(body);

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check batch exists
    const batch = await Batch.findById(id);
    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Check student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Check if student is already in batch
    const studentObjectId = new mongoose.Types.ObjectId(studentId);
    if (batch.studentIds.some((sid) => sid.equals(studentObjectId))) {
      return NextResponse.json(
        { error: 'Student is already in this batch' },
        { status: 400 }
      );
    }

    // Check if batch is full
    if (batch.studentIds.length >= batch.maxStudents) {
      return NextResponse.json(
        { error: 'Batch is full' },
        { status: 400 }
      );
    }

    // Add student to batch
    batch.studentIds.push(studentObjectId);
    await batch.save();

    // Add batch to student's batchIds
    const batchObjectId = new mongoose.Types.ObjectId(id);
    if (!student.batchIds.some((bid) => bid.equals(batchObjectId))) {
      student.batchIds.push(batchObjectId);
      await student.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Student added to batch successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/batches/[id]/students error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// DELETE /api/batches/[id]/students — Remove student from batch (Admin only)
const removeStudentSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
});

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

    const body = await req.json();
    const { studentId } = removeStudentSchema.parse(body);

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Remove student from batch's studentIds
    const batch = await Batch.findByIdAndUpdate(
      id,
      { $pull: { studentIds: studentId } },
      { new: true }
    );

    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Remove batch from student's batchIds
    await Student.findByIdAndUpdate(studentId, {
      $pull: { batchIds: id },
    });

    return NextResponse.json({
      success: true,
      message: 'Student removed from batch successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('DELETE /api/batches/[id]/students error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
