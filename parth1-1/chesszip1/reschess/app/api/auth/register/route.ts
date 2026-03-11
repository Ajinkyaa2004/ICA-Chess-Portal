import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Account from '@/models/Account';
import { hashPassword } from '@/lib/auth';
import { withAuth } from '@/lib/authMiddleware';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['ADMIN', 'COACH', 'CUSTOMER']),
});

// Admin-only: create new accounts (coaches, customers)
async function handler(
  req: NextRequest,
  _context: { params: Promise<Record<string, string>>; user: { userId: string; email: string; role: string; name: string } }
) {
  try {
    const body = await req.json();
    const { email, password, name, role } = registerSchema.parse(body);

    await dbConnect();

    // Check if email already exists
    const existingAccount = await Account.findOne({ email: email.toLowerCase() });
    if (existingAccount) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const account = await Account.create({
      email: email.toLowerCase(),
      passwordHash,
      name,
      role,
    });

    return NextResponse.json({
      success: true,
      account: {
        id: account._id,
        email: account.email,
        name: account.name,
        role: account.role,
      },
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler, ['ADMIN']);
