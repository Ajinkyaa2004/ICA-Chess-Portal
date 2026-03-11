import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Coach from '@/models/Coach';
import Batch from '@/models/Batch';

// GET /api/coach/batches — List batches for the logged-in coach with student count
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

    const batches = await Batch.find({ coachId: coach._id })
      .sort({ createdAt: -1 })
      .lean();

    // Return batches with studentCount instead of full student details
    const batchesWithCount = batches.map((batch) => ({
      _id: batch._id,
      name: batch.name,
      type: batch.type,
      level: batch.level,
      schedule: batch.schedule,
      maxStudents: batch.maxStudents,
      studentCount: batch.studentIds.length,
      status: batch.status,
      startDate: batch.startDate,
      description: batch.description,
      createdAt: batch.createdAt,
      updatedAt: batch.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: batchesWithCount,
    });
  } catch (error) {
    console.error('GET /api/coach/batches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['COACH']);
