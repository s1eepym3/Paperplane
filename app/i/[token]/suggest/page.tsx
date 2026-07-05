import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SuggestForm } from '@/features/invitation/components/SuggestForm';
import { getPrisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function SuggestPage({ params }: PageProps) {
  const { token } = await params;
  const prisma = getPrisma();

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    select: {
      token: true,
      receiverName: true,
    },
  });

  if (!invitation) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <section className="w-full max-w-lg rounded-[2rem] border-2 border-ink bg-white p-6 shadow-brutalInkLg md:p-8">
        <Link
          href={`/i/${invitation.token}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-ink"
        >
          Back to invitation
        </Link>

        <p className="text-sm tracking-[0.28em] text-stone-400 uppercase">Suggestion</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">
          Ada yang ingin {invitation.receiverName} sesuaikan?
        </h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          Tulis saran kecil di sini. Nanti aku sesuaikan lagi supaya rencananya lebih nyaman.
        </p>

        <SuggestForm token={invitation.token} />
      </section>
    </main>
  );
}
