import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Student from '@/models/Student';
import Lesson from '@/models/Lesson';

// GET /api/customer/lessons — Get lessons for the logged-in customer's batches
export const GET = withAuth(async (_req: NextRequest, context) => {
  try {
    await dbConnect();

    const { user } = context;

    // Find the Student document by accountId
    const student = await Student.findOne({ accountId: user.userId });
    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      );
    }

    if (student.batchIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const lessons = await Lesson.find({
      batchId: { $in: student.batchIds },
    })
      .populate('batchId', 'name type level')
      .populate('coachId', 'name')
      .sort({ date: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error('GET /api/customer/lessons error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['CUSTOMER']);
