'use client';

import Link from 'next/link';
import { Calendar, Clock, MapPin, Shirt, WalletCards, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Invitation } from '../types';

export function DatePlanScene({ invitation }: { invitation: Invitation }) {
  const details = [
    { icon: Calendar, label: 'Date', value: invitation.date, tilt: '-rotate-0.5' },
    { icon: Clock, label: 'Time', value: invitation.time, tilt: 'rotate-0.5' },
    { icon: MapPin, label: 'Place', value: invitation.locationName, sub: invitation.locationAddress, tilt: '-rotate-0.5' },
    { icon: Shirt, label: 'Dress code', value: invitation.dressCode, tilt: 'rotate-0.5' },
    { icon: WalletCards, label: 'Budget', value: invitation.budgetNote, tilt: '-rotate-0.5' },
  ];

  return (
    <section className="min-h-[34rem] py-2">
      {/* Header with Washi Tape Accent */}
      <div className="relative text-center pb-4">
        <p className="font-handwriting text-2xl text-accent-rose">
          Our shared itinerary
        </p>
        <h2 className="mt-1 font-serif text-3xl font-medium tracking-tight text-ink-soft md:text-4xl">
          Ini rencana kecilnya.
        </h2>
        {invitation.personalMessage && (
          <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-6 text-stone-600 italic">
            &ldquo;{invitation.personalMessage}&rdquo;
          </p>
        )}
      </div>

      {/* Details Grid (Sticky Note & Polaroid Style) */}
      <div className="mt-6 space-y-3">
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

      {/* Flight Path Timeline (Itinerary) */}
      {invitation.itinerary && invitation.itinerary.length > 0 && (
        <div className="relative mt-9 rounded-3xl border border-stone-300/80 bg-[#FCFAF6] p-6 shadow-lift">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5">
            <p className="font-serif text-lg font-medium text-ink-soft">
              Flight Path Timeline
            </p>
            <span className="font-handwriting text-xl text-accent-rose">
              step by step ✈️
            </span>
          </div>

          <div className="relative pl-6 space-y-6">
            {/* SVG Flight Path Dashed Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px border-l-2 border-dashed border-stone-300/90" />

            {invitation.itinerary.map((item, index) => (
              <motion.div
                key={`${item.time}-${item.title}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.12, duration: 0.36 }}
                className="relative"
              >
                {/* Node Milestone Circle */}
                <div className="absolute -left-[29px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-amber-300 bg-white shadow-xs">
                  <div className="h-2 w-2 rounded-full bg-roseDeep" />
                </div>

                {/* Content */}
                <div>
                  <span className="font-handwriting text-xl text-roseDeep font-medium">
                    {item.time}
                  </span>
                  <h3 className="font-serif text-base font-medium text-ink-soft mt-0.5">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs leading-5 text-stone-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Footer CTA & Suggestion Link */}
      <div className="mt-9 text-center pb-2">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-400/60 bg-white px-9 py-3.5 text-sm font-serif font-medium text-ink-soft shadow-lift hover:shadow-md hover:-translate-y-0.5 transition-all active:translate-y-0"
        >
          <span>Can&apos;t wait for this date</span>
          <Send size={14} className="text-accent-rose" />
        </button>

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
