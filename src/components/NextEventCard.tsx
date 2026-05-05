import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

export function NextEventCard() {
  const { eyebrow, date, detail, venueLine, venueDetail, note } = home.nextEvent;
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
          <div className="mt-8 flex flex-col gap-2 text-ink/85 max-w-md mx-auto">
            <p className="text-base leading-relaxed">{venueLine}</p>
            <p className="text-sm text-ink/70 leading-relaxed">{venueDetail}</p>
          </div>
          <p className="text-xs text-taupe mt-8 max-w-md mx-auto leading-relaxed">
            {note}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
