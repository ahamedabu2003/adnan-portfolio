<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('task.css') }}">
    <title>Ahamed Aboo Adnan | Backend Developer</title>
    <link rel="icon" href="{{ asset('storage/favicon.jpg') }}">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
    <script src="{{ asset('task.js') }}" defer></script>
</head>
<body>
    {{-- Success Alert --}}
    @if(session('success'))
        <div class="alert-success">
            {{ session('success') }}
        </div>
    @endif

    <header class="header">
        <a href="" class="logo">Ahamed Adnan</a>
        <div class="bx bx-menu" id="menu-icon"></div>
        <div class="navbar">
            <a href="" class="active">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#project">Project</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            @auth
                <a href="{{ route('admin.dashboard') }}" class="btn-dashboard">Admin Panel</a>
            @endauth
        </div>
    </header>
    
    <section class="home" id="home">
        <div class="home-content">
            <h1>Hi, I'm <span>{{ $admin?->name ?? 'Ahamed Aboo Adnan' }}</span></h1>
            <div class="text-animate">
                <h3>{{ $about?->title ?? 'Laravel & PHP Backend Developer' }}</h3>
            </div>
            <p>
                {{ $about?->description ?? 'Backend Developer with expertise in PHP, Laravel, Django, MySQL, PostgreSQL, WordPress, and REST API development. Passionate about building scalable applications, secure authentication systems, and high-performance backend solutions following modern software development practices.' }}
            </p>

            <div class="btn-box">
                @if($cv)
                    <a href="{{ route('admin.cvs.show', $cv) }}" class="btn">Download CV</a>
                @else
                    <a href="#" class="btn" onclick="alert('CV not uploaded yet.'); return false;">Download CV</a>
                @endif
                <a href="#contact" class="btn">Hire Me</a>
            </div>
        </div>

        <div class="home-sci">
            <a href="https://github.com/ahamedabu2003" target="_blank">
                <i class='bx bxl-github'></i>
            </a>
            <a href="https://www.instagram.com/__ahmd_adnan__/" target="_blank">
                <i class='bx bxl-instagram-alt'></i>
            </a>
            <a href="https://www.linkedin.com/in/ahamed-adnan-650070311/" target="_blank">
                <i class='bx bxl-linkedin'></i>
            </a>
        </div>
    </section>
    
    <section class="about" id="about">
        <h2 class="heading">About <span>Me</span></h2>
        <div class="about-container">
            <div class="about-img">
<img src="{{ asset('storage/ADNAN.jpg') }}" alt="Ahamed Aboo Adnan">                <div class="circle-spin"></div>
            </div>

            <div class="about-content">
                <span class="about-tag">
                    <h3>{{ $about?->title ?? 'Laravel & PHP Backend Developer' }}</h3>
                </span>
                <h3>
                    Building Scalable Web Applications &
                    Modern Backend Solutions
                </h3>
                <p>
                    {{ $about?->description ?? 'Backend Developer focused on building robust, secure, and scalable web solutions.' }}
                </p>
                <p>
                    Passionate about clean code, performance optimization,
                    and delivering high-quality software solutions that
                    provide exceptional user experiences.
                </p>

                <div class="about-info">
                    <div class="info-box">
                        <h4>2+</h4>
                        <span>Years Experience</span>
                    </div>
                    <div class="info-box">
                        <h4>10+</h4>
                        <span>Projects Completed</span>
                    </div>
                    <div class="info-box">
                        <h4>100%</h4>
                        <span>Commitment</span>
                    </div>
                </div>

                <a href="#contact" class="btn">Let's Connect</a>
            </div>
        </div>
    </section>

    <!-- EXPERIENCE SECTION -->
    <section class="experience" id="experience">
        <h2 class="heading">Work <span>Experience</span></h2>
        <div class="experience-row">
            <div class="experience-column">
                <div class="experience-box">
                    @forelse($experiences as $exp)
                        <div class="experience-content">
                            <div class="content">
                                <div class="year">
                                    <i class='bx bxs-calendar'></i>
                                    {{ $exp->duration }}
                                </div>
                                <h3>{{ $exp->designation }} | {{ $exp->company }}</h3>
                                <p>{{ $exp->description }}</p>
                            </div>
                        </div>
                    @empty
                        <div class="experience-content">
                            <div class="content">
                                <p>No experiences listed yet.</p>
                            </div>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section class="project" id="project">
        <h2 class="heading">My <span>Projects</span></h2>
        <div class="project-row">
            <div class="project-column">
                <div class="project-box">
                    @forelse($projects as $proj)
                        <div class="project-content">
                            <div class="content">
                                <div class="year">
                                    <i class='bx bxs-calendar'></i> Project
                                </div>
                                <h3>{{ $proj->title }}</h3>
                                <p>{{ $proj->description }}</p>
                                <div class="tech-stack">
                                    {{ $proj->technology }}
                                </div>
                                <div class="project-links">
                                    @if($proj->github_link)
                                        <a href="{{ $proj->github_link }}" target="_blank"><i class='bx bxl-github'></i> Code</a>
                                    @endif
                                    @if($proj->live_link)
                                        <a href="{{ $proj->live_link }}" target="_blank"><i class='bx bx-link-external'></i> Live Demo</a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="project-content">
                            <div class="content">
                                <p>No projects listed yet.</p>
                            </div>
                        </div>
                    @endforelse
                </div>
            </div> 
        </div>
    </section>
   
    <!-- SKILLS SECTION -->
    <section class="skills" id="skills">
        <h2 class="heading">My<span> Skills</span></h2>
        <div class="skills-row">
            {{-- Coding Skills --}}
            <div class="skills-column">
                <h3 class="title">Coding Skills</h3>
                <div class="skills-box">
                    <div class="skills-content">
                        @forelse($skills->filter(fn($s) => $s->percentage < 100) as $skill)
                            <div class="progress">
                                <h3>{{ $skill->name }} <span>{{ $skill->percentage }}%</span></h3>
                                <div class="bar"><span style="width: {{ $skill->percentage }}%"></span></div>
                            </div>
                        @empty
                            <p>No coding skills listed yet.</p>
                        @endforelse
                    </div>
                </div>
            </div>

            {{-- Professional Skills --}}
            <div class="skills-column">
                <h3 class="title">Skills & Strengths</h3>
                <div class="skills-box">
                    <div class="skills-content">
                        @forelse($skills->filter(fn($s) => $s->percentage == 100) as $skill)
                            <div class="progress">
                                <h3>{{ $skill->name }} <span>{{ $skill->percentage }}%</span></h3>
                                <div class="bar"><span style="width: {{ $skill->percentage }}%"></span></div>
                            </div>
                        @empty
                            <p>No professional strengths listed yet.</p>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- CONTACT SECTION -->
    <section class="contact" id="contact">
        <h2 class="heading">Contact<span> Me!</span></h2>
        <form action="{{ route('contact.store') }}" method="POST">
            @csrf
            <div class="input-box">
                <div class="input-field">
                    <input type="text" name="name" placeholder="Full Name" required value="{{ old('name') }}">
                    @error('name') <span class="focus" style="color: red; font-size: 1.2rem;">{{ $message }}</span> @enderror
                </div>

                <div class="input-field">
                    <input type="email" name="email" placeholder="Email Address" required value="{{ old('email') }}">
                    @error('email') <span class="focus" style="color: red; font-size: 1.2rem;">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="input-box">
                <div class="input-field">
                    <input type="text" name="mobile" placeholder="Mobile Number" required value="{{ old('mobile') }}">
                    @error('mobile') <span class="focus" style="color: red; font-size: 1.2rem;">{{ $message }}</span> @enderror
                </div>

                <div class="input-field">
                    <input type="text" name="subject" placeholder="Email Subject" required value="{{ old('subject') }}">
                    @error('subject') <span class="focus" style="color: red; font-size: 1.2rem;">{{ $message }}</span> @enderror
                </div>
            </div>
            <div class="textarea-field">
                <textarea name="message" cols="15" rows="10" placeholder="Your Message" required>{{ old('message') }}</textarea>
                @error('message') <span class="focus" style="color: red; font-size: 1.2rem;">{{ $message }}</span> @enderror
            </div>
            <div class="btn-box btns">
                <button type="submit" class="btn">Submit</button>
            </div>
        </form>
    </section>
</body>
</html>