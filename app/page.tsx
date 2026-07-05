import Link from 'next/link';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-between rounded-[2rem] border-2 border-ink bg-white p-6 shadow-brutalInkLg md:p-10">
        <nav className="flex items-center justify-between text-sm text-stone-500">
          <div className="flex items-center gap-2 font-bold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink bg-roseSoft/35 text-roseDeep">
              <Heart size={16} />
            </span>
            Plan Your Date
          </div>
          <Link href="/create" className="rounded-xl border-2 border-ink bg-white px-4 py-2 font-bold text-ink shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0">
            Create
          </Link>
        </nav>

        <section className="mx-auto max-w-2xl py-20 text-center md:py-28">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-roseSoft/20 px-4 py-2 text-sm font-bold text-roseDeep">
            <Sparkles size={15} />
            A personal digital letter
          </div>
          <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-ink md:text-6xl">
            Make a date invitation that feels personal.
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600 md:text-lg">
            A soft, story-driven invitation experience. Create the plan, send one link, and let them say yes.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/i/demo" className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-brutalRose hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalRoseLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalRose">
              View demo invitation <ArrowRight size={16} />
            </Link>
            <Link href="/create" className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-white px-6 py-3.5 text-sm font-bold text-ink shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalInk">
              First step: create plan
            </Link>
          </div>
        </section>

        <p className="text-center text-xs font-bold text-stone-400">Minimal. Soft. Romantic, but not cheesy.</p>
      </div>
    </main>
  );
}
