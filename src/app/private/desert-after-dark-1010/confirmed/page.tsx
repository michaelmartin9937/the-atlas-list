import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/private/CopyButton";
import { CALENDAR, privatePreview as p } from "@/content/private-preview";

// Post-payment confirmation for approved guests. Stripe's Payment Link
// redirects here after checkout (configured in the Stripe dashboard). It is
// unlisted and carries no nav or footer, like the ticket page. Design:
// Figma "Desert After Dark — Checkout" › 4 Confirmed (light theme).
export const metadata: Metadata = {
  title: { absolute: "You're on the list | Desert After Dark" },
  description: "Where to go on October 10.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const c = p.confirmed;
const mono = "font-mono text-[10px] uppercase tracking-[0.22em]";

export default function ConfirmedPage() {
  return (
    <div className="-mt-16 md:-mt-[74px] min-h-screen bg-cream text-noir">
      <header className="border-b border-hairline">
        <div className="max-w-[1296px] mx-auto px-6 md:px-12 h-16 md:h-[74px] flex items-center justify-between">
          <Link href="/" className="font-serif text-[17px] md:text-[20px] uppercase tracking-[0.16em] text-noir">
            The Atlas List
          </Link>
          <span className={`${mono} text-ink/55 hidden sm:inline`}>01 Details — 02 Payment — <span className="text-noir border-b border-coral pb-1">03 Confirmed</span></span>
        </div>
      </header>

      <main className="max-w-[1296px] mx-auto px-6 md:px-12 py-16 md:py-24 grid gap-14 md:grid-cols-[minmax(0,560px)_minmax(0,1fr)] md:gap-24">
        <section>
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-coral text-coral" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <h1 className="mt-8 font-serif text-[2.6rem] sm:text-5xl md:text-[64px] leading-[1.02] text-noir">
            {c.headline}
            <em className="italic">{c.headlineItalic}</em>
          </h1>
          <p className="mt-5 text-[16px] leading-[1.6] text-ink/70">{c.copy}</p>

          <div className="mt-12 flex items-baseline justify-between gap-4">
            <span className={`${mono} text-ink/60`}>{c.eyebrow}</span>
            <span className="text-[12px] text-ink/50">{c.savedNote}</span>
          </div>

          <ol className="mt-4 flex flex-col gap-4">
            {c.stops.map((s) => (
              <li key={s.label} className="border border-hairline bg-[#FBF8F2] p-6">
                <span className={`${mono} text-coral`}>{s.label}</span>
                <p className="mt-4 font-serif text-[22px] md:text-[26px] leading-[1.25] text-noir">
                  {s.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
                <p className="mt-4 text-[14px] leading-[1.6] text-ink/70">{s.body}</p>
                {"mapsQuery" in s && (
                  <div className="mt-5 border-t border-hairline pt-4 flex flex-wrap items-center gap-6">
                    <a
                      href={`https://maps.apple.com/?q=${encodeURIComponent(s.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${mono} text-coral hover:text-noir transition-colors`}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                        <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
                        <circle cx="12" cy="11" r="2.2" />
                      </svg>
                      Directions
                    </a>
                    <CopyButton text={s.copyText} />
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-4 flex items-start gap-4 border-b border-hairline pb-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-hairline text-coral" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z" />
              </svg>
            </span>
            <span>
              <span className="block text-[16px] text-noir">{c.rideHome.title}</span>
              <span className="block text-[14px] leading-[1.5] text-ink/65">{c.rideHome.body}</span>
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={CALENDAR.ics}
              download="desert-after-dark.ics"
              className={`inline-flex h-[52px] items-center justify-center px-8 bg-noir text-cream ${mono} hover:bg-coral hover:text-noir transition-colors`}
            >
              {c.calendarCta}
            </a>
            <a
              href={CALENDAR.google}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-[52px] items-center justify-center px-8 border border-noir text-noir ${mono} hover:bg-noir hover:text-cream transition-colors`}
            >
              {c.googleCta}
            </a>
          </div>
          <p className="mt-4 text-[12px] leading-[1.6] text-ink/55">
            On iPhone, &ldquo;Add to calendar&rdquo; opens Apple Calendar. {c.walletNote}
          </p>
        </section>

        {/* Ticket stub */}
        <aside className="self-start border border-hairline bg-[#FBF8F2] p-7 md:p-8">
          <div className="flex items-baseline justify-between">
            <span className={`${mono} text-coral`}>Desert After Dark</span>
            <span className={`${mono} text-ink/50`}>Admit</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2 className="font-serif text-[30px] md:text-[34px] leading-[1.05] text-noir">
              Gentleman&apos;s
              <br />
              ticket
            </h2>
            <span className="font-serif text-[30px] md:text-[34px] leading-none text-noir">01</span>
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hairline pt-5 text-[15px]">
            <div>
              <dt className={`${mono} text-ink/50`}>Date</dt>
              <dd className="mt-1 text-noir">Sat, Oct 10</dd>
            </div>
            <div>
              <dt className={`${mono} text-ink/50`}>Arrive at pickup</dt>
              <dd className="mt-1 text-noir">5:15–7:30 PM</dd>
            </div>
            <div>
              <dt className={`${mono} text-ink/50`}>Doors</dt>
              <dd className="mt-1 text-noir">5:30 PM</dd>
            </div>
            <div>
              <dt className={`${mono} text-ink/50`}>Paid</dt>
              <dd className="mt-1 text-noir">{p.price}</dd>
            </div>
          </dl>
          <div className="mt-7 border-t border-dashed border-hairline pt-6">
            <span className={`${mono} text-ink/50`}>Show at pickup</span>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink/70">Your confirmation text or email, with photo ID. One ticket per guest.</p>
          </div>
        </aside>
      </main>

      <footer className="border-t border-hairline">
        <div className="max-w-[1296px] mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="font-serif text-[15px] uppercase tracking-[0.16em] text-noir">The Atlas List</span>
          <span className="text-[12px] text-ink/55">
            <a href={`mailto:${p.footer.email}`} className="hover:text-coral transition-colors">
              {p.footer.email}
            </a>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            {p.footer.place}
          </span>
        </div>
      </footer>
    </div>
  );
}
