import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';

export async function GET() {
  await dbConnect();
  const skills = await Skill.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, percentage } = body;
    if (!name || percentage === undefined) return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    const skill = await Skill.create({ name, percentage });
    return NextResponse.json({ success: true, skill });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
