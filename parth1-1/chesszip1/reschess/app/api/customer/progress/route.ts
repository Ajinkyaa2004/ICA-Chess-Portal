import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Student from '@/models/Student';
import Lesson from '@/models/Lesson';

// GET /api/customer/progress — Get progress stats for the logged-in customer
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
        data: {
          totalLessons: 0,
          completedLessons: 0,
          attendedLessons: 0,
          completionRate: 0,
          attendanceRate: 0,
          level: student.level,
          joinDate: student.joinDate,
        },
      });
    }

    // Find all lessons for this student's batches
    const lessons = await Lesson.find({
      batchId: { $in: student.batchIds },
    }).lean();

    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(
      (l) => l.status === 'COMPLETED'
    ).length;

    // Count lessons where this student was marked present
    let attendedLessons = 0;
    for (const lesson of lessons) {
      const studentRecord = lesson.attendance.find(
        (a) => a.studentId.toString() === student._id.toString()
      );
      if (studentRecord && studentRecord.present) {
        attendedLessons++;
      }
    }

    const completionRate =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;
    const attendanceRate =
      completedLessons > 0
        ? Math.round((attendedLessons / completedLessons) * 100)
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalLessons,
        completedLessons,
        attendedLessons,
        completionRate,
        attendanceRate,
        level: student.level,
        joinDate: student.joinDate,
      },
    });
  } catch (error) {
    console.error('GET /api/customer/progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['CUSTOMER']);
