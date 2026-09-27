import { OG_SIZE, renderOgCard } from "@/lib/og-card";

// Preview card when the door link is texted or put behind a QR code.
export const runtime = "nodejs";
export const alt = "Paying at the Door · Desert After Dark · The Atlas List";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({ eyebrow: "Day-of guests", headline: "Paying at the Door" });
}
