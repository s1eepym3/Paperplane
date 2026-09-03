'use client';

import { motion } from 'framer-motion';

export function CelebrationScene({ receiverName }: { receiverName: string }) {
  return (
    <section className="flex min-h-[34rem] flex-col items-center justify-center text-center py-6">
      {/* Pulsing Wax Seal Heart Emblem */}
      <motion.div
        initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        className="relative mb-8 h-24 w-24 rounded-full border-2 border-dashed border-amber-200/70 bg-roseDeep p-2 shadow-lift flex items-center justify-center"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border border-amber-100/40 bg-roseDeep/90 text-3xl font-serif text-amber-100">
          ♡
        </div>
      </motion.div>

      <p className="font-handwriting text-3xl text-accent-rose">
        Hooray! ✨
      </p>

      <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight text-ink-soft">
        Yay, can&apos;t wait!
      </h2>

      <p className="mx-auto mt-4 max-w-xs font-sans text-base leading-8 text-stone-600">
        Makasih sudah bilang yes, <span className="font-medium text-ink-soft">{receiverName}</span>. Ada satu amplop kecil yang tersimpan buat kamu...
      </p>
    </section>
  );
}
