<?php

namespace Database\Seeders;

use App\Models\About;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Ahamed Aboo Adnan',
                'password' => Hash::make('password123'),
                'is_admin' => 1,
            ]
        );

        // 2. Create Initial About Info
        About::updateOrCreate(
            ['id' => 1],
            [
                'title' => 'Laravel & PHP Backend Developer',
                'description' => 'Backend Developer with expertise in PHP, Laravel, Django, MySQL, PostgreSQL, WordPress, and REST API development. Passionate about building scalable applications, secure authentication systems, and high-performance backend solutions following modern software development practices.',
                'image' => 'about/default.jpg', // A placeholder or default path
            ]
        );

        // 3. Create Initial Experiences
        Experience::truncate();
        Experience::create([
            'company' => 'Brandstrek Coders',
            'designation' => 'Software Developer',
            'duration' => 'Mar 2025 - Nov 2025',
            'description' => 'Developing and maintaining robust backend services using Django, Django REST Framework, PostgreSQL, and WebSockets for real-world business applications. Building scalable REST APIs and optimizing database performance for high-traffic systems.'
        ]);
        Experience::create([
            'company' => 'Appziac Technologies',
            'designation' => 'Backend Developer',
            'duration' => 'Jul 2024 - Mar 2025',
            'description' => 'Developed scalable web applications using PHP and Laravel. Optimized MySQL databases, improved application performance, implemented MVC architecture, and reduced production bugs through testing and code reviews.'
        ]);
        Experience::create([
            'company' => 'MaiTexa Info Solutions',
            'designation' => 'Internship',
            'duration' => 'Dec 2023 - Mar 2024',
            'description' => 'Developed a weather prediction system using Python, machine learning, and external weather APIs. Achieved approximately 85% prediction accuracy through data analysis and forecasting models.'
        ]);

        // 4. Create Initial Projects
        Project::truncate();
        Project::create([
            'title' => 'Rental Platform',
            'technology' => 'Django, DRF, PostgreSQL, WebSockets',
            'description' => 'Developed using Django, DRF, PostgreSQL and WebSockets. Features include vehicle listings, booking management, user registration and real-time updates.',
            'github_link' => 'https://github.com/ahamedabu2003',
            'live_link' => 'https://github.com/ahamedabu2003'
        ]);
        Project::create([
            'title' => 'Online Cart - E-Commerce Platform',
            'technology' => 'Laravel, MySQL, Stripe, Bootstrap',
            'description' => 'Laravel based e-commerce platform with authentication, shopping cart, payment integration, product management, sales dashboard and advanced search functionality.',
            'github_link' => 'https://github.com/ahamedabu2003',
            'live_link' => 'https://github.com/ahamedabu2003'
        ]);
        Project::create([
            'title' => 'Weather Prediction System',
            'technology' => 'Python, Scikit-Learn, Weather API',
            'description' => 'Machine learning based weather prediction system using Python and weather APIs. Achieved approximately 85% forecasting accuracy.',
            'github_link' => 'https://github.com/ahamedabu2003',
            'live_link' => 'https://github.com/ahamedabu2003'
        ]);

        // 5. Create Initial Skills
        Skill::truncate();
        Skill::create(['name' => 'PHP', 'percentage' => 95]);
        Skill::create(['name' => 'Laravel', 'percentage' => 90]);
        Skill::create(['name' => 'MySQL', 'percentage' => 90]);
        Skill::create(['name' => 'REST API', 'percentage' => 95]);
        Skill::create(['name' => 'Python', 'percentage' => 80]);
        Skill::create(['name' => 'Communication Skills', 'percentage' => 100]);
        Skill::create(['name' => 'Time Management', 'percentage' => 100]);
        Skill::create(['name' => 'Decision Making', 'percentage' => 80]);
        Skill::create(['name' => 'Team Work', 'percentage' => 100]);
        Skill::create(['name' => 'Punctuality', 'percentage' => 100]);
    }
}
