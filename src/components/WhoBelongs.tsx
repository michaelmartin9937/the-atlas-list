import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Two rule-topped lists (Figma: Who Belongs Here).
export function WhoBelongs() {
  const { eyebrow, headline, forList, notForList } = home.whoBelongs;
  return (
    <section className="bg-pearl py-14 md:py-16 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.1] text-noir">
            {headline}
          </h2>
        </FadeIn>
        <div className="mt-10 md:mt-12 grid gap-10 md:grid-cols-2 md:gap-[160px]">
          {[forList, notForList].map((list, i) => (
            <FadeIn key={list.title} delay={i * 120}>
              <div className="border-t border-sand pt-6">
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-noir">
                  {list.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-5">
                  {list.items.map((item) => (
                    <li key={item} className="text-base leading-[1.4] text-ink/85">
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
