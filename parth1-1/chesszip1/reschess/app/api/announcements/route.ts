import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Announcement from '@/models/Announcement';

// GET /api/announcements — List active announcements (All authenticated users)
export const GET = withAuth(async (req: NextRequest, context) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const skip = (page - 1) * limit;

    // Show only active and non-expired announcements
    const now = new Date();
    const filter: Record<string, unknown> = {
      isActive: true,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: now } },
      ],
    };

    const [announcements, total] = await Promise.all([
      Announcement.find(filter)
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Announcement.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: announcements,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/announcements error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

// POST /api/announcements — Create announcement (Admin only)
const createAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  content: z.string().min(1, 'Content is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  expiresAt: z.string().nullable().optional(),
});

export const POST = withAuth(async (req: NextRequest, context) => {
  try {
    const body = await req.json();
    const data = createAnnouncementSchema.parse(body);

    await dbConnect();

    const announcement = await Announcement.create({
      title: data.title,
      content: data.content,
      priority: data.priority || 'medium',
      createdBy: context.user.userId,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    });

    return NextResponse.json(
      { success: true, data: announcement },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/announcements error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
