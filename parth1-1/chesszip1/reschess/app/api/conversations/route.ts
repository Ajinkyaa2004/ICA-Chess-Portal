import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import Conversation from '@/models/Conversation';

async function handler(
  _req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();

    const conversations = await Conversation.find({
      'participants.userId': context.user.userId,
    })
      .sort({ lastMessageAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: conversations });
  } catch (error) {
    console.error('List conversations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = withAuth(handler);
