'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import UiSfx from './UiSfx';

interface About {
  _id: string;
  name?: string;
  title: string;
  description: string;
  image?: string;
}

interface Experience {
  _id: string;
  company: string;
  designation: string;
  duration: string;
  description: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  technology: string;
  image?: string;
  github_link?: string;
  live_link?: string;
}

interface Skill {
  _id: string;
  name: string;
  percentage: number;
}

interface Cv {
  _id: string;
  file_path: string;
  original_name: string;
}

interface Props {
  about: About | null;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  cv: Cv | null;
}

const iconMap: Record<string, string> = {
  laravel: 'bxl-php',
  php: 'bxl-php',
  javascript: 'bxl-javascript',
  js: 'bxl-javascript',
  html: 'bxl-html5',
  css: 'bxl-css3',
  python: 'bxl-python',
  react: 'bxl-react',
  vue: 'bxl-vuejs',
  node: 'bxl-nodejs',
  nodejs: 'bxl-nodejs',
  git: 'bxl-git',
  github: 'bxl-github',
  docker: 'bxl-docker',
  typescript: 'bxl-typescript',
  tailwind: 'bxl-tailwind-css',
  bootstrap: 'bxl-bootstrap',
  mysql: 'bx-data',
  database: 'bx-data',
  sql: 'bx-data',
  mongodb: 'bxl-mongodb',
  aws: 'bxl-aws',
  figma: 'bxl-figma',
  wordpress: 'bxl-wordpress',
  angular: 'bxl-angular',
  java: 'bxl-java',
  flutter: 'bxl-flutter',
  django: 'bxl-django',
  firebase: 'bxl-firebase',
  redux: 'bxl-redux',
  sass: 'bxl-sass',
  linux: 'bxl-tux',
  api: 'bx-transfer-alt',
  rest: 'bx-transfer-alt',
  nextjs: 'bx-code-alt',
  next: 'bx-code-alt',
};

function getIcon(name: string) {
  const lower = name.toLowerCase();
  for (const [key, value] of Object.entries(iconMap)) {
    if (lower.includes(key)) return value;
  }
  return 'bx-code-alt';
}

export default function HomeClient({
  about,
  experiences,
  projects,
  skills,
  cv,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState('');

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setToast('MESSAGE SENT — THANK YOU.');
        setFormData({ name: '', email: '', mobile: '', message: '' });
        setTimeout(() => setToast(''), 4500);
      } else {
        setFormMsg(data.error || 'Failed to send message.');
      }
    } catch {
      setFormMsg('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!scriptsLoaded || !root.current) return;

    const w = window as any;
    const gsap = w.gsap;
    const ScrollTrigger = w.ScrollTrigger;

    if (!gsap) return;
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* -----------------------------------------------------------
         PRELOADER
      ----------------------------------------------------------- */
      const loader = document.querySelector('#preloader');
      const loaderFill = document.querySelector('#preloader-fill');

      const loaderTl = gsap.timeline();
      loaderTl
        .to(loaderFill, {
          width: '100%',
          duration: 1.4,
          ease: 'power4.inOut',
        })
        .to(loader, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1,
          ease: 'expo.inOut',
        });

      /* -----------------------------------------------------------
         LENIS
      ----------------------------------------------------------- */
      const Lenis = w.Lenis;
      let lenis: any = null;
      let rafId = 0;

      if (Lenis) {
        lenis = new Lenis({
          lerp: 0.075,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        if (ScrollTrigger) {
          lenis.on('scroll', ScrollTrigger.update);
        }
      }

      /* -----------------------------------------------------------
         CURSOR
      ----------------------------------------------------------- */
      const cursor = document.querySelector('#cursor');
      const cursorDot = document.querySelector('#cursor-dot');
      const cursorLabel = document.querySelector('#cursor-label');

      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;

      const mouseMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;

        gsap.to(cursorDot, {
          x: mx,
          y: my,
          duration: 0.08,
          overwrite: true,
        });

        gsap.to(cursor, {
          x: mx,
          y: my,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      window.addEventListener('mousemove', mouseMove);

      const cursorTargets = document.querySelectorAll(
        '[data-cursor], a, button'
      );

      cursorTargets.forEach((el) => {
        const target = el as HTMLElement;

        target.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-active');

          const label = target.dataset.cursor || '';
          if (cursorLabel) cursorLabel.textContent = label;
        });

        target.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-active');
          if (cursorLabel) cursorLabel.textContent = '';
        });
      });

      /* -----------------------------------------------------------
         AMBIENT PARTICLES
      ----------------------------------------------------------- */
      const particleField = document.querySelector('#particle-field');

      if (particleField) {
        for (let i = 0; i < 35; i++) {
          const p = document.createElement('span');
          p.className = 'particle';

          const size = Math.random() * 3 + 1;

          p.style.width = `${size}px`;
          p.style.height = `${size}px`;
          p.style.left = `${Math.random() * 100}%`;
          p.style.top = `${Math.random() * 100}%`;
          p.style.opacity = `${Math.random() * 0.45 + 0.05}`;

          particleField.appendChild(p);

          gsap.to(p, {
            x: gsap.utils.random(-120, 120),
            y: gsap.utils.random(-160, 160),
            duration: gsap.utils.random(7, 15),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: gsap.utils.random(0, 5),
          });
        }
      }

      /* -----------------------------------------------------------
         HERO INTRO
      ----------------------------------------------------------- */
      const heroTl = gsap.timeline({ delay: 1.7 });

      heroTl
        .from('.hero-kicker', {
          y: 25,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          '.hero-word',
          {
            yPercent: 120,
            rotateX: -70,
            opacity: 0,
            stagger: 0.08,
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=0.45'
        )
        .from(
          '.hero-description',
          {
            y: 35,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.65'
        )
        .from(
          '.hero-actions',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.55'
        )
        .from(
          '.hero-meta',
          {
            opacity: 0,
            x: 30,
            duration: 0.8,
          },
          '-=0.6'
        );

      /* -----------------------------------------------------------
         SCRAMBLE / GLITCH
      ----------------------------------------------------------- */
      const scrambleChars = '!<>-_\\/[]{}=+*^?#01';

      const scramble = (
        element: HTMLElement,
        finalText: string,
        duration = 900
      ) => {
        const total = Math.max(10, Math.floor(duration / 35));
        let frame = 0;

        const timer = window.setInterval(() => {
          frame++;

          const progress = frame / total;
          const reveal = Math.floor(finalText.length * progress);

          element.textContent = finalText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < reveal) return char;
              return scrambleChars[
                Math.floor(Math.random() * scrambleChars.length)
              ];
            })
            .join('');

          if (frame >= total) {
            window.clearInterval(timer);
            element.textContent = finalText;
          }
        }, 35);
      };

      const glitch = (element: HTMLElement | null) => {
        if (!element) return;
        element.classList.remove('glitching');
        void element.offsetWidth;
        element.classList.add('glitching');

        window.setTimeout(() => {
          element.classList.remove('glitching');
        }, 480);
      };

      const heroName = document.querySelector(
        '#hero-name'
      ) as HTMLElement | null;

      if (heroName) {
        window.setTimeout(() => {
          scramble(
            heroName,
            heroName.dataset.text || heroName.textContent || '',
            1000
          );
          glitch(heroName);
        }, 2100);

        const hoverGlitch = () => glitch(heroName);
        heroName.addEventListener('mouseenter', hoverGlitch);

        /* cleanup below */
        (heroName as any).__hoverGlitch = hoverGlitch;
      }

      /* -----------------------------------------------------------
         GLITCH TERMINAL
      ----------------------------------------------------------- */
      const terminalLines = document.querySelectorAll('.terminal-line');

      gsap.from(terminalLines, {
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.6,
        delay: 2.2,
        ease: 'power3.out',
      });

      /* -----------------------------------------------------------
         SCROLL PROGRESS
      ----------------------------------------------------------- */
      const progress = document.querySelector(
        '#scroll-progress'
      ) as HTMLElement | null;

      if (progress && ScrollTrigger) {
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self: any) => {
            progress.style.transform = `scaleX(${self.progress})`;
          },
        });
      }

      /* -----------------------------------------------------------
         NAVBAR
      ----------------------------------------------------------- */
      const header = document.querySelector('#main-header');

      if (header) {
        ScrollTrigger?.create({
          start: 40,
          onUpdate: (self: any) => {
            header.classList.toggle(
              'nav-scrolled',
              self.scroll() > 40
            );
          },
        });
      }

      /* -----------------------------------------------------------
         SECTION REVEALS
      ----------------------------------------------------------- */
      if (ScrollTrigger) {
        gsap.utils.toArray('.reveal').forEach((el: any) => {
          gsap.from(el, {
            y: 70,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          });
        });

        /* split heading reveal */
        document.querySelectorAll('.split-heading').forEach((heading) => {
          const element = heading as HTMLElement;

          const words = element.innerText.split(' ');
          element.innerHTML = words
            .map(
              (word) =>
                `<span class="split-word"><span>${word}</span></span>`
            )
            .join(' ');

          gsap.from(element.querySelectorAll('.split-word span'), {
            yPercent: 110,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          });
        });

        /* image reveal */
        gsap.utils.toArray('.image-reveal').forEach((el: any) => {
          gsap.to(el, {
            scaleY: 0,
            duration: 1.25,
            ease: 'expo.inOut',
            transformOrigin: 'bottom',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top 85%',
              once: true,
            },
          });
        });

        /* stats */
        gsap.utils.toArray('[data-counter]').forEach((el: any) => {
          const target = Number(el.dataset.target || 0);
          const obj = { value: 0 };

          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                value: target,
                duration: 1.8,
                ease: 'power3.out',
                onUpdate: () => {
                  el.textContent = Math.round(obj.value).toString();
                },
              });
            },
          });
        });

        /* parallax */
        gsap.utils.toArray('.parallax').forEach((el: any) => {
          gsap.to(el, {
            y: -90,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        /* experience timeline */
        const timeline = document.querySelector('#timeline-progress');

        if (timeline) {
          gsap.to(timeline, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '#experience',
              start: 'top 70%',
              end: 'bottom 75%',
              scrub: true,
            },
          });
        }

        gsap.utils.toArray('.experience-item').forEach((item: any, i: number) => {
          gsap.from(item, {
            x: i % 2 === 0 ? -45 : 45,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          });
        });

        /* skill cards */
        gsap.from('.skill-card', {
          y: 45,
          opacity: 0,
          scale: 0.94,
          stagger: 0.045,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#skills-grid',
            start: 'top 82%',
            once: true,
          },
        });
      }

      /* -----------------------------------------------------------
         PROJECT CARDS
      ----------------------------------------------------------- */
      document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
        const image = card.querySelector('.project-image');

        const enter = () => {
          gsap.to(card, {
            y: -10,
            rotateX: 2,
            rotateY: -2,
            duration: 0.45,
            ease: 'power3.out',
          });

          gsap.to(image, {
            scale: 1.06,
            duration: 0.8,
            ease: 'power3.out',
          });
        };

        const leave = () => {
          gsap.to(card, {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)',
          });

          gsap.to(image, {
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
          });
        };

        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();

          const x =
            ((e.clientX - rect.left) / rect.width - 0.5) * 8;
          const y =
            ((e.clientY - rect.top) / rect.height - 0.5) * -8;

          gsap.to(card, {
            rotateY: x,
            rotateX: y,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
          });
        });
      });

      /* -----------------------------------------------------------
         MAGNETIC BUTTONS
      ----------------------------------------------------------- */
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((button) => {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();

          const x =
            (e.clientX - rect.left - rect.width / 2) * 0.28;
          const y =
            (e.clientY - rect.top - rect.height / 2) * 0.28;

          gsap.to(button, {
            x,
            y,
            duration: 0.35,
            ease: 'power3.out',
            overwrite: true,
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: 'elastic.out(1, 0.45)',
          });
        });
      });

      /* -----------------------------------------------------------
         MARQUEE
      ----------------------------------------------------------- */
      const marquee = document.querySelector(
        '#marquee-track'
      ) as HTMLElement | null;

      if (marquee) {
        const width = marquee.scrollWidth / 2;

        gsap.to(marquee, {
          x: -width,
          duration: 26,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: (value: string) => `${parseFloat(value) % width}px`,
          },
        });
      }

      /* -----------------------------------------------------------
         HORIZONTAL PROJECT INTRO
      ----------------------------------------------------------- */
      const horizontal = document.querySelector(
        '#horizontal-track'
      ) as HTMLElement | null;

      if (horizontal && ScrollTrigger) {
        const distance = () =>
          Math.max(
            0,
            horizontal.scrollWidth - window.innerWidth
          );

        gsap.to(horizontal, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#horizontal-projects',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            end: () => `+=${distance() + window.innerWidth}`,
          },
        });
      }

      /* -----------------------------------------------------------
         SKILL HOVER GLOW
      ----------------------------------------------------------- */
      document.querySelectorAll<HTMLElement>('.skill-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();

          card.style.setProperty(
            '--mx',
            `${e.clientX - rect.left}px`
          );
          card.style.setProperty(
            '--my',
            `${e.clientY - rect.top}px`
          );
        });
      });

      /* -----------------------------------------------------------
         CONTACT FORM MICRO ANIMATION
      ----------------------------------------------------------- */
      gsap.utils.toArray('.contact-field').forEach((field: any) => {
        field.addEventListener('focus', () => {
          gsap.to(field, {
            y: -3,
            duration: 0.25,
          });
        });

        field.addEventListener('blur', () => {
          gsap.to(field, {
            y: 0,
            duration: 0.3,
          });
        });
      });

      /* -----------------------------------------------------------
         FLOATING ROTATING LABEL
      ----------------------------------------------------------- */
      gsap.to('.orbit', {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
      });

      /* -----------------------------------------------------------
         REDUCED MOTION
      ----------------------------------------------------------- */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0);
      }

      /* cleanup */
      return () => {
        window.removeEventListener('mousemove', mouseMove);

        if (heroName && (heroName as any).__hoverGlitch) {
          heroName.removeEventListener(
            'mouseenter',
            (heroName as any).__hoverGlitch
          );
        }

        cancelAnimationFrame(rafId);
        lenis?.destroy?.();
        ScrollTrigger?.getAll().forEach((trigger: any) => trigger.kill());
      };
    }, root);

    return () => ctx.revert();
  }, [scriptsLoaded]);

  const heroName = about?.name || 'Ahamed Aboo Adnan';

  return (
    <div ref={root} className="portfolio-root">
      {/* CDN */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded(true)}
      />

      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

        :root {
          --bg: #050505;
          --surface: #0c0c0d;
          --surface-2: #111113;
          --text: #f4f4f0;
          --muted: #85858d;
          --line: rgba(255,255,255,.09);
          --purple: #8b5cf6;
          --cyan: #22d3ee;
        }

        * { box-sizing: border-box; }

        html {
          scroll-behavior: auto;
          background: var(--bg);
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: 'Manrope', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        a { color: inherit; text-decoration: none; }

        ::selection {
          background: var(--cyan);
          color: #050505;
        }

        .portfolio-root {
          min-height: 100vh;
          background:
            radial-gradient(circle at 15% 10%, rgba(139,92,246,.09), transparent 28%),
            radial-gradient(circle at 90% 30%, rgba(34,211,238,.055), transparent 25%),
            var(--bg);
        }

        /* PRELOADER */
        #preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #050505;
          clip-path: inset(0);
        }

        .loader-logo {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 800;
          letter-spacing: -.07em;
        }

        .loader-logo span {
          color: var(--cyan);
        }

        .loader-bar {
          width: 180px;
          height: 2px;
          margin-top: 25px;
          background: rgba(255,255,255,.1);
          overflow: hidden;
        }

        #preloader-fill {
          width: 0;
          height: 100%;
          background: linear-gradient(90deg,var(--purple),var(--cyan));
        }

        .loader-copy {
          margin-top: 14px;
          font: 10px 'DM Mono', monospace;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* CURSOR */
        #cursor,
        #cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%,-50%);
        }

        #cursor {
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,.45);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition:
            width .3s ease,
            height .3s ease,
            background .3s ease,
            border-color .3s ease;
        }

        #cursor-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
        }

        #cursor-label {
          font: 8px 'DM Mono', monospace;
          letter-spacing: .08em;
        }

        .cursor-active #cursor {
          width: 76px;
          height: 76px;
          background: rgba(139,92,246,.12);
          border-color: var(--purple);
        }

        /* GRAIN */
        .grain {
          position: fixed;
          inset: 0;
          z-index: 8000;
          pointer-events: none;
          opacity: .035;
          mix-blend-mode: screen;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        #scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 9000;
          background: linear-gradient(90deg,var(--purple),var(--cyan));
          transform: scaleX(0);
          transform-origin: left;
          box-shadow: 0 0 25px rgba(34,211,238,.45);
        }

        /* NAV */
        #main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5000;
          transition: .4s ease;
          border-bottom: 1px solid transparent;
        }

        #main-header.nav-scrolled {
          background: rgba(5,5,5,.78);
          backdrop-filter: blur(20px);
          border-color: var(--line);
        }

        .nav-inner {
          max-width: 1400px;
          margin: auto;
          padding: 22px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -.06em;
        }

        .logo span { color: var(--cyan); }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
          font: 10px 'DM Mono', monospace;
          text-transform: uppercase;
          letter-spacing: .16em;
          color: var(--muted);
        }

        .nav-links a {
          position: relative;
          transition: color .25s ease;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -7px;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg,var(--purple),var(--cyan));
          transition: width .3s ease;
        }

        .nav-links a:hover {
          color: white;
        }

        .nav-links a:hover::after { width: 100%; }

        .menu-button {
          display: none;
          background: transparent;
          color: white;
          border: 0;
          font-size: 28px;
        }

        /* COMMON */
        .container {
          width: min(1400px, 90%);
          margin: auto;
        }

        .section {
          position: relative;
          padding: 150px 0;
        }

        .eyebrow {
          font: 10px 'DM Mono', monospace;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: .22em;
        }

        .section-title {
          margin: 15px 0 60px;
          max-width: 1000px;
          font-size: clamp(3rem, 7vw, 8rem);
          line-height: .9;
          letter-spacing: -.075em;
          font-weight: 800;
        }

        .gradient {
          background: linear-gradient(100deg,var(--purple),var(--cyan));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .muted { color: var(--muted); }

        .reveal { will-change: transform, opacity; }

        .split-word {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          margin-right: .2em;
        }

        .split-word > span {
          display: inline-block;
        }

        /* HERO */
        #home {
          min-height: 100svh;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 150px 5vw 90px;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          opacity: .16;
          background-image:
            linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: 90px 90px;
          mask-image: radial-gradient(circle at center, black, transparent 75%);
        }

        .hero-glow {
          position: absolute;
          width: 700px;
          height: 700px;
          right: -250px;
          top: 5%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,.22), transparent 68%);
          filter: blur(20px);
          pointer-events: none;
        }

        .hero-glow-2 {
          position: absolute;
          width: 450px;
          height: 450px;
          left: -200px;
          bottom: -200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,.13), transparent 68%);
          filter: blur(25px);
        }

        .hero-content {
          width: min(1400px, 100%);
          margin: auto;
          position: relative;
          z-index: 2;
        }

        .hero-kicker {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 25px;
          font: 10px 'DM Mono', monospace;
          color: var(--muted);
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 18px var(--cyan);
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          50% { opacity: .3; transform: scale(.7); }
        }

        .terminal {
          margin-bottom: 18px;
          font: 11px 'DM Mono', monospace;
          color: var(--cyan);
          min-height: 18px;
        }

        .hero-title {
          margin: 0;
          max-width: 1200px;
          font-size: clamp(4rem, 11vw, 11rem);
          line-height: .79;
          letter-spacing: -.09em;
          font-weight: 800;
          perspective: 900px;
        }

        .hero-word-wrap {
          display: block;
          overflow: hidden;
        }

        .hero-word {
          display: inline-block;
        }

        .hero-name {
          position: relative;
          display: inline-block;
        }

        .hero-name::before,
        .hero-name::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
        }

        .hero-name::before {
          color: var(--cyan);
          transform: translate(-5px,0);
          clip-path: inset(0 0 55% 0);
        }

        .hero-name::after {
          color: var(--purple);
          transform: translate(5px,0);
          clip-path: inset(50% 0 0 0);
        }

        .hero-name.glitching::before {
          opacity: .85;
          animation: glitchA .45s steps(3);
        }

        .hero-name.glitching::after {
          opacity: .85;
          animation: glitchB .45s steps(3);
        }

        @keyframes glitchA {
          0% { transform: translate(-8px,2px); clip-path: inset(5% 0 70% 0); }
          35% { transform: translate(5px,-1px); clip-path: inset(65% 0 15% 0); }
          70% { transform: translate(-3px,1px); clip-path: inset(20% 0 50% 0); }
          100% { opacity: 0; }
        }

        @keyframes glitchB {
          0% { transform: translate(7px,-2px); clip-path: inset(65% 0 5% 0); }
          40% { transform: translate(-5px,1px); clip-path: inset(15% 0 65% 0); }
          75% { transform: translate(3px,2px); clip-path: inset(45% 0 25% 0); }
          100% { opacity: 0; }
        }

        .hero-description {
          max-width: 690px;
          margin-top: 45px;
          font-size: 15px;
          line-height: 1.9;
          color: var(--muted);
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .magnetic {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 23px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          overflow: hidden;
          will-change: transform;
        }

        .button-primary {
          background: white;
          color: #050505;
        }

        .button-outline {
          border: 1px solid var(--line);
          color: white;
        }

        .button-outline:hover {
          border-color: rgba(139,92,246,.7);
        }

        .hero-meta {
          position: absolute;
          right: 5vw;
          bottom: 55px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          color: var(--muted);
          font: 9px 'DM Mono', monospace;
          text-transform: uppercase;
          letter-spacing: .15em;
        }

        .scroll-line {
          width: 1px;
          height: 70px;
          background: linear-gradient(white, transparent);
        }

        /* PARTICLES */
        #particle-field {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 12px var(--cyan);
        }

        /* MARQUEE */
        .marquee {
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 20px 0;
          background: rgba(255,255,255,.012);
        }

        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-right: 28px;
          white-space: nowrap;
          font: 11px 'DM Mono', monospace;
          text-transform: uppercase;
          letter-spacing: .18em;
          color: var(--muted);
        }

        .marquee-star { color: var(--cyan); }

        /* ABOUT */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 20px;
        }

        .about-image {
          min-height: 600px;
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          background: var(--surface);
        }

        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(.8) contrast(1.1);
          transition: transform 1s ease, filter 1s ease;
        }

        .about-image:hover img {
          transform: scale(1.05);
          filter: grayscale(0) contrast(1);
        }

        .image-reveal {
          position: absolute;
          inset: 0;
          background: #080808;
          z-index: 2;
          transform-origin: bottom;
        }

        .about-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 600px;
          padding: 50px;
          border: 1px solid var(--line);
          border-radius: 28px;
          background: linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.008));
        }

        .about-copy h3 {
          margin: 20px 0;
          font-size: clamp(2rem,4vw,4.6rem);
          line-height: .95;
          letter-spacing: -.065em;
        }

        .about-copy p {
          max-width: 650px;
          color: var(--muted);
          line-height: 1.9;
          font-size: 14px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 10px;
          margin-top: 35px;
        }

        .stat {
          padding: 20px;
          border-top: 1px solid var(--line);
        }

        .stat strong {
          display: block;
          font-size: 42px;
          letter-spacing: -.07em;
        }

        .stat span {
          display: block;
          margin-top: 5px;
          font: 9px 'DM Mono', monospace;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: .13em;
        }

        /* EXPERIENCE */
        .timeline {
          position: relative;
          margin-top: 80px;
        }

        .timeline-base {
          position: absolute;
          left: 12px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--line);
        }

        #timeline-progress {
          position: absolute;
          left: 12px;
          top: 0;
          width: 1px;
          height: 0;
          background: linear-gradient(var(--purple),var(--cyan));
          box-shadow: 0 0 18px rgba(34,211,238,.4);
        }

        .experience-item {
          position: relative;
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 50px;
          padding: 0 0 90px 55px;
        }

        .experience-dot {
          position: absolute;
          left: 7px;
          top: 5px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--cyan);
          box-shadow: 0 0 20px rgba(34,211,238,.45);
        }

        .experience-date {
          font: 10px 'DM Mono', monospace;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: .12em;
        }

        .experience-title {
          margin: 0;
          font-size: clamp(1.7rem,3vw,3.5rem);
          line-height: 1;
          letter-spacing: -.055em;
        }

        .experience-company {
          color: var(--muted);
        }

        .experience-description {
          max-width: 700px;
          margin-top: 18px;
          color: var(--muted);
          line-height: 1.9;
          font-size: 14px;
        }

        /* HORIZONTAL PROJECTS */
        #horizontal-projects {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background:
            radial-gradient(circle at 70% 40%, rgba(139,92,246,.08), transparent 30%),
            #070707;
        }

        .horizontal-heading {
          position: absolute;
          top: 8%;
          left: 5%;
          z-index: 5;
        }

        #horizontal-track {
          display: flex;
          gap: 35px;
          padding-left: 5vw;
          width: max-content;
          will-change: transform;
        }

        .project-card {
          width: min(72vw, 800px);
          height: min(70vh, 620px);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--line);
          border-radius: 30px;
          background: var(--surface);
          transform-style: preserve-3d;
        }

        .project-image-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .6;
          transition: transform .8s ease, opacity .8s ease;
          filter: grayscale(.25);
        }

        .project-card:hover .project-image {
          transform: scale(1.06);
          opacity: .78;
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,.05) 10%,
            rgba(0,0,0,.25) 40%,
            rgba(0,0,0,.95) 100%
          );
        }

        .project-content {
          position: absolute;
          inset: auto 35px 32px;
          z-index: 2;
        }

        .project-number {
          font: 10px 'DM Mono', monospace;
          color: var(--cyan);
          letter-spacing: .15em;
        }

        .project-title {
          margin: 10px 0;
          font-size: clamp(2.5rem,6vw,6rem);
          line-height: .85;
          letter-spacing: -.075em;
        }

        .project-description {
          max-width: 600px;
          color: rgba(255,255,255,.68);
          line-height: 1.7;
          font-size: 13px;
        }

        .project-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }

        .project-tech {
          color: var(--cyan);
          font: 10px 'DM Mono', monospace;
          letter-spacing: .1em;
        }

        .project-links {
          display: flex;
          gap: 8px;
        }

        .project-link {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 50%;
          transition: .3s ease;
        }

        .project-link:hover {
          background: white;
          color: #050505;
        }

        /* SKILLS */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(5,1fr);
          gap: 12px;
        }

        .skill-card {
          position: relative;
          min-height: 155px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 22px;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: var(--surface);
          transition: transform .35s ease, border-color .35s ease;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            180px circle at var(--mx,50%) var(--my,50%),
            rgba(139,92,246,.2),
            transparent 70%
          );
          opacity: 0;
          transition: opacity .35s ease;
        }

        .skill-card:hover {
          transform: translateY(-8px);
          border-color: rgba(139,92,246,.45);
        }

        .skill-card:hover::before { opacity: 1; }

        .skill-icon {
          position: relative;
          z-index: 1;
          font-size: 34px;
          color: var(--cyan);
        }

        .skill-name {
          position: relative;
          z-index: 1;
          font-size: 13px;
          font-weight: 700;
        }

        .skill-percent {
          position: relative;
          z-index: 1;
          font: 9px 'DM Mono', monospace;
          color: var(--muted);
        }

        /* TERMINAL */
        .terminal-section {
          position: relative;
          overflow: hidden;
        }

        .terminal-window {
          border: 1px solid var(--line);
          border-radius: 26px;
          overflow: hidden;
          background: #090909;
          box-shadow: 0 40px 120px rgba(0,0,0,.5);
        }

        .terminal-header {
          padding: 13px 18px;
          border-bottom: 1px solid var(--line);
          display: flex;
          gap: 7px;
        }

        .terminal-header i {
          width: 8px;
          height: 8px;
          display: block;
          border-radius: 50%;
          background: rgba(255,255,255,.2);
        }

        .terminal-body {
          padding: 35px;
          font: 13px/2 'DM Mono', monospace;
          color: #b8b8bf;
        }

        .terminal-body .green { color: var(--cyan); }
        .terminal-body .purple { color: var(--purple); }

        /* CONTACT */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
        }

        .contact-title {
          margin: 0;
          font-size: clamp(4rem,8vw,9rem);
          line-height: .8;
          letter-spacing: -.09em;
        }

        .contact-sub {
          max-width: 500px;
          margin-top: 35px;
          color: var(--muted);
          line-height: 1.8;
          font-size: 14px;
        }

        .contact-form {
          display: grid;
          gap: 30px;
        }

        .field {
          position: relative;
        }

        .contact-field {
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--line);
          outline: 0;
          padding: 13px 0;
          background: transparent;
          color: white;
          font: 14px 'Manrope', sans-serif;
          transition: border-color .3s ease;
        }

        .contact-field:focus {
          border-color: var(--cyan);
        }

        .contact-field::placeholder {
          color: #66666e;
        }

        textarea.contact-field {
          min-height: 130px;
          resize: vertical;
        }

        .submit {
          justify-self: start;
          border: 0;
          cursor: none;
        }

        .form-error {
          color: #fb7185;
          font: 11px 'DM Mono', monospace;
        }

        .toast {
          position: fixed;
          right: 25px;
          bottom: 25px;
          z-index: 9999;
          padding: 16px 20px;
          border: 1px solid rgba(34,211,238,.3);
          background: rgba(10,10,10,.9);
          backdrop-filter: blur(20px);
          font: 10px 'DM Mono', monospace;
          letter-spacing: .1em;
        }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--line);
          padding: 35px 0;
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font: 9px 'DM Mono', monospace;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: .13em;
        }

        .footer-status { color: var(--cyan); }

        /* MOBILE */
        @media (max-width: 900px) {
          body { cursor: auto; }

          #cursor,
          #cursor-dot {
            display: none;
          }

          .nav-links {
            display: none;
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            padding: 25px 5vw 30px;
            background: rgba(5,5,5,.96);
            backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-links.mobile-open {
            display: flex;
          }

          .menu-button {
            display: block;
          }

          .hero-meta {
            display: none;
          }

          .section {
            padding: 100px 0;
          }

          .about-grid,
          .contact-layout {
            grid-template-columns: 1fr;
          }

          .about-image {
            min-height: 450px;
          }

          .about-copy {
            min-height: auto;
            padding: 30px;
          }

          .skills-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .experience-item {
            grid-template-columns: 1fr;
            gap: 12px;
            padding-left: 40px;
          }

          .project-card {
            width: 84vw;
            height: 65vh;
          }

          .hero-title {
            font-size: clamp(3.6rem, 16vw, 8rem);
          }
        }

        @media (max-width: 520px) {
          .nav-inner {
            padding: 18px 5vw;
          }

          #home {
            padding-left: 5vw;
            padding-right: 5vw;
          }

          .hero-description {
            font-size: 13px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: 1fr 1fr;
          }

          .skill-card {
            min-height: 130px;
            padding: 16px;
          }

          .project-content {
            inset: auto 22px 22px;
          }

          .project-bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .terminal-body {
            padding: 22px;
            font-size: 11px;
          }

          .footer-inner {
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* GLOBAL FX */}
      <div id="scroll-progress" />
      <div className="grain" />
      <div id="particle-field" />

      <div id="cursor">
        <span id="cursor-label" />
      </div>
      <div id="cursor-dot" />

      {/* PRELOADER */}
      <div id="preloader">
        <div className="loader-logo">
          AA<span>.</span>dev
        </div>
        <div className="loader-bar">
          <div id="preloader-fill" />
        </div>
        <div className="loader-copy">CONNECTING TO THE CREATIVE CORE / 2026</div>
      </div>

      {/* NAV */}
      <header id="main-header">
        <div className="nav-inner">
          <a href="#home" className="logo magnetic" data-cursor="GO">
            AA<span>.</span>dev
          </a>

          <button
            className="menu-button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'}`} />
          </button>

          <nav
            className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''
              }`}
          >
            {[
              ['Home', '#home'],
              ['About', '#about'],
              ['Experience', '#experience'],
              ['Work', '#horizontal-projects'],
              ['Skills', '#skills'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                data-cursor="OPEN"
              >
                {label}
              </a>
            ))}

            <a href="/admin" data-cursor="ADMIN">
              Admin ↗
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home">
        <div className="hero-grid" />
        <div className="hero-glow" data-orb />
        <div className="hero-glow-2" data-orb />

        <div className="hero-content">
          <div className="hero-kicker">
            <span className="status-dot" />
            <span>Available for freelance / full-time work</span>
          </div>

          <div className="terminal terminal-line">
            <span>$ whoami --verbose</span>
          </div>

          <h1 className="hero-title">
            {/* <span className="hero-word-wrap">
              <span className="hero-word">BUILDING</span>
            </span> */}

            <span className="hero-word-wrap">
              <span
                id="hero-name"
                className="hero-word hero-name gradient"
                data-text={heroName}
              >
                {heroName}
              </span>
            </span>
          </h1>

          <div className="hero-description">
            <span className="gradient">
              {about?.title || 'Backend Developer'}
            </span>
            <br />
            <span>
              {about?.description ||
                'Backend developer focused on Laravel, PHP, APIs and scalable web applications.'}
            </span>
          </div>

          <div className="hero-actions">
            {cv ? (
              <a
                href={cv.file_path}
                download={cv.original_name}
                className="magnetic button-primary"
                data-cursor="DOWNLOAD"
              >
                Download CV <i className="bx bx-download" />
              </a>
            ) : (
              <a
                href="#contact"
                className="magnetic button-primary"
                data-cursor="CONTACT"
              >
                Let&apos;s Talk <i className="bx bx-right-arrow-alt" />
              </a>
            )}

            <a
              href="#horizontal-projects"
              className="magnetic button-outline"
              data-cursor="VIEW"
            >
              Explore Work <i className="bx bx-arrow-down-right" />
            </a>
          </div>
        </div>

        <div className="hero-meta">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
          <span>01 — 06</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track" id="marquee-track">
          {[0, 1, 2].map((copy) => (
            <div className="marquee-item" key={copy}>
              <span>Laravel</span>
              <span className="marquee-star">✦</span>
              <span>PHP</span>
              <span className="marquee-star">✦</span>
              <span>REST API</span>
              <span className="marquee-star">✦</span>
              <span>MySQL</span>
              <span className="marquee-star">✦</span>
              <span>Next.js</span>
              <span className="marquee-star">✦</span>
              <span>Clean Code</span>
              <span className="marquee-star">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <div className="eyebrow reveal">01 / About</div>

          <h2 className="section-title split-heading">
            Developer with a <span className="gradient">builder&apos;s</span>{' '}
            mindset.
          </h2>

          <div className="about-grid">
            <div className="about-image reveal">
              {about?.image ? (
                <img
                  src={about.image}
                  alt={heroName}
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#555',
                    fontSize: 70,
                  }}
                >
                  <i className="bx bx-user" />
                </div>
              )}
              <div className="image-reveal" />
            </div>

            <div className="about-copy reveal">
              <div>
                <div className="eyebrow">Backend / Full Stack</div>

                <h3>
                  Turning ideas into <span className="gradient">working
                    products.</span>
                </h3>

                <p>
                  {about?.description ||
                    'I build reliable backend systems, APIs and modern web applications with a focus on performance, maintainability and clean architecture.'}
                </p>
              </div>

              <div className="stats">
                <div className="stat">
                  <strong className="gradient">
                    <span data-counter data-target="2">0</span>+
                  </strong>
                  <span>Years Experience</span>
                </div>

                <div className="stat">
                  <strong className="gradient">
                    <span data-counter data-target="10">0</span>+
                  </strong>
                  <span>Projects</span>
                </div>

                <div className="stat">
                  <strong className="gradient">
                    <span data-counter data-target="100">0</span>%
                  </strong>
                  <span>Commitment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="container">
          <div className="eyebrow reveal">02 / Experience</div>

          <h2 className="section-title split-heading">
            Where I&apos;ve <span className="gradient">worked.</span>
          </h2>

          <div className="timeline">
            <div className="timeline-base" />
            <div id="timeline-progress" />

            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <article
                  className="experience-item reveal"
                  key={exp._id}
                >
                  <span className="experience-dot" />

                  <div className="experience-date">
                    {exp.duration}
                  </div>

                  <div>
                    <h3 className="experience-title">
                      {exp.designation}{' '}
                      <span className="experience-company">
                        / {exp.company}
                      </span>
                    </h3>

                    <p className="experience-description">
                      {exp.description}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <article className="experience-item">
                <span className="experience-dot" />
                <div className="experience-date">Now</div>
                <div>
                  <h3 className="experience-title">
                    Building what&apos;s next.
                  </h3>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="horizontal-projects">
        <div className="horizontal-heading">
          <div className="eyebrow">03 / Selected Work</div>
        </div>

        <div id="horizontal-track">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <article
                className="project-card"
                key={project._id}
                data-cursor="VIEW"
              >
                <div className="project-image-wrap">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 80,
                        color: '#29292d',
                      }}
                    >
                      <i className="bx bx-code-alt" />
                    </div>
                  )}
                </div>

                <div className="project-overlay" />

                <div className="project-content">
                  <div className="project-number">
                    0{index + 1} / PROJECT
                  </div>

                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-bottom">
                    <div className="project-tech">
                      {project.technology}
                    </div>

                    <div className="project-links">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          data-cursor="CODE"
                        >
                          <i className="bx bxl-github" />
                        </a>
                      )}

                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          data-cursor="OPEN"
                        >
                          <i className="bx bx-link-external" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <article className="project-card">
              <div className="project-content">
                <div className="project-number">01 / PROJECT</div>
                <h3 className="project-title">Coming Soon.</h3>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="container">
          <div className="eyebrow reveal">04 / Toolkit</div>

          <h2 className="section-title split-heading">
            Things I <span className="gradient">work with.</span>
          </h2>

          <div className="skills-grid" id="skills-grid">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div className="skill-card" key={skill._id}>
                  <i
                    className={`bx ${getIcon(skill.name)} skill-icon`}
                  />

                  <div>
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-percent">
                      {skill.percentage}%
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="muted">No skills added yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* TERMINAL */}
      <section className="section terminal-section">
        <div className="container">
          <div className="eyebrow reveal">05 / System</div>

          <h2 className="section-title split-heading">
            Under the <span className="gradient">hood.</span>
          </h2>

          <div className="terminal-window reveal">
            <div className="terminal-header">
              <i />
              <i />
              <i />
            </div>

            <div className="terminal-body">
              <div className="terminal-line">
                <span className="green">$</span> whoami
              </div>

              <div className="terminal-line">
                <span className="purple">→</span> {heroName}
              </div>

              <br />

              <div className="terminal-line">
                <span className="green">$</span> stack --primary
              </div>

              <div className="terminal-line">
                <span className="purple">→</span> PHP / Laravel / MySQL
              </div>

              <div className="terminal-line">
                <span className="purple">→</span> REST APIs / Next.js
              </div>

              <br />

              <div className="terminal-line">
                <span className="green">$</span> status
              </div>

              <div className="terminal-line">
                <span className="green">→</span> 200 OK — AVAILABLE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <div className="eyebrow reveal">06 / Contact</div>

              <h2 className="contact-title reveal">
                Let&apos;s make
                <br />
                <span className="gradient">something.</span>
              </h2>

              <p className="contact-sub reveal">
                Have an idea, project or opportunity? Send me a message.
                Let&apos;s turn it into something useful, fast and
                memorable.
              </p>
            </div>

            <form
              className="contact-form reveal"
              onSubmit={handleContact}
            >
              <div className="field">
                <input
                  className="contact-field"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="field">
                <input
                  className="contact-field"
                  type="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="field">
                <input
                  className="contact-field"
                  type="text"
                  placeholder="Mobile number"
                  required
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile: e.target.value,
                    })
                  }
                />
              </div>

              <div className="field">
                <textarea
                  className="contact-field"
                  placeholder="Tell me about the project..."
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                />
              </div>

              {formMsg && (
                <div className="form-error">{formMsg}</div>
              )}

              <button
                className="magnetic button-primary submit"
                type="submit"
                disabled={submitting}
                data-cursor="SEND"
              >
                {submitting ? 'Sending...' : 'Send Message'}
                <i className="bx bx-send" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} {heroName}
          </span>

          <span className="footer-status">
            system.status = 200 OK
          </span>

          <span>Built by {heroName}</span>
        </div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
      <UiSfx />
    </div>
  );
}
