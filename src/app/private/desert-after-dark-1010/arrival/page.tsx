import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/private/CopyButton";
import { DirectionsLink } from "@/components/private/DirectionsLink";
import { MapFocusCard } from "@/components/private/MapFocusCard";
import { VenueMap } from "@/components/private/VenueMap";
import { arrival as a } from "@/content/arrival";
import { CALENDAR } from "@/content/private-preview";
import { ESTATE_PIN, PICKUP_PIN } from "@/content/venues";

// Arrival Notes for confirmed guests (men and women), linked from the
// confirmation emails. Unlisted: noindex, not in the nav, footer or any
// sitemap. It explains logistics; viewing it does not establish admission.
// Transport details (driver names, plates) live in src/content/arrival.ts
// and render only once filled in.
export const metadata: Metadata = {
  title: { absolute: a.title },
  description: a.intro,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const mono = "font-mono text-[10px] uppercase tracking-[0.22em]";
const PINS = { pickup: PICKUP_PIN, estate: ESTATE_PIN } as const;

export default function ArrivalNotesPage() {
  const vehicles = a.transport.vehicles;
  return (
    <div className="-mt-16 md:-mt-[74px] min-h-screen bg-cream text-noir">
      <header className="border-b border-hairline">
        <div className="max-w-[1296px] mx-auto px-6 md:px-12 h-16 md:h-[74px] flex items-center justify-between">
          <Link href="/" className="font-serif text-[17px] md:text-[20px] uppercase tracking-[0.16em] text-noir">
            The Atlas List
          </Link>
          <span className={`${mono} text-ink/55`}>Arrival notes</span>
        </div>
      </header>

      <main className="max-w-[1296px] mx-auto px-6 md:px-12 py-14 md:py-24 grid gap-12 md:grid-cols-[minmax(0,620px)_minmax(0,1fr)] md:gap-24">
        <section>
          <span className={`${mono} text-coral`}>Saturday, October 10</span>
          <h1 className="mt-5 font-serif text-[2.4rem] sm:text-5xl md:text-[60px] leading-[1.04] text-noir">
            Desert After Dark
            <br />
            <em className="italic">Arrival Notes</em>
          </h1>
          <p className="mt-5 text-[16px] leading-[1.6] text-ink/70">{a.intro}</p>

          {/* At a glance: shown first on phones, in the right column on desktop. */}
          <div className="mt-10 md:hidden">
            <GlanceCard />
          </div>

          {/* Arrival options */}
          <h2 className={`mt-12 ${mono} text-ink/60`}>{a.options.eyebrow}</h2>
          <div className="mt-4">
            <VenueMap pins={[PICKUP_PIN, ESTATE_PIN]} theme="light" route />
          </div>
          <ol className="mt-4 flex flex-col gap-4">
            {a.options.cards.map((c) => {
              const pin = PINS[c.pinId];
              return (
                <li key={c.label}>
                  <MapFocusCard pinId={c.pinId} className="border border-hairline bg-[#FBF8F2] p-6 hover:border-coral transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <span className={`${mono} text-coral`}>{c.label}</span>
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-noir font-mono text-[11px] ${
                          pin.tone === "coral" ? "bg-coral" : "bg-bone"
                        }`}
                        aria-hidden
                      >
                        {pin.n}
                      </span>
                    </div>
                    <p className="mt-4 font-serif text-[22px] md:text-[26px] leading-[1.25] text-noir">
                      {c.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                    <p className="mt-4 text-[14px] leading-[1.6] text-ink/70">{c.body}</p>
                    <div className="mt-5 border-t border-hairline pt-4 flex flex-wrap items-center gap-6">
                      <DirectionsLink address={c.mapsQuery} className={`inline-flex items-center gap-2 ${mono} text-coral hover:text-noir transition-colors`} />
                      <CopyButton text={c.copyText} />
                    </div>
                  </MapFocusCard>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 flex items-start gap-3 text-[14px] leading-[1.6] text-noir">
            <svg viewBox="0 0 24 24" className="mt-[3px] h-4 w-4 shrink-0 text-coral" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M6 18L18 6" />
            </svg>
            {a.options.rule}
          </p>

          {/* Event transportation */}
          <h2 className={`mt-14 ${mono} text-ink/60`}>{a.transport.eyebrow}</h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-ink/75">{a.transport.copy}</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {vehicles.map((v) => (
              <li key={v.name} className="border border-hairline bg-[#FBF8F2] flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-hairline/40">
                  <Image src={v.image} alt={v.alt} fill loading="lazy" sizes="(min-width: 768px) 200px, 100vw" className="object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="font-serif text-[20px] leading-tight text-noir">{v.name}</span>
                  {v.window && <span className={`mt-3 ${mono} text-coral`}>{v.window}</span>}
                  {v.note && <span className="mt-2 text-[13px] leading-[1.5] text-ink/65">{v.note}</span>}
                  {v.driver && <span className="mt-4 border-t border-hairline pt-3 text-[14px] leading-[1.5] text-noir">Driver: {v.driver}</span>}
                </div>
              </li>
            ))}
          </ul>

          {/* Your concierge team */}
          <h2 className={`mt-14 ${mono} text-ink/60`}>{a.concierge.eyebrow}</h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-ink/75">{a.concierge.copy}</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {a.concierge.contacts.map((c) => (
              <li key={c.name} className="border border-hairline bg-[#FBF8F2] p-5">
                <span className={`${mono} text-coral`}>{c.role}</span>
                <span className="mt-3 block font-serif text-[22px] leading-tight text-noir">{c.name}</span>
                <a href={`tel:${c.tel}`} className="mt-2 inline-block text-[15px] text-noir hover:text-coral transition-colors">
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>

          {/* Ride home */}
          <div className="mt-8 flex items-start gap-4 border-b border-hairline pb-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-hairline text-coral" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z" />
              </svg>
            </span>
            <span>
              <span className="block text-[16px] text-noir">{a.returnService.title}</span>
              <span className="block text-[14px] leading-[1.5] text-ink/65">{a.returnService.body}</span>
            </span>
          </div>

          {/* Guest guidance */}
          <h2 className={`mt-12 ${mono} text-ink/60`}>{a.guidance.eyebrow}</h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-ink/75">{a.guidance.copy}</p>

          {/* Calendar */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={CALENDAR.ics}
              download="desert-after-dark.ics"
              className={`inline-flex h-[52px] items-center justify-center px-8 bg-noir text-cream ${mono} hover:bg-coral hover:text-noir transition-colors`}
            >
              {a.calendar.cta}
            </a>
            <a
              href={CALENDAR.google}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-[52px] items-center justify-center px-8 border border-noir text-noir ${mono} hover:bg-noir hover:text-cream transition-colors`}
            >
              {a.calendar.googleCta}
            </a>
          </div>
          <p className="mt-4 text-[12px] leading-[1.6] text-ink/55">{a.calendar.note}</p>
        </section>

        <aside className="hidden md:block self-start md:sticky md:top-6">
          <GlanceCard />
        </aside>
      </main>

      <footer className="border-t border-hairline">
        <div className="max-w-[1296px] mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="font-serif text-[15px] uppercase tracking-[0.16em] text-noir">The Atlas List</span>
          <span className="text-[12px] text-ink/55">
            <a href={`mailto:${a.footer.email}`} className="hover:text-coral transition-colors">
              {a.footer.email}
            </a>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            {a.footer.place}
          </span>
        </div>
      </footer>
    </div>
  );
}

function GlanceCard() {
  return (
    <div className="border border-hairline bg-[#FBF8F2] p-7 md:p-8">
      <span className={`${mono} text-coral`}>{a.glance.eyebrow}</span>
      <dl className="mt-5 border-t border-hairline">
        {a.glance.rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 border-b border-hairline py-3">
            <dt className={`${mono} text-ink/50 pt-[3px]`}>{k}</dt>
            <dd className="text-[15px] leading-[1.45] text-noir">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-[13px] leading-[1.6] text-ink/65">{a.glance.note}</p>
    </div>
  );
}
