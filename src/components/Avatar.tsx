import Image from "next/image";

type Props = {
  name: string;
  image?: string;
};

// Circular portrait used beside a person's name in credit tiles. Falls back to
// initials on a bone disc when there's no image, so every tile keeps the same
// silhouette regardless of source.
export function Avatar({ name, image }: Props) {
  const frame =
    "h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-full ring-1 ring-bronze/40 overflow-hidden bg-bone";
  if (!image) {
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
    return (
      <div
        className={`${frame} flex items-center justify-center font-serif text-xl text-noir`}
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
