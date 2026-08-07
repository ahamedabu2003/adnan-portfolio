import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const exp = await Experience.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, experience: exp });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  await Experience.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
