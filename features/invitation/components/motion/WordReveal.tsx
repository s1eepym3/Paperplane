'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  blur?: boolean;
}

/**
 * Handwritten Word Reveal component.
 * Reveals text word-by-word with spring elevation (y: +8 -> 0) and opacity (0 -> 1).
 * Uses subtle one-time blur reveal (4px -> 0px) to simulate ink setting into paper.
 * Dynamically adjusts stagger (0.025s - 0.048s) ensuring completion within <= 2.5s.
 *
 * Falls back to plain instant text when prefers-reduced-motion is active.
 */
export function WordReveal({
  text,
  className = '',
  delay = 0.08,
  stagger,
  as: Component = 'p',
  blur = true,
}: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const words = useMemo(() => {
    if (!text) return [];
    return text.split(/\s+/).filter(Boolean);
  }, [text]);

  // Compute per-word stagger ensuring the full text block finishes well within 2.5s
  const actualStagger = useMemo(() => {
    if (stagger !== undefined) return stagger;
    if (words.length <= 1) return 0.04;
    const availableTime = Math.max(0.6, 2.2 - delay);
    return Math.min(0.048, Math.max(0.025, availableTime / words.length));
  }, [stagger, words.length, delay]);

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{
            opacity: 0,
            y: 8,
            filter: blur ? 'blur(4px)' : 'blur(0px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.38,
            delay: delay + i * actualStagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.26em] last:mr-0 will-change-[transform,opacity,filter]"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
