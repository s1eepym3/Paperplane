'use client';

import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

const categories = ['Tanggal', 'Jam', 'Tempat', 'Aktivitas', 'Lainnya'] as const;

type SuggestFormProps = {
  token: string;
};

export function SuggestForm({ token }: SuggestFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/invitations/${token}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: selectedCategories,
          note,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? 'Gagal mengirim saran.');
      }

      setIsSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Gagal mengirim saran.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="mt-8 rounded-3xl border-2 border-ink bg-roseSoft/10 p-6 text-center shadow-brutalInk">
        <p className="text-sm font-bold text-ink">Makasih sudah kirim saran. ❤️</p>
        <p className="mt-2 text-sm leading-7 text-stone-600 font-medium">Aku akan sesuaikan rencananya lagi ya.</p>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <p className="mb-3 text-sm font-bold text-ink">Bagian mana yang kurang pas?</p>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink bg-white p-4 text-sm font-bold text-stone-600 transition-all hover:bg-stone-50 hover:shadow-brutalInk hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-roseDeep"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-ink">Catatan dari kamu</span>
        <textarea
          rows={5}
          required
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Contoh: aku lebih bisa jam 19:30, atau tempatnya yang lebih dekat ya..."
          className="mt-3 w-full resize-none rounded-2xl border-2 border-ink bg-white p-4 text-sm leading-7 outline-none transition-all placeholder:text-stone-400 focus:shadow-brutalInk focus:-translate-x-0.5 focus:-translate-y-0.5"
        />
      </label>

      {error ? <p className="text-sm text-roseDeep">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-brutalRose hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalRoseLg transition-all active:translate-x-0 active:translate-y-0 active:shadow-brutalRose disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim rekomendasi'}
        <Send size={15} />
      </button>
    </form>
  );
}
