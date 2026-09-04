'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import type { InvitationScene } from '../types';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const PARTICLES: Particle[] = [
  { id: 1, x: 12, y: 16, size: 6, duration: 9, delay: 0.2 },
  { id: 2, x: 26, y: 42, size: 4, duration: 12, delay: 1.5 },
  { id: 3, x: 44, y: 18, size: 7, duration: 8, delay: 2.1 },
  { id: 4, x: 58, y: 62, size: 5, duration: 14, delay: 0.8 },
  { id: 5, x: 72, y: 26, size: 6, duration: 11, delay: 3.0 },
  { id: 6, x: 84, y: 50, size: 4, duration: 10, delay: 1.8 },
  { id: 7, x: 92, y: 20, size: 6, duration: 13, delay: 2.5 },
  { id: 8, x: 8, y: 76, size: 5, duration: 10, delay: 4.1 },
  { id: 9, x: 22, y: 84, size: 7, duration: 12, delay: 0.5 },
  { id: 10, x: 36, y: 70, size: 4, duration: 9, delay: 3.4 },
  { id: 11, x: 64, y: 82, size: 6, duration: 11, delay: 1.2 },
  { id: 12, x: 78, y: 76, size: 5, duration: 13, delay: 2.8 },
  { id: 13, x: 88, y: 90, size: 6, duration: 8, delay: 0.9 },
  { id: 14, x: 48, y: 36, size: 5, duration: 15, delay: 1.7 },
  { id: 15, x: 16, y: 30, size: 6, duration: 11, delay: 3.7 },
  { id: 16, x: 82, y: 14, size: 4, duration: 9, delay: 4.4 },
  { id: 17, x: 32, y: 56, size: 5, duration: 12, delay: 2.2 },
  { id: 18, x: 66, y: 46, size: 6, duration: 10, delay: 3.1 },
];

interface NightStar {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number; // 2.0s - 4.0s
  delay: number;
  glow: string;
}

const NIGHT_STARS: NightStar[] = [
  { id: 1, x: 8, y: 12, size: 2, duration: 2.4, delay: 0.2, glow: 'rgba(255, 255, 255, 0.7)' },
  { id: 2, x: 22, y: 18, size: 3, duration: 3.2, delay: 1.1, glow: 'rgba(253, 224, 71, 0.75)' },
  { id: 3, x: 38, y: 8, size: 2.5, duration: 2.8, delay: 0.6, glow: 'rgba(255, 255, 255, 0.8)' },
  { id: 4, x: 54, y: 22, size: 2, duration: 3.6, delay: 1.8, glow: 'rgba(253, 224, 71, 0.6)' },
  { id: 5, x: 68, y: 14, size: 3.5, duration: 2.2, delay: 0.4, glow: 'rgba(255, 255, 255, 0.9)' },
  { id: 6, x: 82, y: 10, size: 2, duration: 3.8, delay: 2.3, glow: 'rgba(253, 224, 71, 0.7)' },
  { id: 7, x: 94, y: 24, size: 2.5, duration: 2.6, delay: 1.4, glow: 'rgba(255, 255, 255, 0.75)' },
  { id: 8, x: 14, y: 38, size: 3, duration: 3.4, delay: 0.9, glow: 'rgba(253, 224, 71, 0.8)' },
  { id: 9, x: 28, y: 48, size: 2, duration: 2.5, delay: 1.7, glow: 'rgba(255, 255, 255, 0.6)' },
  { id: 10, x: 88, y: 42, size: 3, duration: 3.1, delay: 0.3, glow: 'rgba(253, 224, 71, 0.85)' },
  { id: 11, x: 76, y: 52, size: 2, duration: 2.9, delay: 2.0, glow: 'rgba(255, 255, 255, 0.7)' },
  { id: 12, x: 6, y: 68, size: 2.5, duration: 3.5, delay: 1.2, glow: 'rgba(253, 224, 71, 0.7)' },
  { id: 13, x: 18, y: 80, size: 2, duration: 2.3, delay: 0.8, glow: 'rgba(255, 255, 255, 0.75)' },
  { id: 14, x: 84, y: 74, size: 3, duration: 3.7, delay: 1.6, glow: 'rgba(253, 224, 71, 0.8)' },
  { id: 15, x: 92, y: 86, size: 2, duration: 2.7, delay: 0.5, glow: 'rgba(255, 255, 255, 0.65)' },
  { id: 16, x: 44, y: 42, size: 2, duration: 3.3, delay: 2.5, glow: 'rgba(253, 224, 71, 0.65)' },
  { id: 17, x: 60, y: 36, size: 2.5, duration: 2.6, delay: 1.0, glow: 'rgba(255, 255, 255, 0.8)' },
  { id: 18, x: 34, y: 84, size: 2, duration: 3.9, delay: 0.7, glow: 'rgba(253, 224, 71, 0.75)' },
  { id: 19, x: 72, y: 88, size: 2.5, duration: 2.5, delay: 1.9, glow: 'rgba(255, 255, 255, 0.7)' },
  { id: 20, x: 50, y: 92, size: 2, duration: 3.0, delay: 2.2, glow: 'rgba(253, 224, 71, 0.6)' },
];

interface Firefly {
  id: number;
  left: string;
  top: string;
  pathX: number[];
  pathY: number[];
  opacity: number[];
  scale: number[];
  duration: number;
}

const FIREFLIES: Firefly[] = [
  {
    id: 1,
    left: '20%',
    top: '60%',
    pathX: [0, 48, 20, -38, 0],
    pathY: [0, -35, -68, -22, 0],
    opacity: [0.35, 0.95, 0.45, 0.9, 0.35],
    scale: [0.9, 1.15, 0.85, 1.1, 0.9],
    duration: 9.6,
  },
  {
    id: 2,
    left: '76%',
    top: '52%',
    pathX: [0, -42, -75, -24, 0],
    pathY: [0, -48, -25, -62, 0],
    opacity: [0.4, 0.9, 0.3, 0.95, 0.4],
    scale: [1, 0.85, 1.15, 0.9, 1],
    duration: 11.2,
  },
  {
    id: 3,
    left: '45%',
    top: '70%',
    pathX: [0, 30, -25, 35, 0],
    pathY: [0, -52, -32, -78, 0],
    opacity: [0.3, 0.85, 0.4, 0.95, 0.3],
    scale: [0.85, 1.1, 0.9, 1.15, 0.85],
    duration: 10.4,
  },
];

export function AmbientSky({ scene }: { scene: InvitationScene }) {

  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Determine sky phase
  const isGoldenHour = scene === 'greeting' || scene === 'question';
  const isSunsetBurst = scene === 'celebration';
  const isTwilightNight = scene === 'envelope' || scene === 'plan';

  // Parallax motion tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const cloud1X = useTransform(smoothMouseX, [-1, 1], [-22, 22]);
  const cloud1Y = useTransform(smoothMouseY, [-1, 1], [-18, 18]);
  const cloud2X = useTransform(smoothMouseX, [-1, 1], [26, -26]);
  const cloud2Y = useTransform(smoothMouseY, [-1, 1], [20, -20]);

  useEffect(() => {
    setMounted(true);
    if (reducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      const { innerWidth, innerHeight } = window;
      const normX = (event.clientX / innerWidth) * 2 - 1;
      const normY = (event.clientY / innerHeight) * 2 - 1;
      mouseX.set(normX);
      mouseY.set(normY);
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY, reducedMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none transition-colors duration-1000"
      aria-hidden="true"
    >
      {/* ============================================================ */}
      {/* LAYER 1: GRADIENT MESH (Sky Mood Transitions)                */}
      {/* ============================================================ */}

      {/* 1A: Golden Hour (Greeting / Question) */}
      <motion.div
        initial={false}
        animate={{ opacity: isGoldenHour ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[#FBF7F0]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 45% 20%, rgba(254, 240, 138, 0.45), transparent 48%),
            radial-gradient(circle at 15% 75%, rgba(255, 218, 185, 0.55), transparent 42%),
            radial-gradient(circle at 85% 65%, rgba(233, 213, 255, 0.35), transparent 45%)
          `,
        }}
      />

      {/* 1B: Sunset Burst (Celebration) */}
      <motion.div
        initial={false}
        animate={{ opacity: isSunsetBurst ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[#FFF3EC]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(251, 146, 60, 0.6), transparent 50%),
            radial-gradient(circle at 20% 70%, rgba(244, 63, 94, 0.45), transparent 45%),
            radial-gradient(circle at 80% 45%, rgba(251, 191, 36, 0.55), transparent 40%)
          `,
        }}
      />

      {/* 1C: Twilight / Night (Envelope / Plan) */}
      <motion.div
        initial={false}
        animate={{ opacity: isTwilightNight ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[#0B0F19]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 18%, rgba(49, 46, 129, 0.75), transparent 55%),
            radial-gradient(circle at 85% 75%, rgba(30, 27, 75, 0.85), transparent 50%),
            radial-gradient(circle at 15% 60%, rgba(15, 23, 42, 0.95), transparent 55%)
          `,
        }}
      />

      {/* ============================================================ */}
      {/* LAYER 2: PARALLAX CLOUDS & ATMOSPHERIC MIST                  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cloud Orb 1 (Top Left Drift) */}
        <motion.div
          style={{
            x: cloud1X,
            y: cloud1Y,
            willChange: 'transform',
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  rotate: [0, 8, 0],
                }
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[65px] transition-colors duration-1000 ${
            isTwilightNight
              ? 'bg-indigo-900/40'
              : isSunsetBurst
              ? 'bg-orange-300/40'
              : 'bg-amber-200/35'
          }`}
        />

        {/* Cloud Orb 2 (Bottom Right Drift) */}
        <motion.div
          style={{
            x: cloud2X,
            y: cloud2Y,
            willChange: 'transform',
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  rotate: [0, -6, 0],
                }
          }
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -bottom-24 -right-20 h-[30rem] w-[30rem] rounded-full blur-[75px] transition-colors duration-1000 ${
            isTwilightNight
              ? 'bg-violet-950/45'
              : isSunsetBurst
              ? 'bg-rose-300/40'
              : 'bg-rose-200/30'
          }`}
        />

        {/* Cloud Orb 3 (Center Horizon Light) */}
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.35, 0.65, 0.35],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-72 w-[34rem] rounded-full blur-[80px] transition-colors duration-1000 ${
            isTwilightNight
              ? 'bg-indigo-700/20'
              : isSunsetBurst
              ? 'bg-amber-400/30'
              : 'bg-orange-100/40'
          }`}
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 3: PARTICLE SYSTEM ("The Life")                        */}
      {/* ============================================================ */}
      {mounted && (
        <div className="absolute inset-0">
          {/* Day / Sunset Petals & Dust Motes */}
          {!isTwilightNight &&
            PARTICLES.map((particle) => (
              <motion.div
                key={`petal-${particle.id}`}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size * 1.3,
                  backgroundColor: isSunsetBurst ? '#FDE68A' : '#FBCFE8',
                  opacity: 0.55,
                  borderRadius: '100% 0% 100% 0%',
                  willChange: 'transform, opacity',
                }}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, 24, 0],
                        x: [0, particle.id % 2 === 0 ? 15 : -15, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.3, 0.7, 0.3],
                      }
                }
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

          {/* Twilight / Night State: Twinkling Stars, Wandering Fireflies & Shooting Star */}
          {isTwilightNight && (
            <>
              {/* 1. Staggered randomized opacity twinkle loops (2–4s each) */}
              {NIGHT_STARS.map((star) => (
                <motion.div
                  key={`star-${star.id}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    boxShadow: `0 0 5px 1px ${star.glow}`,
                    willChange: 'transform, opacity',
                  }}
                  animate={
                    reducedMotion
                      ? { opacity: 0.3 }
                      : {
                          opacity: [0.15, 0.95, 0.15],
                          scale: [0.85, 1.25, 0.85],
                        }
                  }
                  transition={{
                    duration: star.duration,
                    delay: star.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* 2. Fireflies: 3 dots wandering on keyframe paths (glow = STATIC radial gradient sprite) */}
              {!reducedMotion &&
                FIREFLIES.map((f) => (
                  <motion.div
                    key={`firefly-${f.id}`}
                    className="pointer-events-none absolute z-0 flex items-center justify-center"
                    style={{
                      left: f.left,
                      top: f.top,
                      width: 32,
                      height: 32,
                      transform: 'translate(-50%, -50%)',
                      willChange: 'transform, opacity',
                    }}
                    animate={{
                      x: f.pathX,
                      y: f.pathY,
                      opacity: f.opacity,
                      scale: f.scale,
                    }}
                    transition={{
                      duration: f.duration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* STATIC radial gradient sprite */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(253, 224, 71, 0.75) 0%, rgba(245, 158, 11, 0.25) 45%, transparent 70%)',
                      }}
                    />
                    {/* Core golden dot */}
                    <div className="relative h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_4px_1px_rgba(253,224,71,0.9)]" />
                  </motion.div>
                ))}

              {/* 3. Shooting Star Streak every ~7s (opacity in/out, transform only) */}
              {!reducedMotion && (
                <motion.div
                  className="pointer-events-none absolute left-[18%] top-[12%] z-0"
                  style={{
                    willChange: 'transform, opacity',
                  }}
                  animate={{
                    x: [-30, 250],
                    y: [-18, 155],
                    opacity: [0, 0, 0.95, 0.9, 0],
                    scaleX: [0.1, 0.8, 1, 0.2],
                  }}
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    repeatDelay: 6.15, // 0.85s flight + 6.15s delay = 7.0s cycle
                    ease: 'easeOut',
                  }}
                >
                  <div
                    className="h-[2px] w-28 -rotate-[32deg] rounded-full origin-right"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 40%, rgba(254, 240, 138, 0.95) 90%, #FFFFFF 100%)',
                      boxShadow: '0 0 6px 1px rgba(253, 224, 71, 0.7)',
                    }}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
