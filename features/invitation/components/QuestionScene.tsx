'use client';

import { useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Invitation } from '../types';
import { BreathingButton } from './motion/BreathingButton';
import { InCardMotes } from './motion/InCardMotes';
import { WordReveal } from './motion/WordReveal';

interface PoofParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  symbol: string;
}

const POOF_PARTICLES: PoofParticle[] = [
  { id: 1, x: -16, y: -12, size: 12, symbol: '✦' },
  { id: 2, x: 16, y: -10, size: 10, symbol: '✧' },
  { id: 3, x: -12, y: 12, size: 10, symbol: '✦' },
  { id: 4, x: 14, y: 10, size: 12, symbol: '✧' },
];

export function QuestionScene({ invitation, onAccept }: { invitation: Invitation; onAccept: () => void }) {
  const [noAttempts, setNoAttempts] = useState(0);
  const [showPoof, setShowPoof] = useState(false);
  const lastActionTimeRef = useRef(0);
  const yesControls = useAnimationControls();

  function handleNoAction() {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 300) {
      return;
    }
    lastActionTimeRef.current = now;

    setNoAttempts((prev) => {
      const next = Math.min(5, prev + 1);
      if (next === 5) {
        setShowPoof(true);
        window.setTimeout(() => setShowPoof(false), 800);
      }
      return next;
    });

    // YES button reacts happily with an excited bounce (transform only, resting scale remains 1)
    yesControls.start({
      scale: [1, 1.06, 1],
      rotate: [0, -1.5, 1.5, 0],
      transition: { duration: 0.45, ease: 'easeOut' },
    });
  }

  // NO button shrinks across attempts: 1.0 -> 0.8 -> 0.6 -> 0.4 -> 0.2 -> 0
  const noScale = Math.max(0, 1 - noAttempts * 0.2);

  return (
    <section className="relative flex min-h-[34rem] flex-col justify-center text-center py-4">
      {/* Background drifting ambient motes */}
      <InCardMotes />

      {/* Polaroid Tape Corner */}
      <div 
        className="pointer-events-none absolute -top-4 right-8 h-6 w-24 rotate-12 bg-sunset-peach/70 shadow-tape border-y border-white/40 z-20"
        style={{
          clipPath: 'polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 95% 30%, 100% 45%, 95% 60%, 100% 75%, 95% 90%, 100% 100%, 0% 100%, 5% 85%, 0% 70%, 5% 55%, 0% 40%, 5% 25%)'
        }}
      />

      {/* Decorative Wax Seal Icon */}
      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent-rose/50 bg-accent-rose/20 text-roseDeep shadow-sm relative z-10">
        <Sparkles size={18} />
      </div>

      <WordReveal
        text="One small question..."
        as="p"
        delay={0.12}
        className="font-handwriting text-2xl text-ink-soft/75 relative z-10"
      />

      <WordReveal
        text={invitation.question}
        as="h2"
        delay={0.38}
        className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink-soft md:text-4xl relative z-10"
      />


      {/* Handwritten reaction notes */}
      <p className="mx-auto mt-5 min-h-[2rem] max-w-xs font-handwriting text-xl text-stone-500 transition-all duration-300 relative z-10">
        {noAttempts === 1 && 'Eh? Yakin mau bilang no? 🥺'}
        {noAttempts === 2 && 'Coba dipikir-pikir lagi pelan-pelan... 😭'}
        {noAttempts === 3 && 'Kok tega banget sih... 💔'}
        {noAttempts === 4 && 'Tombol no-nya hampir hilang lho! 😤'}
        {noAttempts >= 5 && 'Yahh kan, tombol no-nya udah hilang 🥺'}
        {noAttempts === 0 && 'Silakan pilih jawabanmu di bawah ini.'}
      </p>

      {/* Action Zone */}
      <div className="relative mt-10 flex flex-col items-center justify-center gap-6 min-h-[9rem] w-full z-10">
        {/* Yes Button: Vintage Stamp / Wax Seal Sticker wrapped with BreathingButton */}
        <BreathingButton style={{ zIndex: 10 }}>
          <motion.button
            type="button"
            onClick={onAccept}
            animate={yesControls}
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{
              rotate: [-1.5, 1.5, -1.5, 1.5, 0],
              transition: { duration: 0.35, ease: 'easeInOut' },
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              transformOrigin: 'center',
              zIndex: 10,
            }}
            className="relative inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/60 bg-roseDeep px-9 py-3.5 text-base font-serif font-medium text-white shadow-lift active:shadow-sm"
          >
            <span className="text-gold-foil text-sm">✦</span>
            <span>YES!</span>
            <span className="text-gold-foil text-sm">✦</span>
          </motion.button>
        </BreathingButton>


        {/* No Button: Star of the gag — shrinks per press and wobbles with losing confidence */}
        <div className="relative min-h-[2rem] flex items-center justify-center">
          <motion.button
            type="button"
            onClick={handleNoAction}
            animate={{
              scale: noScale,
              opacity: noScale,
              rotate:
                noAttempts === 0
                  ? 0
                  : noAttempts % 2 === 1
                  ? [0, -2, 2, 0]
                  : [0, 2, -2, 0],
            }}
            transition={{
              scale: { type: 'spring', stiffness: 170, damping: 18 },
              opacity: { duration: 0.25, ease: 'easeOut' },
              rotate: { duration: 0.4, ease: 'easeInOut' },
            }}
            style={{
              transformOrigin: 'center',
              pointerEvents: noAttempts >= 5 ? 'none' : 'auto',
            }}
            className="font-handwriting text-xl text-stone-400 hover:text-stone-600 transition-colors duration-150 px-4 py-1 select-none"
          >
            no...
          </motion.button>

          {/* Vanish Poof Delight at Attempt 5 */}
          {showPoof && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {POOF_PARTICLES.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 0.95 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    scale: [0.2, 1.25, 0],
                    opacity: [0.95, 0.8, 0],
                  }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  style={{ fontSize: `${p.size}px` }}
                  className="absolute text-accent-rose select-none font-serif"
                >
                  {p.symbol}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

