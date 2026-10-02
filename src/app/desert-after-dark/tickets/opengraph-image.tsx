import { OG_SIZE, renderOgCard } from "@/lib/og-card";

// Preview card for the men's ticket page when the link is shared or texted.
export const runtime = "nodejs";
export const alt = "Walk in already chosen · Desert After Dark · The Atlas List";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({ eyebrow: "Men's tickets · Apply first", headline: "Walk in already chosen." });
}
