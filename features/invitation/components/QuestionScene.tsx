'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Invitation } from '../types';
import { BreathingButton } from './motion/BreathingButton';
import { InCardMotes } from './motion/InCardMotes';
import { WordReveal } from './motion/WordReveal';

export function QuestionScene({ invitation, onAccept }: { invitation: Invitation; onAccept: () => void }) {
  const [noAttempts, setNoAttempts] = useState(0);

  function handleNoAction(event: React.MouseEvent | React.TouchEvent) {
    event.preventDefault();
    setNoAttempts((prev) => Math.min(5, prev + 1));
  }

  // Preserved exact scaling mathematics
  const yesScale = 1 + noAttempts * 1.5;
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
        <BreathingButton style={{ zIndex: 10 + noAttempts }}>
          <motion.button
            type="button"
            onClick={onAccept}
            whileHover={{
              rotate: [-1.5, 1.5, -1.5, 1.5, 0],
              transition: { duration: 0.35, ease: 'easeInOut' }
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              transform: `scale(${yesScale})`,
              transformOrigin: 'center',
              transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 10 + noAttempts,
            }}
            className="relative inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/60 bg-roseDeep px-9 py-3.5 text-base font-serif font-medium text-white shadow-lift active:shadow-sm"
          >
            <span className="text-gold-foil text-sm">✦</span>
            <span>YES!</span>
            <span className="text-gold-foil text-sm">✦</span>
          </motion.button>
        </BreathingButton>

        {/* No Button: Shy handwritten text fading into memory */}
        {noAttempts < 5 && (
          <button
            onTouchStart={handleNoAction}
            onClick={handleNoAction}
            style={{
              transform: `scale(${noScale})`,
              opacity: noScale,
              transition: 'all 0.25s ease-out',
              pointerEvents: noAttempts >= 5 ? 'none' : 'auto',
            }}
            className="font-handwriting text-xl text-stone-400 hover:text-stone-600 transition-colors duration-150 px-4 py-1"
          >
            no...
          </button>
        )}
      </div>
    </section>
  );
}

