import { ambassadors } from "@/content/ambassadors";
import { OG_SIZE, renderOgCard } from "@/lib/og-card";

// The preview card shown when an ambassador's page link is pasted into
// iMessage, Instagram DMs, WhatsApp, etc. One per ambassador, with their name.
export const runtime = "nodejs";
export const alt = "Brand Ambassador · The Atlas List · Desert After Dark";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return ambassadors.map((a) => ({ handle: a.handle }));
}

export default async function Image({ params }: { params: Promise<{ handle: string }> }) {
  const { handle: raw } = await params;
  const handle = decodeURIComponent(raw).toLowerCase();
  const person = ambassadors.find((a) => a.handle === handle);
  return renderOgCard({ eyebrow: "Brand Ambassador", headline: person?.name || `@${handle}` });
}
