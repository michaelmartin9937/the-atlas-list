type Item = { q: string; a: string };

// Restrained accordion built on <details>, so it is keyboard-accessible with
// no JavaScript at all.
export function Faq({ items }: { items: readonly Item[] }) {
  return (
    <dl className="divide-y divide-velvet-line border-y border-velvet-line">
      {items.map((it) => (
        <details key={it.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold [&::-webkit-details-marker]:hidden">
            <dt className="font-serif text-xl md:text-2xl text-bone">{it.q}</dt>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-velvet-line text-gold transition-transform duration-300 motion-reduce:transition-none group-open:rotate-45"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <dd className="pb-6 pr-14 text-base leading-[1.6] text-velvet-text">{it.a}</dd>
        </details>
      ))}
    </dl>
  );
}
