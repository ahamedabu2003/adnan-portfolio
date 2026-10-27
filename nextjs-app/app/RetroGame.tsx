'use client';

/**
 * RetroGame.tsx
 * -----------------------------------------------------------------------
 * A hidden Konami-code easter egg for the portfolio.
 *
 * HOW IT WORKS
 * 1. <RetroGame /> renders nothing by default. It just listens for the
 *    Konami sequence: ↑ ↑ ↓ ↓ ← → ← → B A
 * 2. Once entered, a full-screen retro arcade overlay appears with an
 *    endless "dodge the block" runner — jump with Space / ↑ / tap.
 * 3. All sound effects (jump, score tick, hit, game-over) are synthesized
 *    live with the Web Audio API — no external mp3/wav files to host,
 *    so nothing to break or slow-load. If you'd rather use real chiptune
 *    samples, swap the playTone() calls for <audio> elements generated
 *    at https://pro.sfxr.me/ and drop the files in /public/sfx/.
 *
 * INTEGRATION (in HomeClient.tsx)
 *   import RetroGame from './RetroGame';
 *   ...
 *   return (
 *     <div ref={root} className="portfolio-root">
 *       ...
 *       <RetroGame />
 *     </div>
 *   );
 *
 * That's it — no other wiring needed. It's fully self-contained.
 * -----------------------------------------------------------------------
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const KONAMI_SEQUENCE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

/* -----------------------------------------------------------------------
   TINY 8-BIT SFX ENGINE (Web Audio API, no assets required)
----------------------------------------------------------------------- */
function useChiptuneSfx() {
    const ctxRef = useRef<AudioContext | null>(null);

    const getCtx = useCallback(() => {
        if (!ctxRef.current) {
            const AudioCtx =
                window.AudioContext || (window as any).webkitAudioContext;
            ctxRef.current = new AudioCtx();
        }
        if (ctxRef.current.state === 'suspended') {
            ctxRef.current.resume();
        }
        return ctxRef.current;
    }, []);

    const playTone = useCallback(
        (
            freq: number,
            duration: number,
            type: OscillatorType = 'square',
            startDelay = 0,
            volume = 0.08
        ) => {
            try {
                const ctx = getCtx();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

                gain.gain.setValueAtTime(volume, ctx.currentTime + startDelay);
                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    ctx.currentTime + startDelay + duration
                );

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + startDelay);
                osc.stop(ctx.currentTime + startDelay + duration);
            } catch {
                /* audio not available (e.g. autoplay blocked) — fail silently */
            }
        },
        [getCtx]
    );

    return {
        unlock: () => getCtx(),
        playUnlock: () => {
            // ascending power-up arpeggio
            [392, 523, 659, 784].forEach((f, i) =>
                playTone(f, 0.14, 'square', i * 0.09, 0.07)
            );
        },
        playJump: () => playTone(520, 0.11, 'square', 0, 0.07),
        playScore: () => playTone(880, 0.07, 'square', 0, 0.05),
        playHit: () => {
            playTone(180, 0.28, 'sawtooth', 0, 0.09);
            playTone(90, 0.32, 'sawtooth', 0.05, 0.08);
        },
        playMenuBlip: () => playTone(660, 0.05, 'square', 0, 0.04),
    };
}

/* -----------------------------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------------------------- */
export default function RetroGame() {
    const [unlocked, setUnlocked] = useState(false);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<'ready' | 'playing' | 'over'>('ready');
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const progressRef = useRef(0);
    const sfx = useChiptuneSfx();

    /* ---------------- prime audio on first user gesture ---------------- */
    useEffect(() => {
        // Browsers only count specific gesture types as "user activation" for
        // audio, and it varies by browser (Safari/iOS is picky about which
        // ones count). Listen broadly and keep retrying resume() on each of
        // these until the AudioContext actually reports 'running'.
        const GESTURE_EVENTS = ['pointerdown', 'click', 'touchstart', 'keydown'];

        const onFirstGesture = () => {
            const ctx = sfx.unlock();
            if (ctx && ctx.state === 'running') {
                GESTURE_EVENTS.forEach((evt) =>
                    window.removeEventListener(evt, onFirstGesture)
                );
            }
        };

        GESTURE_EVENTS.forEach((evt) =>
            window.addEventListener(evt, onFirstGesture, { passive: true })
        );

        return () => {
            GESTURE_EVENTS.forEach((evt) =>
                window.removeEventListener(evt, onFirstGesture)
            );
        };
    }, [sfx]);

    /* ---------------- Konami code listener ---------------- */
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            const expected = KONAMI_SEQUENCE[progressRef.current];

            if (key === expected) {
                progressRef.current += 1;

                if (progressRef.current === KONAMI_SEQUENCE.length) {
                    progressRef.current = 0;
                    setUnlocked(true);
                    setOpen(true);
                    setStatus('ready');
                    sfx.unlock();
                    sfx.playUnlock();
                }
            } else {
                progressRef.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [sfx]);

    /* ---------------- Game loop ---------------- */
    useEffect(() => {
        if (!open || status !== 'playing') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const groundY = H - 46;

        const player = { x: 60, y: groundY, w: 26, h: 32, vy: 0, jumping: false };
        const gravity = 0.85;
        const jumpForce = -13.5;

        let obstacles: { x: number; w: number; h: number; passed: boolean }[] =
            [];
        let speed = 5.2;
        let frame = 0;
        let localScore = 0;
        let raf = 0;
        let dead = false;

        const spawnObstacle = () => {
            const h = 26 + Math.random() * 26;
            obstacles.push({ x: W + 20, w: 18 + Math.random() * 10, h, passed: false });
        };

        const doJump = () => {
            if (!player.jumping && !dead) {
                player.vy = jumpForce;
                player.jumping = true;
                sfx.playJump();
            }
        };

        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.key === 'ArrowUp') {
                e.preventDefault();
                doJump();
            }
        };
        const onTap = () => doJump();

        window.addEventListener('keydown', onKey);
        canvas.addEventListener('pointerdown', onTap);

        const loop = () => {
            frame++;

            // difficulty ramps up slowly
            speed = Math.min(10, 5.2 + localScore * 0.04);

            if (frame % Math.max(38, 70 - Math.floor(localScore / 2)) === 0) {
                spawnObstacle();
            }

            // physics
            player.vy += gravity;
            player.y += player.vy;
            if (player.y > groundY) {
                player.y = groundY;
                player.vy = 0;
                player.jumping = false;
            }

            // move obstacles + collision + scoring
            obstacles.forEach((o) => {
                o.x -= speed;

                const px = player.x,
                    py = player.y,
                    pw = player.w,
                    ph = player.h;
                const ox = o.x,
                    oy = groundY + 32 - o.h,
                    ow = o.w,
                    oh = o.h;

                const hit =
                    px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy;

                if (hit && !dead) {
                    dead = true;
                    sfx.playHit();
                    setStatus('over');
                    setBest((b) => Math.max(b, localScore));
                }

                if (!o.passed && o.x + o.w < player.x) {
                    o.passed = true;
                    localScore += 1;
                    setScore(localScore);
                    if (localScore % 5 === 0) sfx.playScore();
                }
            });

            obstacles = obstacles.filter((o) => o.x + o.w > -20);

            // ---- draw ----
            ctx.clearRect(0, 0, W, H);

            // bg grid
            ctx.strokeStyle = 'rgba(139,92,246,0.12)';
            ctx.lineWidth = 1;
            for (let gx = 0; gx < W; gx += 28) {
                ctx.beginPath();
                ctx.moveTo(gx, 0);
                ctx.lineTo(gx, H);
                ctx.stroke();
            }

            // ground
            const groundGrad = ctx.createLinearGradient(0, groundY + 32, 0, H);
            groundGrad.addColorStop(0, '#8b5cf6');
            groundGrad.addColorStop(1, '#050505');
            ctx.fillStyle = groundGrad;
            ctx.fillRect(0, groundY + 32, W, H - (groundY + 32));

            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(0, groundY + 32, W, 2);

            // player (pixel block with glow)
            ctx.shadowColor = '#22d3ee';
            ctx.shadowBlur = dead ? 0 : 14;
            ctx.fillStyle = dead ? '#3f3f46' : '#22d3ee';
            ctx.fillRect(player.x, player.y, player.w, player.h);
            ctx.shadowBlur = 0;

            // eye pixel for character
            ctx.fillStyle = '#050505';
            ctx.fillRect(player.x + player.w - 8, player.y + 6, 4, 4);

            // obstacles
            ctx.fillStyle = '#f4f4f0';
            ctx.shadowColor = '#8b5cf6';
            ctx.shadowBlur = 8;
            obstacles.forEach((o) => {
                ctx.fillRect(o.x, groundY + 32 - o.h, o.w, o.h);
            });
            ctx.shadowBlur = 0;

            // score HUD
            ctx.fillStyle = '#f4f4f0';
            ctx.font = '12px "DM Mono", monospace';
            ctx.fillText(`SCORE ${String(localScore).padStart(4, '0')}`, 16, 24);
            ctx.fillStyle = '#8b5cf6';
            ctx.fillText(`BEST  ${String(best).padStart(4, '0')}`, 16, 40);

            if (!dead) {
                raf = requestAnimationFrame(loop);
            }
        };

        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('keydown', onKey);
            canvas.removeEventListener('pointerdown', onTap);
        };
    }, [open, status, sfx, best]);

    const startGame = () => {
        setScore(0);
        setStatus('playing');
        sfx.playMenuBlip();
    };

    const closeGame = () => {
        setOpen(false);
        setStatus('ready');
        sfx.playMenuBlip();
    };

    return (
        <>
            <style>{`
        .retro-fab {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 9500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px 12px 14px;
          border-radius: 999px;
          border: 1px solid rgba(34,211,238,.35);
          background: rgba(10,10,10,.85);
          backdrop-filter: blur(10px);
          color: #22d3ee;
          cursor: pointer;
          box-shadow: 0 0 24px rgba(34,211,238,.25);
          animation: retro-pulse 2.2s infinite;
        }

        .retro-fab-icon {
          font-size: 18px;
          line-height: 1;
        }

        .retro-fab-label {
          font: 10px 'DM Mono', monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #f4f4f0;
        }

        @keyframes retro-pulse {
          0%, 100% { box-shadow: 0 0 14px rgba(34,211,238,.2); }
          50% { box-shadow: 0 0 28px rgba(139,92,246,.4); }
        }

        .retro-overlay {
          position: fixed;
          inset: 0;
          z-index: 10050;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          background: rgba(4,4,6,.94);
          backdrop-filter: blur(6px);
          font-family: 'DM Mono', monospace;
          color: #f4f4f0;
        }

        .retro-title {
          font-size: clamp(1.4rem, 4vw, 2.4rem);
          letter-spacing: -0.03em;
          background: linear-gradient(100deg, #8b5cf6, #22d3ee);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-transform: uppercase;
        }

        .retro-sub {
          font-size: 11px;
          letter-spacing: .12em;
          color: #85858d;
          text-transform: uppercase;
        }

        .retro-canvas-wrap {
          position: relative;
          border: 1px solid rgba(34,211,238,.3);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(139,92,246,.18);
        }

        .retro-canvas {
          display: block;
          background: #070708;
          touch-action: none;
        }

        .retro-btn {
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(34,211,238,.4);
          background: transparent;
          color: #22d3ee;
          font: 11px 'DM Mono', monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: .25s ease;
        }

        .retro-btn:hover {
          background: rgba(34,211,238,.1);
        }

        .retro-btn.primary {
          background: linear-gradient(100deg, #8b5cf6, #22d3ee);
          color: #050505;
          border: none;
          font-weight: 700;
        }

        .retro-close {
          position: absolute;
          top: 22px;
          right: 22px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.15);
          background: transparent;
          color: #f4f4f0;
          cursor: pointer;
          font-size: 16px;
        }

        .retro-status {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          background: rgba(5,5,6,.72);
          text-align: center;
          padding: 20px;
        }

        .retro-controls {
          font-size: 10px;
          color: #85858d;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
      `}</style>

            {/* Always-visible play button. The Konami code (↑↑↓↓←→←→BA) still
          works too, as a bonus secret way in — this is just the direct,
          discoverable route for everyone else. */}
            {!open && (
                <button
                    className="retro-fab"
                    onClick={() => {
                        setOpen(true);
                        setStatus('ready');
                        sfx.unlock();
                        sfx.playMenuBlip();
                    }}
                    aria-label="Play the hidden arcade game"
                    title="Play arcade game"
                >
                    <span className="retro-fab-icon">🕹️</span>
                    <span className="retro-fab-label">Play</span>
                </button>
            )}

            {open && (
                <div className="retro-overlay">
                    <button className="retro-close" onClick={closeGame} aria-label="Close">
                        ✕
                    </button>

                    <div className="retro-title">SECRET.ARCADE</div>
                    <div className="retro-sub">// konami code accepted</div>

                    <div className="retro-canvas-wrap">
                        <canvas
                            ref={canvasRef}
                            width={520}
                            height={260}
                            className="retro-canvas"
                        />

                        {status !== 'playing' && (
                            <div className="retro-status">
                                {status === 'ready' && (
                                    <>
                                        <div style={{ fontSize: 13, color: '#f4f4f0' }}>
                                            DODGE THE BLOCKS
                                        </div>
                                        <div className="retro-controls">
                                            Space / ↑ / Tap to jump
                                        </div>
                                        <button className="retro-btn primary" onClick={startGame}>
                                            Start Game
                                        </button>
                                    </>
                                )}

                                {status === 'over' && (
                                    <>
                                        <div style={{ fontSize: 13, color: '#fb7185' }}>
                                            GAME OVER
                                        </div>
                                        <div className="retro-controls">
                                            Score {score} · Best {Math.max(best, score)}
                                        </div>
                                        <button className="retro-btn primary" onClick={startGame}>
                                            Retry
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <button className="retro-btn" onClick={closeGame}>
                        Back to portfolio
                    </button>
                </div>
            )}
        </>
    );
}