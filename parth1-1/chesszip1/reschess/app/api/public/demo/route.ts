import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Demo from '@/models/Demo';

// POST /api/public/demo — Book a demo (NO AUTH)
const bookDemoSchema = z.object({
  studentName: z.string().min(1, 'Student name is required').trim(),
  parentName: z.string().min(1, 'Parent name is required').trim(),
  parentEmail: z.string().email('Invalid email address'),
  parentPhone: z.string().min(1, 'Parent phone is required').trim(),
  age: z.number().int().min(3, 'Age must be at least 3').max(100),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookDemoSchema.parse(body);

    await dbConnect();

    const demo = await Demo.create({
      studentName: data.studentName,
      parentName: data.parentName,
      parentEmail: data.parentEmail.toLowerCase(),
      parentPhone: data.parentPhone,
      age: data.age,
      preferredDate: new Date(data.preferredDate),
      preferredTime: data.preferredTime || '',
      level: data.level || 'beginner',
      status: 'BOOKED',
      source: data.source || 'website',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Demo booked successfully',
        data: {
          id: demo._id,
          studentName: demo.studentName,
          preferredDate: demo.preferredDate,
          preferredTime: demo.preferredTime,
          status: demo.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? 'Validation error' },
        { status: 400 }
      );
    }
    console.error('POST /api/public/demo error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
