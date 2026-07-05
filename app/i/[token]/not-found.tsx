'use client';

import Link from 'next/link';

export default function InvitationNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <section className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/65 p-8 text-center shadow-soft backdrop-blur">
        <p className="text-sm tracking-[0.28em] text-stone-400 uppercase">Not found</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">Undangan tidak ditemukan</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          Link ini mungkin sudah kadaluarsa atau belum dibuat. Coba cek lagi ya.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/i/demo" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-soft">
            Lihat demo
          </Link>
          <Link href="/create" className="rounded-full border border-stone-200 bg-white/60 px-6 py-3 text-sm font-medium text-ink">
            Buat undangan baru
          </Link>
        </div>
      </section>
    </main>
  );
}
