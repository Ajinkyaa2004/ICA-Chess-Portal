import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import Broadcast from '@/models/Broadcast';

const createBroadcastSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  targetRoles: z.array(z.enum(['ADMIN', 'COACH', 'CUSTOMER'])).min(1),
  targetBatchIds: z.array(z.string()).optional(),
});

// GET: List broadcasts relevant to current user
async function getHandler(
  _req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();

    const broadcasts = await Broadcast.find({
      targetRoles: context.user.role,
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ success: true, data: broadcasts });
  } catch (error) {
    console.error('List broadcasts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Create broadcast (admin or coach)
async function postHandler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();

    const body = await req.json();
    const data = createBroadcastSchema.parse(body);

    const broadcast = await Broadcast.create({
      ...data,
      senderId: context.user.userId,
      senderName: context.user.name,
      senderRole: context.user.role,
      targetBatchIds: data.targetBatchIds || [],
    });

    return NextResponse.json({ success: true, data: broadcast }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }
    console.error('Create broadcast error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler, ['ADMIN', 'COACH']);
