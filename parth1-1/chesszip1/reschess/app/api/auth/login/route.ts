import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Account from '@/models/Account';
import { comparePassword, signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    await dbConnect();

    const account = await Account.findOne({ email: email.toLowerCase() });
    if (!account) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!account.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated. Contact admin.' },
        { status: 403 }
      );
    }

    const isPasswordValid = await comparePassword(password, account.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    account.lastLogin = new Date();
    await account.save();

    const payload = {
      userId: account._id.toString(),
      email: account.email,
      role: account.role,
      name: account.name,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json({
      success: true,
      user: {
        id: account._id,
        email: account.email,
        role: account.role,
        name: account.name,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
