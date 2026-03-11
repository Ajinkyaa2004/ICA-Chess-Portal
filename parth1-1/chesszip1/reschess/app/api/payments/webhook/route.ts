import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Payment from '@/models/Payment';
import Subscription from '@/models/Subscription';

// Razorpay webhook - NO AUTH (verified by signature)
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    await dbConnect();

    const event = JSON.parse(body);
    const { event: eventType, payload } = event;

    if (eventType === 'payment.captured') {
      const paymentEntity = payload.payment.entity;
      const orderId = paymentEntity.order_id;

      const payment = await Payment.findOne({ razorpayOrderId: orderId });
      if (payment && payment.status === 'PENDING') {
        payment.razorpayPaymentId = paymentEntity.id;
        payment.status = 'SUCCESS';
        payment.paidAt = new Date();
        await payment.save();

        await Subscription.findByIdAndUpdate(payment.subscriptionId, {
          status: 'ACTIVE',
        });
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = payload.payment.entity;
      const orderId = paymentEntity.order_id;

      const payment = await Payment.findOne({ razorpayOrderId: orderId });
      if (payment && payment.status === 'PENDING') {
        payment.status = 'FAILED';
        await payment.save();
      }
    } else if (eventType === 'refund.created') {
      const refundEntity = payload.refund.entity;
      const paymentId = refundEntity.payment_id;

      const payment = await Payment.findOne({ razorpayPaymentId: paymentId });
      if (payment) {
        payment.status = 'REFUNDED';
        payment.refundedAt = new Date();
        await payment.save();
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
