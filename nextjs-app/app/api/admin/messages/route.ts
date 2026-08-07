import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';

export async function GET() {
  await dbConnect();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(messages);
}
