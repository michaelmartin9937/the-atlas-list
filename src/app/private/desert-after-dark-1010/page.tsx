import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Film } from "@/components/private/Film";
import { StickyCta } from "@/components/private/StickyCta";
import { TicketCard } from "@/components/private/TicketCard";
import { VenueMap } from "@/components/private/VenueMap";
import { privatePreview as p } from "@/content/private-preview";
import { ESTATE_AREA, PICKUP_PIN } from "@/content/venues";

// Private ticket page for approved male applicants. Unlisted
// (noindex/nofollow), no site nav or footer, no forms, no estate address.
// Airtable approval matching at checkout is the real control; this URL is
// private in presentation only. Design: Figma "Desert After Dark — Checkout"
// (Dark theme, 1 Event info, Oct 2026) plus the sticky-card handoff note:
// hero full width, then a two-column wrapper with every section on the left
// and the ticket card sticky on the right. Payment is unchanged: every
// button opens the Stripe Payment Link.
export const metadata: Metadata = {
  title: { absolute: p.meta.title },
  description: p.meta.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    title: p.meta.ogTitle,
    description: p.meta.ogDescription,
    url: p.route,
    siteName: "The Atlas List",
    type: "website",
    // Card image comes from ./opengraph-image.tsx
  },
  twitter: { card: "summary_large_image", title: p.meta.ogTitle, description: p.meta.ogDescription },
};

const container = "max-w-[1296px] mx-auto px-6 md:px-12";
const eyebrow = "font-mono text-[11px] uppercase tracking-[0.24em] text-coral";
const label = "font-mono text-[10px] uppercase tracking-[0.24em] text-bone/55";
const body = "text-[16px] md:text-[17px] leading-[1.6] text-bone/75";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/desert-after-dark", label: "Desert After Dark" },
  { href: "/partner", label: "Partners" },
];

function Icon({ name }: { name: string }) {
  const cls = "h-5 w-5 text-coral";
  if (name === "car")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 16V12l2-5h10l2 5v4" />
        <path d="M3 16h18M7 16v2M17 16v2" />
        <circle cx="8" cy="13.5" r="1" />
        <circle cx="16" cy="13.5" r="1" />
      </svg>
    );
  if (name === "moon")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export default function PrivateTicketPage() {
  return (
    // The root layout pads <main> for the fixed nav; this page has no nav.
    <div className="-mt-16 md:-mt-[74px] min-h-screen bg-night text-bone">
      {/* Top bar */}
      <header className="border-b border-hairline-dark">
        <div className={`${container} h-16 md:h-[74px] flex items-center justify-between gap-6`}>
          <Link href="/" className="font-serif text-[17px] md:text-[20px] uppercase tracking-[0.16em] text-bone whitespace-nowrap">
            The Atlas List
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative font-mono text-[10px] uppercase tracking-[0.22em] transition-colors hover:text-coral ${
                  l.href === "/desert-after-dark" ? "text-bone after:absolute after:left-0 after:right-0 after:-bottom-[8px] after:h-px after:bg-coral" : "text-bone/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <rect x="5" y="11" width="14" height="10" rx="1.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Secure checkout
          </span>
        </div>
      </header>

      {/* Hero: full width */}
      <section id="hero" className="relative min-h-[560px] md:min-h-[600px] flex items-end overflow-hidden">
        <Image src={p.hero.poster} alt={p.hero.posterAlt} fill priority sizes="100vw" className="object-cover object-[center_30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 via-40% to-night/15" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/20 to-transparent" aria-hidden />
        <div className={`relative w-full ${container} pb-14 md:pb-16 pt-28`}>
          <FadeIn>
            <p className={eyebrow}>{p.hero.eyebrow}</p>
            <h1 className="mt-5 font-serif text-bone leading-[0.95]">
              <span className="block uppercase text-[3.4rem] sm:text-7xl md:text-[108px] tracking-[-0.01em]">{p.hero.headline}</span>
              <span className="block italic text-[2.9rem] sm:text-6xl md:text-[96px]">{p.hero.headlineItalic}</span>
            </h1>
            <p className={`mt-6 max-w-[420px] ${body}`}>{p.hero.copy}</p>
          </FadeIn>
        </div>
      </section>

      {/* Two-column wrapper: content left, sticky ticket card right. No
          ancestor of the card may clip overflow or use a transform, so the
          aside is deliberately not wrapped in FadeIn. */}
      <div className={`${container} lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-x-[88px] lg:items-start`}>
        <div className="min-w-0">
          {/* Details strip */}
          <section className="pt-8 md:pt-10">
            <dl className="grid grid-cols-3 border-b border-hairline-dark">
              {p.strip.facts.map(([k, v], i) => (
                <div key={k} className={`py-5 ${i > 0 ? "border-l border-hairline-dark pl-5" : ""}`}>
                  <dt className={label}>{k}</dt>
                  <dd className="mt-2 font-serif text-[22px] md:text-[26px] leading-tight text-bone">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="grid gap-5 sm:grid-cols-2 border-b border-hairline-dark py-6">
              {p.strip.notes.map((n) => (
                <li key={n.title} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-hairline-dark">
                    <Icon name={n.icon} />
                  </span>
                  <span>
                    <span className="block text-[15px] text-bone">{n.title}</span>
                    <span className="block text-[13px] text-bone/60">{n.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Phones and tablets: the card sits right after the date strip. */}
          <TicketCard className="mt-8 lg:hidden" />

          {/* 01 About the night */}
          <section className="pt-16 md:pt-20">
            <FadeIn>
              <p className={eyebrow}>
                01 <span className="ml-3">{p.about.eyebrow}</span>
              </p>
              <h2 className="mt-5 font-serif text-[2.1rem] md:text-[44px] leading-[1.1] text-bone max-w-[640px]">
                {p.about.headline}
                <em className="italic">{p.about.headlineItalic}</em>
              </h2>
              <p className={`mt-6 max-w-[600px] ${body}`}>{p.about.copy}</p>
              <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 border-t border-hairline-dark">
                {p.about.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 border-b border-hairline-dark py-4 text-[14px] text-bone/85">
                    <span className="h-[6px] w-[6px] rounded-full bg-coral" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </section>

          {/* A glimpse after dark (film), full width of the left column */}
          <section className="pt-16 md:pt-20">
            <FadeIn>
              <p className={eyebrow}>{p.film.eyebrow}</p>
              <div className="mt-6">
                <Film src={p.film.src} poster={p.film.poster} posterAlt="Preview film of the Desert After Dark atmosphere" disclosure={p.film.disclosureText} />
              </div>
            </FadeIn>
          </section>

          {/* 02 The evening */}
          <section className="pt-16 md:pt-20">
            <FadeIn>
              <p className={eyebrow}>
                02 <span className="ml-3">{p.evening.eyebrow}</span>
              </p>
              <ol className="mt-6 grid md:grid-cols-3 border-t border-hairline-dark">
                {p.evening.acts.map((a, i) => (
                  <li key={a.title} className={`py-6 ${i > 0 ? "md:border-l md:border-hairline-dark md:pl-6" : ""} border-b border-hairline-dark md:border-b-0 md:pr-6`}>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-coral">{a.time}</span>
                    <h3 className={`mt-3 font-serif text-[26px] leading-tight text-bone ${"italic" in a && a.italic ? "italic" : ""}`}>{a.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.5] text-bone/65">{a.body}</p>
                  </li>
                ))}
              </ol>
            </FadeIn>
          </section>

          {/* 03 Getting there */}
          <section className="pt-16 md:pt-20">
            <FadeIn>
              <p className={eyebrow}>
                03 <span className="ml-3">{p.gettingThere.eyebrow}</span>
              </p>
              <ol className="mt-6 grid md:grid-cols-3 gap-5">
                {p.gettingThere.steps.map((s, i) => (
                  <li key={s.title} className="border border-hairline-dark bg-[#121010] p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center border border-hairline-dark">
                        <Icon name={s.icon} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/55">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-[24px] leading-tight text-bone">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.5] text-bone">
                      {s.lines.map((l, j) => (
                        <span key={l} className={j === 0 ? "block" : "block text-bone/75"}>
                          {l}
                        </span>
                      ))}
                    </p>
                    <p className="mt-4 text-[13px] leading-[1.6] text-bone/65">{s.body}</p>
                  </li>
                ))}
              </ol>
            </FadeIn>
            {/* Map: pickup pin only on this page. The estate is a soft area
                marker; its address goes out after purchase. */}
            <div className="mt-5">
              <VenueMap pins={[PICKUP_PIN]} area={ESTATE_AREA} theme="dark" />
            </div>
            <FadeIn delay={120}>
              <div className="mt-5 border border-hairline-dark bg-[#121010] p-6 md:p-8 grid gap-6 md:grid-cols-2 md:gap-12">
                <div>
                  <h3 className="font-serif text-[24px] md:text-[28px] leading-tight text-bone">{p.gettingThere.ownRide.title}</h3>
                  <p className="mt-3 font-serif italic text-[20px] text-coral">{p.gettingThere.ownRide.lead}</p>
                </div>
                <div className="md:border-l md:border-hairline-dark md:pl-12">
                  <span className={label}>The estate</span>
                  <p className="mt-3 font-serif text-[22px] leading-[1.25] text-bone">Address sent after purchase</p>
                  <p className="mt-4 text-[14px] leading-[1.6] text-bone/70">{p.gettingThere.ownRide.body}</p>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* 04 Dress code */}
          <section className="pt-16 md:pt-20">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:gap-12 md:items-start">
              <FadeIn>
                <p className={eyebrow}>
                  04 <span className="ml-3">{p.dress.eyebrow}</span>
                </p>
                <h2 className="mt-5 font-serif italic text-[2.1rem] md:text-[44px] leading-[1.1] text-bone">{p.dress.headline}</h2>
                <p className={`mt-5 max-w-[560px] ${body}`}>{p.dress.copy}</p>
                <ul className="mt-6 flex flex-wrap gap-3" aria-label="Palette">
                  {p.dress.swatches.map((s) => (
                    <li key={s} className="h-7 w-7 rounded-full" style={{ background: s }} />
                  ))}
                </ul>
                <details className="mt-7 group max-w-[560px]">
                  <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-[0.24em] text-coral hover:text-bone [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Styling notes +</span>
                    <span className="hidden group-open:inline">Styling notes −</span>
                  </summary>
                  <ul className="mt-4 flex flex-col gap-2 border-l border-coral/60 pl-5">
                    {p.dress.notes.map((n) => (
                      <li key={n} className="text-[14px] leading-[1.5] text-bone/80">
                        {n}
                      </li>
                    ))}
                  </ul>
                </details>
              </FadeIn>
              <FadeIn delay={120}>
                <a href={p.dress.board} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[2/3] overflow-hidden border border-hairline-dark bg-[#121010]">
                    <Image src={p.dress.board} alt={p.dress.boardAlt} fill loading="lazy" sizes="(min-width: 768px) 300px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <span className="mt-3 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/60 group-hover:text-coral">
                    {p.dress.boardLabel} <span aria-hidden>→</span>
                  </span>
                </a>
              </FadeIn>
            </div>
          </section>

          {/* 05 Good to know */}
          <section className="pt-16 md:pt-20 pb-20 md:pb-24">
            <FadeIn>
              <p className={eyebrow}>
                05 <span className="ml-3">{p.goodToKnow.eyebrow}</span>
              </p>
              <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {p.goodToKnow.items.map((t) => (
                  <li key={t} className="flex items-start gap-4 border-b border-hairline-dark py-4 text-[15px] leading-[1.5] text-bone/85">
                    <svg viewBox="0 0 24 24" className="mt-[3px] h-4 w-4 shrink-0 text-coral" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </section>
        </div>

        {/* Desktop: the ticket card, overlapping the hero and sticky as the
            page scrolls. align-self: stretch keeps it inside the wrapper, so
            it stops above the footer. */}
        <div className="hidden lg:block self-stretch -mt-[360px]">
          <TicketCard className="sticky top-6" />
        </div>
      </div>

      {/* Footer (outside the wrapper) */}
      <footer className="border-t border-hairline-dark">
        <div className={`${container} py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}>
          <span className="font-serif text-[15px] uppercase tracking-[0.16em] text-bone">The Atlas List</span>
          <span className="text-[12px] text-bone/55">
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

      <StickyCta label={p.cta} price={p.price} priceUnit={p.priceUnit} ticketLabel={p.ticketLabel} heroId="hero" />
    </div>
  );
}
