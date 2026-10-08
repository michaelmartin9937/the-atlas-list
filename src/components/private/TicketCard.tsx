import { StripeButton } from "./StripeButton";
import { privatePreview as p } from "@/content/private-preview";

const label = "font-mono text-[10px] uppercase tracking-[0.24em] text-bone/55";

// The "Gentleman's ticket" card. Rendered once in the sticky desktop aside
// and once inline for phones (after the date strip), so it never needs to
// move between columns. Every button opens the Stripe Payment Link.
export function TicketCard({ className = "" }: { className?: string }) {
  return (
    <aside className={`border border-hairline-dark bg-[#121010] p-7 md:p-8 ${className}`}>
      <p className={label}>{p.ticketLabel}</p>
      <p className="mt-3 font-serif text-bone leading-none">
        <span className="text-[56px]">{p.price}</span>
        <span className="ml-2 font-sans text-[14px] text-bone/70">{p.priceUnit}</span>
      </p>
      <dl className="mt-6 border-t border-hairline-dark">
        {p.card.rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-b border-hairline-dark py-3 text-[14px]">
            <dt className="text-bone/65">{k}</dt>
            <dd className="text-bone text-right">{v}</dd>
          </div>
        ))}
      </dl>
      {/* One payment path: the $150 Payment Link. */}
      <div className="mt-7">
        <StripeButton label={p.cta} className="w-full" />
      </div>
      <p className="mt-4 flex items-start gap-2 text-[12px] leading-[1.5] text-bone/70">
        <svg viewBox="0 0 24 24" className="mt-[2px] h-4 w-4 shrink-0 text-coral" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="1.5" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        {p.stripeNote}
      </p>
      <p className="mt-3 text-[11px] leading-[1.6] text-bone/50">{p.finePrint}</p>
    </aside>
  );
}
