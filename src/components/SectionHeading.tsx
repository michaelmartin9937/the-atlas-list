type Props = {
  eyebrow?: string;
  children: React.ReactNode;
  align?: "left" | "center";
  tone?: "noir" | "bone";
};

export function SectionHeading({ eyebrow, children, align = "left", tone = "noir" }: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const headingTone = tone === "bone" ? "text-bone" : "text-noir";
  const eyebrowTone = tone === "bone" ? "text-bone/70" : "text-bronze";
  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span
          className={`text-xs uppercase tracking-widest ${eyebrowTone}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-4xl md:text-5xl leading-[1.1] ${headingTone}`}
      >
        {children}
      </h2>
    </div>
  );
}
