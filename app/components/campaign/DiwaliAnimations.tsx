'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Fireworks Canvas ────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function FireworksCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const COLORS = ['#FF7800', '#FFA800', '#FFD700', '#FF4500', '#FFB347', '#FFFACD'];
    const particles: Particle[] = [];
    let animId: number;
    let launched = 0;

    const burst = (cx: number, cy: number) => {
      const count = 32 + Math.floor(Math.random() * 20);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 1.4 + Math.random() * 2.8;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2 + Math.random() * 2.5,
        });
      }
    };

    // Launch 4 fireworks on arrival, staggered
    const launches = [
      { x: W * 0.18, y: H * 0.35, delay: 300 },
      { x: W * 0.78, y: H * 0.28, delay: 700 },
      { x: W * 0.50, y: H * 0.20, delay: 1100 },
      { x: W * 0.85, y: H * 0.50, delay: 1500 },
    ];

    const timers = launches.map((l) =>
      window.setTimeout(() => {
        burst(l.x, l.y);
        launched++;
      }, l.delay)
    );

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.alpha -= 0.015;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // Keep animating until all launched and all settled
      if (particles.length > 0 || launched < launches.length) {
        animId = requestAnimationFrame(draw);
      }
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ display: 'block' }}
    />
  );
}

/* ─── Floating Golden Particles ─────────────────────────────────── */

export function FloatingParticles() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.3) % 90}%`,
    top: `${10 + (i * 7.7) % 80}%`,
    size: 2 + (i % 4),
    delay: (i * 0.37) % 4,
    duration: 4 + (i % 3) * 1.5,
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? '#FFA800' : p.id % 3 === 1 ? '#FF7800' : '#FFD700',
            animation: `diwali-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── String Lights ──────────────────────────────────────────────── */

export function StringLights() {
  const reduced = useReducedMotion();
  const colors = ['#FF7800', '#FFA800', '#FFD700', '#FF4500', '#FFB347', '#FF7800', '#FFD700', '#FFA800'];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden">
      {/* Wire */}
      <svg
        viewBox="0 0 1200 80"
        className="w-full"
        style={{ height: 80 }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 Q100,50 200,20 Q300,50 400,20 Q500,50 600,20 Q700,50 800,20 Q900,50 1000,20 Q1100,50 1200,20"
          fill="none"
          stroke="rgba(255,168,0,0.3)"
          strokeWidth="1.5"
        />
        {Array.from({ length: 14 }, (_, i) => {
          const cx = (i / 13) * 1200;
          const cy = 20 + Math.sin((i / 13) * Math.PI) * 14;
          const color = colors[i % colors.length];
          const delay = (i * 0.22) % 2;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={cx} y2={cy + 12} stroke="rgba(255,168,0,0.25)" strokeWidth="1" />
              <ellipse
                cx={cx}
                cy={cy + 18}
                rx="5"
                ry="7"
                fill={color}
                style={{
                  filter: 'blur(0.5px)',
                  animation: reduced ? 'none' : `diwali-glow 1.8s ease-in-out ${delay}s infinite`,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Diya ───────────────────────────────────────────────────────── */

export function Diya({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className={`relative inline-block ${className}`}>
      {/* Bowl */}
      <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
        <ellipse cx="24" cy="24" rx="20" ry="8" fill="#C87052" />
        <ellipse cx="24" cy="22" rx="20" ry="7" fill="#E8905A" />
        <ellipse cx="24" cy="20" rx="18" ry="5.5" fill="#F0A870" />
        {/* Wick */}
        <rect x="23" y="10" width="2" height="10" rx="1" fill="#8B4513" />
        {/* Flame */}
        <ellipse
          cx="24"
          cy="8"
          rx="3.5"
          ry="6"
          fill="url(#flame-grad)"
          style={{
            transformOrigin: '24px 14px',
            animation: reduced ? 'none' : 'diwali-flame 1.2s ease-in-out infinite',
          }}
        />
        <defs>
          <radialGradient id="flame-grad" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FF7800" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,168,0,0.4) 0%, transparent 70%)',
          animation: reduced ? 'none' : 'diwali-glow 1.2s ease-in-out infinite',
        }}
      />
    </div>
  );
}

/* ─── Global keyframes injected once ────────────────────────────── */

export function DiwaliKeyframes() {
  return (
    <style>{`
      @media (prefers-reduced-motion: no-preference) {
        @keyframes diwali-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-14px) scale(1.2); opacity: 0.7; }
        }
        @keyframes diwali-glow {
          0%, 100% { opacity: 0.7; filter: blur(0px); }
          50% { opacity: 1; filter: blur(1px) brightness(1.3); }
        }
        @keyframes diwali-flame {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(-2deg); }
          50% { transform: scaleX(0.85) scaleY(1.12) rotate(2deg); }
        }
        @keyframes diwali-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,168,0,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(255,168,0,0); }
        }
        @keyframes diwali-card-glow {
          0%, 100% { box-shadow: 0 0 24px rgba(255,120,0,0.25), 0 0 0 1px rgba(255,168,0,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,168,0,0.45), 0 0 0 1px rgba(255,200,0,0.5); }
        }
        @keyframes diwali-shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      }
    `}</style>
  );
}
