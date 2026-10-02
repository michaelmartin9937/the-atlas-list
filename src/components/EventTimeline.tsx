import { FadeIn } from "./FadeIn";
import { PreviewVideo } from "./PreviewVideo";
import { eventTimeline as tl } from "@/content/event-timeline";

type Props = {
  // Show the preview video beside the timeline (the event page); the ticket
  // page already carries it in the hero.
  video?: boolean;
  tone?: "velvet" | "noir";
};

const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.08em] text-gold";

// Condensed run of show: a vertical timeline with the five fashion-show
// beats nested under 7:00 PM, and a CTA at the end so a reader who has just
// understood the night can act on it without scrolling back up.
export function EventTimeline({ video = false, tone = "velvet" }: Props) {
  return (
    <section className={`${tone === "noir" ? "bg-noir" : "bg-velvet"} px-6 md:px-10 py-20 md:py-[120px]`}>
      <div className={`max-w-[1280px] mx-auto grid gap-12 ${video ? "lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-x-20 lg:items-start" : ""}`}>
        <div className={video ? "" : "max-w-[760px] mx-auto w-full"}>
          <FadeIn>
            <span className={eyebrow}>{tl.eyebrow}</span>
            <h2 className="mt-5 font-serif text-4xl md:text-[52px] leading-[1.08] text-bone">{tl.headline}</h2>
            <p className="mt-5 text-base md:text-[17px] leading-[1.5] text-velvet-text">{tl.intro}</p>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-gold">{tl.date}</p>
          </FadeIn>

          <ol className="mt-10 md:mt-12 relative border-l border-velvet-line pl-7 md:pl-9 flex flex-col gap-9">
            {tl.acts.map((act, i) => (
              <FadeIn key={act.title} delay={i * 80}>
                <li className="relative">
                  <span
                    className="absolute -left-[33px] md:-left-[41px] top-[6px] h-[11px] w-[11px] rounded-full bg-gold ring-4 ring-velvet"
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-serif text-2xl md:text-[28px] text-gold tabular-nums">{act.time}</span>
                    <h3 className="font-serif text-2xl md:text-[28px] leading-tight text-bone">{act.title}</h3>
                  </div>
                  <p className="mt-2 text-[15px] md:text-base leading-[1.5] text-velvet-text">{act.body}</p>
                  {act.beats.length > 0 && (
                    <ol className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {act.beats.map((b, j) => (
                        <li key={b} className="flex gap-3 text-[14px] leading-snug text-[#D8D2C8]">
                          <span className="font-serif text-gold/80 tabular-nums w-5 shrink-0">{j + 1}</span>
                          {b}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn delay={300}>
            <a
              href="#apply"
              className="mt-12 inline-flex w-full sm:w-auto items-center justify-center h-[52px] px-8 bg-gold text-noir text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-bone transition-colors"
            >
              {tl.cta}
            </a>
          </FadeIn>
        </div>

        {video && (
          <FadeIn delay={120} className="lg:sticky lg:top-[128px]">
            <PreviewVideo
              src="/videos/desert-after-dark-preview.mp4"
              poster="/images/dad/preview-poster.jpg"
              caption="Event preview · AI-generated visualisation of the night"
            />
          </FadeIn>
        )}
      </div>
    </section>
  );
}
