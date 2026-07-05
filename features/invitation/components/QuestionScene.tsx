'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Invitation } from '../types';

export function QuestionScene({ invitation, onAccept }: { invitation: Invitation; onAccept: () => void }) {
  const [noAttempts, setNoAttempts] = useState(0);

  function handleNoAction(event: React.MouseEvent | React.TouchEvent) {
    event.preventDefault();
    setNoAttempts((prev) => Math.min(5, prev + 1));
  }

  const isBroken = noAttempts >= 5;
  const yesScale = 1 + noAttempts * 1.5;
  const noScale = Math.max(0, 1 - noAttempts * 0.2);

  return (
    <section className="flex min-h-[34rem] flex-col justify-center text-center">
      <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-roseSoft/30 text-roseDeep">
        <Heart size={22} />
      </div>
      <p className="text-sm text-stone-500">One small question</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink md:text-4xl">{invitation.question}</h2>
      
      <p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-stone-500 transition-all duration-300">
        {noAttempts === 1 && 'Eh? Yakin? 🥺'}
        {noAttempts === 2 && 'Coba pikir-pikir lagi... 😭'}
        {noAttempts === 3 && 'Kok tega banget sih... 💔'}
        {noAttempts === 4 && 'Tombol No-nya mau hilang lho! 😤'}
        {noAttempts >= 5 && 'Yahh kan, tombol No-nya hilang 🥺'}
        {noAttempts === 0 && 'Silakan pilih jawabanmu di bawah ini.'}
      </p>

      <div className="relative mt-12 flex flex-col items-center justify-center gap-6 min-h-[8rem] w-full">
        {/* Yes Button */}
        <button
          onClick={onAccept}
          style={{
            transform: `scale(${yesScale})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 10 + noAttempts,
          }}
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-roseDeep px-8 py-3.5 text-sm font-bold text-white shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalInk"
        >
          <Heart size={16} fill="currentColor" />
          Yes
        </button>

        {/* No Button */}
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
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg active:translate-x-0 active:translate-y-0 active:shadow-brutalInk"
          >
            No
          </button>
        )}
      </div>
    </section>
  );
}
