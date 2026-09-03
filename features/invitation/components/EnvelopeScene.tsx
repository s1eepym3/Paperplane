'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);

  function handleClick() {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => {
      onOpen();
    }, 700);
  }

  return (
    <section className="flex min-h-[34rem] flex-col items-center justify-center text-center py-4">
      {/* 3D Envelope Container */}
      <div 
        onClick={handleClick}
        className="group relative mb-10 h-44 w-68 cursor-pointer select-none"
        style={{ perspective: '1000px' }}
      >
        {/* Inner Golden Glow that emits upon opening */}
        <div 
          className={`absolute -inset-4 rounded-3xl bg-amber-300/60 blur-2xl transition-opacity duration-600 ${
            isOpening ? 'opacity-90 scale-105' : 'opacity-0 group-hover:opacity-30'
          }`} 
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

        {/* 3D Folding Top Flap */}
        <div 
          className="absolute inset-x-0 top-0 h-24 origin-top transition-transform duration-500 z-20"
          style={{
            transformStyle: 'preserve-3d',
            transform: isOpening ? 'rotateX(-175deg)' : 'rotateX(0deg)',
          }}
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
        </div>
      </div>

      <p className="font-handwriting text-2xl text-accent-rose">
        Tap the wax seal to open
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink-soft">
        Unfold the plan
      </h2>

      <p className="mx-auto mt-3 max-w-xs font-sans text-sm leading-6 text-stone-500">
        Aku simpan semua detail harinya di dalam sini. Buka pelan-pelan ya.
      </p>
    </section>
  );
}
