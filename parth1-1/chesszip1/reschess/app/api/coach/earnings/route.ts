import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Coach from '@/models/Coach';
import Batch from '@/models/Batch';
import Subscription from '@/models/Subscription';
import Payment from '@/models/Payment';

// GET /api/coach/earnings — Return earnings summary for the logged-in coach
export const GET = withAuth(async (_req: NextRequest, context) => {
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

    // Find batches belonging to this coach
    const batches = await Batch.find({ coachId: coach._id }).lean();
    const batchIds = batches.map((b) => b._id);

    // Find subscriptions linked to those batches
    const subscriptions = await Subscription.find({
      batchId: { $in: batchIds },
    }).lean();
    const subscriptionIds = subscriptions.map((s) => s._id);

    // Find recent payments for those subscriptions (last 50, ordered by most recent)
    const recentPayments = await Payment.find({
      subscriptionId: { $in: subscriptionIds },
      status: 'SUCCESS',
    })
      .sort({ paidAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        earningsTotal: coach.earningsTotal,
        recentPayments,
      },
    });
  } catch (error) {
    console.error('GET /api/coach/earnings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['COACH']);
