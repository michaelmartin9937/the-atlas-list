import type { Metadata } from "next";
import Image from "next/image";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { TicketCounter } from "@/components/TicketCounter";
import { PreviewVideo } from "@/components/PreviewVideo";
import { EventTimeline } from "@/components/EventTimeline";
import { eventTimeline } from "@/content/event-timeline";
import { StripeButton } from "@/components/private/StripeButton";
import { StripeBuyButton } from "@/components/private/StripeBuyButton";
import { privatePreview } from "@/content/private-preview";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { tickets as t } from "@/content/tickets";

// Men's ticket sales page for Desert After Dark. Reached by link and ads
// only — it is not in the nav or footer. Same application, same data path
// as the event page; the landing page ("/desert-after-dark/tickets") is
// recorded with each application so these can be told apart in Airtable.
const TITLE = "Tickets · Desert After Dark";
const DESCRIPTION =
  "One hundred tickets for men. Two women for every one of them. A private-residence fashion show and mansion party in Paradise Valley, October 10. Apply, get approved, then buy.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/desert-after-dark/tickets" },
  openGraph: {
    title: `${TITLE} · The Atlas List`,
    description: DESCRIPTION,
    url: "/desert-after-dark/tickets",
    siteName: "The Atlas List",
    type: "website",
    images: [{ url: "/images/og-desert-after-dark.jpg", width: 1200, height: 630, alt: "Desert After Dark powered by Thundr" }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} · The Atlas List`, description: DESCRIPTION, images: ["/images/og-desert-after-dark.jpg"] },
};

// The count is read on every request so the first paint is already right;
// the client component then keeps it fresh.
export const dynamic = "force-dynamic";

const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.08em] text-gold";
const h2 = "mt-5 font-serif text-4xl md:text-[52px] leading-[1.08] text-bone";
const body = "text-base md:text-[17px] leading-[1.5] text-velvet-text";

async function getCount() {
  try {
    const { data } = await createServerSupabaseClient()
      .from("event_inventory")
      .select("total, remaining")
      .eq("event_slug", "desert-after-dark-2026")
      .maybeSingle();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function TicketsPage() {
  const count = await getCount();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-velvet">
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_55%_at_15%_90%,rgba(164,62,120,0.18),transparent_70%)]"
          aria-hidden
        />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-14 md:pt-[96px] pb-16 md:pb-[112px] grid gap-12 md:gap-x-16 md:grid-cols-[minmax(0,1fr)_560px] md:items-center">
          <div className="max-w-[640px]">
            <span className={eyebrow}>{t.hero.eyebrow}</span>
            <h1 className="mt-6 font-serif text-[2.6rem] sm:text-5xl md:text-[60px] leading-[1.05] text-bone">
              {t.hero.headline}
            </h1>
            <p className="mt-5 inline-flex items-center gap-3 border border-velvet-line rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-bone">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {eventTimeline.heroTime}
            </p>
            <p className={`mt-6 ${body}`}>{t.hero.subhead}</p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="#apply"
                className="inline-flex w-full sm:w-auto items-center justify-center h-[52px] px-8 bg-gold text-noir text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-bone transition-colors"
              >
                {t.hero.cta}
              </a>
              <span className="text-[13px] leading-[1.5] text-velvet-text">{t.hero.note}</span>
            </div>
            <div className="mt-8">
              <TicketCounter initial={count} />
            </div>
          </div>
          {/* The event preview plays where the design had a photo. */}
          <PreviewVideo
            src="/videos/desert-after-dark-preview.mp4"
            poster="/images/dad/preview-poster.jpg"
            caption="Event preview · AI-generated visualisation of the night"
            className="w-full"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-noir px-6 md:px-10 py-14 md:py-16 border-y border-velvet-line">
        <dl className="max-w-[1000px] mx-auto grid grid-cols-3 gap-6 text-center">
          {t.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <dt className="order-2 mt-3 text-[13px] leading-snug text-velvet-text">{s.label}</dt>
              <dd className="order-1 font-serif text-4xl md:text-[56px] leading-none text-gold tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Why */}
      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[120px]">
        <div className="max-w-[1280px] mx-auto grid gap-12 md:grid-cols-[minmax(0,1fr)_520px] md:gap-x-20 md:items-start">
          <div>
            <FadeIn>
              <span className={eyebrow}>{t.why.eyebrow}</span>
              <h2 className={h2}>{t.why.headline}</h2>
              <p className={`mt-6 max-w-[600px] ${body}`}>{t.why.intro}</p>
            </FadeIn>
            <ol className="mt-12 flex flex-col gap-9">
              {t.why.points.map((p, i) => (
                <FadeIn key={p.title} delay={i * 80}>
                  <li className="flex gap-5">
                    <span className="font-serif text-xl text-gold shrink-0 w-8">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-serif text-2xl md:text-[26px] leading-tight text-bone">{p.title}</h3>
                      <p className={`mt-3 ${body}`}>{p.body}</p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
          <FadeIn delay={120} className="flex flex-col gap-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded bg-velvet-card">
              <Image src="/images/tickets/women.jpg" alt="Guests in evening dresses at the estate" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded bg-velvet-card">
              <Image src="/images/tickets/men.jpg" alt="A group of guests in white outside the house at night" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Photos */}
      <section className="bg-noir px-6 md:px-10 py-20 md:py-[120px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center max-w-[760px] mx-auto">
              <span className={eyebrow}>{t.photos.eyebrow}</span>
              <h2 className={h2}>{t.photos.headline}</h2>
              <p className={`mt-6 ${body}`}>{t.photos.body}</p>
            </div>
          </FadeIn>
          <ul className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {t.photos.images.map((img, i) => (
              <FadeIn key={img.src} delay={i * 80}>
                <li className="relative aspect-[4/5] overflow-hidden rounded bg-velvet-card">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 290px, 45vw" className="object-cover" />
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* Night — condensed run of show */}
      <EventTimeline />

      {/* Dress code — the men's styling guide (shared with the private preview) */}
      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[112px]">
        <div className="max-w-[1200px] mx-auto grid gap-12 md:grid-cols-2 md:gap-x-20 md:items-center">
          <FadeIn>
            <span className={eyebrow}>{privatePreview.dress.eyebrow}</span>
            <h2 className={h2}>{privatePreview.dress.headline}</h2>
            <p className={`mt-6 ${body}`}>{privatePreview.dress.copy}</p>
            <ul className="mt-7 flex flex-col gap-2 border-l border-gold/50 pl-5">
              {privatePreview.dress.notes.map((n) => (
                <li key={n} className="text-[15px] leading-[1.5] text-[#D8D2C8]">
                  {n}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="relative aspect-[2/3] overflow-hidden rounded bg-velvet-card">
              <Image src={privatePreview.dress.board} alt={privatePreview.dress.boardAlt} fill loading="lazy" sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-noir px-6 md:px-10 py-20 md:py-[120px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center">
              <span className={eyebrow}>{t.how.eyebrow}</span>
              <h2 className={h2}>{t.how.headline}</h2>
            </div>
          </FadeIn>
          <ol className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.how.steps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 80}>
                <li className="rounded border border-velvet-line bg-velvet-card p-6 h-full">
                  <span className="font-serif text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-bone">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-velvet-text">{s.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
          <div className="mt-12 max-w-[620px] mx-auto">
            <TicketCounter initial={count} variant="bar" />
          </div>
          {/* Approved men pay here; everyone else applies below. */}
          <div className="mt-10 max-w-[760px] mx-auto rounded border border-gold/40 bg-velvet-card p-7 md:p-9 text-center">
            <span className={eyebrow}>Already approved?</span>
            <h3 className="mt-3 font-serif text-2xl md:text-[30px] leading-tight text-bone">Confirm your admission — from $495</h3>
            <p className={`mt-3 ${body}`}>
              If you have your approval email, pay here with the same name and email you applied with. Secure checkout by Stripe.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <StripeButton label="Confirm My Admission — $495" className="w-full sm:w-auto" />
              <StripeBuyButton />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[100px]">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <span className={eyebrow}>Questions</span>
          </FadeIn>
          <dl className="mt-8 divide-y divide-velvet-line border-y border-velvet-line">
            {t.faq.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="font-serif text-xl md:text-2xl text-bone">{f.q}</dt>
                <dd className={`mt-3 ${body}`}>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="relative overflow-hidden bg-velvet px-6 md:px-10 pt-16 md:pt-[100px] pb-20 md:pb-[140px]">
        <div
          className="absolute inset-x-0 top-0 h-[520px] pointer-events-none bg-[radial-gradient(ellipse_35%_50%_at_50%_10%,rgba(164,62,120,0.22),transparent_70%)]"
          aria-hidden
        />
        <div className="relative max-w-[760px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className={eyebrow}>{t.apply.eyebrow}</span>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl md:text-[48px] leading-[1.1] text-bone">{t.apply.headline}</h2>
              <p className={`mt-5 ${body}`}>{t.apply.subhead}</p>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="mt-12 md:mt-14">
            <ApplicationForm sourcePage="desert-after-dark" submitLabel="Request My Ticket" tone="dark" variant="extended" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
