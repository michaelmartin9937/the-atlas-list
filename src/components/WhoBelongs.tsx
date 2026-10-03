import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";
import { Display, Eyebrow, container } from "./editorial";

// Figma "07 — Who belongs here": a dark band, the headline, and two bordered
// cards — "+" rows for who it's for, "−" rows for who it isn't.
export function WhoBelongs() {
  const { eyebrow, headline, forList, notForList } = home.whoBelongs;
  const lists = [
    { ...forList, mark: "+", accent: "text-coral" },
    { ...notForList, mark: "−", accent: "text-bone/45" },
  ];
  return (
    <section className="bg-night text-bone py-20 md:py-[120px]">
      <div className={container}>
        <FadeIn>
          <Eyebrow n={8} tone="dark">
            {eyebrow}
          </Eyebrow>
          <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10 max-w-[720px]">
            {headline}
          </Display>
        </FadeIn>
        <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-2">
          {lists.map((list, i) => (
            <FadeIn key={list.title} delay={i * 120} className="h-full">
              <div className="h-full border border-hairline-dark bg-[#0F0D0C] p-7 md:p-10">
                <h3 className={`font-mono text-[10px] uppercase tracking-[0.26em] ${list.accent}`}>{list.title}</h3>
                <ul className="mt-5">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-5 border-b border-hairline-dark py-4 text-[15px] leading-[1.5] text-bone/85">
                      <span className={`font-mono text-[13px] ${list.accent}`} aria-hidden>
                        {list.mark}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
