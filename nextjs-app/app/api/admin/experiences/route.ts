import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';

export async function GET() {
  await dbConnect();
  const experiences = await Experience.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { company, designation, duration, description } = body;
    if (!company || !designation || !duration || !description) return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    const exp = await Experience.create({ company, designation, duration, description });
    return NextResponse.json({ success: true, experience: exp });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
