import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Demo from '@/models/Demo';

// POST /api/demos — Create a demo (Admin only)
const createDemoSchema = z.object({
  studentName: z.string().min(1, 'Student name is required').trim(),
  parentName: z.string().min(1, 'Parent name is required').trim(),
  parentEmail: z.string().email('Invalid email address'),
  parentPhone: z.string().min(1, 'Parent phone is required').trim(),
  age: z.number().int().min(3).max(100),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  coachId: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export const POST = withAuth(async (req: NextRequest, _context) => {
  try {
    const body = await req.json();
    const data = createDemoSchema.parse(body);

    await dbConnect();

    const demo = await Demo.create({
      studentName: data.studentName,
      parentName: data.parentName,
      parentEmail: data.parentEmail.toLowerCase(),
      parentPhone: data.parentPhone,
      age: data.age,
      preferredDate: new Date(data.preferredDate),
      preferredTime: data.preferredTime || '',
      level: data.level || 'beginner',
      status: 'BOOKED',
      coachId: data.coachId || null,
      notes: data.notes || '',
      source: data.source || 'admin',
    });

    return NextResponse.json(
      { success: true, data: demo },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/demos error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// GET /api/demos — List all demos with pagination (Admin only)
export const GET = withAuth(async (req: NextRequest, _context) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { parentName: { $regex: search, $options: 'i' } },
        { parentEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const [demos, total] = await Promise.all([
      Demo.find(filter)
        .populate('coachId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Demo.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: demos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/demos error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
