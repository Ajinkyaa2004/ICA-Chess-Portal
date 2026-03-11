import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import { hashPassword } from '@/lib/auth';
import Student from '@/models/Student';
import Account from '@/models/Account';

// GET /api/students — List all students (Admin only)
export const GET = withAuth(async (req: NextRequest, _context) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build query filter
    const filter: Record<string, unknown> = {};
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const [students, total] = await Promise.all([
      Student.find(filter)
        .populate('batchIds', 'name type level status')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Student.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/students error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// POST /api/students — Create a student (Admin only)
const createStudentSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  age: z.number().int().min(3).max(100),
  parentName: z.string().min(1, 'Parent name is required').trim(),
  parentEmail: z.string().email('Invalid parent email'),
  parentPhone: z.string().min(1, 'Parent phone is required').trim(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  studentType: z.enum(['1-1', 'group']).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
});

export const POST = withAuth(async (req: NextRequest, _context) => {
  try {
    const body = await req.json();
    const data = createStudentSchema.parse(body);

    await dbConnect();

    // Check if an account already exists with this parent email
    const existingAccount = await Account.findOne({ email: data.parentEmail.toLowerCase() });
    if (existingAccount) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Create Account with role CUSTOMER and default password
    const defaultPassword = 'Welcome@123';
    const passwordHash = await hashPassword(defaultPassword);

    const account = await Account.create({
      email: data.parentEmail.toLowerCase(),
      passwordHash,
      role: 'CUSTOMER',
      name: data.parentName,
      isActive: true,
    });

    // Create Student linked to the account
    const student = await Student.create({
      accountId: account._id,
      name: data.name,
      age: data.age,
      parentName: data.parentName,
      parentEmail: data.parentEmail.toLowerCase(),
      parentPhone: data.parentPhone,
      level: data.level || 'beginner',
      studentType: data.studentType || 'group',
      country: data.country || 'India',
      city: data.city || '',
      notes: data.notes || '',
    });

    return NextResponse.json(
      { success: true, data: student },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/students error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
