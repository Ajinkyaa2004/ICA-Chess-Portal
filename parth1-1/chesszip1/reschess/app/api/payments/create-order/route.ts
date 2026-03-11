import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import razorpay from '@/lib/razorpay';
import Payment from '@/models/Payment';
import Subscription from '@/models/Subscription';
import Student from '@/models/Student';

const createOrderSchema = z.object({
  subscriptionId: z.string().min(1).optional(),
  amount: z.number().positive(),
  plan: z.enum(['monthly', 'quarterly', 'semi-annual', 'annual']).optional(),
  description: z.string().optional(),
});

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();

    const body = await req.json();
    const { subscriptionId, amount, plan, description } = createOrderSchema.parse(body);

    const student = await Student.findOne({ accountId: context.user.userId });
    if (!student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Resolve or create subscription
    let resolvedSubId = subscriptionId;

    if (!resolvedSubId) {
      // Auto-create a PENDING subscription for this student
      const batchId = student.batchIds?.[0] || null;
      const selectedPlan = plan || 'monthly';

      // Calculate end date based on plan
      const startDate = new Date();
      const endDate = new Date();
      switch (selectedPlan) {
        case 'quarterly':
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case 'semi-annual':
          endDate.setMonth(endDate.getMonth() + 6);
          break;
        case 'annual':
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        default:
          endDate.setMonth(endDate.getMonth() + 1);
      }

      const subscription = await Subscription.create({
        studentId: student._id,
        batchId: batchId || student._id, // fallback if no batch assigned
        plan: selectedPlan,
        amount,
        startDate,
        endDate,
        status: 'PENDING',
      });

      resolvedSubId = subscription._id.toString();
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: {
        studentId: student._id.toString(),
        subscriptionId: resolvedSubId,
      },
    });

    // Create pending payment record
    await Payment.create({
      studentId: student._id,
      subscriptionId: resolvedSubId,
      amount,
      currency: 'INR',
      razorpayOrderId: order.id,
      status: 'PENDING',
      description: description || 'Subscription payment',
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const POST = withAuth(handler, ['CUSTOMER']);
