import Image from "next/image";

type Props = {
  size?: "sm" | "md" | "lg";
};

// Circular badge logo — cream disc, bronze ring, "THE ATLAS LIST" set in a
// Didone serif. The type is outlined inside public/images/logo.svg, so it
// needs no web font and stays crisp at any size. Sizes are the rendered
// diameter in px. The disc matches the bone nav background, so once the nav
// scrolls solid only the ring and lettering show; over the dark hero and in
// the noir footer it reads as a full badge.
const DIAMETER: Record<NonNullable<Props["size"]>, number> = {
  sm: 40,
  md: 66,
  lg: 128,
};

export function Wordmark({ size = "md" }: Props) {
  const px = DIAMETER[size];
  return (
    <Image
      src="/images/logo.svg"
      alt="The Atlas List"
      width={px}
      height={px}
      priority={size !== "lg"}
      unoptimized
      className="block"
    />
  );
}
