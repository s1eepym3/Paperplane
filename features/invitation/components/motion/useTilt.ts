'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'framer-motion';

export interface UseTiltReturn {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

/**
 * useTilt hook for scrapbook card micro-motion.
 * Returns rotateX and rotateY motion values (clamped to ±maxDegrees, default 4deg)
 * smoothed via useSpring (stiffness: 150, damping: 20).
 *
 * Disabled (holds static 0) on coarse pointers (mobile/touch) or when prefers-reduced-motion is active.
 */
export function useTilt(maxDegrees = 4): UseTiltReturn {
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check coarse pointer media query (mobile / touch screen)
    const isCoarsePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;

    // Inactive if coarse pointer or user prefers reduced motion
    if (isCoarsePointer || shouldReduceMotion) {
      rawRotateX.set(0);
      rawRotateY.set(0);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth <= 0 || innerHeight <= 0) return;

      // Normalized coordinates: -1 to +1 from screen center
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      // Tilting: cursor moving down tilts top away (-rotateX); cursor moving right tilts right side (+rotateY)
      rawRotateX.set(-clampedY * maxDegrees);
      rawRotateY.set(clampedX * maxDegrees);
    };

    const handleReset = () => {
      rawRotateX.set(0);
      rawRotateY.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', handleReset);
    document.addEventListener('mouseleave', handleReset);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', handleReset);
      document.removeEventListener('mouseleave', handleReset);
    };
  }, [maxDegrees, rawRotateX, rawRotateY, shouldReduceMotion]);

  return { rotateX, rotateY };
}
