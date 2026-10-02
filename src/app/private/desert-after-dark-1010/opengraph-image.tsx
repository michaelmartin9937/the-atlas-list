import { OG_SIZE, renderOgCard } from "@/lib/og-card";

// Preview card for the approved-guest page. Says what it is, nothing about
// the venue.
export const runtime = "nodejs";
export const alt = "Private Preview for Approved Guests · Desert After Dark · The Atlas List";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({ eyebrow: "Private preview · Approved guests", headline: "Confirm Your Admission" });
}
