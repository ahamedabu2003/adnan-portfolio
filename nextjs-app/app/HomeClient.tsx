'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';

interface About { _id: string; name?: string; title: string; description: string; image?: string; }
interface Experience { _id: string; company: string; designation: string; duration: string; description: string; }
interface Project { _id: string; title: string; description: string; technology: string; image?: string; github_link?: string; live_link?: string; }
interface Skill { _id: string; name: string; percentage: number; }
interface Cv { _id: string; file_path: string; original_name: string; }

interface Props {
  about: About | null;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  cv: Cv | null;
}

const iconMap: Record<string, string> = {
  laravel: 'bxl-php', php: 'bxl-php', javascript: 'bxl-javascript', js: 'bxl-javascript',
  html: 'bxl-html5', css: 'bxl-css3', python: 'bxl-python', react: 'bxl-react',
  vue: 'bxl-vuejs', node: 'bxl-nodejs', nodejs: 'bxl-nodejs', git: 'bxl-git',
  github: 'bxl-github', docker: 'bxl-docker', typescript: 'bxl-typescript',
  tailwind: 'bxl-tailwind-css', bootstrap: 'bxl-bootstrap', mysql: 'bx-data',
  database: 'bx-data', sql: 'bx-data', mongodb: 'bxl-mongodb', aws: 'bxl-aws',
  figma: 'bxl-figma', wordpress: 'bxl-wordpress', angular: 'bxl-angular',
  java: 'bxl-java', flutter: 'bxl-flutter', django: 'bxl-django',
  firebase: 'bxl-firebase', redux: 'bxl-redux', sass: 'bxl-sass', linux: 'bxl-tux',
  api: 'bx-transfer-alt', rest: 'bx-transfer-alt', nextjs: 'bx-code-alt', next: 'bx-code-alt',
};

function getIcon(name: string) {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(iconMap)) {
    if (lower.includes(key)) return val;
  }
  return 'bx-code-alt';
}

export default function HomeClient({ about, experiences, projects, skills, cv }: Props) {
  const [toast, setToast] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState('');
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setToast('Your message has been sent successfully!');
        setFormData({ name: '', email: '', mobile: '', message: '' });
        setTimeout(() => setToast(''), 5000);
      } else {
        setFormMsg(data.error || 'Failed to send message');
      }
    } catch {
      setFormMsg('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const allScriptsReady = () => {
    setScriptsLoaded(true);
  };

  useEffect(() => {
    if (!scriptsLoaded) return;

    const w = window as any;
    const gsap = w.gsap;
    const ScrollTrigger = w.ScrollTrigger;

    // ── Preloader ──────────────────────────────────────────────────────────
    const fill = document.getElementById('preloader-fill') as HTMLElement | null;
    const preloader = document.getElementById('preloader') as HTMLElement | null;
    // Always set a hard timeout fallback so preloader never gets stuck
    const preloaderFallback = setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => { if (preloader) preloader.style.display = 'none'; }, 500);
      }
    }, 2500);
    if (fill && preloader && gsap) {
      gsap.to(fill, {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          clearTimeout(preloaderFallback);
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            onComplete: () => { preloader.style.display = 'none'; },
          });
        },
      });
    } else if (preloader) {
      // Fallback without GSAP
      clearTimeout(preloaderFallback);
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
      }, 1200);
    }

    if (!gsap) return;

    // ── Register ScrollTrigger ─────────────────────────────────────────────
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // ── Scroll progress bar ────────────────────────────────────────────────
    const progressBar = document.getElementById('scroll-progress') as HTMLElement | null;
    if (progressBar && ScrollTrigger) {
      ScrollTrigger.create({
        onUpdate: (self: any) => { progressBar.style.width = `${self.progress * 100}%`; },
        start: 'top top',
        end: 'max',
      });
    }

    // ── Sticky nav shadow ──────────────────────────────────────────────────
    const header = document.getElementById('main-header');
    const onScroll = () => {
      if (header) header.classList.toggle('shadow-lg', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Custom cursor ──────────────────────────────────────────────────────
    const dot = document.getElementById('cursor-dot') as HTMLElement | null;
    const ring = document.getElementById('cursor-ring') as HTMLElement | null;
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    const moveCursor = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', moveCursor);
    const animateCursor = () => {
      if (dot) { dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`; }
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) { ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`; }
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // ── Particles ─────────────────────────────────────────────────────────
    const container = document.getElementById('particles-container');
    if (container) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'floating-particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `width:${size}px;height:${size}px;background:${Math.random() > 0.5 ? '#7C5CFC' : '#22D3EE'};left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${Math.random()*0.4+0.1};`;
        container.appendChild(p);
        gsap.to(p, { y: `${(Math.random()-0.5)*200}`, x: `${(Math.random()-0.5)*100}`, duration: Math.random()*10+8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random()*5 });
      }
    }

    // ── Orbs mouse parallax ────────────────────────────────────────────────
    const orbs = document.querySelectorAll('[data-orb]');
    const moveOrbs = (e: MouseEvent) => {
      const xFrac = (e.clientX / window.innerWidth - 0.5);
      const yFrac = (e.clientY / window.innerHeight - 0.5);
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 18;
        gsap.to(orb, { x: xFrac * depth, y: yFrac * depth, duration: 1.2, ease: 'power1.out' });
      });
    };
    window.addEventListener('mousemove', moveOrbs);

    // ── Hero animations ────────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 1.6 });
    const heroLine = document.querySelector('[data-hero-line]');
    if (heroLine) tl.from(heroLine, { y: '110%', duration: 1.1, ease: 'expo.out' });
    document.querySelectorAll('[data-hero-fade]').forEach((el, i) => {
      tl.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, `-=${i === 0 ? 0.6 : 0.7}`);
    });

    // ── Scroll line animation ──────────────────────────────────────────────
    const scrollLine = document.getElementById('scroll-line');
    if (scrollLine && ScrollTrigger) {
      gsap.from(scrollLine, { scaleY: 0, duration: 1.5, ease: 'power2.inOut', delay: 2.5 });
    }

    // ── Reveal-up on scroll ────────────────────────────────────────────────
    if (ScrollTrigger) {
      gsap.utils.toArray('.reveal-up').forEach((el: any) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Image reveal cover
      gsap.utils.toArray('.img-reveal-cover').forEach((el: any) => {
        gsap.to(el, {
          scaleY: 0, duration: 1.2, ease: 'expo.inOut',
          scrollTrigger: { trigger: el.parentElement, start: 'top 85%', once: true },
        });
      });

      // Section headings
      document.querySelectorAll('[data-split-heading]').forEach(el => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Counters
      document.querySelectorAll('[data-counter]').forEach(el => {
        const target = parseInt((el as HTMLElement).dataset.target || '0', 10);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => { gsap.to({ val: 0 }, { val: target, duration: 1.8, ease: 'power2.out', onUpdate: function() { el.textContent = Math.round(this.targets()[0].val).toString(); } }); },
        });
      });

      // Timeline fill
      const timelineFill = document.getElementById('timeline-fill');
      if (timelineFill) {
        gsap.to(timelineFill, {
          height: '100%', ease: 'none',
          scrollTrigger: { trigger: timelineFill, start: 'top 80%', end: 'bottom 20%', scrub: true },
        });
      }

      // Parallax sections
      document.querySelectorAll<HTMLElement>('[data-parallax-speed]').forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed || '0.1');
        gsap.to(el, {
          y: () => -(el.parentElement!.offsetHeight * speed * 0.5),
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }

    // ── Typed.js ───────────────────────────────────────────────────────────
    const Typed = w.Typed;
    if (Typed) {
      new Typed('#typed-output', {
        strings: ['Backend Developer', 'Laravel Specialist', 'API Architect', 'Full-Stack Engineer'],
        typeSpeed: 60, backSpeed: 35, backDelay: 1800, loop: true, showCursor: true, cursorChar: '|',
      });
    }

    // ── Lenis smooth scroll ────────────────────────────────────────────────
    const Lenis = w.Lenis;
    if (Lenis) {
      const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      const rafLenis = (time: number) => { lenis.raf(time); requestAnimationFrame(rafLenis); };
      requestAnimationFrame(rafLenis);
      if (ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
    }

    // ── Swiper ────────────────────────────────────────────────────────────
    const Swiper = w.Swiper;
    if (Swiper) {
      new Swiper('.project-swiper', {
        slidesPerView: 1.1, centeredSlides: true, spaceBetween: 24,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        grabCursor: true,
        breakpoints: { 768: { slidesPerView: 1.5 }, 1024: { slidesPerView: 2.2 } },
      });
    }

    // ── Marquee ────────────────────────────────────────────────────────────
    const track = document.getElementById('marquee-track');
    if (track && gsap) {
      const width = track.scrollWidth / 2;
      gsap.to(track, { x: -width, duration: 28, ease: 'none', repeat: -1, modifiers: { x: (x: string) => `${parseFloat(x) % width}px` } });
    }

    // ── Tilt cards ────────────────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
        gsap.to(card, { rotateY: x, rotateX: y, duration: 0.4, ease: 'power1.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
      });
    });

    // ── Magnetic buttons ──────────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
        gsap.to(btn, { x, y, duration: 0.4, ease: 'power1.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
      });
    });

    // ── Ripple effect ─────────────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('.ripple').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple-el';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
        btn.appendChild(ripple);
        gsap.to(ripple, { scale: 1, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => ripple.remove() });
      });
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', moveOrbs);
      if (ScrollTrigger) ScrollTrigger.killAll();
    };
  }, [scriptsLoaded]);

  return (
    <>
      {/* ===== EXTERNAL SCRIPTS ===== */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script id="tailwind-config" strategy="beforeInteractive">{`
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                ink: '#0B0B0B', surface: '#141416', surface2: '#1B1B1E',
                paper: '#F5F5F7', dim: '#8A8A93', signal: '#7C5CFC', signal2: '#22D3EE',
              },
              fontFamily: { display: ['"Space Grotesk"', 'sans-serif'], mono: ['"JetBrains Mono"', 'monospace'] },
            }
          }
        }
      `}</Script>
      <Script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.16/lib/typed.umd.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="afterInteractive" onLoad={allScriptsReady} />

      {/* ===== STYLES ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
        html { scroll-behavior: auto; }
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-stopped { overflow: hidden; }
        body { background-color: #0B0B0B; color: #F5F5F7; cursor: none; overflow-x: hidden; }
        @media (max-width: 768px) { body { cursor: auto; } #cursor-dot, #cursor-ring, .cursor-particle { display: none; } }
        ::selection { background: #7C5CFC; color: #0B0B0B; }
        .signal-text { background: linear-gradient(100deg, #7C5CFC 0%, #22D3EE 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .gradient-animate { background: linear-gradient(270deg, #7C5CFC, #22D3EE, #A78BFA, #7C5CFC); background-size: 300% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientShift 6s ease infinite; }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .grain { position: fixed; inset: 0; pointer-events: none; z-index: 40; opacity: 0.035; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        #preloader { position: fixed; inset: 0; z-index: 200; background: #0B0B0B; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; }
        .preloader-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 2.5rem; letter-spacing: -0.02em; }
        .preloader-bar { width: 120px; height: 2px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
        .preloader-bar-fill { width: 0%; height: 100%; border-radius: 4px; background: linear-gradient(90deg, #7C5CFC, #22D3EE); }
        #scroll-progress { position: fixed; top: 0; left: 0; height: 3px; width: 0%; background: linear-gradient(90deg, #7C5CFC, #22D3EE); z-index: 80; will-change: width; box-shadow: 0 0 12px rgba(124,92,252,0.6); }
        .orb-field { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
        .orb { position: absolute; border-radius: 9999px; filter: blur(70px); will-change: transform; opacity: 0.35; }
        .orb-1 { width: 420px; height: 420px; background: radial-gradient(circle, #7C5CFC, transparent 70%); top: -10%; left: 5%; }
        .orb-2 { width: 360px; height: 360px; background: radial-gradient(circle, #22D3EE, transparent 70%); bottom: -15%; right: 0%; }
        .orb-3 { width: 260px; height: 260px; background: radial-gradient(circle, #7C5CFC, transparent 70%); top: 30%; right: 25%; opacity: 0.2; }
        .mesh-gradient { position: absolute; width: 500px; height: 500px; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; filter: blur(80px); opacity: 0.12; pointer-events: none; animation: morphBlob 12s ease-in-out infinite alternate; }
        @keyframes morphBlob { 0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); } 33% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: rotate(60deg) scale(1.1); } 66% { border-radius: 50% 50% 30% 70% / 60% 40% 70% 30%; transform: rotate(120deg) scale(0.95); } 100% { border-radius: 30% 70% 60% 40% / 50% 30% 50% 70%; transform: rotate(180deg) scale(1.05); } }
        #cursor-dot, #cursor-ring { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 999; border-radius: 9999px; transform: translate(-50%, -50%); will-change: transform; }
        #cursor-dot { width: 6px; height: 6px; background: #F5F5F7; }
        #cursor-ring { width: 34px; height: 34px; border: 1px solid rgba(245,245,247,0.5); transition: width .25s ease, height .25s ease, border-color .25s ease; }
        .cursor-hover #cursor-ring { width: 64px; height: 64px; border-color: #7C5CFC; background: rgba(124,92,252,0.08); }
        .cursor-particle { position: fixed; top: 0; left: 0; width: 4px; height: 4px; border-radius: 9999px; background: #22D3EE; pointer-events: none; z-index: 998; opacity: 0.8; }
        .char-wrap { overflow: hidden; display: inline-block; }
        .char { display: inline-block; will-change: transform; }
        .word-reveal { overflow: hidden; display: inline-block; vertical-align: top; }
        .word-reveal .word { display: inline-block; will-change: transform; transform: translateY(110%); }
        .glitch-text { position: relative; display: inline-block; }
        .magnetic { position: relative; will-change: transform; overflow: hidden; }
        .ripple-el { position: absolute; border-radius: 9999px; background: rgba(11,11,11,0.35); transform: scale(0); pointer-events: none; }
        .border .ripple-el { background: rgba(124,92,252,0.35); }
        .skill-card { position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease; }
        .skill-card::before { content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, rgba(124,92,252,0.3), rgba(34,211,238,0.1), transparent 60%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.4s ease; }
        .skill-card:hover::before { opacity: 1; }
        .skill-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(124,92,252,0.12), 0 4px 12px rgba(0,0,0,0.3); }
        .skill-icon { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .skill-card:hover .skill-icon { transform: scale(1.15) rotate(-3deg); }
        @keyframes orbit-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .orbit-ring { animation: orbit-spin 20s linear infinite; }
        .status-chip { font-variant-numeric: tabular-nums; }
        input, textarea { background: transparent; }
        input:focus, textarea:focus { outline: none; }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0%; height: 1px; background: linear-gradient(90deg, #7C5CFC, #22D3EE); transition: width .3s ease; }
        .nav-link:hover::after { width: 100%; }
        .img-reveal-wrap { position: relative; overflow: hidden; }
        .img-reveal-cover { position: absolute; inset: 0; background: #0B0B0B; z-index: 2; transform-origin: bottom; }
        .tilt-card { transform-style: preserve-3d; will-change: transform; }
        .tilt-card .tilt-inner { transform: translateZ(20px); }
        .marquee-track { display: flex; width: max-content; will-change: transform; }
        .marquee-track span { white-space: nowrap; }
        .typed-cursor { color: #22D3EE; font-weight: 300; animation: blink-cursor 0.75s step-end infinite; }
        @keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .project-swiper { overflow: visible !important; padding-bottom: 60px !important; }
        .project-swiper .swiper-slide { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease; opacity: 0.4; transform: scale(0.88); filter: blur(2px); }
        .project-swiper .swiper-slide-active { opacity: 1; transform: scale(1); filter: blur(0px); }
        .project-swiper .swiper-slide-prev, .project-swiper .swiper-slide-next { opacity: 0.7; transform: scale(0.94); filter: blur(0px); }
        .swiper-pagination-bullet { width: 28px !important; height: 3px !important; border-radius: 2px !important; background: rgba(255,255,255,0.2) !important; opacity: 1 !important; transition: all 0.4s ease !important; }
        .swiper-pagination-bullet-active { background: linear-gradient(90deg, #7C5CFC, #22D3EE) !important; width: 48px !important; }
        .swiper-button-prev, .swiper-button-next { color: #F5F5F7 !important; width: 48px !important; height: 48px !important; border: 1px solid rgba(255,255,255,0.1); border-radius: 9999px; transition: all 0.3s ease; top: auto !important; bottom: -5px !important; }
        .swiper-button-prev { left: calc(50% - 70px) !important; }
        .swiper-button-next { right: calc(50% - 70px) !important; }
        .swiper-button-prev:hover, .swiper-button-next:hover { border-color: #7C5CFC; background: rgba(124,92,252,0.1); }
        .swiper-button-prev::after, .swiper-button-next::after { font-size: 16px !important; font-weight: bold; }
        .parallax-section { position: relative; overflow: hidden; }
        .parallax-bg { position: absolute; inset: -50px; pointer-events: none; will-change: transform; }
        .floating-particle { position: absolute; border-radius: 9999px; pointer-events: none; will-change: transform, opacity; }
        .input-line { position: relative; }
        .input-line::after { content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 1px; background: linear-gradient(90deg, #7C5CFC, #22D3EE); transition: width 0.5s ease, left 0.5s ease; }
        .input-line:focus-within::after { width: 100%; left: 0; }
        .footer-glow { position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: 600px; height: 160px; background: radial-gradient(ellipse, rgba(124,92,252,0.08), transparent 70%); pointer-events: none; }
        .swiper-css { }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>

      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

      {/* ===== PRELOADER ===== */}
      <div id="preloader">
        <div className="preloader-logo">AA<span className="gradient-animate">.</span>dev</div>
        <div className="preloader-bar"><div className="preloader-bar-fill" id="preloader-fill"></div></div>
        <p className="text-xs text-dim tracking-[0.3em] uppercase mt-2">initializing<span id="preloader-dots">...</span></p>
      </div>

      <div id="scroll-progress"></div>
      <div className="grain"></div>
      <div id="cursor-ring"></div>
      <div id="cursor-dot"></div>
      <div id="particles-container" className="fixed inset-0 pointer-events-none z-[1]"></div>

      {/* ===== TOAST ===== */}
      {toast && (
        <div className="fixed top-6 right-6 z-[70] bg-surface border border-signal/40 text-paper px-5 py-3 rounded-md text-sm tracking-wide shadow-lg shadow-signal/10" data-toast-in>
          {toast}
        </div>
      )}

      {/* ===== HEADER ===== */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-white/5" id="main-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
          <a href="/" className="font-display font-bold text-lg tracking-tight">
            AA<span className="gradient-animate">.</span>dev
          </a>
          <div id="menu-icon" className="md:hidden text-2xl cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
          </div>
          <nav className={`navbar ${mobileMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-ink p-6 gap-5 z-50' : 'hidden md:flex'} items-center gap-9 text-xs uppercase tracking-[0.2em] text-dim`}>
            <a href="/" className="nav-link hover:text-paper transition-colors">Home</a>
            <a href="#about" className="nav-link hover:text-paper transition-colors">About</a>
            <a href="#experience" className="nav-link hover:text-paper transition-colors">Experience</a>
            <a href="#project" className="nav-link hover:text-paper transition-colors">Work</a>
            <a href="#skills" className="nav-link hover:text-paper transition-colors">Skills</a>
            <a href="#contact" className="nav-link hover:text-paper transition-colors">Contact</a>
            <a href="/admin" className="px-4 py-2 rounded-full border border-signal/40 text-paper hover:bg-signal/10 transition-colors">Admin Panel</a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden">
        <div className="orb-field">
          <div className="orb orb-1" data-orb></div>
          <div className="orb orb-2" data-orb></div>
          <div className="orb orb-3" data-orb></div>
        </div>
        <div className="mesh-gradient" style={{ background: 'linear-gradient(135deg, #7C5CFC, #22D3EE)', top: '-20%', right: '-10%' }}></div>
        <div className="mesh-gradient" style={{ background: 'linear-gradient(225deg, #A78BFA, #7C5CFC)', bottom: '-15%', left: '-5%', animationDelay: '-4s' }}></div>

        <div className="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-dim mb-8 opacity-0" data-hero-fade>
          <span className="w-2 h-2 rounded-full bg-signal2 animate-pulse"></span>
          <span className="status-chip">status: 200 — available for hire</span>
        </div>

        <h1 className="relative z-10 font-display font-bold text-[13vw] md:text-[7.2vw] leading-[0.95] tracking-tight" id="hero-heading">
          <div className="char-wrap"><span className="char glitch-text" id="hero-name" data-hero-line data-scramble>{about?.name || 'Ahamed Aboo Adnan'}</span></div>
        </h1>

        <div className="relative z-10 mt-8 max-w-2xl opacity-0" data-hero-fade>
          <h3 className="font-display text-2xl md:text-3xl font-medium">
            <span className="gradient-animate" id="typed-output"></span>
          </h3>
          <p className="mt-5 text-sm md:text-base leading-7 text-dim tracking-wide">
            {about?.description || 'Backend Developer & Laravel Specialist building scalable web applications.'}
          </p>
        </div>

        <div className="relative z-10 mt-10 flex flex-wrap items-center gap-5 opacity-0" data-hero-fade>
          {cv ? (
            <a href={cv.file_path} download={cv.original_name} className="magnetic ripple inline-flex items-center gap-2 bg-[#F5F5F7] text-[#0B0B0B] font-medium px-7 py-3.5 rounded-full text-sm">
              <span>Download CV</span><i className="bx bx-download"></i>
            </a>
          ) : (
            <button onClick={() => alert('CV not uploaded yet.')} className="magnetic ripple inline-flex items-center gap-2 bg-[#F5F5F7] text-[#0B0B0B] font-medium px-7 py-3.5 rounded-full text-sm">
              <span>Download CV</span><i className="bx bx-download"></i>
            </button>
          )}
          <a href="#contact" className="magnetic ripple border inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 rounded-full text-sm hover:border-signal/60 transition-colors">
            <span>Hire Me</span><i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>

        <div className="absolute bottom-10 right-6 md:right-10 hidden md:flex flex-col items-center gap-3 text-dim text-[10px] tracking-[0.25em] uppercase z-10">
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span id="scroll-line" className="w-px h-16 bg-gradient-to-b from-dim to-transparent origin-top"></span>
        </div>

        <div className="absolute top-28 right-6 md:right-10 flex flex-col gap-4 z-10">
          <a href="https://github.com/ahamedabu2003" target="_blank" className="magnetic w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-signal/60 transition-colors"><i className="bx bxl-github"></i></a>
          <a href="https://www.instagram.com/__ahmd_adnan__/" target="_blank" className="magnetic w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-signal/60 transition-colors"><i className="bx bxl-instagram-alt"></i></a>
          <a href="https://www.linkedin.com/in/ahamed-adnan-650070311/" target="_blank" className="magnetic w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-signal/60 transition-colors"><i className="bx bxl-linkedin"></i></a>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="relative border-y border-white/5 py-4 overflow-hidden bg-surface/40">
        <div className="marquee-track" id="marquee-track">
          {[0, 1].map(i => (
            <span key={i} className="flex items-center">
              <span className="mx-6 text-xs uppercase tracking-[0.3em] text-dim">Backend Development</span>
              <span className="mx-6 text-signal2">✦</span>
              <span className="mx-6 text-xs uppercase tracking-[0.3em] text-dim">Next.js</span>
              <span className="mx-6 text-signal2">✦</span>
              <span className="mx-6 text-xs uppercase tracking-[0.3em] text-dim">API Architecture</span>
              <span className="mx-6 text-signal2">✦</span>
              <span className="mx-6 text-xs uppercase tracking-[0.3em] text-dim">Clean Code</span>
              <span className="mx-6 text-signal2">✦</span>
              <span className="mx-6 text-xs uppercase tracking-[0.3em] text-dim">MongoDB</span>
              <span className="mx-6 text-signal2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <section className="about parallax-section relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="about">
        <div className="parallax-bg" data-parallax-speed="0.15">
          <div className="mesh-gradient" style={{ background: 'linear-gradient(135deg, #22D3EE, #7C5CFC)', top: '20%', left: '-10%', width: '300px', height: '300px' }}></div>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-14 section-heading" data-split-heading>
          About <span className="signal-text">Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          <div className="reveal-up img-reveal-wrap md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative bg-surface min-h-[320px] md:min-h-[420px]">
            {about?.image ? (
              <img src={about.image} alt="Ahamed Aboo Adnan" className="w-full h-full object-cover" data-parallax-img />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-dim"><i className="bx bx-user text-6xl"></i></div>
            )}
            <div className="img-reveal-cover"></div>
          </div>
          <div className="reveal-up md:col-span-4 rounded-2xl bg-surface p-8 md:p-10 tilt-card">
            <div className="tilt-inner">
              <span className="text-xs uppercase tracking-[0.2em] text-signal2">{about?.title || 'Backend Developer'}</span>
              <h3 className="font-display font-semibold text-2xl md:text-3xl mt-3 leading-snug">Building Scalable Web Applications & Modern Backend Solutions</h3>
              <p className="mt-5 text-sm leading-7 text-dim">{about?.description || 'Passionate about crafting robust backend solutions.'}</p>
            </div>
          </div>
          <div className="reveal-up md:col-span-4 grid grid-cols-3 gap-5">
            {[{ target: 2, label: 'Years Experience', suffix: '+' }, { target: 10, label: 'Projects Completed', suffix: '+' }, { target: 100, label: 'Commitment', suffix: '%' }].map((stat, i) => (
              <div key={i} className="rounded-2xl bg-surface p-6 flex flex-col justify-center items-start tilt-card">
                <h4 className="font-display font-bold text-4xl signal-text tilt-inner"><span data-counter data-target={stat.target}>0</span>{stat.suffix}</h4>
                <span className="text-xs text-dim mt-2 tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <a href="#contact" className="magnetic ripple border reveal-up inline-flex items-center gap-2 mt-10 border border-white/20 px-7 py-3.5 rounded-full text-sm hover:border-signal/60 transition-colors">
          Let's Connect <i className="bx bx-right-arrow-alt"></i>
        </a>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="experience parallax-section relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="experience">
        <div className="parallax-bg" data-parallax-speed="0.1">
          <div className="mesh-gradient" style={{ background: 'linear-gradient(315deg, #7C5CFC, #A78BFA)', top: '10%', right: '-15%', width: '350px', height: '350px', animationDelay: '-6s' }}></div>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-16 section-heading" data-split-heading>
          Work <span className="signal-text">Experience</span>
        </h2>
        <div className="relative border-l border-white/10 pl-8 md:pl-14 space-y-14">
          <span id="timeline-fill" className="absolute left-0 top-0 w-px bg-gradient-to-b from-signal to-signal2 h-0"></span>
          {experiences.length > 0 ? experiences.map((exp, i) => (
            <div key={exp._id} className="reveal-up relative timeline-item">
              <span className="absolute -left-[38px] md:-left-[62px] top-1 w-3 h-3 rounded-full bg-signal2 timeline-dot"></span>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dim mb-3">
                <i className="bx bxs-calendar"></i> {exp.duration}
              </div>
              <h3 className="font-display font-semibold text-xl md:text-2xl">{exp.designation} <span className="text-dim font-normal">| {exp.company}</span></h3>
              <p className="mt-3 text-sm leading-7 text-dim max-w-2xl">{exp.description}</p>
            </div>
          )) : (
            <div className="reveal-up relative">
              <span className="absolute -left-[38px] md:-left-[62px] top-1 w-3 h-3 rounded-full bg-signal2"></span>
              <p className="text-sm text-dim">No experiences listed yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="project parallax-section relative py-28" id="project">
        <div className="parallax-bg" data-parallax-speed="0.08">
          <div className="mesh-gradient" style={{ background: 'linear-gradient(135deg, #22D3EE, #7C5CFC)', bottom: '0', left: '20%', width: '400px', height: '400px', animationDelay: '-8s' }}></div>
        </div>
        <div className="px-6 md:px-10 max-w-7xl mx-auto mb-14">
          <h2 className="font-display font-bold text-4xl md:text-6xl section-heading" data-split-heading>
            Featured <span className="signal-text">Work</span>
          </h2>
          <p className="reveal-up text-xs uppercase tracking-[0.2em] text-dim mt-4">Swipe or drag to explore →</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="swiper project-swiper">
            <div className="swiper-wrapper">
              {projects.length > 0 ? projects.map((proj) => (
                <div className="swiper-slide" key={proj._id}>
                  <div className="project-card tilt-card rounded-2xl bg-surface border border-white/5 p-8 flex flex-col justify-between min-h-[420px]">
                    <div className="tilt-inner flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="status-chip text-xs px-3 py-1 rounded-full border border-signal2/40 text-signal2">{proj.live_link ? '200 OK' : '102 Processing'}</span>
                          <i className="bx bxs-calendar text-dim"></i>
                        </div>
                        <h3 className="font-display font-semibold text-2xl">{proj.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-dim">{proj.description}</p>
                      </div>
                      <div>
                        <div className="text-xs text-signal2 tracking-wide mt-6">{proj.technology}</div>
                        <div className="flex gap-5 mt-5 text-sm">
                          {proj.github_link && <a href={proj.github_link} target="_blank" className="flex items-center gap-1.5 hover:text-signal2 transition-colors"><i className="bx bxl-github"></i> Code</a>}
                          {proj.live_link && <a href={proj.live_link} target="_blank" className="flex items-center gap-1.5 hover:text-signal2 transition-colors"><i className="bx bx-link-external"></i> Live Demo</a>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="swiper-slide">
                  <div className="project-card rounded-2xl bg-surface border border-white/5 p-8 min-h-[420px] flex items-center justify-center">
                    <p className="text-sm text-dim">No projects listed yet.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="skills parallax-section relative px-6 md:px-10 py-28 max-w-7xl mx-auto" id="skills">
        <div className="parallax-bg" data-parallax-speed="0.12">
          <div className="mesh-gradient" style={{ background: 'linear-gradient(45deg, #A78BFA, #22D3EE)', top: '30%', right: '5%', width: '280px', height: '280px', animationDelay: '-3s' }}></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.04] hidden md:block">
          <div className="orbit-ring w-full h-full rounded-full border border-white/30" style={{ borderStyle: 'dashed' }}></div>
        </div>
        <div className="relative z-10">
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-4 section-heading" data-split-heading>My <span>Skills</span></h2>
          <p className="reveal-up text-sm text-dim tracking-wide mb-14 max-w-lg">Technologies and tools I use to bring ideas to life.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {skills.length > 0 ? skills.map((skill) => (
              <div key={skill._id} className="skill-card reveal-up rounded-2xl bg-surface/80 backdrop-blur-sm p-5 md:p-6 flex flex-col items-center text-center gap-3 group">
                <div className="skill-icon w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xl text-signal2">
                  <i className={`bx ${getIcon(skill.name)}`}></i>
                </div>
                <span className="text-sm font-medium text-paper/90 tracking-wide leading-tight">{skill.name}</span>
              </div>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-sm text-dim">No skills listed yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact parallax-section relative px-6 md:px-10 py-28 max-w-4xl mx-auto" id="contact">
        <div className="parallax-bg" data-parallax-speed="0.1">
          <div className="mesh-gradient" style={{ background: 'linear-gradient(180deg, #7C5CFC, #22D3EE)', top: '-10%', left: '30%', width: '300px', height: '300px', animationDelay: '-5s' }}></div>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-14 section-heading" data-split-heading>
          Contact<span className="signal-text"> Me!</span>
        </h2>
        {formMsg && <div className="mb-6 text-red-400 text-sm">{formMsg}</div>}
        <form onSubmit={handleContact} className="reveal-up space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="input-line border-b border-white/15 pb-2">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full text-sm placeholder:text-dim text-paper" />
            </div>
            <div className="input-line border-b border-white/15 pb-2">
              <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full text-sm placeholder:text-dim text-paper" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="input-line border-b border-white/15 pb-2">
              <input type="text" placeholder="Mobile Number" required value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="w-full text-sm placeholder:text-dim text-paper" />
            </div>
          </div>
          <div className="input-line border-b border-white/15 pb-2">
            <textarea rows={5} placeholder="Your Message" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full text-sm placeholder:text-dim text-paper resize-none"></textarea>
          </div>
          <button type="submit" disabled={submitting} className="magnetic ripple inline-flex items-center gap-2 bg-paper text-ink font-medium px-8 py-4 rounded-full text-sm disabled:opacity-60">
            {submitting ? 'Sending...' : 'Submit'} <i className="bx bx-send"></i>
          </button>
        </form>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative px-6 md:px-10 py-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 text-xs text-dim tracking-wide">
        <div className="footer-glow"></div>
        <span>© {new Date().getFullYear()} Ahamed Aboo Adnan — built with Next.js & care.</span>
        <span>status: 200 OK</span>
      </footer>

      {/* ===== INIT SCRIPTS REMOVED - MOVED TO USEEFFECT ===== */}
    </>
  );
}
