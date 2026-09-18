import Link from "next/link";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// The current flagship, centred between two hairline rules
// (Figma: Right Now — Desert After Dark).
export function RightNow() {
  const { eyebrow, headline, date, body, cta, href } = home.rightNow;
  return (
    <section className="bg-pearl px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto border-t border-b border-sand py-14 md:py-[64px] text-center">
        <FadeIn>
          <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-[56px] leading-[1.08] text-noir">
            {headline}
          </h2>
          <p className="mt-3 text-base md:text-lg text-ink/75">{date}</p>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-6 max-w-[760px] mx-auto text-base md:text-[17px] leading-[1.5] text-ink/85">
            {body}
          </p>
          <div className="mt-10">
            <Link
              href={href}
              className="inline-flex items-center justify-center h-[50px] px-11 bg-noir text-bone text-xs font-medium uppercase tracking-[0.06em] hover:bg-gold hover:text-noir transition-colors"
            >
              {cta}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
