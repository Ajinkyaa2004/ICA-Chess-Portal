import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Lesson from '@/models/Lesson';

// GET /api/lessons — List lessons with filters (Admin only)
export const GET = withAuth(async (req: NextRequest, _context) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const batchId = searchParams.get('batchId');
    const coachId = searchParams.get('coachId');
    const date = searchParams.get('date');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (batchId) {
      filter.batchId = batchId;
    }
    if (coachId) {
      filter.coachId = coachId;
    }
    if (date) {
      // Filter for the specific day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      filter.date = { $gte: startOfDay, $lte: endOfDay };
    }
    if (status) {
      filter.status = status;
    }

    const [lessons, total] = await Promise.all([
      Lesson.find(filter)
        .populate('batchId', 'name type level')
        .populate('coachId', 'name email')
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lesson.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: lessons,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/lessons error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// POST /api/lessons — Create lesson (Admin only)
const createLessonSchema = z.object({
  batchId: z.string().min(1, 'Batch ID is required'),
  coachId: z.string().min(1, 'Coach ID is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  topic: z.string().optional(),
  description: z.string().optional(),
  homework: z.string().optional(),
});

export const POST = withAuth(async (req: NextRequest, _context) => {
  try {
    const body = await req.json();
    const data = createLessonSchema.parse(body);

    await dbConnect();

    const lesson = await Lesson.create({
      ...data,
      date: new Date(data.date),
    });

    const populatedLesson = await Lesson.findById(lesson._id)
      .populate('batchId', 'name type level')
      .populate('coachId', 'name email')
      .lean();

    return NextResponse.json(
      { success: true, data: populatedLesson },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/lessons error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
