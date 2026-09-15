import Image from "next/image";

type Props = {
  name: string;
  image?: string;
  // "light" (default) for bone/pearl sections; "dark" for velvet-black ones.
  tone?: "light" | "dark";
  size?: "sm" | "md";
};

const TONE = {
  light: { disc: "bg-sand/40 text-noir" },
  dark: { disc: "bg-[#2A2927] text-velvet-text" },
};

const SIZE = {
  sm: "h-16 w-16",
  md: "h-[70px] w-[70px]",
};

// Circular portrait used beside a person's name in credit tiles. Falls back
// to a plain disc when there's no image (Figma shows an empty disc for
// unannounced people), so every tile keeps the same silhouette.
export function Avatar({ name, image, tone = "light", size = "md" }: Props) {
  const t = TONE[tone];
  const frame = `${SIZE[size]} flex-shrink-0 rounded-full overflow-hidden`;
  if (!image) {
    return <div className={`${frame} ${t.disc}`} aria-hidden title={name} />;
  }
  return (
    <Image
      src={image}
      alt=""
      width={150}
      height={150}
      className={`${frame} object-cover`}
    />
  );
}
