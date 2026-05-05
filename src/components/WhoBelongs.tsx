import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

export function WhoBelongs() {
  const { eyebrow, headline, forList, notForList } = home.whoBelongs;
  return (
    <section className="bg-bone py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16 md:mb-20 flex flex-col gap-5">
            <span className="text-xs uppercase tracking-widest text-bronze">
              {eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-noir leading-tight">
              {headline}
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn>
            <div className="border-t border-bronze/40 pt-8 flex flex-col gap-5">
              <h3 className="font-serif text-xl text-noir uppercase tracking-wide">
                {forList.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {forList.items.map((item) => (
                  <li key={item} className="text-ink/85 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="border-t border-taupe/40 pt-8 flex flex-col gap-5">
              <h3 className="font-serif text-xl text-taupe uppercase tracking-wide">
                {notForList.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {notForList.items.map((item) => (
                  <li key={item} className="text-ink/60 leading-relaxed line-through decoration-taupe/30">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
