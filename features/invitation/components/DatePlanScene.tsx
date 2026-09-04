'use client';

import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Shirt,
  WalletCards,
  Send,
  UtensilsCrossed,
  Coffee,
  Film,
  Camera,
  Sparkles,
  Heart,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Invitation } from '../types';
import { BreathingButton } from './motion/BreathingButton';
import { InCardMotes } from './motion/InCardMotes';
import { WordReveal } from './motion/WordReveal';

function getItineraryDoodle(title: string, index: number) {
  const lower = title.toLowerCase();
  if (lower.includes('makan') || lower.includes('dinner') || lower.includes('lunch') || lower.includes('kuliner')) {
    return <UtensilsCrossed size={22} />;
  }
  if (lower.includes('kopi') || lower.includes('coffee') || lower.includes('cafe')) {
    return <Coffee size={22} />;
  }
  if (lower.includes('nonton') || lower.includes('movie') || lower.includes('cinema') || lower.includes('film')) {
    return <Film size={22} />;
  }
  if (lower.includes('foto') || lower.includes('photo') || lower.includes('walk') || lower.includes('jalan')) {
    return <Camera size={22} />;
  }
  const fallbackIcons = [Sparkles, Heart, UtensilsCrossed, Coffee, Camera];
  const Fallback = fallbackIcons[index % fallbackIcons.length];
  return <Fallback size={22} />;
}

export function DatePlanScene({ invitation }: { invitation: Invitation }) {
  const shouldReduceMotion = useReducedMotion();

  const details = [
    { icon: Calendar, label: 'Date', value: invitation.date, tilt: '-rotate-0.5' },
    { icon: Clock, label: 'Time', value: invitation.time, tilt: 'rotate-0.5' },
    { icon: MapPin, label: 'Place', value: invitation.locationName, sub: invitation.locationAddress, tilt: '-rotate-0.5' },
    { icon: Shirt, label: 'Dress code', value: invitation.dressCode, tilt: 'rotate-0.5' },
    { icon: WalletCards, label: 'Budget', value: invitation.budgetNote, tilt: '-rotate-0.5' },
  ];

  return (
    <section className="relative min-h-[34rem] py-2">
      {/* Background drifting ambient motes */}
      <InCardMotes />

      {/* Header with Washi Tape Accent & Handwritten Word Reveal */}
      <div className="relative text-center pb-4 z-10">
        <WordReveal
          text="Our shared itinerary"
          as="p"
          delay={0.12}
          className="font-handwriting text-2xl text-accent-rose"
        />

        <h2 className="mt-1 font-serif text-3xl font-medium tracking-tight text-ink-soft md:text-4xl">
          Ini rencana kecilnya.
        </h2>

        {invitation.personalMessage && (
          <div className="mx-auto mt-3 max-w-sm">
            <WordReveal
              text={`“${invitation.personalMessage}”`}
              as="p"
              delay={0.45}
              className="font-sans text-sm leading-6 text-stone-600 italic"
            />
          </div>
        )}
      </div>

      {/* Details Grid (Sticky Note & Polaroid Style) */}
      <div className="mt-6 space-y-3 relative z-10">
        {details.map((item, index) => {
          const Icon = item.icon;
          return item.value ? (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.35, ease: 'easeOut' }}
              className={`relative rounded-2xl border border-stone-300/80 bg-white/90 p-4 shadow-lift transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.tilt}`}
            >
              {/* Subtle top tape snippet */}
              <div 
                className="pointer-events-none absolute -top-2 left-6 h-4 w-16 bg-sunset-peach/60 shadow-tape opacity-80"
                style={{
                  clipPath: 'polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 95% 30%, 100% 45%, 95% 60%, 100% 75%, 95% 90%, 100% 100%, 0% 100%, 5% 85%, 0% 70%, 5% 55%, 0% 40%, 5% 25%)'
                }}
              />

              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-rose/40 bg-accent-rose/15 text-roseDeep">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="font-handwriting text-lg leading-tight text-stone-400">
                    {item.label}
                  </p>
                  <p className="font-serif text-base font-medium text-ink-soft">
                    {item.value}
                  </p>
                  {item.sub && (
                    <p className="mt-0.5 font-sans text-xs leading-5 text-stone-500">
                      {item.sub}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null;
        })}
      </div>

      {/* Dynamic Flight Path Timeline (Scrapbook Polaroids 1..N) */}
      {invitation.itinerary && invitation.itinerary.length > 0 && (
        <div className="relative mt-9 rounded-3xl border border-stone-300/80 bg-[#FCFAF6] p-6 shadow-lift z-10">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-6">
            <p className="font-serif text-lg font-medium text-ink-soft">
              Flight Path Timeline
            </p>
            <span className="font-handwriting text-xl text-accent-rose">
              step by step ✈️
            </span>
          </div>

          {/* Dynamic Itinerary Sequence */}
          <div className="relative space-y-2">
            {invitation.itinerary.map((item, index) => {
              const isEven = index % 2 === 0;
              const finalTilt = isEven ? -2.2 : 2.2;

              return (
                <div key={`${item.time}-${item.title}`} className="relative">
                  {/* Polaroid Card Stamped In */}
                  <motion.div
                    initial={{
                      scale: 1.15,
                      opacity: 0,
                      y: -12,
                      rotate: finalTilt * 1.5,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: 0,
                      rotate: finalTilt,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 14,
                      delay: index * 0.25,
                    }}
                    className="relative rounded-2xl border border-stone-300/80 bg-white p-4 shadow-lift transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {/* Washi tape snippet: fades in 150ms after its card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.25 + 0.15,
                        duration: 0.32,
                        ease: 'easeOut',
                      }}
                      className={`pointer-events-none absolute -top-3 ${
                        isEven ? 'right-6 rotate-2' : 'left-6 -rotate-2'
                      } h-5 w-20 bg-sunset-peach/75 shadow-tape border-y border-white/50 z-20`}
                      style={{
                        clipPath:
                          'polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 95% 30%, 100% 45%, 95% 60%, 100% 75%, 95% 90%, 100% 100%, 0% 100%, 5% 85%, 0% 70%, 5% 55%, 0% 40%, 5% 25%)',
                      }}
                    />

                    {/* Card Content with Ken Burns Breathing Visual Window */}
                    <div className="flex items-start gap-4">
                      {/* Polaroid Photo Frame with Ken Burns Breathing Doodle (scale 1 -> 1.06, 9s alternate loop) */}
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-amber-50/70 shadow-xs flex items-center justify-center">
                        <motion.div
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : { scale: [1, 1.06, 1] }
                          }
                          transition={{
                            duration: 9,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                          }}
                          className="flex items-center justify-center text-roseDeep/80 select-none"
                        >
                          {getItineraryDoodle(item.title, index)}
                        </motion.div>
                      </div>

                      {/* Content block: Text remains static and sharp (NEVER breathes) */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-handwriting text-xl text-roseDeep font-medium leading-none">
                            {item.time}
                          </span>
                          <span className="font-serif text-[11px] text-stone-400">
                            Stop #{index + 1}
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-medium text-ink-soft mt-1">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-sans text-xs leading-5 text-stone-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connector Segment between consecutive polaroids (dynamic 1..N) */}
                  {index < invitation.itinerary.length - 1 && (
                    <div
                      className="relative h-11 w-full flex items-center justify-center pointer-events-none select-none my-1"
                      aria-hidden="true"
                    >
                      <svg className="w-48 h-11 overflow-visible" viewBox="0 0 160 44" fill="none">
                        <motion.path
                          d={
                            isEven
                              ? 'M 40 4 C 40 26, 120 18, 120 40'
                              : 'M 120 4 C 120 26, 40 18, 40 40'
                          }
                          stroke="#E0BFB8"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.85 }}
                          transition={{
                            delay: index * 0.25 + 0.35,
                            duration: 0.55,
                            ease: 'easeOut',
                          }}
                        />
                        {/* Midpoint flight waypoint milestone */}
                        <motion.circle
                          cx={80}
                          cy={22}
                          r={3}
                          fill="#E05368"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: index * 0.25 + 0.5,
                            duration: 0.3,
                          }}
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer CTA & Suggestion Link */}
      <div className="mt-9 text-center pb-2 relative z-10">
        <BreathingButton>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-400/60 bg-white px-9 py-3.5 text-sm font-serif font-medium text-ink-soft shadow-lift hover:shadow-md hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            <span>Can&apos;t wait for this date</span>
            <Send size={14} className="text-accent-rose" />
          </button>
        </BreathingButton>

        <p className="mt-4 font-sans text-xs leading-6 text-stone-400">
          Ada yang kurang pas?{' '}
          <Link
            href={`/i/${invitation.token}/suggest`}
            className="font-handwriting text-lg text-roseDeep hover:underline underline-offset-4"
          >
            coba {invitation.receiverName} beri rekomendasi plannya ✍️
          </Link>
        </p>
      </div>
    </section>
  );
}

