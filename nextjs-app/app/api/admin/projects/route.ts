import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  await dbConnect();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, description, technology, image, github_link, live_link } = body;
    if (!title || !description || !technology) return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    const project = await Project.create({ title, description, technology, image, github_link, live_link });
    return NextResponse.json({ success: true, project });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
