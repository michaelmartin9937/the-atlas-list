type Props = {
  handle: string; // without the leading @
  label?: string; // accessible name, e.g. "Al'mer on Instagram"
  // "light" (default) for bone/pearl sections; "dark" for velvet-black ones.
  tone?: "light" | "dark";
  // false renders the chip without a link (placeholder handles like
  // "hairstylist/MUA" that aren't real accounts yet).
  link?: boolean;
};

// Figma (Desert After Dark): a small "Dusk Orchid" outlined chip, 13px,
// handle in natural case — uppercase handles read wrong.
const TONE = {
  light: "text-ink/85 border-noir/25 hover:border-ember hover:text-ember",
  dark: "text-velvet-text border-orchid hover:border-burgundy hover:text-bone",
};

export function InstagramLink({ handle, label, tone = "light", link = true }: Props) {
  const className = `inline-flex items-center self-start text-[13px] leading-none border rounded-[3px] px-[10px] py-[7px] transition-colors ${TONE[tone]}`;
  if (!link) {
    return <span className={className}>@{handle}</span>;
  }
  return (
    <a
      href={`https://www.instagram.com/${handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? `@${handle} on Instagram`}
      className={className}
    >
      @{handle}
    </a>
  );
}
