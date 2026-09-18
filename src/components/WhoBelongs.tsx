import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Centred heading over two rule-topped lists (Figma: Who Belongs Here).
export function WhoBelongs() {
  const { eyebrow, headline, forList, notForList } = home.whoBelongs;
  return (
    <section className="bg-pearl pt-16 md:pt-[72px] pb-14 md:pb-16 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <div className="text-center">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.1] text-noir">
              {headline}
            </h2>
          </div>
        </FadeIn>
        <div className="mt-12 md:mt-[60px] grid gap-10 md:grid-cols-2 md:gap-[160px]">
          {[forList, notForList].map((list, i) => (
            <FadeIn key={list.title} delay={i * 120}>
              <div className="border-t border-sand pt-7">
                <h3
                  className={`text-[15px] font-semibold uppercase tracking-[0.04em] ${
                    i === 0 ? "text-noir" : "text-gold"
                  }`}
                >
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
