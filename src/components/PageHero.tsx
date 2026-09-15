// Short, solid-colour page hero used by About and Partner (Figma: a 500px
// umber band with the copy sitting in its lower third on the 1200 column).
type Props = {
  eyebrow: string;
  headline: string;
  subhead: string;
  // Width cap for the headline: About wraps at ~1010px, Partner at 1200px.
  headlineMax?: string;
};

export function PageHero({ eyebrow, headline, subhead, headlineMax = "max-w-[1010px]" }: Props) {
  return (
    <section className="bg-umber">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-24 md:pt-[290px] pb-16 md:pb-[72px] min-h-[420px] md:min-h-[500px] flex flex-col justify-end">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
          {eyebrow}
        </span>
        <h1
          className={`mt-6 md:mt-7 font-serif text-[2.6rem] sm:text-5xl md:text-[56px] leading-[1.08] text-bone ${headlineMax}`}
        >
          {headline}
        </h1>
        <p className="mt-6 max-w-[1180px] text-base md:text-[17px] leading-[1.5] text-bone/80">
          {subhead}
        </p>
      </div>
    </section>
  );
}
