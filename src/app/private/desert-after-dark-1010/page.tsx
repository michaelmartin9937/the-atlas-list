import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { EventTimeline } from "@/components/EventTimeline";
import { Faq } from "@/components/private/Faq";
import { Film } from "@/components/private/Film";
import { StickyCta } from "@/components/private/StickyCta";
import { StripeButton } from "@/components/private/StripeButton";
import { StripeBuyButton } from "@/components/private/StripeBuyButton";
import { privatePreview as p } from "@/content/private-preview";

// Private preview for approved male applicants deciding whether to complete
// their $495 admission payment. Unlisted (noindex/nofollow), no site nav or
// footer, no forms, no address. Airtable approval matching at checkout is
// the real control; this URL is private in presentation only.
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
    images: [{ url: "/images/og-desert-after-dark.jpg", width: 1200, height: 630, alt: "Desert After Dark" }],
  },
  twitter: { card: "summary_large_image", title: p.meta.ogTitle, description: p.meta.ogDescription },
};

const eyebrow = "text-[12px] font-semibold uppercase tracking-[0.14em] text-gold";
const h2 = "mt-4 font-serif text-4xl md:text-[48px] leading-[1.08] text-bone";
const body = "text-base md:text-[17px] leading-[1.6] text-velvet-text";

export default function PrivatePreviewPage() {
  return (
    // The root layout pads <main> for the fixed nav; this page has no nav.
    <div className="-mt-20 md:-mt-[104px] bg-velvet text-bone">
      {/* 1. Private hero */}
      <section id="hero" className="relative min-h-[88vh] md:min-h-[92vh] flex items-end overflow-hidden">
        {p.hero.loop ? (
          <video
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            src={p.hero.loop}
            poster={p.hero.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        ) : null}
        <Image
          src={p.hero.poster}
          alt={p.hero.posterAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${p.hero.loop ? "motion-safe:hidden" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-velvet via-velvet/70 via-45% to-velvet/20" aria-hidden />
        <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-32">
          <FadeIn>
            <Image src="/brand/atlas-list-logo.svg" alt="The Atlas List" width={64} height={64} unoptimized className="h-14 w-14 md:h-16 md:w-16" />
            <p className={`mt-8 ${eyebrow}`}>{p.hero.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[3.2rem] sm:text-6xl md:text-[88px] leading-[0.98] text-bone">{p.hero.headline}</h1>
            <p className="mt-4 font-serif italic text-2xl md:text-[28px] text-gold">{p.hero.tagline}</p>
            <p className={`mt-6 max-w-[560px] ${body}`}>{p.hero.copy}</p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
              <StripeButton label={p.cta} className="w-full sm:w-auto" />
              <a
                href="#film"
                className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-bone hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors"
              >
                {p.secondaryCta}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M12 5v14m0 0-6-6m6 6 6-6" />
                </svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Atmosphere film */}
      <section id="film" className="px-6 md:px-10 py-20 md:py-[112px] scroll-mt-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="text-center max-w-[720px] mx-auto">
              <h2 className="font-serif text-4xl md:text-[48px] leading-[1.08] text-bone">{p.film.headline}</h2>
              <p className={`mt-5 ${body}`}>{p.film.copy}</p>
            </div>
          </FadeIn>
          <FadeIn delay={120} className="mt-10 md:mt-12">
            <Film
              src={p.film.src}
              poster={p.film.poster}
              posterAlt="Preview film of the Desert After Dark atmosphere"
              disclosure={p.film.aiDisclosure ? p.film.disclosureText : null}
            />
          </FadeIn>
        </div>
      </section>

      {/* 3. Experience pillars */}
      <section className="px-6 md:px-10 pb-20 md:pb-[112px]">
        <ul className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-px bg-velvet-line border border-velvet-line">
          {p.pillars.map((pl, i) => (
            <FadeIn key={pl.title} delay={i * 80}>
              <li className="h-full bg-velvet p-8 md:p-10">
                <span className="font-serif text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-bone">{pl.title}</h3>
                <p className={`mt-4 ${body}`}>{pl.body}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* The night, hour by hour (shared with the event and ticket pages) */}
      <EventTimeline tone="noir" footer={<StripeButton label={p.cta} className="w-full sm:w-auto" />} />

      {/* 4. Authentic proof */}
      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[112px]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="max-w-[760px]">
              <h2 className="font-serif text-4xl md:text-[48px] leading-[1.08] text-bone">{p.proof.headline}</h2>
              <p className={`mt-5 ${body}`}>{p.proof.copy}</p>
            </div>
          </FadeIn>
          {/* Four columns; wide images take two. Wide (8:5 over two columns)
              and single (4:5) cells share the same height, so rows stay level:
              [wide, single, single] [wide, single, single] [wide, single, BTS]. */}
          <div className="mt-12 md:mt-16 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
            {p.proof.gallery.map((img, i) => {
              const wide = "span" in img && img.span === "wide";
              return (
                <FadeIn key={img.src} delay={(i % 4) * 60} className={wide ? "col-span-2" : ""}>
                  <div className={`relative overflow-hidden rounded bg-velvet-card ${wide ? "aspect-[8/5]" : "aspect-[4/5]"}`}>
                    <Image src={img.src} alt={img.alt} fill loading="lazy" sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover" />
                  </div>
                </FadeIn>
              );
            })}
            <FadeIn delay={240}>
              <Film
                src={p.proof.bts.src}
                poster={p.proof.bts.poster}
                posterAlt="Behind the scenes at model casting"
                disclosure={p.proof.bts.caption}
                vertical
                loop
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Dress code */}
      <section className="px-6 md:px-10 py-20 md:py-[112px]">
        <div className="max-w-[1200px] mx-auto grid gap-12 md:grid-cols-2 md:gap-x-20 md:items-center">
          <FadeIn>
            <p className={eyebrow}>{p.dress.eyebrow}</p>
            <h2 className={h2}>{p.dress.headline}</h2>
            <p className={`mt-6 ${body}`}>{p.dress.copy}</p>
            <details className="mt-7 group">
              <summary className="cursor-pointer list-none text-[13px] font-semibold uppercase tracking-[0.1em] text-gold hover:text-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-gold [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Styling notes +</span>
                <span className="hidden group-open:inline">Styling notes −</span>
              </summary>
              <ul className="mt-4 flex flex-col gap-2 border-l border-gold/50 pl-5">
                {p.dress.notes.map((n) => (
                  <li key={n} className="text-[15px] leading-[1.5] text-[#D8D2C8]">
                    {n}
                  </li>
                ))}
              </ul>
            </details>
          </FadeIn>
          <FadeIn delay={120}>
            {p.dress.board ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded bg-velvet-card">
                <Image src={p.dress.board} alt={p.dress.boardAlt} fill loading="lazy" sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
              </div>
            ) : (
              // Placeholder until the men's board is delivered: the palette,
              // set like a swatch card.
              <div className="rounded border border-velvet-line bg-velvet-card p-8 md:p-10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-velvet-text">Desert After Dark · Palette</p>
                <ul className="mt-6 grid grid-cols-3 gap-4">
                  {p.dress.palette.map((c) => (
                    <li key={c.name} className="flex flex-col gap-3">
                      <span className="block h-20 rounded-sm border border-white/5" style={{ background: c.hex }} aria-hidden />
                      <span className="text-[12px] uppercase tracking-[0.08em] text-[#D8D2C8]">{c.name}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-serif italic text-lg text-velvet-text">Men&rsquo;s styling board to follow.</p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* 6. Event details */}
      <section className="bg-noir px-6 md:px-10 py-20 md:py-[112px]">
        <div className="max-w-[860px] mx-auto">
          <FadeIn>
            <p className={eyebrow}>{p.details.eyebrow}</p>
            <dl className="mt-8 divide-y divide-velvet-line border-y border-velvet-line">
              {p.details.rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] md:grid-cols-[220px_1fr] gap-4 py-4">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-velvet-text pt-[3px]">{k}</dt>
                  <dd className="font-serif text-xl md:text-2xl text-bone">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-4">
              {p.details.terms.map((t) => (
                <p key={t} className="text-[15px] leading-[1.6] text-velvet-text">
                  {t}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
              <StripeButton label={p.cta} className="w-full sm:w-auto" />
              <StripeBuyButton />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="px-6 md:px-10 py-20 md:py-[112px]">
        <div className="max-w-[860px] mx-auto">
          <FadeIn>
            <p className={eyebrow}>Questions</p>
            <div className="mt-8">
              <Faq items={p.faq} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="relative overflow-hidden px-6 md:px-10 pt-16 md:pt-[96px] pb-28 md:pb-[140px]">
        <div
          className="absolute inset-x-0 bottom-0 h-[420px] pointer-events-none bg-[radial-gradient(ellipse_45%_60%_at_50%_100%,rgba(164,62,120,0.22),transparent_70%)]"
          aria-hidden
        />
        <div className="relative max-w-[760px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-[52px] leading-[1.08] text-bone">{p.final.headline}</h2>
            <p className={`mt-6 ${body}`}>{p.final.copy}</p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <StripeButton label={p.cta} className="w-full sm:w-auto" />
              <StripeBuyButton className="flex justify-center" />
              <p className="text-[12px] uppercase tracking-[0.1em] text-velvet-text">{p.stripeNote}</p>
              <p className="text-[13px] text-velvet-text">{p.final.checkoutNote}</p>
            </div>
            <p className="mt-16 text-[12px] uppercase tracking-[0.14em] text-velvet-text/70">The Atlas List · Private, invite-only</p>
          </FadeIn>
        </div>
      </section>

      <StickyCta label="Confirm My Admission" price={p.price} heroId="hero" />
    </div>
  );
}
