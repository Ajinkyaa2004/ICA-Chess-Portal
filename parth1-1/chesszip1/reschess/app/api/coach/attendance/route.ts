import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Coach from '@/models/Coach';
import Lesson from '@/models/Lesson';

// Validation schema for attendance marking
const markAttendanceSchema = z.object({
  lessonId: z.string().min(1, 'Lesson ID is required'),
  attendance: z.array(
    z.object({
      studentId: z.string().min(1, 'Student ID is required'),
      present: z.boolean(),
    })
  ).min(1, 'At least one attendance record is required'),
});

// POST /api/coach/attendance — Mark attendance for a lesson
export const POST = withAuth(async (req: NextRequest, context) => {
  try {
    const body = await req.json();
    const data = markAttendanceSchema.parse(body);

    await dbConnect();

    const { user } = context;

    // Find the Coach document by accountId
    const coach = await Coach.findOne({ accountId: user.userId });
    if (!coach) {
      return NextResponse.json(
        { error: 'Coach profile not found' },
        { status: 404 }
      );
    }

    // Find the lesson and verify it belongs to this coach
    const lesson = await Lesson.findById(data.lessonId);
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    if (lesson.coachId.toString() !== coach._id.toString()) {
      return NextResponse.json(
        { error: 'Forbidden. This lesson does not belong to you.' },
        { status: 403 }
      );
    }

    // Update attendance records on the lesson
    lesson.attendance = data.attendance.map((record) => ({
      studentId: record.studentId as unknown as import('mongoose').Types.ObjectId,
      present: record.present,
    }));

    await lesson.save();

    const updatedLesson = await Lesson.findById(lesson._id)
      .populate('batchId', 'name type level')
      .lean();

    return NextResponse.json({
      success: true,
      data: updatedLesson,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/coach/attendance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['COACH']);
