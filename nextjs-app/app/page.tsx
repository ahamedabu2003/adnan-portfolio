import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import About from '@/models/About';
import Experience from '@/models/Experience';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Cv from '@/models/Cv';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Ahamed Aboo Adnan | Backend Developer',
  description: 'Portfolio of Ahamed Aboo Adnan — Backend Developer, Laravel Specialist & API Architect.',
};

export default async function HomePage() {
  let data = { about: null, experiences: [], projects: [], skills: [], cv: null };

  try {
    await dbConnect();
    const [about, experiences, projects, skills, cv] = await Promise.all([
      About.findOne().lean(),
      Experience.find().sort({ createdAt: -1 }).lean(),
      Project.find().sort({ createdAt: -1 }).lean(),
      Skill.find().sort({ createdAt: -1 }).lean(),
      Cv.findOne().sort({ createdAt: -1 }).lean(),
    ]);
    data = {
      about: about ? JSON.parse(JSON.stringify(about)) : null,
      experiences: JSON.parse(JSON.stringify(experiences)),
      projects: JSON.parse(JSON.stringify(projects)),
      skills: JSON.parse(JSON.stringify(skills)),
      cv: cv ? JSON.parse(JSON.stringify(cv)) : null,
    };
  } catch (e) {
    console.error('Error fetching portfolio data:', e);
  }

  return <HomeClient {...data} />;
}
