'use client';

import { MailOpen } from 'lucide-react';

export function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="flex min-h-[34rem] flex-col items-center justify-center text-center">
      <button 
        onClick={onOpen} 
        className="group relative mb-9 h-44 w-64 rounded-3xl border-2 border-ink bg-white shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalInk"
      >
        <div className="absolute inset-x-5 top-5 h-24 origin-top rounded-2xl border border-stone-300 bg-stone-50 transition duration-500 group-hover:-rotate-3" />
        <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-[1.35rem] border-t-2 border-ink bg-roseSoft/40" />
        <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-[1.35rem] bg-gradient-to-t from-white/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-roseDeep">
          <MailOpen size={34} />
        </div>
      </button>
      <p className="text-sm tracking-[0.28em] text-stone-400 uppercase">Tap the envelope</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">Open the plan</h2>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-stone-500">Aku simpan detailnya di sini. Buka pelan-pelan ya.</p>
    </section>
  );
}
