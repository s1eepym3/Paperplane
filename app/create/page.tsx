import Link from 'next/link';
import { CreateInvitationForm } from '@/features/invitation/components/CreateInvitationForm';

export default function CreatePage() {
  return (
    <main className="min-h-screen px-5 py-8">
      <section className="mx-auto max-w-3xl rounded-[2rem] border-2 border-ink bg-white p-6 shadow-brutalInkLg md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm tracking-[0.28em] text-stone-400 uppercase">Creator</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">Create invitation</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-stone-600">
              Isi detail rencananya, lalu generate link unik untuk dikirim ke pasanganmu.
            </p>
          </div>
          <Link
            href="/i/demo"
            className="hidden rounded-full border border-stone-200 bg-white/60 px-4 py-2 text-sm text-ink transition hover:bg-white md:block"
          >
            Preview
          </Link>
        </div>

        <CreateInvitationForm />
      </section>
    </main>
  );
}
