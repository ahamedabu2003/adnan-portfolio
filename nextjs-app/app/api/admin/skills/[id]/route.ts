import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const skill = await Skill.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, skill });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  await Skill.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
