'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Feather } from 'lucide-react';
import type { Invitation } from '../types';
import { BreathingButton } from './motion/BreathingButton';
import { InCardMotes } from './motion/InCardMotes';

export function GreetingScene({ invitation, onOpen }: { invitation: Invitation; onOpen: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 14 }}
      className="relative flex min-h-[34rem] flex-col justify-between py-2 text-center"
    >
      {/* Background drifting ambient motes */}
      <InCardMotes />

      {/* Washi Tape Header Accent */}
      <div 
        className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 -rotate-1 h-7 w-32 bg-sunset-peach/80 shadow-tape backdrop-blur-xs border-y border-white/50 z-20" 
        style={{
          clipPath: 'polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 95% 30%, 100% 45%, 95% 60%, 100% 75%, 95% 90%, 100% 100%, 0% 100%, 5% 85%, 0% 70%, 5% 55%, 0% 40%, 5% 25%)'
        }}
      />

      <div className="pt-4 relative z-10">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-rose/20 text-ink-soft/70">
          <Feather size={19} />
        </div>
        <p className="font-handwriting text-2xl tracking-wide text-ink-soft/80">
          A little note for you...
        </p>
      </div>

      <div className="my-auto py-6 relative z-10">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink-soft md:text-4xl">
          {invitation.greeting}
        </h1>
        <div className="mx-auto my-5 h-px w-24 bg-stone-300/80" />
        <p className="mx-auto max-w-sm text-base leading-8 text-stone-600 font-sans">
          {invitation.intro}
        </p>
      </div>

      <div className="pb-2 relative z-10">
        <BreathingButton>
          <button
            onClick={onOpen}
            className="group relative mx-auto inline-flex items-center gap-2.5 rounded-full border border-stone-400/60 bg-white/90 px-8 py-3.5 text-sm font-medium text-ink-soft shadow-lift transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
          >
            <span>Open the letter</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 text-ink-soft/70" />
          </button>
        </BreathingButton>
      </div>
    </motion.section>
  );
}

