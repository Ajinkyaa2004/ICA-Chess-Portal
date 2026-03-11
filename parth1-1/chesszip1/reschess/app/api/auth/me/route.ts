import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Coach from '@/models/Coach';
import Student from '@/models/Student';

async function handler(
  _req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  const { userId, email, role, name } = context.user;

  const baseUser = { id: userId, email, role, name };

  try {
    await dbConnect();

    if (role === 'COACH') {
      const coach = await Coach.findOne({ accountId: userId }).lean();
      if (coach) {
        return NextResponse.json({
          user: {
            ...baseUser,
            phone: coach.phone,
            rating: coach.rating,
            experience: coach.experience,
            specialization: coach.specialization,
            title: coach.bio || undefined,
          },
        });
      }
    }

    if (role === 'CUSTOMER') {
      const student = await Student.findOne({ accountId: userId }).lean();
      if (student) {
        return NextResponse.json({
          user: {
            ...baseUser,
            age: student.age,
            location: student.city ? `${student.city}, ${student.country}` : student.country,
          },
        });
      }
    }

    if (role === 'ADMIN') {
      return NextResponse.json({
        user: {
          ...baseUser,
          title: 'System Administrator',
        },
      });
    }
  } catch {
    // Fall through to basic user data
  }

  return NextResponse.json({ user: baseUser });
}

export const GET = withAuth(handler);
