'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React, { type ReactNode } from 'react';

interface BreathingButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * BreathingButton wrapper component.
 * Adds a gentle idle breathing loop (scale 1 → 1.03 → 1, ~2.6s, easeInOut, infinite)
 * while strictly preserving child hover-lift classes and click handlers.
 *
 * Automatically falls back to static scale 1 when prefers-reduced-motion is active.
 * Only animates transform (scale) on the GPU.
 */
export function BreathingButton({ children, className = '', style }: BreathingButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? { scale: 1 }
          : { scale: [1, 1.03, 1] }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 2.6,
              ease: 'easeInOut',
              repeat: Infinity,
            }
      }
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'center center',
        willChange: shouldReduceMotion ? 'auto' : 'transform',
        ...style,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
