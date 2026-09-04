'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface MoteConfig {
  id: number;
  left: string;
  bottom: string;
  symbol: string;
  size: number;
  driftX: number;
  targetY: number;
  duration: number;
  delay: number;
  peakOpacity: number;
}

const MOTES: MoteConfig[] = [
  {
    id: 1,
    left: '10%',
    bottom: '12%',
    symbol: '♡',
    size: 15,
    driftX: 12,
    targetY: -130,
    duration: 5.6,
    delay: 0.3,
    peakOpacity: 0.24,
  },
  {
    id: 2,
    left: '85%',
    bottom: '18%',
    symbol: '✦',
    size: 11,
    driftX: -10,
    targetY: -150,
    duration: 6.4,
    delay: 1.8,
    peakOpacity: 0.28,
  },
  {
    id: 3,
    left: '28%',
    bottom: '8%',
    symbol: '✧',
    size: 13,
    driftX: 14,
    targetY: -140,
    duration: 5.2,
    delay: 3.2,
    peakOpacity: 0.20,
  },
  {
    id: 4,
    left: '74%',
    bottom: '10%',
    symbol: '♡',
    size: 14,
    driftX: -12,
    targetY: -160,
    duration: 6.8,
    delay: 1.0,
    peakOpacity: 0.22,
  },
];

/**
 * InCardMotes micro-motion primitive.
 * Displays 4 soft hearts/sparkles drifting gently upward inside card containers.
 * Low subtle opacity (0.15–0.30), randomized delays, infinite loop.
 *
 * Fully respects prefers-reduced-motion (unmounts).
 * Animate ONLY transform and opacity.
 */
export function InCardMotes() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {MOTES.map((mote) => (
        <motion.span
          key={mote.id}
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0.85,
          }}
          animate={{
            opacity: [0, mote.peakOpacity, mote.peakOpacity * 0.75, 0],
            x: [0, mote.driftX, 0],
            y: [0, mote.targetY * 0.5, mote.targetY],
            scale: [0.85, 1.05, 0.9],
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            delay: mote.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: mote.left,
            bottom: mote.bottom,
            fontSize: `${mote.size}px`,
            lineHeight: 1,
            willChange: 'transform, opacity',
          }}
          className="text-accent-rose select-none font-serif"
        >
          {mote.symbol}
        </motion.span>
      ))}
    </div>
  );
}
