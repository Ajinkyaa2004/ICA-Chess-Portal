import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Coach from '@/models/Coach';
import Lesson from '@/models/Lesson';

// GET /api/coach/schedule — Get lessons for the logged-in coach, with optional ?date filter
export const GET = withAuth(async (req: NextRequest, context) => {
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

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    // Build filter
    const filter: Record<string, unknown> = { coachId: coach._id };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      filter.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const lessons = await Lesson.find(filter)
      .populate('batchId', 'name type level')
      .sort({ date: 1, startTime: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error('GET /api/coach/schedule error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['COACH']);
