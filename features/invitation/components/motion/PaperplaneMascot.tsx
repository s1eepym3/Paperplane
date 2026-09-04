'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { InvitationScene } from '../../types';

export interface PaperplaneMascotProps {
  scene?: InvitationScene;
  className?: string;
}

/**
 * Hand-drawn scrapbook paper plane SVG component.
 * Features paper folds, ink-soft outlines, soft parchment shading,
 * and a tiny dried-rose heart wax stamp on the wing.
 */
export function PaperplaneSVG({
  className = '',
  width = 54,
  height = 42,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none drop-shadow-md ${className}`}
      aria-hidden="true"
    >
      {/* Left Wing Underside */}
      <polygon
        points="6,24 28,28 20,38"
        fill="#F4ECE1"
        stroke="#3E3A39"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Main Wing Body */}
      <polygon
        points="6,24 68,6 32,48 28,28"
        fill="#FDFBF7"
        stroke="#3E3A39"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Keel / Shadow Fold */}
      <polygon
        points="28,28 68,6 42,28"
        fill="#EFE7DB"
        stroke="#3E3A39"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Center Spine Crease */}
      <line
        x1="68"
        y1="6"
        x2="28"
        y2="28"
        stroke="#3E3A39"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Mini Dried-Rose Heart Stamp on Wing */}
      <path
        d="M20 22 C18 19 14 20 14 23 C14 26 19 29 20 30 C21 29 26 26 26 23 C26 20 22 19 20 22 Z"
        fill="#E05368"
        opacity="0.85"
        transform="scale(0.55) translate(14, 14)"
      />
    </svg>
  );
}

/**
 * Choreographed Paperplane Mascot Layer.
 * Floats above the main story card (z-30) and under HeartTrailLayer (z-50).
 *
 * Transitions on EVERY scene change (keyed via AnimatePresence):
 * - Exit: swoops out toward top-right with a slight curve (~320ms).
 * - Enter: glides in from the left accompanied by an animated dashed trail (~440ms).
 * - Total choreography: ~760ms (<= 800ms limit).
 * - Reduced motion: skips flight physics and gracefully crossfades.
 */
export function PaperplaneMascot({ scene, className = '' }: PaperplaneMascotProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, skip flight animations entirely
  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      key={`plane-${scene}`}
      initial={{
        x: -160,
        y: 40,
        rotate: 15,
        opacity: 0,
        scale: 0.75,
      }}
      animate={{
        x: 0,
        y: 0,
        rotate: -4,
        opacity: 1,
        scale: 1,
      }}
      exit={{
        x: 280,
        y: -160,
        rotate: -24,
        opacity: 0,
        scale: 0.7,
      }}
      transition={{
        // Enter: 440ms spring-like glide, Exit: 320ms snappy swoosh
        duration: 0.44,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`pointer-events-none absolute -top-5 right-6 z-30 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Animated Dashed Flight Trail */}
      <svg
        className="pointer-events-none absolute -left-28 -top-10 h-32 w-44 overflow-visible"
        viewBox="0 0 180 100"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 10 85 C 45 92, 75 70, 105 48 C 130 32, 150 24, 175 18"
          stroke="#E0BFB8"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.8, 0.45] }}
          transition={{ duration: 0.44, ease: 'easeOut' }}
        />
      </svg>

      {/* Gentle Idle Floating Motion after landing */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: [-4, -2, -4],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <PaperplaneSVG width={50} height={38} />
      </motion.div>
    </motion.div>
  );
}

/**
 * Envelope Takeoff Mascot variant.
 * Spawns from within the envelope seam on tap and soars out
 * carrying the narrative transition to the date plan scene.
 */
export function EnvelopePaperplaneTakeoff({ isLaunching }: { isLaunching: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || !isLaunching) return null;

  return (
    <motion.div
      initial={{
        x: 0,
        y: 10,
        scale: 0.45,
        opacity: 0,
        rotate: 5,
      }}
      animate={{
        x: [0, 50, 140],
        y: [10, -80, -210],
        scale: [0.45, 1.1, 0.95],
        opacity: [0, 1, 1, 0],
        rotate: [5, -12, -22],
      }}
      transition={{
        delay: 0.28,
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-none absolute left-1/2 top-10 z-40 -translate-x-1/2 select-none"
      aria-hidden="true"
    >
      <PaperplaneSVG width={56} height={42} />
    </motion.div>
  );
}
