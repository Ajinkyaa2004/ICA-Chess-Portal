import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Student from '@/models/Student';
import StudyMaterial from '@/models/StudyMaterial';

// GET /api/customer/study-materials — Get study materials for the logged-in customer's batches
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

    // Find study materials for the student's batches
    const materials = await StudyMaterial.find({
      batchId: { $in: student.batchIds },
    })
      .populate('batchId', 'name type level')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: materials,
    });
  } catch (error) {
    console.error('GET /api/customer/study-materials error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['CUSTOMER']);
