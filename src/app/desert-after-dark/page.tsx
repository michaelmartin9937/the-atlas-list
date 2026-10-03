import type { Metadata } from "next";
import Image from "next/image";
import { EditorialHero } from "@/components/EditorialHero";
import { PreviewVideo } from "@/components/PreviewVideo";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Avatar } from "@/components/Avatar";
import { FadeIn } from "@/components/FadeIn";
import { ArrowLink, BackToTop, Button, Display, Eyebrow, Note, Numeral, SectionHeader, container } from "@/components/editorial";
import { desertAfterDark } from "@/content/desert-after-dark";
import { eventTimeline } from "@/content/event-timeline";

const shareTitle = "Desert After Dark · October 10";
// The sponsor credit goes on the share card (og/twitter title, description,
// image alt) but stays out of the browser-tab title.
const shareOgTitle = "Desert After Dark powered by Thundr · October 10";
const shareDescription =
  "The Atlas List presents Desert After Dark, powered by Thundr — a private-residence fashion show and mansion party in Paradise Valley, October 10, 2026. Featured designers, hand-picked models, top-shelf DJs — allocated by application.";

// Dedicated share card: the root layout's openGraph block is otherwise
// inherited wholesale, which made links to this page preview as the home
// page. Relative URLs resolve against metadataBase (www.theatlaslist.club).
export const metadata: Metadata = {
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: "/desert-after-dark" },
  openGraph: {
    title: `${shareOgTitle} · The Atlas List`,
    description: shareDescription,
    url: "/desert-after-dark",
    siteName: "The Atlas List",
    type: "website",
    images: [
      {
        url: "/images/og-desert-after-dark.jpg",
        width: 1200,
        height: 630,
        alt: "Desert After Dark powered by Thundr — The Atlas List fashion show + mansion party, October 10, 2026, Paradise Valley",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${shareOgTitle} · The Atlas List`,
    description: shareDescription,
    images: ["/images/og-desert-after-dark.jpg"],
  },
};

type CreditPerson = { name: string; role: string; image?: string; logo?: boolean };

// Figma "03 — Event (Desert After Dark)" (Oct 2026): photo hero, manifesto,
// six experience cards, the evening in four acts, six designers, the dress
// code with the Figma photos, credits, partners, the application.
export default function DesertAfterDarkPage() {
  const d = desertAfterDark;
  return (
    <>
      <EditorialHero
        eyebrowLines={d.hero.eyebrowLines}
        title={
          <>
            Desert
            <br />
            After Dark
          </>
        }
        keywords={d.hero.keywords}
        issue={d.hero.issue}
        image={d.hero.image}
        imagePosition="object-[center_40%]"
      >
        <p className="mt-9 font-mono text-[13px] md:text-[16px] uppercase tracking-[0.3em] text-bone">
          {d.hero.date}
          <span className="mx-5" aria-hidden>
            ·
          </span>
          {d.hero.place}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">{d.hero.tagline}</p>
        <p className="mt-5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-bone/85">{eventTimeline.heroTime}</p>
        <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <Button href="#apply" variant="cream">
            {d.hero.cta}
          </Button>
          <span className="font-serif italic text-[17px] text-bone/90">{d.hero.note}</span>
        </div>
      </EditorialHero>

      {/* 02 — Our manifesto */}
      <section className="bg-cream">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
          <div className={`px-6 md:px-12 py-20 md:py-[112px] flex flex-col justify-center`}>
            <FadeIn>
              <Eyebrow n={2}>{d.manifesto.eyebrow}</Eyebrow>
              <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14 lg:items-end">
                <Display as="h2" size="xl">
                  {d.manifesto.headline.map((l) => (
                    <span key={l.rest} className="block">
                      <em className="italic">{l.em}</em>
                      {l.rest}
                    </span>
                  ))}
                </Display>
                <div className="border-l border-hairline pl-6">
                  <p className="text-[15px] leading-[1.65] text-ink/70">{d.manifesto.body}</p>
                  <ArrowLink href="#experience" underline className="mt-7">
                    {d.manifesto.cta}
                  </ArrowLink>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px] overflow-hidden bg-night">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={d.manifesto.video.poster}
            >
              <source src={d.manifesto.video.src} type="video/mp4" />
              Your browser doesn&apos;t support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* 03 — Inside the experience */}
      <section id="experience" className="bg-[#0F0A0D] text-bone py-20 md:py-[112px] scroll-mt-20">
        <div className={container}>
          <FadeIn>
            <SectionHeader n={3} eyebrow={d.night.eyebrow} title={d.night.headline} intro={d.night.intro} tone="dark" />
          </FadeIn>
          <ol className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {d.night.cards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 70} className="h-full">
                <li className="relative aspect-[9/20] overflow-hidden border border-hairline-dark bg-night">
                  <Image src={card.image} alt={card.alt} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <Numeral n={i + 1} className="!text-bone text-[36px]" />
                    <h3 className="mt-2 font-condensed uppercase text-[17px] leading-[1.05] tracking-[0.03em]">{card.title}</h3>
                    <span className="mt-3 block h-px w-full bg-bone/30" aria-hidden />
                    <p className="mt-3 text-[12px] leading-[1.5] text-bone/80">{card.body}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — The evening in four acts */}
      <section className="bg-night text-bone py-20 md:py-[112px]">
        <div className={container}>
          <FadeIn>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <Eyebrow n={4} tone="dark">
                  {d.evening.eyebrow}
                </Eyebrow>
                <Display as="h2" size="xl" tone="dark" className="mt-8 md:mt-10">
                  {d.evening.headline}
                </Display>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/70 md:pb-3">{d.evening.meta}</p>
            </div>
          </FadeIn>
          <ol className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-hairline-dark">
            {d.evening.acts.map((act, i) => (
              <FadeIn key={act.title} delay={i * 90} className="h-full">
                <li className={`h-full py-10 pr-6 ${i > 0 ? "lg:border-l lg:border-hairline-dark lg:pl-8" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-hairline-dark sm:pl-8 lg:pl-8" : ""}`}>
                  <span className="font-serif text-[56px] md:text-[64px] leading-none text-bone">{act.clock}</span>
                  <h3 className="mt-5 font-mono text-[12px] uppercase tracking-[0.26em] text-bone">{act.title}</h3>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">{act.range}</p>
                  <span className="mt-4 flex items-center gap-2" aria-hidden>
                    <span className="h-[7px] w-[7px] rounded-full bg-coral" />
                    <span className="h-px flex-1 bg-coral/50" />
                  </span>
                  <p className="mt-5 text-[14px] leading-[1.6] text-bone/75">{act.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
          <FadeIn delay={120}>
            <div className="mt-14 md:mt-20 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,640px)] md:items-end">
              <p className="font-serif italic text-[20px] md:text-[24px] leading-[1.4] text-bone/85 max-w-[420px]">
                A first look at the estate and the evening, before the night exists.
              </p>
              <PreviewVideo src={d.evening.video.src} poster={d.evening.video.poster} caption={d.evening.video.caption} className="w-full" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 05 — One runway, six designers */}
      <section className="bg-cream py-20 md:py-[112px]">
        <div className={`${container} grid gap-12 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-16`}>
          <FadeIn>
            <Eyebrow n={5}>{d.designers.eyebrow}</Eyebrow>
            <h2 className="mt-8 md:mt-10 font-serif text-[2.4rem] md:text-[56px] leading-[1.05] text-noir">{d.designers.headline}</h2>
            <p className="mt-7 text-[15px] leading-[1.65] text-ink/70">{d.designers.intro}</p>
          </FadeIn>
          <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
            {d.designers.list.map((p, i) => (
              <FadeIn key={p.handle} delay={i * 70}>
                <li>
                  <a href={`https://www.instagram.com/${p.handle}/`} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${p.name} on Instagram`}>
                    {/* Square: the designer portraits are Instagram avatars. */}
                    <div className="relative aspect-square overflow-hidden bg-hairline/40">
                      <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 180px, 45vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" aria-hidden />
                      <span className="absolute left-3 bottom-2 font-serif text-[40px] leading-none text-bone">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <span className="mt-4 block font-serif text-[18px] md:text-[20px] leading-tight text-noir group-hover:text-coral transition-colors">{p.name}</span>
                    <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">{p.label}</span>
                  </a>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 — Dress code */}
      <section className="bg-cream pb-20 md:pb-[112px]">
        <div className={`${container} grid gap-12 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-16 md:items-start`}>
          <FadeIn>
            <Eyebrow n={6}>{d.dressCode.eyebrow}</Eyebrow>
            <Display as="h2" size="lg" className="mt-8 md:mt-10">
              {d.dressCode.headline}
            </Display>
            <p className="mt-6 font-serif italic text-[20px] text-noir">{d.dressCode.tagline}</p>
            <p className="mt-5 text-[15px] leading-[1.65] text-ink/70">{d.dressCode.body}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Palette">
              {d.dressCode.swatches.map((s) => (
                <li key={s} className="h-6 w-6 rounded-full" style={{ background: s }} />
              ))}
            </ul>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55">{d.dressCode.swatchNames}</p>
            <a
              href={d.dressCode.guide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-4 pb-2 border-b border-noir/60 font-mono text-[11px] uppercase tracking-[0.2em] text-noir hover:text-coral transition-colors"
            >
              {d.dressCode.guide.label} <span aria-hidden>→</span>
            </a>
          </FadeIn>
          <ul className="grid grid-cols-3 gap-3 md:gap-4">
            {d.dressCode.photos.map((ph, i) => (
              <FadeIn key={ph.src} delay={i * 90}>
                <li className="relative aspect-[9/20] overflow-hidden bg-hairline/40">
                  <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 768px) 300px, 33vw" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/80 to-transparent" aria-hidden />
                  <span className="absolute left-3 md:left-5 bottom-4 md:bottom-6 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.24em] leading-[1.7] text-bone max-w-[70%]">
                    {ph.caption}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — Credits */}
      <section className="bg-cream pb-20 md:pb-[112px]">
        <div className={`${container} grid gap-12 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:gap-16`}>
          <FadeIn>
            <Eyebrow n={7}>{d.credits.eyebrow}</Eyebrow>
            <Display as="h2" size="lg" className="mt-8 md:mt-10">
              {d.credits.headline}
            </Display>
            <p className="mt-7 max-w-[300px] text-[15px] leading-[1.65] text-ink/70">{d.credits.intro}</p>
          </FadeIn>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {d.credits.columns.map((col, c) => (
              <FadeIn key={col.title} delay={c * 90}>
                <div className="sm:border-l sm:border-hairline sm:pl-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/55">{col.title}</h3>
                  <ul className="mt-6 flex flex-col gap-5">
                    {(col.people as readonly CreditPerson[]).map((p) => (
                      <li key={p.name} className="flex items-center gap-4">
                        <Avatar name={p.name} image={p.image} tone="light" size="sm" logo={p.logo ?? false} />
                        <div>
                          <span className="block font-serif text-[18px] leading-tight text-noir">{p.name}</span>
                          <span className="block text-[12px] text-ink/60">{p.role}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — In partnership */}
      <section className="bg-night text-bone pt-20 md:pt-[112px] overflow-hidden">
        <div className={container}>
          <FadeIn>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <Eyebrow n={8} tone="dark">
                  {d.partners.eyebrow}
                </Eyebrow>
                <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10 max-w-[760px]">
                  {d.partners.headline}
                </Display>
              </div>
              <ArrowLink href="/partner" tone="dark" underline className="md:mb-2">
                {d.partners.cta}
              </ArrowLink>
            </div>
          </FadeIn>
          <ul className="mt-12 md:mt-14 grid gap-5 md:grid-cols-3">
            {d.partners.cards.map((c, i) => (
              <FadeIn key={c.name} delay={i * 90} className="h-full">
                <li className="h-full border border-hairline-dark p-7 md:p-8 flex flex-col">
                  <h3 className="font-condensed uppercase text-[26px] leading-none tracking-[0.03em]">{c.name}</h3>
                  <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-bone/55">{c.role}</span>
                  <p className="mt-7 text-[14px] leading-[1.6] text-bone/75">{c.body}</p>
                  <ArrowLink href="/partner" tone="coral" underline className="mt-8 self-start">
                    View partner story
                  </ArrowLink>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
        <div className="mt-14 md:mt-16">
          <p className={`${container} font-mono text-[9px] uppercase tracking-[0.26em] text-bone/45`}>{d.partners.vendorsLabel}</p>
          <div className="mt-4 border-y border-hairline-dark py-5 overflow-hidden">
            <div className="flex w-max animate-marquee font-mono text-[11px] uppercase tracking-[0.26em] text-bone/85">
              {[0, 1].map((k) => (
                <ul key={k} className="flex shrink-0" aria-hidden={k === 1}>
                  {d.partners.vendors.map((v) => (
                    <li key={v} className="px-10 whitespace-nowrap">
                      {v}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Apply */}
      <section id="apply" className="bg-night text-bone py-20 md:py-[120px]">
        <div className={`${container} grid gap-14 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-20`}>
          <FadeIn>
            <Eyebrow n={9} tone="dark">
              {d.apply.eyebrow}
            </Eyebrow>
            <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10">
              {d.apply.headline}
            </Display>
            <p className="mt-7 text-[15px] leading-[1.65] text-bone/70">{d.apply.subhead}</p>
            <div className="mt-10 flex flex-col gap-8">
              {d.apply.notes.map((n) => (
                <Note key={n.label} label={n.label}>
                  {n.text}
                </Note>
              ))}
            </div>
            <div className="hidden md:block mt-16">
              <BackToTop />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <ApplicationForm sourcePage="desert-after-dark" submitLabel="Request Ticket Allocation" tone="dark" variant="extended" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
