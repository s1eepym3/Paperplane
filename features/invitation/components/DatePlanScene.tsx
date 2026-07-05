'use client';

import Link from 'next/link';
import { Calendar, Clock, MapPin, Shirt, WalletCards } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Invitation } from '../types';

export function DatePlanScene({ invitation }: { invitation: Invitation }) {
  const details = [
    { icon: Calendar, label: 'Date', value: invitation.date },
    { icon: Clock, label: 'Time', value: invitation.time },
    { icon: MapPin, label: 'Place', value: invitation.locationName, sub: invitation.locationAddress },
    { icon: Shirt, label: 'Dress code', value: invitation.dressCode },
    { icon: WalletCards, label: 'Budget', value: invitation.budgetNote },
  ];

  return (
    <section className="min-h-[34rem]">
      <p className="text-sm tracking-[0.28em] text-stone-400 uppercase">Date plan</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">Ini rencana kecilnya.</h2>
      {invitation.personalMessage ? <p className="mt-4 text-sm leading-7 text-stone-600">{invitation.personalMessage}</p> : null}

      <div className="mt-7 space-y-3">
        {details.map((item, index) => {
          const Icon = item.icon;
          return item.value ? (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.36 }}
              className="rounded-2xl border-2 border-ink bg-white p-4 shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all duration-150"
            >
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink bg-roseSoft/25 text-roseDeep">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{item.label}</p>
                  <p className="mt-1 text-sm font-bold text-ink">{item.value}</p>
                  {item.sub ? <p className="mt-1 text-sm leading-6 text-stone-600">{item.sub}</p> : null}
                </div>
              </div>
            </motion.div>
          ) : null;
        })}
      </div>

      <div className="mt-7 rounded-3xl border-2 border-ink bg-white p-5 shadow-brutalInk">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">Itinerary</p>
        <div className="space-y-4">
          {invitation.itinerary.map((item, index) => (
            <motion.div
              key={`${item.time}-${item.title}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + index * 0.14, duration: 0.36 }}
              className="grid grid-cols-[4.5rem_1fr] gap-3"
            >
              <p className="text-sm font-bold text-roseDeep">{item.time}</p>
              <div>
                <p className="text-sm font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-stone-500">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="inline-flex items-center justify-center rounded-2xl border-2 border-ink bg-ink px-8 py-3.5 text-sm font-bold text-white shadow-brutalRose hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalRoseLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalRose">Can't wait</button>
        <p className="mt-4 text-xs leading-6 text-stone-400">
          Kurang cocok?{' '}
          <Link href={`/i/${invitation.token}/suggest`} className="text-roseDeep font-bold underline decoration-roseSoft underline-offset-4">
            coba {invitation.receiverName} beri rekomendasi plannya
          </Link>
        </p>
      </div>
    </section>
  );
}
