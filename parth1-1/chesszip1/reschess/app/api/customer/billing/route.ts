import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Student from '@/models/Student';
import Subscription from '@/models/Subscription';
import Payment from '@/models/Payment';

// GET /api/customer/billing — Get subscriptions and payments for the logged-in customer
export const GET = withAuth(async (_req: NextRequest, context) => {
  try {
    await dbConnect();

    const { user } = context;

    // Find the Student document by accountId
    const student = await Student.findOne({ accountId: user.userId });
    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      );
    }

    // Find subscriptions for this student
    const subscriptions = await Subscription.find({
      studentId: student._id,
    })
      .populate('batchId', 'name type level')
      .sort({ createdAt: -1 })
      .lean();

    const subscriptionIds = subscriptions.map((s) => s._id);

    // Find payments linked to those subscriptions
    const payments = await Payment.find({
      subscriptionId: { $in: subscriptionIds },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        subscriptions,
        payments,
      },
    });
  } catch (error) {
    console.error('GET /api/customer/billing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['CUSTOMER']);
