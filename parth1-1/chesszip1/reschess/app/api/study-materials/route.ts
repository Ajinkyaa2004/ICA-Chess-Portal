import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import type { JWTPayload } from '@/lib/auth';
import StudyMaterial from '@/models/StudyMaterial';

const createMaterialSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  fileUrl: z.string().min(1, 'File URL is required'),
  fileName: z.string().min(1, 'File name is required'),
  fileSize: z.number().optional(),
  category: z.string().optional(),
  batchId: z.string().min(1, 'Batch ID is required'),
});

// GET: List study materials (admin sees all, coach/customer filtered by batch)
async function getHandler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get('batchId');

    const query: Record<string, unknown> = {};
    if (batchId) query.batchId = batchId;

    const materials = await StudyMaterial.find(query)
      .populate('batchId', 'name')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: materials });
  } catch (error) {
    console.error('List study materials error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Upload study material (admin/coach)
async function postHandler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) {
  try {
    await dbConnect();

    const body = await req.json();
    const data = createMaterialSchema.parse(body);

    const material = await StudyMaterial.create({
      ...data,
      uploadedBy: context.user.userId,
    });

    return NextResponse.json({ success: true, data: material }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }
    console.error('Create study material error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler, ['ADMIN', 'COACH']);
