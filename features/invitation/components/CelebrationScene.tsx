export function CelebrationScene({ receiverName }: { receiverName: string }) {
  return (
    <section className="flex min-h-[34rem] flex-col items-center justify-center text-center">
      <div className="mb-8 h-24 w-24 rounded-full border-2 border-ink bg-roseSoft/30 p-2 shadow-brutalInk">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-ink bg-white text-3xl font-bold">♡</div>
      </div>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-ink">Yay</h2>
      <p className="mt-4 max-w-xs text-base leading-8 text-stone-600">Makasih sudah bilang yes, {receiverName}. Ada satu amplop kecil buat kamu.</p>
    </section>
  );
}
