import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Cv from '@/models/Cv';

export async function GET() {
  await dbConnect();
  const cv = await Cv.findOne().sort({ createdAt: -1 }).lean();
  return NextResponse.json(cv);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { file_path, original_name } = body;
    if (!file_path || !original_name) return NextResponse.json({ error: 'File info required' }, { status: 400 });
    // Delete old CV
    await Cv.deleteMany({});
    const cv = await Cv.create({ file_path, original_name });
    return NextResponse.json({ success: true, cv });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE() {
  await dbConnect();
  await Cv.deleteMany({});
  return NextResponse.json({ success: true });
}
