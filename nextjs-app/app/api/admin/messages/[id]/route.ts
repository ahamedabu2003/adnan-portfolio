import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const message = await ContactMessage.findById(id).lean();
  if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // Mark as read
  await ContactMessage.findByIdAndUpdate(id, { read: true });
  return NextResponse.json(message);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  await ContactMessage.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
