const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
let uri = 'mongodb://localhost:27017/adnan_portfolio';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/MONGODB_URI=(.*)/);
  if (match && match[1]) {
    uri = match[1].trim();
  }
}

const aboutData = {
  title: 'Back End Developer',
  description: 'Backend Developer with strong expertise in PHP, Laravel, WordPress, and Python, specializing in scalable application architecture and efficient database systems. Adept at building secure authentication flows, RESTful APIs, and responsive user interfaces. Known for enhancing system performance, improving user experience, and delivering maintainable, high-quality code aligned with industry standards.',
  image: '/storage/ADNAN.jpg',
};

const experienceData = [
  {
    designation: 'Junior Software Developer',
    company: 'Harwex Technology',
    duration: '06/2026 – Present',
    description: 'Developed and maintained web applications using PHP, WordPress, and MySQL, implementing new features and enhancing existing functionality. Designed and integrated RESTful APIs, customized WordPress themes and plugins, and optimized database-driven applications. Diagnosed and resolved application issues, performed testing and debugging, and collaborated with cross-functional teams to deliver high-quality software solutions.',
  },
  {
    designation: 'Software Developer',
    company: 'Brandstrek Coders',
    duration: '03/2025 – 11/2025',
    description: 'Developing and maintaining robust backend services for real-world applications using the Django framework. Gaining experience in designing and integrating RESTful APIs to connect frontend and backend systems efficiently. Implementing database models and optimizing queries to improve performance and scalability.',
  },
  {
    designation: 'Back End Developer',
    company: 'Appziac Technologies',
    duration: '07/2024 – 03/2025',
    description: 'Developed scalable web applications using PHP and Laravel, improving performance and user engagement by 20%. Optimized database models and queries with Eloquent ORM and MySQL, enhancing data flow efficiency by 25%. Designed responsive user interfaces with Blade templates and Tailwind CSS, increasing user retention by 30%. Implemented server-side logic using Laravel\'s MVC architecture to improve application performance and maintainability. Conducted code reviews and utilized Laravel\'s testing tools, boosting team productivity by 15% and reducing production bugs by 50%.',
  },
  {
    designation: 'Internship',
    company: 'MaiTexa Info Solutions',
    duration: '12/2023 – 03/2024',
    description: 'Built a weather prediction system using Python and external APIs for real-time data collection and trend analysis. Applied machine learning techniques to forecast weather patterns with 85% accuracy. Maintained strong ethical standards by ensuring privacy compliance and minimizing bias in predictive models.',
  },
];

const skillsData = [
  { name: 'PHP', percentage: 95 },
  { name: 'Laravel', percentage: 95 },
  { name: 'Python', percentage: 85 },
  { name: 'Django', percentage: 80 },
  { name: 'JavaScript', percentage: 85 },
  { name: 'SQL', percentage: 90 },
  { name: 'MySQL', percentage: 90 },
  { name: 'PostgreSQL', percentage: 85 },
  { name: 'WordPress', percentage: 80 },
  { name: 'Tailwind CSS', percentage: 85 },
  { name: 'Git', percentage: 90 },
  { name: 'RESTful APIs', percentage: 95 },
];

const projectsData = [
  {
    title: 'Online Cart – E-commerce Platform',
    description: 'Implemented secure authentication for users and admins using Laravel Auth & Bcrypt. Added advanced search, filtering, and a complete cart workflow, enhancing user satisfaction. Built a real-time admin dashboard for tracking sales, inventory, and user insights. Improved product management through validated forms and efficient Eloquent operations. Boosted performance with responsive UI and optimized MySQL schema.',
    technology: 'Laravel, Livewire, Blade, Tailwind CSS, MySQL, Stripe/Razorpay',
    github_link: 'https://github.com/ahamedabu2003',
    live_link: 'https://github.com/ahamedabu2003',
  },
  {
    title: 'Rental Platform',
    description: 'Built REST APIs for user registration, vehicle listings, and booking management. Integrated real-time booking and availability updates using WebSockets. Ensured efficient data flow using well-structured PostgreSQL models. Collaborated with the team using Git and performed extensive API testing with Postman.',
    technology: 'Django, DRF, WebSockets, PostgreSQL',
    github_link: 'https://github.com/ahamedabu2003',
    live_link: 'https://github.com/ahamedabu2003',
  },
];

async function run() {
  console.log(`Connecting to: ${uri}`);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    // 1. Seed About
    console.log('Seeding About...');
    await db.collection('abouts').deleteMany({});
    await db.collection('abouts').insertOne({
      ...aboutData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 2. Seed Experiences
    console.log('Seeding Experiences...');
    await db.collection('experiences').deleteMany({});
    await db.collection('experiences').insertMany(
      experienceData.map((e) => ({ ...e, createdAt: new Date(), updatedAt: new Date() }))
    );

    // 3. Seed Skills
    console.log('Seeding Skills...');
    await db.collection('skills').deleteMany({});
    await db.collection('skills').insertMany(
      skillsData.map((s) => ({ ...s, createdAt: new Date(), updatedAt: new Date() }))
    );

    // 4. Seed Projects
    console.log('Seeding Projects...');
    await db.collection('projects').deleteMany({});
    await db.collection('projects').insertMany(
      projectsData.map((p) => ({ ...p, createdAt: new Date(), updatedAt: new Date() }))
    );

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await client.close();
  }
}

run();
