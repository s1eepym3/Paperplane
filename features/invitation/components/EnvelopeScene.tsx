'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BreathingButton } from './motion/BreathingButton';
import { InCardMotes } from './motion/InCardMotes';
import { EnvelopePaperplaneTakeoff } from './motion/PaperplaneMascot';

export function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleClick() {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => {
      onOpen();
    }, 700);
  }

  return (
    <section className="relative flex min-h-[34rem] flex-col items-center justify-center text-center py-4">
      {/* Background drifting ambient motes */}
      <InCardMotes />

      {/* 3D Envelope Container wrapped with BreathingButton */}
      <BreathingButton className="mb-10 z-10">
        <div 
          onClick={handleClick}
          className="group relative h-44 w-68 cursor-pointer select-none"
          style={{ perspective: '1000px' }}
        >
          {/* Warm glow leaking from envelope seam (idle pulse, intensifies on tap) */}
          <motion.div 
            animate={
              shouldReduceMotion
                ? { opacity: 0.3 }
                : {
                    opacity: isOpening ? 1 : [0.35, 0.75, 0.35],
                    scale: isOpening ? 1.3 : [1, 1.05, 1],
                  }
            }
            transition={
              isOpening
                ? { duration: 0.3, ease: 'easeOut' }
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-r from-sunset-peach/50 via-amber-300/70 to-gold-foil/50 blur-2xl"
            aria-hidden="true"
          />

          {/* Envelope Back Body */}
          <div className="relative h-full w-full rounded-2xl border border-amber-900/15 bg-[#F2E5D5] shadow-lift overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
            {/* Peeking letter inside */}
            <motion.div 
              animate={isOpening ? { y: -30, opacity: 1 } : { y: 0, opacity: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-x-4 top-3 h-28 rounded-t-xl bg-paper border border-stone-300/80 shadow-xs flex items-center justify-center"
            >
              <span className="font-handwriting text-xl text-ink-soft/70">Our special plan ✨</span>
            </motion.div>

            {/* Envelope Pocket (Front Fold) */}
            <div 
              className="absolute inset-x-0 bottom-0 h-28 bg-[#E9D7C1] border-t border-amber-900/10 shadow-sm"
              style={{
                clipPath: 'polygon(0% 100%, 50% 35%, 100% 100%, 100% 100%, 0% 100%)'
              }}
            />
            <div 
              className="absolute inset-x-0 bottom-0 h-28 bg-[#DFCCB4]"
              style={{
                clipPath: 'polygon(0% 0%, 50% 55%, 0% 100%)'
              }}
            />
            <div 
              className="absolute inset-x-0 bottom-0 h-28 bg-[#D8C4AB]"
              style={{
                clipPath: 'polygon(100% 0%, 50% 55%, 100% 100%)'
              }}
            />

            {/* Bottom decorative fold */}
            <div 
              className="absolute inset-x-0 bottom-0 h-28 bg-[#E4D1BA]/90"
              style={{
                clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)'
              }}
            />
          </div>

          {/* Paperplane Mascot Flying Out of Envelope on Tap */}
          <EnvelopePaperplaneTakeoff isLaunching={isOpening} />

          {/* 3D Folding Top Flap with Spring Physics */}
          <motion.div 
            animate={{ rotateX: isOpening ? -175 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 110,
              damping: 14,
            }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
            }}
            className="absolute inset-x-0 top-0 h-24 z-20"
          >
            {/* Flap Polygon */}
            <div 
              className="h-full w-full bg-[#E5D3BD] shadow-md border-b border-amber-900/10"
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)'
              }}
            />

            {/* Wax Seal / Stamp Button */}
            {!isOpening && (
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gold-foil bg-roseDeep shadow-sm text-amber-100 text-xs font-serif font-bold">
                ✦
              </div>
            )}
          </motion.div>
        </div>
      </BreathingButton>


      <p className="font-handwriting text-2xl text-accent-rose relative z-10">
        Tap the wax seal to open
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink-soft relative z-10">
        Unfold the plan
      </h2>

      <p className="mx-auto mt-3 max-w-xs font-sans text-sm leading-6 text-stone-500 relative z-10">
        Aku simpan semua detail harinya di dalam sini. Buka pelan-pelan ya.
      </p>
    </section>
  );
}

