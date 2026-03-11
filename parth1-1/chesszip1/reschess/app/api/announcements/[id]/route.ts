import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Announcement from '@/models/Announcement';

// PUT /api/announcements/[id] — Update announcement (Admin only)
const updateAnnouncementSchema = z.object({
  title: z.string().min(1).trim().optional(),
  content: z.string().min(1).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().nullable().optional(),
});

export const PUT = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid announcement ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = updateAnnouncementSchema.parse(body);

    await dbConnect();

    const updateData: Record<string, unknown> = { ...data };
    if (data.expiresAt !== undefined) {
      updateData.expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;
    }

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('PUT /api/announcements/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);

// DELETE /api/announcements/[id] — Soft delete announcement (Admin only)
export const DELETE = withAuth(async (req: NextRequest, context) => {
  try {
    const params = await context.params;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid announcement ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Announcement deactivated successfully',
    });
  } catch (error) {
    console.error('DELETE /api/announcements/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
