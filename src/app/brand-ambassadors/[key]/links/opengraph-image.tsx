import { OG_SIZE, renderOgCard } from "@/lib/og-card";
import { AMBASSADOR_TEAM_KEY } from "@/lib/ambassador-access";

// Preview card for the team's send list, so whoever receives the link in a
// text can see what it opens.
export const runtime = "nodejs";
export const alt = "Brand Ambassador Master List · The Atlas List · Desert After Dark";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return [{ key: AMBASSADOR_TEAM_KEY }];
}

export default function Image() {
  return renderOgCard({ eyebrow: "Private · Team Only", headline: "Brand Ambassador Master List" });
}
