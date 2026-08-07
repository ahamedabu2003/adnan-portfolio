import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Experience from '@/models/Experience';
import ContactMessage from '@/models/ContactMessage';

export async function GET() {
  try {
    await dbConnect();
    const [projects, skills, experiences, messages] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
    ]);
    return NextResponse.json({ projects, skills, experiences, messages });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
