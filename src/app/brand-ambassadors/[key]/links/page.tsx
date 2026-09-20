import type { Metadata } from "next";
import { AmbassadorLinks } from "@/components/AmbassadorLinks";
import { ambassadors } from "@/content/ambassadors";
import { ambassadorKitUrl, ambassadorLink, buildKitDm } from "@/content/ambassador-kit";
import { AMBASSADOR_TEAM_KEY } from "@/lib/ambassador-access";

// Private team tool, same access rule as the parent page: exact link only.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ key: AMBASSADOR_TEAM_KEY }];
}

const TITLE = "Brand Ambassador Master List";
const DESCRIPTION =
  "Private team page · The Atlas List. Every Desert After Dark ambassador's personal page link, ready to copy and send.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  // Its own card (./opengraph-image.tsx) and title, so a pasted link shows
  // what it opens instead of the generic site preview.
  openGraph: {
    title: `${TITLE} · The Atlas List`,
    description: DESCRIPTION,
    url: `/brand-ambassadors/${AMBASSADOR_TEAM_KEY}/links`,
    siteName: "The Atlas List",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${TITLE} · The Atlas List`, description: DESCRIPTION },
};

export default function AmbassadorLinksPage() {
  const people = ambassadors.map((a) => ({
    handle: a.handle,
    name: a.name,
    kitUrl: ambassadorKitUrl(a.handle),
    referralUrl: ambassadorLink(a.handle),
    dm: buildKitDm(a.first, a.handle),
  }));
  return <AmbassadorLinks people={people} messagesHref={`/brand-ambassadors/${AMBASSADOR_TEAM_KEY}`} />;
}
