<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ahamed Aboo Adnan | Backend Developer</title>
    <link rel="icon" href="{{ asset('storage/favicon.jpg') }}">

    <!-- Fonts: brutalist display + wide-tracked mono body -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">

    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">

    <!-- Tailwind (CDN) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        ink: '#0B0B0B',
                        surface: '#141416',
                        surface2: '#1B1B1E',
                        paper: '#F5F5F7',
                        dim: '#8A8A93',
                        signal: '#7C5CFC',
                        signal2: '#22D3EE',
                    },
                    fontFamily: {
                        display: ['"Space Grotesk"', 'sans-serif'],
                        mono: ['"JetBrains Mono"', 'monospace'],
                    },
                }
            }
        }
    </script>

    <style>
        html { scroll-behavior: smooth; }
        body {
            background-color: #0B0B0B;
            color: #F5F5F7;
            cursor: none;
            overflow-x: hidden;
            position: relative;
        }
        @media (max-width: 768px) {
            body { cursor: auto; }
            #cursor-dot, #cursor-ring, .cursor-particle { display: none; }
        }
        ::selection { background: #7C5CFC; color: #0B0B0B; }

        /* signature gradient text */
        .signal-text {
            background: linear-gradient(100deg, #7C5CFC 0%, #22D3EE 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .signal-border {
            border-image: linear-gradient(100deg, #7C5CFC, #22D3EE) 1;
        }

        /* film grain / noise overlay for depth */
        .grain {
            position: fixed; inset: 0; pointer-events: none; z-index: 40;
            opacity: 0.035; mix-blend-mode: overlay;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ---------- scroll progress bar ---------- */
        #scroll-progress {
            position: fixed; top: 0; left: 0; height: 3px; width: 0%;
            background: linear-gradient(90deg, #7C5CFC, #22D3EE);
            z-index: 80; will-change: width;
            box-shadow: 0 0 12px rgba(124,92,252,0.6);
        }

        /* ---------- ambient floating orbs (hero background motion) ---------- */
        .orb-field { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
        .orb {
            position: absolute; border-radius: 9999px; filter: blur(70px);
            will-change: transform;
            opacity: 0.35;
        }
        .orb-1 { width: 420px; height: 420px; background: radial-gradient(circle, #7C5CFC, transparent 70%); top: -10%; left: 5%; }
        .orb-2 { width: 360px; height: 360px; background: radial-gradient(circle, #22D3EE, transparent 70%); bottom: -15%; right: 0%; }
        .orb-3 { width: 260px; height: 260px; background: radial-gradient(circle, #7C5CFC, transparent 70%); top: 30%; right: 25%; opacity: 0.2; }

        /* custom cursor */
        #cursor-dot, #cursor-ring {
            position: fixed; top: 0; left: 0; pointer-events: none; z-index: 999;
            border-radius: 9999px; transform: translate(-50%, -50%);
            will-change: transform;
        }
        #cursor-dot { width: 6px; height: 6px; background: #F5F5F7; }
        #cursor-ring {
            width: 34px; height: 34px; border: 1px solid rgba(245,245,247,0.5);
            transition: width .25s ease, height .25s ease, border-color .25s ease, background-color .25s ease;
        }
        .cursor-hover #cursor-ring {
            width: 64px; height: 64px; border-color: #7C5CFC; background: rgba(124,92,252,0.08);
        }
        .cursor-particle {
            position: fixed; top: 0; left: 0; width: 4px; height: 4px; border-radius: 9999px;
            background: #22D3EE; pointer-events: none; z-index: 998; opacity: 0.8;
        }

        /* split-text char container */
        .char-wrap { overflow: hidden; display: inline-block; }
        .char { display: inline-block; will-change: transform; }

        /* glitch hover on hero name */
        .glitch-text { position: relative; display: inline-block; }
        .glitch-text .glitch-layer {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            clip-path: inset(0 0 0 0); opacity: 0; pointer-events: none;
        }

        /* magnetic buttons */
        .magnetic { position: relative; will-change: transform; overflow: hidden; }

        /* ripple */
        .ripple-el { position: absolute; border-radius: 9999px; background: rgba(11,11,11,0.35); transform: scale(0); pointer-events: none; }
        .border .ripple-el { background: rgba(124,92,252,0.35); }

        /* skill bar fill */
        .skill-bar-fill { will-change: width; position: relative; }
        .skill-bar-fill::after {
            content: ''; position: absolute; inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
            transform: translateX(-100%);
        }
        .skill-bar-fill.shimmer::after { animation: shimmer 1.6s ease-in-out infinite; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }

        .status-chip { font-variant-numeric: tabular-nums; }

        input, textarea { background: transparent; }
        input:focus, textarea:focus { outline: none; }

        /* nav underline */
        .nav-link { position: relative; }
        .nav-link::after {
            content: ''; position: absolute; left: 0; bottom: -4px; width: 0%; height: 1px;
            background: linear-gradient(90deg, #7C5CFC, #22D3EE);
            transition: width .3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* about image reveal */
        .img-reveal-wrap { position: relative; overflow: hidden; }
        .img-reveal-cover {
            position: absolute; inset: 0; background: #0B0B0B; z-index: 2;
            transform-origin: bottom;
        }

        /* 3D tilt card */
        .tilt-card { transform-style: preserve-3d; will-change: transform; }
        .tilt-card .tilt-inner { transform: translateZ(20px); }

        /* marquee strip */
        .marquee-track { display: flex; width: max-content; will-change: transform; }
        .marquee-track span { white-space: nowrap; }

        @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
        }
    </style>
</head>
<body class="font-mono antialiased selection:bg-signal">

    <div id="scroll-progress"></div>
    <div class="grain"></div>
    <div id="cursor-ring"></div>
    <div id="cursor-dot"></div>

    {{-- Success Alert --}}
    @if(session('success'))
        <div class="fixed top-6 right-6 z-[70] bg-surface border border-signal/40 text-paper px-5 py-3 rounded-md text-sm tracking-wide shadow-lg shadow-signal/10" data-toast-in>
            {{ session('success') }}
        </div>
    @endif

    <!-- ============ HEADER ============ -->
    <header class="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-white/5">
        <div class="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
            <a href="" class="font-display font-bold text-lg tracking-tight magnetic-link">
                AA<span class="signal-text">.</span>dev
            </a>

            <div id="menu-icon" class="md:hidden text-2xl bx bx-menu"></div>

            <nav class="navbar hidden md:flex items-center gap-9 text-xs uppercase tracking-[0.2em] text-dim">
                <a href="" class="nav-link hover:text-paper transition-colors magnetic-link">Home</a>
                <a href="#about" class="nav-link hover:text-paper transition-colors magnetic-link">About</a>
                <a href="#experience" class="nav-link hover:text-paper transition-colors magnetic-link">Experience</a>
                <a href="#project" class="nav-link hover:text-paper transition-colors magnetic-link">Work</a>
                <a href="#skills" class="nav-link hover:text-paper transition-colors magnetic-link">Skills</a>
                <a href="#contact" class="nav-link hover:text-paper transition-colors magnetic-link">Contact</a>
                @auth
                    <a href="{{ route('admin.dashboard') }}" class="px-4 py-2 rounded-full border border-signal/40 text-paper hover:bg-signal/10 transition-colors magnetic-link">Admin Panel</a>
                @endauth
            </nav>
        </div>
    </header>

    <!-- ============ HERO ============ -->
    <section id="home" class="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden">

        <div class="orb-field">
            <div class="orb orb-1" data-orb></div>
            <div class="orb orb-2" data-orb></div>
            <div class="orb orb-3" data-orb></div>
        </div>

        <div class="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-dim mb-8 opacity-0" data-hero-fade>
            <span class="w-2 h-2 rounded-full bg-signal2 animate-pulse"></span>
            <span class="status-chip">status: 200 — available for hire</span>
        </div>

        <h1 class="relative z-10 font-display font-bold text-[13vw] md:text-[7.2vw] leading-[0.95] tracking-tight" id="hero-heading">
            <div class="char-wrap"><span class="char glitch-text" id="hero-name" data-hero-line data-scramble>{{ $admin?->name }}</span></div>
        </h1>

        <div class="relative z-10 mt-8 max-w-2xl opacity-0" data-hero-fade>
            <h3 class="font-display text-2xl md:text-3xl font-medium text-signal-wrap">
                <span class="signal-text">{{ $about?->title }}</span>
            </h3>
            <p class="mt-5 text-sm md:text-base leading-7 text-dim tracking-wide">
                {{ $about?->description }}
            </p>
        </div>

        <div class="relative z-10 mt-10 flex flex-wrap items-center gap-5 opacity-0" data-hero-fade>
            @if($cv)
                <a href="{{ route('admin.cvs.show', $cv) }}" class="magnetic ripple inline-flex items-center gap-2 bg-paper text-ink font-medium px-7 py-3.5 rounded-full text-sm">
                    <span>Download CV</span>
                    <i class='bx bx-download'></i>
                </a>
            @else
                <a href="#" onclick="alert('CV not uploaded yet.'); return false;" class="magnetic ripple inline-flex items-center gap-2 bg-paper text-ink font-medium px-7 py-3.5 rounded-full text-sm">
                    <span>Download CV</span>
                    <i class='bx bx-download'></i>
                </a>
            @endif
            <a href="#contact" class="magnetic ripple border inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 rounded-full text-sm hover:border-signal/60 transition-colors">
                <span>Hire Me</span>
                <i class='bx bx-right-arrow-alt'></i>
            </a>
        </div>

        <div class="absolute bottom-10 right-6 md:right-10 hidden md:flex flex-col items-center gap-3 text-dim text-[10px] tracking-[0.25em] uppercase z-10">
            <span class="[writing-mode:vertical-rl]">Scroll</span>
            <span id="scroll-line" class="w-px h-16 bg-gradient-to-b from-dim to-transparent origin-top"></span>
        </div>

        <div class="absolute top-28 right-6 md:right-10 flex flex-col gap-4 z-10">
            <a href="https://github.com/ahamedabu2003" target="_blank" class="magnetic w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-signal/60 transition-colors">
                <i class='bx bxl-github'></i>
            </a>
            <a href="https://www.instagram.com/__ahmd_adnan__/" target="_blank" class="magnetic w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-signal/60 transition-colors">
                <i class='bx bxl-instagram-alt'></i>
            </a>
            <a href="https://www.linkedin.com/in/ahamed-adnan-650070311/" target="_blank" class="magnetic w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-signal/60 transition-colors">
                <i class='bx bxl-linkedin'></i>
            </a>
        </div>
    </section>

    <!-- ============ MARQUEE STRIP ============ -->
    <div class="relative border-y border-white/5 py-4 overflow-hidden bg-surface/40">
        <div class="marquee-track" id="marquee-track">
            @for ($i = 0; $i < 2; $i++)
                <span class="mx-6 text-xs uppercase tracking-[0.3em] text-dim">Backend Development</span>
                <span class="mx-6 text-signal2">✦</span>
                <span class="mx-6 text-xs uppercase tracking-[0.3em] text-dim">Laravel</span>
                <span class="mx-6 text-signal2">✦</span>
                <span class="mx-6 text-xs uppercase tracking-[0.3em] text-dim">API Architecture</span>
                <span class="mx-6 text-signal2">✦</span>
                <span class="mx-6 text-xs uppercase tracking-[0.3em] text-dim">Clean Code</span>
                <span class="mx-6 text-signal2">✦</span>
            @endfor
        </div>
    </div>

    <!-- ============ ABOUT (bento grid) ============ -->
    <section class="about relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="about">
        <h2 class="reveal-up font-display font-bold text-4xl md:text-6xl mb-14">
            About <span class="signal-text">Me</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div class="reveal-up img-reveal-wrap md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative bg-surface min-h-[320px] md:min-h-[420px]">
                <img src="{{ asset('storage/ADNAN.jpg') }}" alt="Ahamed Aboo Adnan" class="w-full h-full object-cover">
                <div class="img-reveal-cover"></div>
            </div>

            <div class="reveal-up md:col-span-4 rounded-2xl bg-surface p-8 md:p-10 tilt-card">
                <div class="tilt-inner">
                    <span class="text-xs uppercase tracking-[0.2em] text-signal2">{{ $about?->title }}</span>
                    <h3 class="font-display font-semibold text-2xl md:text-3xl mt-3 leading-snug">
                        Building Scalable Web Applications &amp; Modern Backend Solutions
                    </h3>
                    <p class="mt-5 text-sm leading-7 text-dim">
                        {{ $about?->description }}
                    </p>
                </div>
            </div>

            <div class="reveal-up md:col-span-4 grid grid-cols-3 gap-5">
                <div class="rounded-2xl bg-surface p-6 flex flex-col justify-center items-start tilt-card">
                    <h4 class="font-display font-bold text-4xl signal-text tilt-inner"><span data-counter data-target="2">0</span>+</h4>
                    <span class="text-xs text-dim mt-2 tracking-wide">Years Experience</span>
                </div>
                <div class="rounded-2xl bg-surface p-6 flex flex-col justify-center items-start tilt-card">
                    <h4 class="font-display font-bold text-4xl signal-text tilt-inner"><span data-counter data-target="10">0</span>+</h4>
                    <span class="text-xs text-dim mt-2 tracking-wide">Projects Completed</span>
                </div>
                <div class="rounded-2xl bg-surface p-6 flex flex-col justify-center items-start tilt-card">
                    <h4 class="font-display font-bold text-4xl signal-text tilt-inner"><span data-counter data-target="100">0</span>%</h4>
                    <span class="text-xs text-dim mt-2 tracking-wide">Commitment</span>
                </div>
            </div>
        </div>

        <a href="#contact" class="magnetic ripple border reveal-up inline-flex items-center gap-2 mt-10 border border-white/20 px-7 py-3.5 rounded-full text-sm hover:border-signal/60 transition-colors">
            Let's Connect <i class='bx bx-right-arrow-alt'></i>
        </a>
    </section>

    <!-- ============ EXPERIENCE (timeline) ============ -->
    <section class="experience relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="experience">
        <h2 class="reveal-up font-display font-bold text-4xl md:text-6xl mb-16">
            Work <span class="signal-text">Experience</span>
        </h2>

        <div class="relative border-l border-white/10 pl-8 md:pl-14 space-y-14">
            <span id="timeline-fill" class="absolute left-0 top-0 w-px bg-gradient-to-b from-signal to-signal2 h-0"></span>
            @forelse($experiences as $exp)
                <div class="reveal-up relative timeline-item">
                    <span class="absolute -left-[38px] md:-left-[62px] top-1 w-3 h-3 rounded-full bg-signal2 timeline-dot"></span>
                    <div class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dim mb-3">
                        <i class='bx bxs-calendar'></i> {{ $exp->duration }}
                    </div>
                    <h3 class="font-display font-semibold text-xl md:text-2xl">{{ $exp->designation }} <span class="text-dim font-normal">| {{ $exp->company }}</span></h3>
                    <p class="mt-3 text-sm leading-7 text-dim max-w-2xl">{{ $exp->description }}</p>
                </div>
            @empty
                <div class="reveal-up relative">
                    <span class="absolute -left-[38px] md:-left-[62px] top-1 w-3 h-3 rounded-full bg-signal2"></span>
                    <p class="text-sm text-dim">No experiences listed yet.</p>
                </div>
            @endforelse
        </div>
    </section>

    <!-- ============ PROJECTS — horizontal scroll ============ -->
    <section class="project relative py-28" id="project">
        <div class="px-6 md:px-10 max-w-7xl mx-auto mb-14">
            <h2 class="reveal-up font-display font-bold text-4xl md:text-6xl">
                Featured <span class="signal-text">Work</span>
            </h2>
            <p class="reveal-up text-xs uppercase tracking-[0.2em] text-dim mt-4">Scroll to explore the payloads →</p>
        </div>

        <div id="horizontal-section" class="relative overflow-hidden">
            <div id="horizontal-track" class="flex gap-6 px-6 md:px-10 w-max will-change-transform">
                @forelse($projects as $proj)
                    <div class="project-card tilt-card flex-shrink-0 w-[82vw] sm:w-[440px] rounded-2xl bg-surface border border-white/5 p-8 flex flex-col justify-between min-h-[420px]">
                        <div class="tilt-inner flex flex-col justify-between h-full">
                            <div>
                                <div class="flex items-center justify-between mb-6">
                                    <span class="status-chip text-xs px-3 py-1 rounded-full border border-signal2/40 text-signal2">
                                        {{ $proj->live_link ? '200 OK' : '102 processing' }}
                                    </span>
                                    <i class='bx bxs-calendar text-dim'></i>
                                </div>
                                <h3 class="font-display font-semibold text-2xl">{{ $proj->title }}</h3>
                                <p class="mt-4 text-sm leading-7 text-dim">{{ $proj->description }}</p>
                            </div>

                            <div>
                                <div class="tech-stack text-xs text-signal2 tracking-wide mt-6">{{ $proj->technology }}</div>
                                <div class="project-links flex gap-5 mt-5 text-sm">
                                    @if($proj->github_link)
                                        <a href="{{ $proj->github_link }}" target="_blank" class="magnetic-link flex items-center gap-1.5 hover:text-signal2 transition-colors"><i class='bx bxl-github'></i> Code</a>
                                    @endif
                                    @if($proj->live_link)
                                        <a href="{{ $proj->live_link }}" target="_blank" class="magnetic-link flex items-center gap-1.5 hover:text-signal2 transition-colors"><i class='bx bx-link-external'></i> Live Demo</a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="project-card flex-shrink-0 w-[82vw] sm:w-[440px] rounded-2xl bg-surface border border-white/5 p-8 min-h-[420px] flex items-center justify-center">
                        <p class="text-sm text-dim">No projects listed yet.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    <!-- ============ SKILLS ============ -->
    <section class="skills relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="skills">
        <h2 class="reveal-up font-display font-bold text-4xl md:text-6xl mb-14">
            My<span class="signal-text"> Skills</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="reveal-up rounded-2xl bg-surface p-8 md:p-10">
                <h3 class="text-xs uppercase tracking-[0.2em] text-dim mb-8">Coding Skills</h3>
                <div class="space-y-7">
                    @forelse($skills->filter(fn($s) => $s->percentage < 100) as $skill)
                        <div class="skill-item">
                            <div class="flex justify-between text-sm mb-2">
                                <span>{{ $skill->name }}</span>
                                <span class="text-signal2"><span data-counter data-target="{{ $skill->percentage }}">0</span>%</span>
                            </div>
                            <div class="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                                <span class="skill-bar-fill block h-full rounded-full" style="width:0%; background: linear-gradient(90deg,#7C5CFC,#22D3EE);" data-target="{{ $skill->percentage }}"></span>
                            </div>
                        </div>
                    @empty
                        <p class="text-sm text-dim">No coding skills listed yet.</p>
                    @endforelse
                </div>
            </div>

            <div class="reveal-up rounded-2xl bg-surface p-8 md:p-10">
                <h3 class="text-xs uppercase tracking-[0.2em] text-dim mb-8">Skills &amp; Strengths</h3>
                <div class="flex flex-wrap gap-3">
                    @forelse($skills->filter(fn($s) => $s->percentage == 100) as $skill)
                        <span class="strength-chip px-4 py-2 rounded-full border border-signal/30 text-sm flex items-center gap-2 opacity-0">
                            <i class='bx bx-check text-signal2'></i> {{ $skill->name }}
                        </span>
                    @empty
                        <p class="text-sm text-dim">No professional strengths listed yet.</p>
                    @endforelse
                </div>
            </div>
        </div>
    </section>

    <!-- ============ CONTACT ============ -->
    <section class="contact relative px-6 md:px-10 py-28 max-w-4xl mx-auto" id="contact">
        <h2 class="reveal-up font-display font-bold text-4xl md:text-6xl mb-14">
            Contact<span class="signal-text"> Me!</span>
        </h2>

        <form action="{{ route('contact.store') }}" method="POST" class="reveal-up space-y-8">
            @csrf
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="input-field border-b border-white/15 focus-within:border-signal2 transition-colors pb-2">
                    <input type="text" name="name" placeholder="Full Name" required value="{{ old('name') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('name') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>

                <div class="input-field border-b border-white/15 focus-within:border-signal2 transition-colors pb-2">
                    <input type="email" name="email" placeholder="Email Address" required value="{{ old('email') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('email') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="input-field border-b border-white/15 focus-within:border-signal2 transition-colors pb-2">
                    <input type="text" name="mobile" placeholder="Mobile Number" required value="{{ old('mobile') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('mobile') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>

                <div class="input-field border-b border-white/15 focus-within:border-signal2 transition-colors pb-2">
                    <input type="text" name="subject" placeholder="Email Subject" required value="{{ old('subject') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('subject') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="textarea-field border-b border-white/15 focus-within:border-signal2 transition-colors pb-2">
                <textarea name="message" rows="5" placeholder="Your Message" required
                    class="w-full text-sm placeholder:text-dim text-paper resize-none">{{ old('message') }}</textarea>
                @error('message') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
            </div>

            <button type="submit" class="magnetic ripple inline-flex items-center gap-2 bg-paper text-ink font-medium px-8 py-4 rounded-full text-sm">
                Submit <i class='bx bx-send'></i>
            </button>
        </form>
    </section>

    <footer class="px-6 md:px-10 py-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 text-xs text-dim tracking-wide">
        <span>© {{ date('Y') }} Ahamed Aboo Adnan — built with Laravel &amp; care.</span>
        <span>status: 200 OK</span>
    </footer>

    <!-- ============ SCRIPTS ============ -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouch = window.matchMedia('(pointer: coarse)').matches;

        /* ---------------------------------------------------------
           0. SCROLL PROGRESS BAR
        --------------------------------------------------------- */
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            gsap.to(progressBar, {
                width: '100%',
                ease: 'none',
                scrollTrigger: { scrub: 0.3, start: 'top top', end: 'max' }
            });
        }

        /* ---------------------------------------------------------
           1. CUSTOM MAGNETIC CURSOR + TRAILING PARTICLES
        --------------------------------------------------------- */
        if (!isTouch && !prefersReduced) {
            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            const dotPos = { x: 0, y: 0 };
            const ringPos = { x: 0, y: 0 };
            let mouseX = 0, mouseY = 0;
            let lastParticle = 0;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;

                const now = performance.now();
                if (now - lastParticle > 60) {
                    lastParticle = now;
                    const p = document.createElement('div');
                    p.className = 'cursor-particle';
                    p.style.left = mouseX + 'px';
                    p.style.top = mouseY + 'px';
                    document.body.appendChild(p);
                    gsap.to(p, {
                        x: (Math.random() - 0.5) * 40,
                        y: (Math.random() - 0.5) * 40 + 20,
                        opacity: 0,
                        scale: 0.3,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => p.remove(),
                    });
                }
            });

            gsap.ticker.add(() => {
                dotPos.x += (mouseX - dotPos.x) * 0.35;
                dotPos.y += (mouseY - dotPos.y) * 0.35;
                ringPos.x += (mouseX - ringPos.x) * 0.15;
                ringPos.y += (mouseY - ringPos.y) * 0.15;
                gsap.set(dot, { x: dotPos.x, y: dotPos.y });
                gsap.set(ring, { x: ringPos.x, y: ringPos.y });
            });

            document.querySelectorAll('a, button, .magnetic, .magnetic-link, input, textarea')
                .forEach(el => {
                    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
                });
        }

        /* ---------------------------------------------------------
           2. HERO SPLIT-TEXT REVEAL
        --------------------------------------------------------- */
        const heroLine = document.querySelector('[data-hero-line]');
        if (heroLine) {
            const words = heroLine.textContent.trim().split(' ');
            heroLine.innerHTML = words
                .map(w => `<span class="char-wrap"><span class="char" style="display:inline-block">${w}&nbsp;</span></span>`)
                .join('');

            gsap.set('.char', { yPercent: 130, rotate: 6 });
            gsap.to('.char', {
                yPercent: 0,
                rotate: 0,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.07,
                delay: 0.2,
            });
        }

        gsap.to('[data-hero-fade]', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.9,
        });
        gsap.set('[data-hero-fade]', { y: 20 });

        /* ---------------------------------------------------------
           2b. HERO SCRAMBLE-TEXT ON HOVER
        --------------------------------------------------------- */
        const scrambleTarget = document.getElementById('hero-name');
        if (scrambleTarget && !isTouch) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const original = scrambleTarget.textContent;
            let scrambling = false;

            scrambleTarget.addEventListener('mouseenter', () => {
                if (scrambling) return;
                scrambling = true;
                let iteration = 0;
                const interval = setInterval(() => {
                    scrambleTarget.textContent = original.split('').map((letter, index) => {
                        if (letter === ' ') return ' ';
                        if (index < iteration) return original[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');
                    if (iteration >= original.length) {
                        clearInterval(interval);
                        scrambleTarget.textContent = original;
                        scrambling = false;
                    }
                    iteration += 1 / 2;
                }, 30);
            });
        }

        /* ---------------------------------------------------------
           2c. AMBIENT FLOATING ORBS
        --------------------------------------------------------- */
        if (!prefersReduced) {
            document.querySelectorAll('[data-orb]').forEach((orb, i) => {
                gsap.to(orb, {
                    x: (i % 2 === 0 ? 1 : -1) * gsap.utils.random(40, 90),
                    y: gsap.utils.random(-50, 50),
                    duration: gsap.utils.random(7, 11),
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.6,
                });
            });

            gsap.to('#scroll-line', {
                scaleY: 0.3,
                repeat: -1,
                yoyo: true,
                duration: 1.4,
                ease: 'power1.inOut',
            });
        }

        /* ---------------------------------------------------------
           3. SCROLL REVEALS (sections, cards, timeline)
        --------------------------------------------------------- */
        gsap.utils.toArray('.reveal-up').forEach((el) => {
            gsap.fromTo(el,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
                }
            );
        });

        /* ---------------------------------------------------------
           3b. ABOUT IMAGE CURTAIN REVEAL
        --------------------------------------------------------- */
        const imgCover = document.querySelector('.img-reveal-cover');
        if (imgCover) {
            gsap.to(imgCover, {
                scaleY: 0,
                transformOrigin: 'bottom',
                duration: 1.1,
                ease: 'power4.inOut',
                scrollTrigger: { trigger: imgCover, start: 'top 85%', once: true }
            });
        }

        /* ---------------------------------------------------------
           3c. NUMBER COUNT-UP
        --------------------------------------------------------- */
        gsap.utils.toArray('[data-counter]').forEach((el) => {
            const target = parseFloat(el.getAttribute('data-target'));
            const counter = { val: 0 };
            gsap.to(counter, {
                val: target,
                duration: 1.6,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                onUpdate: () => { el.textContent = Math.floor(counter.val); },
            });
        });

        /* ---------------------------------------------------------
           3d. TIMELINE VERTICAL FILL + DOT PULSE
        --------------------------------------------------------- */
        const timelineFill = document.getElementById('timeline-fill');
        const timelineWrap = document.querySelector('.experience .space-y-14');
        if (timelineFill && timelineWrap) {
            gsap.to(timelineFill, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: timelineWrap,
                    start: 'top 70%',
                    end: 'bottom 80%',
                    scrub: 0.6,
                }
            });
        }
        gsap.utils.toArray('.timeline-dot').forEach((dot) => {
            gsap.fromTo(dot, { scale: 0 }, {
                scale: 1, duration: 0.5, ease: 'back.out(3)',
                scrollTrigger: { trigger: dot, start: 'top 85%', once: true }
            });
        });

        /* ---------------------------------------------------------
           3e. STRENGTH CHIPS STAGGER POP-IN
        --------------------------------------------------------- */
        gsap.utils.toArray('.strength-chip').forEach((chip, i) => {
            gsap.fromTo(chip,
                { opacity: 0, scale: 0.7, y: 10 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)',
                    delay: i * 0.05,
                    scrollTrigger: { trigger: chip, start: 'top 92%', once: true }
                }
            );
        });

        /* ---------------------------------------------------------
           3f. MARQUEE STRIP AUTO-SCROLL
        --------------------------------------------------------- */
        const marquee = document.getElementById('marquee-track');
        if (marquee && !prefersReduced) {
            gsap.to(marquee, {
                xPercent: -50,
                ease: 'none',
                duration: 18,
                repeat: -1,
            });
        }

        /* ---------------------------------------------------------
           4. PROJECT CARD PARALLAX / SCALE ON SCROLL
        --------------------------------------------------------- */
        gsap.utils.toArray('.project-card').forEach((card) => {
            gsap.fromTo(card,
                { scale: 0.92, opacity: 0.6 },
                {
                    scale: 1, opacity: 1, ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: window.horizontalTween,
                        start: 'left 90%',
                        end: 'left 40%',
                        scrub: true,
                    }
                }
            );
        });

        /* ---------------------------------------------------------
           4b. 3D TILT ON CARDS (mouse-follow)
        --------------------------------------------------------- */
        if (!isTouch && !prefersReduced) {
            document.querySelectorAll('.tilt-card').forEach((card) => {
                const strength = 10;
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width - 0.5;
                    const py = (e.clientY - rect.top) / rect.height - 0.5;
                    gsap.to(card, {
                        rotateY: px * strength,
                        rotateX: -py * strength,
                        duration: 0.5,
                        ease: 'power2.out',
                        transformPerspective: 800,
                    });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
                });
            });
        }

        /* ---------------------------------------------------------
           5. HORIZONTAL SCROLL — FEATURED WORK
        --------------------------------------------------------- */
        const track = document.getElementById('horizontal-track');
        const section = document.getElementById('horizontal-section');

        if (track && section && !prefersReduced) {
            const setPin = () => {
                const scrollDistance = track.scrollWidth - section.clientWidth;
                if (scrollDistance <= 0) return;

                window.horizontalTween = gsap.to(track, {
                    x: -scrollDistance,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${scrollDistance}`,
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                });
            };
            setPin();
        }

        /* ---------------------------------------------------------
           6. SKILL BAR FILL ON SCROLL (with shimmer sweep)
        --------------------------------------------------------- */
        gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
            const target = bar.getAttribute('data-target');
            gsap.to(bar, {
                width: target + '%',
                duration: 1.4,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar, start: 'top 90%', once: true,
                    onEnter: () => bar.classList.add('shimmer'),
                }
            });
        });

        /* ---------------------------------------------------------
           7. MAGNETIC BUTTON EFFECT + RIPPLE ON CLICK
        --------------------------------------------------------- */
        if (!isTouch && !prefersReduced) {
            document.querySelectorAll('.magnetic').forEach((btn) => {
                const strength = 0.4;
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
                });
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
                });
            });
        }

        document.querySelectorAll('.magnetic').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height) * 1.6;
                ripple.className = 'ripple-el';
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                btn.appendChild(ripple);
                gsap.to(ripple, {
                    scale: 1.6,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove(),
                });
            });
        });

        /* ---------------------------------------------------------
           7b. TOAST SLIDE-IN (success alert)
        --------------------------------------------------------- */
        const toast = document.querySelector('[data-toast-in]');
        if (toast) {
            gsap.from(toast, { x: 60, opacity: 0, duration: 0.6, ease: 'power3.out' });
            gsap.to(toast, { opacity: 0, duration: 0.5, delay: 4, ease: 'power1.in' });
        }

        /* ---------------------------------------------------------
           8. MOBILE MENU TOGGLE (animated)
        --------------------------------------------------------- */
        const menuIcon = document.getElementById('menu-icon');
        const navbar = document.querySelector('.navbar');
        if (menuIcon && navbar) {
            menuIcon.addEventListener('click', () => {
                const opening = navbar.classList.contains('hidden');
                navbar.classList.toggle('hidden');
                navbar.classList.toggle('flex');
                navbar.classList.toggle('flex-col');
                navbar.classList.toggle('absolute');
                navbar.classList.toggle('top-full');
                navbar.classList.toggle('left-0');
                navbar.classList.toggle('right-0');
                navbar.classList.toggle('bg-ink');
                navbar.classList.toggle('p-6');
                navbar.classList.toggle('gap-5');

                if (opening) {
                    gsap.fromTo(navbar.children,
                        { opacity: 0, y: -10 },
                        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
                    );
                }
                gsap.fromTo(menuIcon, { rotate: 0 }, { rotate: 90, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 });
            });
        }

        ScrollTrigger.refresh();
    });
    </script>
</body>
</html>