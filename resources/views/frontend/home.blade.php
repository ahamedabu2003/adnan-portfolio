<!DOCTYPE html>
<html lang="en" data-barba="wrapper">
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

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

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
        html { scroll-behavior: auto; } /* Lenis takes over */
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }

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

        /* ReactBits-style animated gradient text */
        .gradient-animate {
            background: linear-gradient(270deg, #7C5CFC, #22D3EE, #A78BFA, #7C5CFC);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientShift 6s ease infinite;
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* film grain / noise overlay for depth */
        .grain {
            position: fixed; inset: 0; pointer-events: none; z-index: 40;
            opacity: 0.035; mix-blend-mode: overlay;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ---------- preloader (Barba.js intro) ---------- */
        #preloader {
            position: fixed; inset: 0; z-index: 200;
            background: #0B0B0B;
            display: flex; align-items: center; justify-content: center;
            flex-direction: column; gap: 20px;
        }
        .preloader-logo {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700; font-size: 2.5rem;
            letter-spacing: -0.02em;
        }
        .preloader-bar {
            width: 120px; height: 2px; background: rgba(255,255,255,0.1);
            border-radius: 4px; overflow: hidden;
        }
        .preloader-bar-fill {
            width: 0%; height: 100%; border-radius: 4px;
            background: linear-gradient(90deg, #7C5CFC, #22D3EE);
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

        /* ---------- ReactBits-style gradient mesh blobs ---------- */
        .mesh-gradient {
            position: absolute; width: 500px; height: 500px;
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            filter: blur(80px); opacity: 0.12; pointer-events: none;
            animation: morphBlob 12s ease-in-out infinite alternate;
        }
        @keyframes morphBlob {
            0%   { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); }
            33%  { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: rotate(60deg) scale(1.1); }
            66%  { border-radius: 50% 50% 30% 70% / 60% 40% 70% 30%; transform: rotate(120deg) scale(0.95); }
            100% { border-radius: 30% 70% 60% 40% / 50% 30% 50% 70%; transform: rotate(180deg) scale(1.05); }
        }

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

        /* word reveal for section headings */
        .word-reveal { overflow: hidden; display: inline-block; vertical-align: top; }
        .word-reveal .word {
            display: inline-block; will-change: transform;
            transform: translateY(110%);
        }

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

        /* skill cards */
        .skill-card {
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
        }
        .skill-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(135deg, rgba(124,92,252,0.3), rgba(34,211,238,0.1), transparent 60%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        .skill-card:hover::before { opacity: 1; }
        .skill-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(124,92,252,0.12), 0 4px 12px rgba(0,0,0,0.3);
        }
        .skill-card .skill-icon-glow {
            position: absolute;
            width: 80px; height: 80px;
            border-radius: 9999px;
            filter: blur(40px);
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
        }
        .skill-card:hover .skill-icon-glow { opacity: 0.3; }
        .skill-card .skill-icon {
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease;
        }
        .skill-card:hover .skill-icon {
            transform: scale(1.15) rotate(-3deg);
        }

        /* skill section orbit dots */
        @keyframes orbit-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .orbit-ring {
            animation: orbit-spin 20s linear infinite;
        }

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

        /* Typed.js cursor */
        .typed-cursor {
            color: #22D3EE;
            font-weight: 300;
            animation: blink-cursor 0.75s step-end infinite;
        }
        @keyframes blink-cursor {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        /* ---------- Swiper custom styles ---------- */
        .project-swiper {
            overflow: visible !important;
            padding-bottom: 60px !important;
        }
        .project-swiper .swiper-slide {
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
            opacity: 0.4;
            transform: scale(0.88);
            filter: blur(2px);
        }
        .project-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
        }
        .project-swiper .swiper-slide-prev,
        .project-swiper .swiper-slide-next {
            opacity: 0.7;
            transform: scale(0.94);
            filter: blur(0px);
        }
        .swiper-pagination-bullet {
            width: 28px !important; height: 3px !important;
            border-radius: 2px !important;
            background: rgba(255,255,255,0.2) !important;
            opacity: 1 !important;
            transition: all 0.4s ease !important;
        }
        .swiper-pagination-bullet-active {
            background: linear-gradient(90deg, #7C5CFC, #22D3EE) !important;
            width: 48px !important;
        }
        .swiper-button-prev, .swiper-button-next {
            color: #F5F5F7 !important;
            width: 48px !important; height: 48px !important;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 9999px;
            transition: all 0.3s ease;
            top: auto !important; bottom: -5px !important;
        }
        .swiper-button-prev { left: calc(50% - 70px) !important; }
        .swiper-button-next { right: calc(50% - 70px) !important; }
        .swiper-button-prev:hover, .swiper-button-next:hover {
            border-color: #7C5CFC;
            background: rgba(124,92,252,0.1);
        }
        .swiper-button-prev::after, .swiper-button-next::after {
            font-size: 16px !important;
            font-weight: bold;
        }

        /* ---------- section parallax layers ---------- */
        .parallax-section { position: relative; overflow: hidden; }
        .parallax-bg {
            position: absolute; inset: -50px; pointer-events: none;
            will-change: transform;
        }

        /* ---------- floating particles (ReactBits aurora) ---------- */
        .floating-particle {
            position: absolute; border-radius: 9999px; pointer-events: none;
            will-change: transform, opacity;
        }

        /* ---------- contact input focus line ---------- */
        .input-line {
            position: relative;
        }
        .input-line::after {
            content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 1px;
            background: linear-gradient(90deg, #7C5CFC, #22D3EE);
            transition: width 0.5s ease, left 0.5s ease;
        }
        .input-line:focus-within::after {
            width: 100%; left: 0;
        }

        /* ---------- footer wave ---------- */
        .footer-glow {
            position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
            width: 600px; height: 160px;
            background: radial-gradient(ellipse, rgba(124,92,252,0.08), transparent 70%);
            pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
        }
    </style>
</head>
<body class="font-mono antialiased selection:bg-signal" data-barba="container" data-barba-namespace="home">

    <!-- ============ PRELOADER (Barba.js intro) ============ -->
    <div id="preloader">
        <div class="preloader-logo">
            AA<span class="gradient-animate">.</span>dev
        </div>
        <div class="preloader-bar">
            <div class="preloader-bar-fill" id="preloader-fill"></div>
        </div>
        <p class="text-xs text-dim tracking-[0.3em] uppercase mt-2">initializing<span id="preloader-dots">...</span></p>
    </div>

    <div id="scroll-progress"></div>
    <div class="grain"></div>
    <div id="cursor-ring"></div>
    <div id="cursor-dot"></div>

    <!-- ReactBits-style floating particles -->
    <div id="particles-container" class="fixed inset-0 pointer-events-none z-[1]"></div>

    {{-- Success Alert --}}
    @if(session('success'))
        <div class="fixed top-6 right-6 z-[70] bg-surface border border-signal/40 text-paper px-5 py-3 rounded-md text-sm tracking-wide shadow-lg shadow-signal/10" data-toast-in>
            {{ session('success') }}
        </div>
    @endif

    <!-- ============ HEADER ============ -->
    <header class="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-white/5" id="main-header">
        <div class="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
            <a href="" class="font-display font-bold text-lg tracking-tight magnetic-link">
                AA<span class="gradient-animate">.</span>dev
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

        <!-- ReactBits-style gradient mesh blobs -->
        <div class="mesh-gradient" style="background: linear-gradient(135deg, #7C5CFC, #22D3EE); top: -20%; right: -10%;"></div>
        <div class="mesh-gradient" style="background: linear-gradient(225deg, #A78BFA, #7C5CFC); bottom: -15%; left: -5%; animation-delay: -4s;"></div>

        <div class="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-dim mb-8 opacity-0" data-hero-fade>
            <span class="w-2 h-2 rounded-full bg-signal2 animate-pulse"></span>
            <span class="status-chip">status: 200 — available for hire</span>
        </div>

        <h1 class="relative z-10 font-display font-bold text-[13vw] md:text-[7.2vw] leading-[0.95] tracking-tight" id="hero-heading">
            <div class="char-wrap"><span class="char glitch-text" id="hero-name" data-hero-line data-scramble>{{ $admin?->name }}</span></div>
        </h1>

        <div class="relative z-10 mt-8 max-w-2xl opacity-0" data-hero-fade>
            <h3 class="font-display text-2xl md:text-3xl font-medium">
                <span class="gradient-animate" id="typed-output"></span>
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
    <section class="about parallax-section relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="about">
        <!-- Parallax bg layer -->
        <div class="parallax-bg" data-parallax-speed="0.15">
            <div class="mesh-gradient" style="background: linear-gradient(135deg, #22D3EE, #7C5CFC); top: 20%; left: -10%; width: 300px; height: 300px;"></div>
        </div>

        <h2 class="font-display font-bold text-4xl md:text-6xl mb-14 section-heading" data-split-heading>
            About <span class="signal-text">Me</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div class="reveal-up img-reveal-wrap md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative bg-surface min-h-[320px] md:min-h-[420px]">
                <img src="{{ asset('storage/ADNAN.jpg') }}" alt="Ahamed Aboo Adnan" class="w-full h-full object-cover" data-parallax-img>
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
    <section class="experience parallax-section relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="experience">
        <div class="parallax-bg" data-parallax-speed="0.1">
            <div class="mesh-gradient" style="background: linear-gradient(315deg, #7C5CFC, #A78BFA); top: 10%; right: -15%; width: 350px; height: 350px; animation-delay: -6s;"></div>
        </div>

        <h2 class="font-display font-bold text-4xl md:text-6xl mb-16 section-heading" data-split-heading>
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

    <!-- ============ PROJECTS — Swiper.js Carousel ============ -->
    <section class="project parallax-section relative py-28" id="project">
        <div class="parallax-bg" data-parallax-speed="0.08">
            <div class="mesh-gradient" style="background: linear-gradient(135deg, #22D3EE, #7C5CFC); bottom: 0; left: 20%; width: 400px; height: 400px; animation-delay: -8s;"></div>
        </div>

        <div class="px-6 md:px-10 max-w-7xl mx-auto mb-14">
            <h2 class="font-display font-bold text-4xl md:text-6xl section-heading" data-split-heading>
                Featured <span class="signal-text">Work</span>
            </h2>
            <p class="reveal-up text-xs uppercase tracking-[0.2em] text-dim mt-4">Swipe or drag to explore the payloads →</p>
        </div>

        <div class="max-w-7xl mx-auto px-6 md:px-10">
            <div class="swiper project-swiper">
                <div class="swiper-wrapper">
                    @forelse($projects as $proj)
                        <div class="swiper-slide">
                            <div class="project-card tilt-card rounded-2xl bg-surface border border-white/5 p-8 flex flex-col justify-between min-h-[420px]">
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
                        </div>
                    @empty
                        <div class="swiper-slide">
                            <div class="project-card rounded-2xl bg-surface border border-white/5 p-8 min-h-[420px] flex items-center justify-center">
                                <p class="text-sm text-dim">No projects listed yet.</p>
                            </div>
                        </div>
                    @endforelse
                </div>

                <!-- Navigation & Pagination -->
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
    </section>

    <!-- ============ SKILLS ============ -->
    <section class="skills parallax-section relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="skills">

        <div class="parallax-bg" data-parallax-speed="0.12">
            <div class="mesh-gradient" style="background: linear-gradient(45deg, #A78BFA, #22D3EE); top: 30%; right: 5%; width: 280px; height: 280px; animation-delay: -3s;"></div>
        </div>

        {{-- Decorative orbit ring --}}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.04] hidden md:block">
            <div class="orbit-ring w-full h-full rounded-full border border-white/30" style="border-style: dashed;"></div>
        </div>

        <div class="relative z-10">
            <h2 class="font-display font-bold text-4xl md:text-6xl mb-4 section-heading" data-split-heading>
                My<span class=""> Skills</span>
            </h2>
            <p class="reveal-up text-sm text-dim tracking-wide mb-14 max-w-lg">
                Technologies and tools I use to bring ideas to life.
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                @forelse($skills as $skill)
                    <div class="skill-card reveal-up rounded-2xl bg-surface/80 backdrop-blur-sm p-5 md:p-6 flex flex-col items-center text-center gap-3 group">
                        {{-- Glow behind icon --}}
                        <div class="skill-icon-glow bg-signal top-2 left-1/2 -translate-x-1/2"></div>

                        {{-- Icon --}}
                        <div class="skill-icon w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xl text-signal2">
                            @php
                                $iconMap = [
                                    'laravel' => 'bxl-php',
                                    'php' => 'bxl-php',
                                    'javascript' => 'bxl-javascript',
                                    'js' => 'bxl-javascript',
                                    'html' => 'bxl-html5',
                                    'css' => 'bxl-css3',
                                    'python' => 'bxl-python',
                                    'react' => 'bxl-react',
                                    'vue' => 'bxl-vuejs',
                                    'node' => 'bxl-nodejs',
                                    'nodejs' => 'bxl-nodejs',
                                    'git' => 'bxl-git',
                                    'github' => 'bxl-github',
                                    'docker' => 'bxl-docker',
                                    'typescript' => 'bxl-typescript',
                                    'tailwind' => 'bxl-tailwind-css',
                                    'bootstrap' => 'bxl-bootstrap',
                                    'mysql' => 'bx-data',
                                    'database' => 'bx-data',
                                    'sql' => 'bx-data',
                                    'mongodb' => 'bxl-mongodb',
                                    'aws' => 'bxl-aws',
                                    'figma' => 'bxl-figma',
                                    'wordpress' => 'bxl-wordpress',
                                    'angular' => 'bxl-angular',
                                    'java' => 'bxl-java',
                                    'flutter' => 'bxl-flutter',
                                    'django' => 'bxl-django',
                                    'firebase' => 'bxl-firebase',
                                    'redux' => 'bxl-redux',
                                    'sass' => 'bxl-sass',
                                    'linux' => 'bxl-tux',
                                    'api' => 'bx-transfer-alt',
                                    'rest' => 'bx-transfer-alt',
                                ];
                                $lower = strtolower($skill->name);
                                $icon = 'bx-code-alt'; // default
                                foreach ($iconMap as $key => $val) {
                                    if (str_contains($lower, $key)) {
                                        $icon = $val;
                                        break;
                                    }
                                }
                            @endphp
                            <i class='bx {{ $icon }}'></i>
                        </div>

                        {{-- Skill name --}}
                        <span class="text-sm font-medium text-paper/90 tracking-wide leading-tight">{{ $skill->name }}</span>
                    </div>
                @empty
                    <div class="col-span-full text-center py-12">
                        <p class="text-sm text-dim">No skills listed yet.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    <!-- ============ CONTACT ============ -->
    <section class="contact parallax-section relative px-6 md:px-10 py-28 max-w-4xl mx-auto" id="contact">
        <div class="parallax-bg" data-parallax-speed="0.1">
            <div class="mesh-gradient" style="background: linear-gradient(180deg, #7C5CFC, #22D3EE); top: -10%; left: 30%; width: 300px; height: 300px; animation-delay: -5s;"></div>
        </div>

        <h2 class="font-display font-bold text-4xl md:text-6xl mb-14 section-heading" data-split-heading>
            Contact<span class="signal-text"> Me!</span>
        </h2>

        <form action="{{ route('contact.store') }}" method="POST" class="reveal-up space-y-8">
            @csrf
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="input-line input-field border-b border-white/15 transition-colors pb-2">
                    <input type="text" name="name" placeholder="Full Name" required value="{{ old('name') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('name') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>

                <div class="input-line input-field border-b border-white/15 transition-colors pb-2">
                    <input type="email" name="email" placeholder="Email Address" required value="{{ old('email') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('email') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="input-line input-field border-b border-white/15 transition-colors pb-2">
                    <input type="text" name="mobile" placeholder="Mobile Number" required value="{{ old('mobile') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('mobile') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>

                <div class="input-line input-field border-b border-white/15 transition-colors pb-2">
                    <input type="text" name="subject" placeholder="Email Subject" required value="{{ old('subject') }}"
                        class="w-full text-sm placeholder:text-dim text-paper">
                    @error('subject') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="input-line textarea-field border-b border-white/15 transition-colors pb-2">
                <textarea name="message" rows="5" placeholder="Your Message" required
                    class="w-full text-sm placeholder:text-dim text-paper resize-none">{{ old('message') }}</textarea>
                @error('message') <span class="block text-red-400 text-xs mt-2">{{ $message }}</span> @enderror
            </div>

            <button type="submit" class="magnetic ripple inline-flex items-center gap-2 bg-paper text-ink font-medium px-8 py-4 rounded-full text-sm">
                Submit <i class='bx bx-send'></i>
            </button>
        </form>
    </section>

    <footer class="relative px-6 md:px-10 py-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 text-xs text-dim tracking-wide">
        <div class="footer-glow"></div>
        <span>© {{ date('Y') }} Ahamed Aboo Adnan — built with Laravel &amp; care.</span>
        <span>status: 200 OK</span>
    </footer>

    <!-- ============ SCRIPTS ============ -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.16/lib/typed.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@barba/core@2.9.7/dist/barba.umd.js"></script>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouch = window.matchMedia('(pointer: coarse)').matches;

        /* ---------------------------------------------------------
           0. PRELOADER — Barba.js style intro animation
        --------------------------------------------------------- */
        const preloader = document.getElementById('preloader');
        const preloaderFill = document.getElementById('preloader-fill');
        const preloaderDots = document.getElementById('preloader-dots');

        if (preloader) {
            // Animated dots
            let dotCount = 0;
            const dotInterval = setInterval(() => {
                dotCount = (dotCount + 1) % 4;
                preloaderDots.textContent = '.'.repeat(dotCount || 1);
            }, 300);

            // Fill bar animation
            gsap.to(preloaderFill, {
                width: '100%',
                duration: 1.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    clearInterval(dotInterval);

                    // Exit animation
                    const tl = gsap.timeline();
                    tl.to(preloader.children, {
                        y: -30, opacity: 0,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: 'power2.in'
                    })
                    .to(preloader, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: 'power4.inOut',
                        onComplete: () => {
                            preloader.style.display = 'none';
                            // Trigger page entrance animations
                            initPageAnimations();
                        }
                    }, '-=0.2');
                }
            });
        } else {
            initPageAnimations();
        }

        /* ---------------------------------------------------------
           0b. BARBA.JS — Page transitions
        --------------------------------------------------------- */
        if (typeof barba !== 'undefined') {
            barba.init({
                transitions: [{
                    name: 'fade-transition',
                    leave(data) {
                        return gsap.to(data.current.container, {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            ease: 'power2.in'
                        });
                    },
                    enter(data) {
                        return gsap.from(data.next.container, {
                            opacity: 0,
                            y: 20,
                            duration: 0.5,
                            ease: 'power2.out'
                        });
                    }
                }]
            });
        }

        /* ---------------------------------------------------------
           0c. LENIS — Butter-smooth scrolling
        --------------------------------------------------------- */
        let lenis;
        if (!prefersReduced) {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            // Connect Lenis to GSAP ScrollTrigger
            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        function initPageAnimations() {

        /* ---------------------------------------------------------
           0d. SCROLL PROGRESS BAR
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
           0e. HEADER HIDE/SHOW ON SCROLL
        --------------------------------------------------------- */
        const header = document.getElementById('main-header');
        if (header) {
            let lastScroll = 0;
            const headerHeight = header.offsetHeight;

            ScrollTrigger.create({
                start: 'top -80',
                end: 'max',
                onUpdate: (self) => {
                    const currentScroll = self.scroll();
                    if (currentScroll > lastScroll && currentScroll > headerHeight) {
                        gsap.to(header, { yPercent: -100, duration: 0.3, ease: 'power2.out' });
                    } else {
                        gsap.to(header, { yPercent: 0, duration: 0.3, ease: 'power2.out' });
                    }
                    lastScroll = currentScroll;
                }
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
           1b. REACTBITS-STYLE FLOATING PARTICLES
        --------------------------------------------------------- */
        if (!prefersReduced) {
            const particlesContainer = document.getElementById('particles-container');
            if (particlesContainer) {
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'floating-particle';
                    const size = gsap.utils.random(2, 6);
                    const isSignal = Math.random() > 0.5;
                    particle.style.cssText = `
                        width: ${size}px; height: ${size}px;
                        background: ${isSignal ? '#7C5CFC' : '#22D3EE'};
                        opacity: ${gsap.utils.random(0.1, 0.4)};
                        left: ${gsap.utils.random(0, 100)}%;
                        top: ${gsap.utils.random(0, 100)}%;
                    `;
                    particlesContainer.appendChild(particle);

                    gsap.to(particle, {
                        y: gsap.utils.random(-100, 100),
                        x: gsap.utils.random(-80, 80),
                        opacity: gsap.utils.random(0.05, 0.3),
                        duration: gsap.utils.random(8, 16),
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                        delay: gsap.utils.random(0, 5),
                    });
                }
            }
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
           2b. TYPED.JS — Hero title typing effect
        --------------------------------------------------------- */
        const typedOutput = document.getElementById('typed-output');
        if (typedOutput && typeof Typed !== 'undefined') {
            new Typed('#typed-output', {
                strings: [
                    '{{ $about?->title ?? "Backend Developer" }}',
                    'Laravel Specialist',
                    'API Architect',
                    'Full Stack Developer',
                    'Problem Solver',
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                startDelay: 1500,
                loop: true,
                smartBackspace: true,
                cursorChar: '|',
            });
        }

        /* ---------------------------------------------------------
           2c. HERO SCRAMBLE-TEXT ON HOVER
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
           2d. AMBIENT FLOATING ORBS
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
           3b. SECTION HEADING WORD-REVEAL (GSAP SplitText effect)
        --------------------------------------------------------- */
        document.querySelectorAll('[data-split-heading]').forEach((heading) => {
            const html = heading.innerHTML;
            // Split into HTML tags and text segments
            const parts = html.split(/(<[^>]+>)/g);
            const wrapped = parts.map(part => {
                // If it's an HTML tag, leave it untouched
                if (part.startsWith('<')) return part;
                // Otherwise wrap each word in the text
                return part.replace(/(\S+)/g, '<span class="word-reveal"><span class="word">$1</span></span>');
            }).join('');
            heading.innerHTML = wrapped;

            gsap.to(heading.querySelectorAll('.word'), {
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.06,
                scrollTrigger: { trigger: heading, start: 'top 85%', once: true }
            });
        });

        /* ---------------------------------------------------------
           3c. ABOUT IMAGE CURTAIN REVEAL
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
           3d. ABOUT IMAGE PARALLAX (ReactBits depth effect)
        --------------------------------------------------------- */
        document.querySelectorAll('[data-parallax-img]').forEach((img) => {
            gsap.to(img, {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: img.closest('.img-reveal-wrap'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
        });

        /* ---------------------------------------------------------
           3e. NUMBER COUNT-UP
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
           3f. TIMELINE VERTICAL FILL + DOT PULSE
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
           3g. MARQUEE STRIP AUTO-SCROLL
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
           3h. PARALLAX BACKGROUND LAYERS (ReactBits depth)
        --------------------------------------------------------- */
        if (!prefersReduced) {
            document.querySelectorAll('[data-parallax-speed]').forEach((layer) => {
                const speed = parseFloat(layer.getAttribute('data-parallax-speed'));
                gsap.to(layer, {
                    yPercent: speed * 100,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: layer.closest('.parallax-section'),
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                });
            });
        }

        /* ---------------------------------------------------------
           4. SWIPER.JS — Project Carousel
        --------------------------------------------------------- */
        if (typeof Swiper !== 'undefined') {
            const projectSwiper = new Swiper('.project-swiper', {
                effect: 'slide',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 1.15,
                spaceBetween: 24,
                speed: 700,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: { slidesPerView: 1.6, spaceBetween: 28 },
                    768: { slidesPerView: 2.2, spaceBetween: 32 },
                    1024: { slidesPerView: 2.8, spaceBetween: 36 },
                },
                on: {
                    slideChange: function() {
                        // GSAP entrance animation on active slide
                        const activeSlide = this.slides[this.activeIndex];
                        if (activeSlide) {
                            gsap.fromTo(activeSlide.querySelector('.project-card'),
                                { y: 20, opacity: 0.8 },
                                { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
                            );
                        }
                    }
                }
            });
        }

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
           5. SKILL CARDS — STAGGER REVEAL ON SCROLL
        --------------------------------------------------------- */
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.4)',
                    delay: i * 0.04,
                    scrollTrigger: { trigger: card, start: 'top 92%', once: true }
                }
            );
        });

        /* ---------------------------------------------------------
           6. MAGNETIC BUTTON EFFECT + RIPPLE ON CLICK
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
           6b. CONTACT FORM INPUT FOCUS ANIMATIONS (GSAP)
        --------------------------------------------------------- */
        document.querySelectorAll('.input-field input, .textarea-field textarea').forEach((input) => {
            input.addEventListener('focus', () => {
                gsap.to(input.closest('.input-line'), {
                    scale: 1.01,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
            input.addEventListener('blur', () => {
                gsap.to(input.closest('.input-line'), {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });

        /* ---------------------------------------------------------
           7. TOAST SLIDE-IN (success alert)
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

        /* ---------------------------------------------------------
           9. GSAP SECTION ENTRANCE ANIMATIONS (staggered)
        --------------------------------------------------------- */
        // About section bento cards stagger
        const aboutCards = document.querySelectorAll('.about .tilt-card');
        aboutCards.forEach((card, i) => {
            gsap.fromTo(card,
                { y: 60, opacity: 0, rotateX: 5 },
                {
                    y: 0, opacity: 1, rotateX: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: i * 0.1,
                    scrollTrigger: { trigger: card, start: 'top 90%', once: true }
                }
            );
        });

        // Experience items slide in from left
        document.querySelectorAll('.timeline-item').forEach((item, i) => {
            gsap.fromTo(item,
                { x: -40, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: i * 0.08,
                    scrollTrigger: { trigger: item, start: 'top 88%', once: true }
                }
            );
        });

        // Footer reveal
        const footer = document.querySelector('footer');
        if (footer) {
            gsap.fromTo(footer,
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
                    scrollTrigger: { trigger: footer, start: 'top 95%', once: true }
                }
            );
        }

        ScrollTrigger.refresh();

        } // end initPageAnimations
    });
    </script>
</body>
</html>