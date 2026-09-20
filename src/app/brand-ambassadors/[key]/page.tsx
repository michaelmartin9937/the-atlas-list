import type { Metadata } from "next";
import { AmbassadorMessages } from "@/components/AmbassadorMessages";
import { ambassadors } from "@/content/ambassadors";
import { AMBASSADOR_TEAM_KEY as ACCESS_KEY } from "@/lib/ambassador-access";
import { AMBASSADOR_VIDEO_URL, buildAmbassadorMessage, ambassadorLink } from "@/content/ambassador-kit";

// Private team tool: every ambassador's ready-to-send message with a copy
// button. It is reachable only with the exact link — the key below is part of
// the address, any other key is a 404, there is no /brand-ambassadors index,
// it is not in the nav or footer, and search engines are told to stay away.
// The key lives in src/lib/ambassador-access.ts.

export const dynamicParams = false; // anything but the key → 404
export function generateStaticParams() {
  return [{ key: ACCESS_KEY }];
}

export const metadata: Metadata = {
  title: "Brand Ambassadors",
  description: "Private team page.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: undefined,
};

export default function BrandAmbassadorsPage() {
  const people = ambassadors.map((a) => ({
    handle: a.handle,
    name: a.name,
    link: ambassadorLink(a.handle),
    message: buildAmbassadorMessage(a.first, a.handle),
  }));
  return <AmbassadorMessages people={people} videoUrl={AMBASSADOR_VIDEO_URL} linksHref={`/brand-ambassadors/${ACCESS_KEY}/links`} />;
}
