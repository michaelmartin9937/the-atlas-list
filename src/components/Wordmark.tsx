type Props = {
  size?: "sm" | "md" | "lg";
  tone?: "noir" | "bone";
};

export function Wordmark({ size = "md", tone = "noir" }: Props) {
  const sizeClass =
    size === "sm" ? "text-base" : size === "lg" ? "text-3xl" : "text-xl";
  const toneClass = tone === "bone" ? "text-bone" : "text-noir";
  return (
    <span
      className={`font-serif italic tracking-tight ${sizeClass} ${toneClass}`}
      aria-label="The Atlas List"
    >
      The Atlas List
    </span>
  );
}
