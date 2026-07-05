'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Plus, Check } from 'lucide-react';
import type { ItineraryItem } from '@/features/invitation/types';

type FormState = {
  receiverName: string;
  greeting: string;
  question: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  dressCode: string;
  personalMessage: string;
};

const initialFormState: FormState = {
  receiverName: '',
  greeting: '',
  question: 'Wanna go on a date?',
  date: '',
  time: '',
  locationName: '',
  locationAddress: '',
  dressCode: '',
  personalMessage: '',
};

const defaultItinerary: ItineraryItem[] = [
  { time: '18:30', title: 'Meet up', description: 'Ketemu di tempat pertama, mulai dengan ngobrol santai.' },
  { time: '19:00', title: 'Dinner', description: 'Makan malam pelan-pelan, tanpa harus buru-buru.' },
];

export function CreateInvitationForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(defaultItinerary);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addItineraryItem() {
    setItinerary((current) => [...current, { time: '', title: '', description: '' }]);
  }

  function updateItineraryItem(index: number, field: keyof ItineraryItem, value: string) {
    setItinerary((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    );
  }

  function removeItineraryItem(index: number) {
    setItinerary((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setCopied(false);

    const greeting = form.greeting.trim() || (form.receiverName ? `Hi, ${form.receiverName}` : '');

    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          greeting,
          itinerary: itinerary.filter((item) => item.time && item.title && item.description),
        }),
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? 'Gagal membuat undangan.');
      }

      const absoluteUrl = `${window.location.origin}${payload.url}`;
      setGeneratedUrl(absoluteUrl);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Gagal membuat undangan.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyGeneratedUrl() {
    if (!generatedUrl) return;

    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {generatedUrl ? (
        <div className="mt-8 rounded-3xl border-2 border-ink bg-roseSoft/10 p-6 shadow-brutalInk">
          <p className="text-sm font-bold text-ink">Undangan siap dikirim</p>
          <p className="mt-2 text-sm leading-7 text-stone-600">Salin link ini dan kirim ke pasanganmu.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              readOnly
              value={generatedUrl}
              className="w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 text-sm text-ink outline-none"
            />
            <button
              type="button"
              onClick={copyGeneratedUrl}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-white px-5 py-3 text-sm font-bold text-ink shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalInk"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>
          <Link href={generatedUrl.replace(window.location.origin, '')} className="mt-4 inline-block text-sm text-roseDeep font-bold underline decoration-roseSoft underline-offset-4">
            Preview undangan
          </Link>
        </div>
      ) : null}

      <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        {[
          ['receiverName', 'Receiver name', 'Nura'],
          ['greeting', 'Greeting', 'Hi, Nura'],
          ['question', 'Question', 'Wanna go on a date?'],
          ['date', 'Date', 'Jumat , 01 Januari 2027'],
          ['time', 'Time', '19:00'],
          ['locationName', 'Location name', 'Penthouse on 19th'],
          ['locationAddress', 'Location address', 'Grand Jali Junction'],
          ['dressCode', 'Dress code', 'Casual cute'],
        ].map(([field, label, placeholder]) => (
          <label key={field} className="block">
            <span className="text-sm font-bold text-ink">{label}</span>
            <input
              required={field === 'receiverName' || field === 'date' || field === 'time' || field === 'locationName' || field === 'locationAddress'}
              value={form[field as keyof FormState]}
              onChange={(event) => updateField(field as keyof FormState, event.target.value)}
              placeholder={placeholder}
              className="mt-2 w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-stone-400 focus:shadow-brutalInk focus:-translate-x-0.5 focus:-translate-y-0.5"
            />
          </label>
        ))}

        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-ink">Personal message</span>
          <textarea
            rows={4}
            value={form.personalMessage}
            onChange={(event) => updateField('personalMessage', event.target.value)}
            placeholder="i've already prepared a date plan for us, so just enjoy alright..."
            className="mt-2 w-full resize-none rounded-2xl border-2 border-ink bg-white p-4 text-sm leading-7 outline-none transition-all placeholder:text-stone-400 focus:shadow-brutalInk focus:-translate-x-0.5 focus:-translate-y-0.5"
          />
        </label>

        <div className="rounded-3xl border-2 border-dashed border-ink bg-white p-5 md:col-span-2 shadow-brutalInk">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-ink">Itinerary items</p>
              <p className="mt-1 text-xs text-stone-500">Tambah atau sesuaikan rencana hariannya.</p>
            </div>
            <button
              type="button"
              onClick={addItineraryItem}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-white px-4 py-2 text-sm font-bold text-ink shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalInk"
            >
              <Plus size={15} /> Add item
            </button>
          </div>

          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={`itinerary-${index}`} className="grid gap-3 rounded-2xl border-2 border-ink bg-white p-4 grid-cols-1 sm:grid-cols-[4.5rem_1.2fr_1.8fr_auto]">
                <input
                  value={item.time}
                  onChange={(event) => updateItineraryItem(index, 'time', event.target.value)}
                  placeholder="18:30"
                  className="w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:shadow-brutalInk focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all"
                />
                <input
                  value={item.title}
                  onChange={(event) => updateItineraryItem(index, 'title', event.target.value)}
                  placeholder="Meet up"
                  className="w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:shadow-brutalInk focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all"
                />
                <input
                  value={item.description}
                  onChange={(event) => updateItineraryItem(index, 'description', event.target.value)}
                  placeholder="Ketemu di tempat pertama..."
                  className="w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm outline-none focus:shadow-brutalInk focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all"
                />
                <button
                  type="button"
                  onClick={() => removeItineraryItem(index)}
                  className="rounded-xl border-2 border-stone-300 bg-stone-50 px-3 py-2 text-sm font-semibold text-stone-500 transition hover:border-ink hover:text-ink hover:bg-stone-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-roseDeep md:col-span-2">{error}</p> : null}

        <div className="flex flex-col gap-3 md:col-span-2 md:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-brutalRose hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalRoseLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalRose disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Generating...' : 'Generate invitation link'}
          </button>
          <button
            type="button"
            onClick={async () => {
              const demoUrl = `${window.location.origin}/i/demo`;
              await navigator.clipboard.writeText(demoUrl);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-white px-6 py-3.5 text-sm font-bold text-ink shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalInk"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Copied' : 'Copy demo link'}
          </button>
        </div>
      </form>
    </>
  );
}
