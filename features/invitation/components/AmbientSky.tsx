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

          {/* Twilight / Night Twinkling Stars & Fireflies */}
          {isTwilightNight &&
            PARTICLES.map((star) => (
              <motion.div
                key={`star-${star.id}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: Math.max(2, star.size * 0.5),
                  height: Math.max(2, star.size * 0.5),
                  boxShadow:
                    star.id % 3 === 0
                      ? '0 0 6px 1px rgba(253, 224, 71, 0.7)'
                      : '0 0 4px 1px rgba(255, 255, 255, 0.6)',
                  willChange: 'transform, opacity',
                }}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: [0.15, 0.95, 0.15],
                        scale: [0.8, 1.35, 0.8],
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: star.duration * 0.45,
                  delay: star.delay * 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}
