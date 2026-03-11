import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import Batch from '@/models/Batch';
import Student from '@/models/Student';
import Coach from '@/models/Coach';
import Conversation from '@/models/Conversation';
import Account from '@/models/Account';

// GET: Get or create batch group conversation
async function handler(
  _req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();
    const params = await context.params;
    const { batchId } = params;

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({ batchId, type: 'batch-group' });

    if (!conversation) {
      // Build participants: coach + all student parents + admins
      const participants: { userId: string; role: string; name: string }[] = [];

      // Add coach
      const coach = await Coach.findById(batch.coachId);
      if (coach) {
        participants.push({
          userId: coach.accountId.toString(),
          role: 'COACH',
          name: coach.name,
        });
      }

      // Add students' parents (via their account)
      const students = await Student.find({ _id: { $in: batch.studentIds } });
      for (const student of students) {
        participants.push({
          userId: student.accountId.toString(),
          role: 'CUSTOMER',
          name: student.parentName,
        });
      }

      // Add all admins
      const admins = await Account.find({ role: 'ADMIN', isActive: true });
      for (const admin of admins) {
        participants.push({
          userId: admin._id.toString(),
          role: 'ADMIN',
          name: admin.name,
        });
      }

      conversation = await Conversation.create({
        type: 'batch-group',
        batchId,
        participants,
        lastMessage: '',
        lastMessageAt: null,
      });
    }

    return NextResponse.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Batch conversation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = withAuth(handler);
