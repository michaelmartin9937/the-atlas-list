import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

export function NextEventCard() {
  const { eyebrow, date, detail, note } = home.nextEvent;
  return (
    <section className="bg-bone py-24 md:py-28 px-6 md:px-10">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center border-t border-b border-bronze/40 py-14 md:py-16">
          <span className="text-xs uppercase tracking-widest text-bronze">
            {eyebrow}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-noir mt-5 leading-tight">
            {date}
          </h2>
          <p className="text-base md:text-lg text-ink mt-3 tracking-wide">
            {detail}
          </p>
          <p className="text-xs text-taupe mt-6 max-w-md mx-auto">
            {note}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
