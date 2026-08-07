import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import About from '@/models/About';
import Experience from '@/models/Experience';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Cv from '@/models/Cv';

export async function GET() {
  try {
    await dbConnect();

    const [about, experiences, projects, skills, cv] = await Promise.all([
      About.findOne().lean(),
      Experience.find().sort({ createdAt: -1 }).lean(),
      Project.find().sort({ createdAt: -1 }).lean(),
      Skill.find().sort({ createdAt: -1 }).lean(),
      Cv.findOne().sort({ createdAt: -1 }).lean(),
    ]);

    return NextResponse.json({ about, experiences, projects, skills, cv });
  } catch (error) {
    console.error('Data fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
