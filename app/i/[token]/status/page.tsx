import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Heart, Calendar, Clock, MapPin, Shirt, CalendarCheck, MessageSquare, AlertCircle } from 'lucide-react';
import { getPrisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ token: string }>;
};

import { demoInvitation } from '@/features/invitation/demo-data';

export default async function InvitationStatusPage({ params }: PageProps) {
  const { token } = await params;

  let invitation;
  if (token === 'demo') {
    invitation = {
      ...demoInvitation,
      status: 'ACCEPTED' as const,
      acceptedAt: new Date(),
      suggestions: [
        {
          id: 'demo-suggest-1',
          categories: ['Jam', 'Tempat'],
          note: 'Aku bisa jam 18:30 tapi kalau tempatnya di Ambrogio, seru banget!',
          createdAt: new Date(Date.now() - 3600000),
        },
      ],
    };
  } else {
    const prisma = getPrisma();
    invitation = await prisma.invitation.findUnique({
      where: { token },
      include: {
        suggestions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  if (!invitation) {
    notFound();
  }

  const isAccepted = invitation.status === 'ACCEPTED';

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/55 p-6 shadow-soft backdrop-blur md:p-10">
        <header className="flex flex-col justify-between gap-4 border-b border-stone-200/60 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs tracking-[0.2em] text-stone-400 uppercase">Creator Dashboard</span>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-ink">
              Status Undangan: {invitation.receiverName}
            </h1>
          </div>
          <Link
            href={`/i/${invitation.token}`}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white/60 px-4 py-2 text-xs font-medium text-stone-600 transition hover:bg-white"
          >
            Lihat Surat Undangan
          </Link>
        </header>

        {/* Status Card */}
        <section className="mt-8">
          <div className={`rounded-3xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between ${
            isAccepted 
              ? 'border-roseSoft/40 bg-roseSoft/5' 
              : 'border-amber-200/50 bg-amber-50/20'
          }`}>
            <div className="flex gap-4 items-center">
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${
                isAccepted 
                  ? 'bg-roseSoft/30 text-roseDeep' 
                  : 'bg-amber-100 text-amber-600'
              }`}>
                {isAccepted ? <Heart className="animate-pulse" size={24} /> : <Clock size={24} />}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">
                  Status: {isAccepted ? 'Diterima! ❤️' : 'Menunggu Jawaban...'}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {isAccepted 
                    ? `Diterima pada ${new Date(invitation.acceptedAt!).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}`
                    : 'Pasanganmu belum membuka atau menyetujui rencana ini.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Date Plan Summary */}
        <section className="mt-8">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <CalendarCheck size={18} className="text-stone-400" /> Detail Rencana Undangan
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200/60 bg-white/40 p-4 flex gap-3">
              <Calendar size={18} className="text-stone-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-stone-400">Tanggal & Waktu</p>
                <p className="text-sm font-medium text-ink mt-1">{invitation.date} @ {invitation.time}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200/60 bg-white/40 p-4 flex gap-3">
              <MapPin size={18} className="text-stone-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-stone-400">Lokasi</p>
                <p className="text-sm font-medium text-ink mt-1">{invitation.locationName}</p>
                <p className="text-xs text-stone-500 mt-0.5">{invitation.locationAddress}</p>
              </div>
            </div>
            {invitation.dressCode ? (
              <div className="rounded-2xl border border-stone-200/60 bg-white/40 p-4 flex gap-3">
                <Shirt size={18} className="text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-stone-400">Dress Code</p>
                  <p className="text-sm font-medium text-ink mt-1">{invitation.dressCode}</p>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* Suggestions Section */}
        <section className="mt-8 border-t border-stone-200/60 pt-8">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2 mb-4">
            <MessageSquare size={18} className="text-stone-400" /> Saran dari {invitation.receiverName} ({invitation.suggestions.length})
          </h2>

          {invitation.suggestions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white/20 p-8 text-center text-stone-500">
              <AlertCircle size={32} className="mx-auto mb-2 text-stone-300" />
              <p className="text-sm">Belum ada saran yang dikirimkan.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invitation.suggestions.map((suggestion) => (
                <div key={suggestion.id} className="rounded-2xl border border-stone-200/65 bg-white/50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {suggestion.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full bg-roseSoft/20 px-2.5 py-0.5 text-2xs font-semibold text-roseDeep uppercase tracking-wider"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <span className="text-2xs text-stone-400">
                      {new Date(suggestion.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-700 font-serif italic">
                    "{suggestion.note}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
