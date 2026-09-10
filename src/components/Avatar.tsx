import Image from "next/image";

type Props = {
  name: string;
  image?: string;
  // "light" (default) for bone/pearl sections; "dark" for velvet-black ones.
  tone?: "light" | "dark";
};

const TONE = {
  light: { ring: "ring-bronze/40", disc: "bg-bone text-noir" },
  dark: { ring: "ring-burgundy/60", disc: "bg-velvet-deep text-champagne" },
};

// Circular portrait used beside a person's name in credit tiles. Falls back to
// initials on a disc when there's no image, so every tile keeps the same
// silhouette regardless of source.
export function Avatar({ name, image, tone = "light" }: Props) {
  const t = TONE[tone];
  const frame = `h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-full ring-1 overflow-hidden ${t.ring}`;
  if (!image) {
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
    return (
      <div
        className={`${frame} ${t.disc} flex items-center justify-center font-serif text-xl`}
        aria-hidden
      >
        {initials}
      </div>
    );
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
