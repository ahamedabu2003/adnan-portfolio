import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import About from '@/models/About';

export async function GET() {
  await dbConnect();
  const about = await About.findOne().lean();
  return NextResponse.json(about);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, title, description, image } = body;
    if (!title || !description) return NextResponse.json({ error: 'Title and description required' }, { status: 400 });
    const existing = await About.findOne();
    if (existing) {
      await About.findByIdAndUpdate(existing._id, { name, title, description, image });
      return NextResponse.json({ success: true, message: 'About updated' });
    }
    await About.create({ name, title, description, image });
    return NextResponse.json({ success: true, message: 'About created' });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE() {
  await dbConnect();
  await About.deleteMany();
  return NextResponse.json({ success: true });
}
