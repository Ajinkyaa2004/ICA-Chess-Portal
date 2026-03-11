import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';

const sendMessageSchema = z.object({
  content: z.string().min(1, 'Message content is required'),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
});

// GET: Fetch messages for a conversation
async function getHandler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();
    const params = await context.params;
    const { id } = params;

    // Verify user is a participant
    const conversation = await Conversation.findOne({
      _id: id,
      'participants.userId': context.user.userId,
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before'); // cursor-based pagination

    const query: Record<string, unknown> = { conversationId: id };
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Mark messages as read by this user
    await Message.updateMany(
      { conversationId: id, readBy: { $ne: context.user.userId } },
      { $addToSet: { readBy: context.user.userId } }
    );

    return NextResponse.json({ success: true, data: messages.reverse() });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Send a message
async function postHandler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();
    const params = await context.params;
    const { id } = params;

    const body = await req.json();
    const { content, fileUrl, fileName } = sendMessageSchema.parse(body);

    // Verify user is a participant
    const conversation = await Conversation.findOne({
      _id: id,
      'participants.userId': context.user.userId,
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Enforce: files only in batch-group chats
    if (fileUrl && conversation.type === '1-1') {
      return NextResponse.json(
        { error: 'File sharing is only allowed in batch group chats' },
        { status: 400 }
      );
    }

    const message = await Message.create({
      conversationId: id,
      senderId: context.user.userId,
      senderName: context.user.name,
      senderRole: context.user.role,
      content,
      fileUrl: fileUrl || null,
      fileName: fileName || null,
      readBy: [context.user.userId],
    });

    // Update conversation's last message
    conversation.lastMessage = content;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }
    console.error('Send message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
