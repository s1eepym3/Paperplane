'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { InCardMotes } from './motion/InCardMotes';


interface BurstParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
  rotate: number;
}

export function CelebrationScene({ receiverName }: { receiverName: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<BurstParticle[]>([]);
  const [showShockwave, setShowShockwave] = useState(true);

  useEffect(() => {
    // Optional mobile haptic pattern: short, medium, short
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([10, 40, 10]);
      } catch {
        // Silently ignore if vibration permission is denied by browser policy
      }
    }

    if (shouldReduceMotion) return;

    // Generate 16 radial burst particles (hearts + petals + gold sparkles)
    const particleTypes = [
      { symbol: '♥', color: 'text-roseDeep' },
      { symbol: '🌸', color: 'text-accent-rose' },
      { symbol: '✦', color: 'text-gold-foil' },
      { symbol: '♡', color: 'text-roseDeep/80' },
      { symbol: '✿', color: 'text-sunset-peach' },
      { symbol: '✧', color: 'text-gold-foil' },
    ];

    const generated: BurstParticle[] = Array.from({ length: 16 }, (_, i) => {
      const baseAngle = (i / 16) * 360;
      const jitter = (Math.random() - 0.5) * 16;
      const rad = ((baseAngle + jitter) * Math.PI) / 180;
      const distance = 85 + Math.random() * 85; // 85px to 170px radial reach
      const type = particleTypes[i % particleTypes.length];

      return {
        id: i,
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance,
        symbol: type.symbol,
        color: type.color,
        size: 15 + (i % 3) * 4,
        rotate: (Math.random() - 0.5) * 60,
      };
    });

    setParticles(generated);

    // Unmount particles and shockwave after completion
    const cleanupTimer = setTimeout(() => {
      setParticles([]);
      setShowShockwave(false);
    }, 1050);

    return () => clearTimeout(cleanupTimer);
  }, [shouldReduceMotion]);

  return (
    <section className="relative flex min-h-[34rem] flex-col items-center justify-center text-center py-6">
      {/* Background drifting ambient motes */}
      <InCardMotes />

      {/* Emblem Center with Burst Physics & Shockwave Ring */}
      <div className="relative mb-8 flex items-center justify-center z-10">
        {/* Soft Shockwave Ring: scale 0 -> 1.6 with opacity fade */}
        {showShockwave && !shouldReduceMotion && (
          <motion.div
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute h-28 w-28 rounded-full border-2 border-sunset-peach/70 shadow-sm"
            aria-hidden="true"
          />
        )}

        {/* Radial Burst Particles (16 particles: hearts, petals, gold sparkles) */}
        {!shouldReduceMotion &&
          particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0.2, 1.25, 0.85],
                opacity: [1, 1, 0],
                rotate: p.rotate,
              }}
              transition={{
                duration: 0.95,
                ease: [0.15, 0.85, 0.35, 1], // spring decay
              }}
              style={{
                position: 'absolute',
                fontSize: `${p.size}px`,
                lineHeight: 1,
                willChange: 'transform, opacity',
              }}
              className={`pointer-events-none select-none font-serif ${p.color}`}
              aria-hidden="true"
            >
              {p.symbol}
            </motion.span>
          ))}

        {/* Pulsing Wax Seal Heart Emblem with Heartbeat Keyframes [1, 1.25, 0.95, 1.1, 1] (~900ms) */}
        <motion.div
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { scale: 1, rotate: 0, opacity: 1 }
              : {
                  scale: [1, 1.25, 0.95, 1.1, 1],
                  rotate: 0,
                  opacity: 1,
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : {
                  duration: 0.9,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: 'easeInOut',
                }
          }
          className="relative h-24 w-24 rounded-full border-2 border-dashed border-amber-200/70 bg-roseDeep p-2 shadow-lift flex items-center justify-center"
        >
          <div className="flex h-full w-full items-center justify-center rounded-full border border-amber-100/40 bg-roseDeep/90 text-3xl font-serif text-amber-100 select-none">
            ♡
          </div>
        </motion.div>
      </div>

      <p className="font-handwriting text-3xl text-accent-rose relative z-10">
        Hooray! ✨
      </p>

      <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight text-ink-soft relative z-10">
        Yay, can&apos;t wait!
      </h2>

      <p className="mx-auto mt-4 max-w-xs font-sans text-base leading-8 text-stone-600 relative z-10">
        Makasih sudah bilang yes, <span className="font-medium text-ink-soft">{receiverName}</span>. Ada satu amplop kecil yang tersimpan buat kamu...
      </p>
    </section>
  );
}


