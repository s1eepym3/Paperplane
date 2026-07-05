'use client';

import { ArrowRight } from 'lucide-react';
import type { Invitation } from '../types';

export function GreetingScene({ invitation, onOpen }: { invitation: Invitation; onOpen: () => void }) {
  return (
    <section className="flex min-h-[34rem] flex-col justify-between text-center">
      <div />
      <div>
        <p className="mb-4 text-sm tracking-[0.28em] text-stone-400 uppercase">A little note</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-ink">{invitation.greeting}</h1>
        <p className="mx-auto mt-5 max-w-sm text-base leading-8 text-stone-600">{invitation.intro}</p>
      </div>
      <button 
        onClick={onOpen} 
        className="group mx-auto inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-white px-7 py-3.5 text-sm font-bold text-ink shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalInk"
      >
        Open
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </button>
    </section>
  );
}
