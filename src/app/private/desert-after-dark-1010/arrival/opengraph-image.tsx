import { OG_SIZE, renderOgCard } from "@/lib/og-card";

// Share card for the Arrival Notes link (texts and emails to confirmed
// guests). Says what the page is; nothing about the venue address.
export const runtime = "nodejs";
export const alt = "Arrival Notes · Desert After Dark · Saturday, October 10 · The Atlas List";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({ eyebrow: "Arrival notes · Saturday, October 10", headline: "How to Get to Desert After Dark" });
}
