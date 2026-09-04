'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface HeartParticle {
  id: string;
  x: number;
  y: number;
  deltaY: number; // 40-60px upward drift
  deltaX: number; // natural lateral drift (-8 to +8px)
  duration: number; // 0.60 to 0.90s
  size: number; // 14-20px
  rotate: number; // -15 to +15 deg
}

/**
 * HeartTrailLayer micro-motion primitive.
 * Spawns floating heart particles at touch/pointer-down coordinates.
 * Rises 40–60px, scales 0.8 → 1.2, fades out over 600–900ms, and unmounts cleanly.
 * Strictly capped at 12 concurrent hearts.
 *
 * Fully respects prefers-reduced-motion (unmounts/disables).
 * Only animates transform and opacity on the GPU.
 */
export function HeartTrailLayer() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const counterRef = useRef(0);

  const removeHeart = useCallback((id: string) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== id));
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Avoid spawning if coordinates are somehow invalid
      if (typeof e.clientX !== 'number' || typeof e.clientY !== 'number') return;

      const id = `${Date.now()}-${++counterRef.current}`;
      const deltaY = 40 + Math.random() * 20; // 40–60px upward
      const deltaX = (Math.random() - 0.5) * 16; // -8px to +8px drift
      const duration = 0.6 + Math.random() * 0.3; // 600ms–900ms
      const size = 14 + Math.random() * 6; // 14–20px
      const rotate = (Math.random() - 0.5) * 30; // -15 to +15 deg

      const newHeart: HeartParticle = {
        id,
        x: e.clientX,
        y: e.clientY,
        deltaY,
        deltaX,
        duration,
        size,
        rotate,
      };

      setHearts((prev) => {
        // Enforce max 12 concurrent hearts by trimming older particles
        const current = prev.length >= 12 ? prev.slice(prev.length - 11) : prev;
        return [...current, newHeart];
      });
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [shouldReduceMotion]);

  // Safety GC for inactive/backgrounded tabs
  useEffect(() => {
    if (hearts.length === 0) return;

    const gcTimer = setTimeout(() => {
      const now = Date.now();
      setHearts((prev) =>
        prev.filter((h) => {
          const timestamp = parseInt(h.id.split('-')[0], 10);
          return now - timestamp < 1500;
        })
      );
    }, 1200);

    return () => clearTimeout(gcTimer);
  }, [hearts]);

  if (shouldReduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            initial={{
              opacity: 0.9,
              scale: 0.8,
              x: heart.x,
              y: heart.y,
              rotate: heart.rotate,
            }}
            animate={{
              opacity: 0,
              scale: 1.2,
              x: heart.x + heart.deltaX,
              y: heart.y - heart.deltaY,
              rotate: heart.rotate * 1.5,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onAnimationComplete={() => removeHeart(heart.id)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              fontSize: `${heart.size}px`,
              lineHeight: 1,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform, opacity',
            }}
            className="text-roseDeep/85 font-serif select-none pointer-events-none"
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
