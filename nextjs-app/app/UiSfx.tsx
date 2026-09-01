'use client';

/**
 * UiSfx.tsx
 * -----------------------------------------------------------------------
 * Site-wide sound + micro-interaction layer. Purely additive — mounts
 * alongside HomeClient.tsx and watches the DOM (delegated events +
 * MutationObserver / IntersectionObserver) instead of requiring any
 * changes to the existing component's markup or logic.
 *
 * WHAT'S INCLUDED
 *   SOUND (clean sine/triangle tones through a low-pass filter):
 *     - Hover on ANY interactive element   -> two-note harmonic chime
 *       (root + a quiet fifth above, pitch varies by element type)
 *     - Click on any interactive element   -> slightly brighter tone
 *     - Magnetic button press (.magnetic)  -> a touch richer, two-note tone
 *     - Preloader finishing                 -> gentle rising chime
 *     - Contact form: message sent          -> fireworks (whoosh+crackle+boom)
 *     - Contact form: error shown           -> low, brief two-note tone
 *     - Mobile nav menu opening/closing     -> quiet toggle tick
 *     - Scrolling into a new section        -> very subtle single tick
 *
 *   VISUAL:
 *     - Hover glitch (RGB-split flicker), on all interactive elements
 *     - Sparkle particles on hover for ANY interactive element (nav
 *       links, buttons, project links, skill cards, logo — the same
 *       set that gets the hover sound). Small violet/cyan star
 *       particles that pop and drift upward, pure CSS animation,
 *       removed from the DOM automatically.
 *
 * All sound is synthesized live via Web Audio — no audio files to host.
 * All visuals are CSS/DOM — no images or canvas needed.
 *
 * INTEGRATION (in HomeClient.tsx) — unchanged:
 *   import UiSfx from './UiSfx';
 *   ...
 *   <RetroGame />
 *   <UiSfx />
 * -----------------------------------------------------------------------
 */

import { useEffect, useRef } from 'react';

const MASTER_VOLUME = 0.032;

const INTERACTIVE_SELECTOR = [
    'a',
    'button',
    '.magnetic',
    '.nav-links a',
    '.project-link',
    '.skill-card',
    '.logo',
    '.menu-button',
].join(', ');

// sparkle now covers the same elements as hover sound
const SPARKLE_SELECTOR = INTERACTIVE_SELECTOR;

const SPARKLE_COLORS = ['#8b5cf6', '#22d3ee', '#c4b5fd', '#67e8f9'];
const SPARKLE_THROTTLE_MS = 70;
const SPARKLE_LIFETIME_MS = 620;

function prefersReducedMotion() {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

function spawnSparkle(x: number, y: number) {
    if (prefersReducedMotion()) return;

    const el = document.createElement('span');
    el.className = 'ui-sparkle';

    const size = 4 + Math.random() * 5;
    const color =
        SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
    const dx = (Math.random() - 0.5) * 46;
    const dy = -18 - Math.random() * 36; // drift mostly upward
    const rot = Math.floor(Math.random() * 360);

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.background = color;
    el.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}`;
    el.style.setProperty('--dx', `${dx}px`);
    el.style.setProperty('--dy', `${dy}px`);
    el.style.setProperty('--rot', `${rot}deg`);

    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), SPARKLE_LIFETIME_MS);
}

/* -----------------------------------------------------------------------
   CLEAN, MINIMAL SFX ENGINE (Web Audio API, no assets required)
----------------------------------------------------------------------- */
function useCleanSfx() {
    const ctxRef = useRef<AudioContext | null>(null);

    const getCtx = () => {
        if (!ctxRef.current) {
            const AudioCtx =
                window.AudioContext || (window as any).webkitAudioContext;
            ctxRef.current = new AudioCtx();
        }
        if (ctxRef.current.state === 'suspended') {
            ctxRef.current.resume();
        }
        return ctxRef.current;
    };

    const playTone = (
        freq: number,
        duration: number,
        {
            type = 'sine' as OscillatorType,
            startDelay = 0,
            volume = MASTER_VOLUME,
            filterFreq = 2200,
            glideTo,
        }: {
            type?: OscillatorType;
            startDelay?: number;
            volume?: number;
            filterFreq?: number;
            glideTo?: number;
        } = {}
    ) => {
        try {
            const ctx = getCtx();
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

            if (glideTo) {
                osc.frequency.exponentialRampToValueAtTime(
                    glideTo,
                    ctx.currentTime + startDelay + duration
                );
            }

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(filterFreq, ctx.currentTime);
            filter.Q.value = 0.6;

            gain.gain.setValueAtTime(0.0001, ctx.currentTime + startDelay);
            gain.gain.exponentialRampToValueAtTime(
                volume,
                ctx.currentTime + startDelay + 0.012
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                ctx.currentTime + startDelay + duration
            );

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + startDelay);
            osc.stop(ctx.currentTime + startDelay + duration + 0.02);
        } catch {
            /* audio blocked (no user gesture yet) — fail silently */
        }
    };

    const playNoiseBurst = (
        duration: number,
        {
            startDelay = 0,
            volume = MASTER_VOLUME,
            filterType = 'bandpass' as BiquadFilterType,
            filterFreq = 2000,
            filterFreqEnd,
            Q = 1,
        }: {
            startDelay?: number;
            volume?: number;
            filterType?: BiquadFilterType;
            filterFreq?: number;
            filterFreqEnd?: number;
            Q?: number;
        } = {}
    ) => {
        try {
            const ctx = getCtx();
            const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
            const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < sampleCount; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const source = ctx.createBufferSource();
            source.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = filterType;
            filter.frequency.setValueAtTime(filterFreq, ctx.currentTime + startDelay);
            if (filterFreqEnd) {
                filter.frequency.exponentialRampToValueAtTime(
                    filterFreqEnd,
                    ctx.currentTime + startDelay + duration
                );
            }
            filter.Q.value = Q;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.0001, ctx.currentTime + startDelay);
            gain.gain.exponentialRampToValueAtTime(
                volume,
                ctx.currentTime + startDelay + Math.min(0.015, duration * 0.3)
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                ctx.currentTime + startDelay + duration
            );

            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            source.start(ctx.currentTime + startDelay);
            source.stop(ctx.currentTime + startDelay + duration + 0.02);
        } catch {
            /* audio blocked — fail silently */
        }
    };

    return {
        unlock: () => getCtx(),

        // now a two-note harmonic chime (root + quiet fifth above) instead
        // of a single blip, for a richer feel on every hover
        playHover: (flavor: 'nav' | 'button' | 'card' | 'default' = 'default') => {
            const freqs: Record<string, number> = {
                nav: 660,
                button: 560,
                card: 720,
                default: 600,
            };
            const root = freqs[flavor] ?? 600;
            const fifth = root * 1.5; // perfect fifth above

            playTone(root, 0.1, {
                type: 'sine',
                volume: MASTER_VOLUME * 0.75,
                filterFreq: 1800,
            });
            playTone(fifth, 0.09, {
                type: 'sine',
                startDelay: 0.03,
                volume: MASTER_VOLUME * 0.4,
                filterFreq: 2200,
            });
        },

        playClick: () => {
            playTone(760, 0.08, { type: 'triangle', filterFreq: 2400 });
        },

        playMagneticPress: () => {
            playTone(500, 0.1, { type: 'triangle', filterFreq: 2000 });
            playTone(750, 0.11, {
                type: 'sine',
                startDelay: 0.045,
                filterFreq: 2400,
                volume: MASTER_VOLUME * 0.85,
            });
        },

        playPowerUp: () => {
            [440, 554, 660, 880].forEach((f, i) =>
                playTone(f, 0.18, {
                    type: 'sine',
                    startDelay: i * 0.09,
                    filterFreq: 2600,
                    volume: MASTER_VOLUME * 0.9,
                })
            );
        },

        playSuccess: () => {
            [523, 659, 784].forEach((f, i) =>
                playTone(f, 0.16, {
                    type: 'sine',
                    startDelay: i * 0.1,
                    filterFreq: 2600,
                    volume: MASTER_VOLUME * 0.9,
                })
            );
        },

        playFireworks: () => {
            const ctx = getCtx();

            try {
                const whoosh = ctx.createOscillator();
                const whooshFilter = ctx.createBiquadFilter();
                const whooshGain = ctx.createGain();

                whoosh.type = 'sine';
                whoosh.frequency.setValueAtTime(240, ctx.currentTime);
                whoosh.frequency.exponentialRampToValueAtTime(
                    900,
                    ctx.currentTime + 0.32
                );

                whooshFilter.type = 'lowpass';
                whooshFilter.frequency.setValueAtTime(2400, ctx.currentTime);

                whooshGain.gain.setValueAtTime(0.0001, ctx.currentTime);
                whooshGain.gain.exponentialRampToValueAtTime(
                    MASTER_VOLUME * 0.7,
                    ctx.currentTime + 0.05
                );
                whooshGain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    ctx.currentTime + 0.32
                );

                whoosh.connect(whooshFilter);
                whooshFilter.connect(whooshGain);
                whooshGain.connect(ctx.destination);

                whoosh.start();
                whoosh.stop(ctx.currentTime + 0.34);
            } catch {
                /* ignore */
            }

            playNoiseBurst(0.22, {
                startDelay: 0.3,
                volume: MASTER_VOLUME * 1.6,
                filterType: 'bandpass',
                filterFreq: 3200,
                filterFreqEnd: 1200,
                Q: 0.8,
            });

            playTone(85, 0.28, {
                type: 'sine',
                startDelay: 0.3,
                glideTo: 40,
                filterFreq: 500,
                volume: MASTER_VOLUME * 1.1,
            });

            const crackleCount = 7;
            for (let i = 0; i < crackleCount; i++) {
                const delay = 0.36 + Math.random() * 0.55;
                const dur = 0.03 + Math.random() * 0.05;
                const freq = 2500 + Math.random() * 3000;

                playNoiseBurst(dur, {
                    startDelay: delay,
                    volume: MASTER_VOLUME * (0.35 + Math.random() * 0.25),
                    filterType: 'bandpass',
                    filterFreq: freq,
                    Q: 4,
                });
            }
        },

        playError: () => {
            playTone(320, 0.16, {
                type: 'triangle',
                filterFreq: 1400,
                volume: MASTER_VOLUME,
            });
            playTone(240, 0.2, {
                type: 'triangle',
                startDelay: 0.07,
                filterFreq: 1200,
                volume: MASTER_VOLUME * 0.9,
            });
        },

        playToggle: () =>
            playTone(480, 0.06, {
                type: 'sine',
                filterFreq: 1800,
                volume: MASTER_VOLUME * 0.7,
            }),

        playSectionTick: () =>
            playTone(880, 0.05, {
                type: 'sine',
                filterFreq: 3000,
                volume: MASTER_VOLUME * 0.4,
            }),
    };
}

function hoverFlavorFor(el: Element): 'nav' | 'button' | 'card' | 'default' {
    if (el.closest('.nav-links')) return 'nav';
    if (el.closest('.skill-card') || el.closest('.project-card')) return 'card';
    if (el.closest('.magnetic') || el.tagName === 'BUTTON') return 'button';
    return 'default';
}

export default function UiSfx() {
    const lastHovered = useRef<Element | null>(null);
    const sfx = useCleanSfx();
    const lastMenuOpen = useRef<boolean | null>(null);
    const lastSparkleTime = useRef(0);
    const sparkleTarget = useRef<Element | null>(null);

    /* ---------------- hover + click (delegated) ---------------- */
    useEffect(() => {
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as Element;
            const match = target.closest(INTERACTIVE_SELECTOR);

            if (match && match !== lastHovered.current) {
                lastHovered.current = match;
                sfx.playHover(hoverFlavorFor(match));
                match.classList.add('sfx-glitching');

                window.setTimeout(() => {
                    match.classList.remove('sfx-glitching');
                }, 350);
            }

            if (!match) {
                lastHovered.current = null;
            }

            // sparkle now tracks the same element set as hover sound
            const sparkleMatch = target.closest(SPARKLE_SELECTOR);
            if (sparkleMatch && sparkleMatch !== sparkleTarget.current) {
                sparkleTarget.current = sparkleMatch;
                const rect = sparkleMatch.getBoundingClientRect();
                for (let i = 0; i < 3; i++) {
                    const sx = rect.left + Math.random() * rect.width;
                    const sy = rect.top + Math.random() * rect.height;
                    window.setTimeout(() => spawnSparkle(sx, sy), i * 60);
                }
            } else if (!sparkleMatch) {
                sparkleTarget.current = null;
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!sparkleTarget.current) return;

            const now = performance.now();
            if (now - lastSparkleTime.current < SPARKLE_THROTTLE_MS) return;
            lastSparkleTime.current = now;

            spawnSparkle(e.clientX, e.clientY);
        };

        const onClick = (e: MouseEvent) => {
            const target = e.target as Element;
            const magnetic = target.closest('.magnetic');
            const match = target.closest(INTERACTIVE_SELECTOR);

            if (magnetic) {
                sfx.playMagneticPress();
            } else if (match) {
                sfx.playClick();
            }
        };

        const onFirstGesture = () => {
            sfx.unlock();
            window.removeEventListener('pointerdown', onFirstGesture);
        };

        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('click', onClick);
        window.addEventListener('pointerdown', onFirstGesture);

        return () => {
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('click', onClick);
            window.removeEventListener('pointerdown', onFirstGesture);
        };
    }, [sfx]);

    /* ---------------- preloader finish ---------------- */
    useEffect(() => {
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        let played = false;

        const checkDone = () => {
            const style = window.getComputedStyle(preloader);
            const hidden =
                style.clipPath.includes('100%') ||
                (preloader as HTMLElement).style.clipPath.includes('100%');

            if (hidden && !played) {
                played = true;
                sfx.playPowerUp();
                observer.disconnect();
            }
        };

        const observer = new MutationObserver(checkDone);
        observer.observe(preloader, {
            attributes: true,
            attributeFilter: ['style'],
        });

        const fallback = window.setTimeout(checkDone, 3200);

        return () => {
            observer.disconnect();
            window.clearTimeout(fallback);
        };
    }, [sfx]);

    /* ---------------- contact form success / error ---------------- */
    useEffect(() => {
        const body = document.body;

        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                m.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;

                    if (node.classList?.contains('toast')) {
                        sfx.playFireworks();
                    }

                    if (node.classList?.contains('form-error')) {
                        sfx.playError();
                    }
                });
            }
        });

        observer.observe(body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [sfx]);

    /* ---------------- mobile menu toggle ---------------- */
    useEffect(() => {
        const nav = document.querySelector('.nav-links');
        if (!nav) return;

        const check = () => {
            const isOpen = nav.classList.contains('mobile-open');
            if (lastMenuOpen.current !== null && lastMenuOpen.current !== isOpen) {
                sfx.playToggle();
            }
            lastMenuOpen.current = isOpen;
        };

        check();
        const observer = new MutationObserver(check);
        observer.observe(nav, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, [sfx]);

    /* ---------------- section-enter tick (very subtle, once per section) --- */
    useEffect(() => {
        const sections = document.querySelectorAll('.section, #home, #horizontal-projects');
        if (!sections.length) return;

        const seen = new WeakSet<Element>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !seen.has(entry.target)) {
                        seen.add(entry.target);
                        sfx.playSectionTick();
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [sfx]);

    return (
        <style>{`
      .sfx-glitching {
        animation: sfxGlitch 0.35s steps(2, jump-none) 1;
      }

      @keyframes sfxGlitch {
        0%   { transform: translate(0, 0); filter: none; }
        20%  { transform: translate(-2px, 1px); filter: drop-shadow(-2px 0 #22d3ee) drop-shadow(2px 0 #8b5cf6); }
        40%  { transform: translate(2px, -1px); filter: drop-shadow(2px 0 #22d3ee) drop-shadow(-2px 0 #8b5cf6); }
        60%  { transform: translate(-1px, 0); filter: drop-shadow(-1px 0 #22d3ee) drop-shadow(1px 0 #8b5cf6); }
        80%  { transform: translate(1px, 0); filter: drop-shadow(1px 0 #8b5cf6) drop-shadow(-1px 0 #22d3ee); }
        100% { transform: translate(0, 0); filter: none; }
      }

      .ui-sparkle {
        position: fixed;
        pointer-events: none;
        z-index: 9600;
        clip-path: polygon(
          50% 0%, 61% 35%, 100% 50%, 61% 65%,
          50% 100%, 39% 65%, 0% 50%, 39% 35%
        );
        transform: translate(-50%, -50%) scale(0);
        animation: uiSparklePop 0.62s ease-out forwards;
      }

      @keyframes uiSparklePop {
        0% {
          transform: translate(-50%, -50%) rotate(0deg) scale(0);
          opacity: 1;
        }
        28% {
          transform: translate(-50%, -50%) rotate(var(--rot)) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)))
            rotate(var(--rot)) scale(0);
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .sfx-glitching,
        .ui-sparkle {
          animation: none !important;
          display: none;
        }
      }
    `}</style>
    );
}