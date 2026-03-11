import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Student from '@/models/Student';

// GET /api/customer/profile — Get the logged-in customer's student profile
export const GET = withAuth(async (req: NextRequest, context) => {
  try {
    await dbConnect();

    const { user } = context;

    const student = await Student.findOne({ accountId: user.userId })
      .populate('batchIds', 'name type level status schedule')
      .lean();

    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error('GET /api/customer/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['CUSTOMER']);

// Validation schema for profile update — only allowed fields
const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').trim().optional(),
  age: z.number().int().min(3).max(100).optional(),
  country: z.string().trim().optional(),
  city: z.string().trim().optional(),
});

// PUT /api/customer/profile — Update allowed profile fields (NOT parentEmail/parentPhone)
export const PUT = withAuth(async (req: NextRequest, context) => {
  try {
    const body = await req.json();
    const data = updateProfileSchema.parse(body);

    await dbConnect();

    const { user } = context;

    const student = await Student.findOne({ accountId: user.userId });
    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      );
    }

    // Only update the allowed fields that were provided
    if (data.name !== undefined) student.name = data.name;
    if (data.age !== undefined) student.age = data.age;
    if (data.country !== undefined) student.country = data.country;
    if (data.city !== undefined) student.city = data.city;

    await student.save();

    const updatedStudent = await Student.findById(student._id)
      .populate('batchIds', 'name type level status schedule')
      .lean();

    return NextResponse.json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('PUT /api/customer/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['CUSTOMER']);
