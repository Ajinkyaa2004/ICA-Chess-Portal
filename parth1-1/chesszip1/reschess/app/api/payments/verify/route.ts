import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import Payment from '@/models/Payment';
import Subscription from '@/models/Subscription';

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

async function handler(
  req: NextRequest,
  _context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verifySchema.parse(body);

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Update payment record
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!payment) {
      return NextResponse.json({ error: 'Payment record not found' }, { status: 404 });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = 'SUCCESS';
    payment.paidAt = new Date();
    await payment.save();

    // Activate subscription
    await Subscription.findByIdAndUpdate(payment.subscriptionId, {
      status: 'ACTIVE',
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: { paymentId: payment._id },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const POST = withAuth(handler, ['CUSTOMER']);
