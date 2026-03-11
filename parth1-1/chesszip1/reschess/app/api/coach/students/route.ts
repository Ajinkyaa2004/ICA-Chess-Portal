import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Coach from '@/models/Coach';
import Batch from '@/models/Batch';
import Student from '@/models/Student';

// GET /api/coach/students — List students across all batches for the logged-in coach
// PRIVACY: Does NOT return parentEmail or parentPhone
export const GET = withAuth(async (_req: NextRequest, context) => {
  try {
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

    // Find all batches assigned to this coach
    const batches = await Batch.find({ coachId: coach._id }).lean();
    if (batches.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Collect all unique studentIds from batches
    const studentIdSet = new Set<string>();
    for (const batch of batches) {
      for (const sid of batch.studentIds) {
        studentIdSet.add(sid.toString());
      }
    }

    const studentIds = Array.from(studentIdSet);

    // Fetch students with privacy-safe projection only
    const students = await Student.find(
      { _id: { $in: studentIds } },
      {
        name: 1,
        age: 1,
        level: 1,
        status: 1,
        batchIds: 1,
        joinDate: 1,
      }
    )
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error('GET /api/coach/students error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['COACH']);
