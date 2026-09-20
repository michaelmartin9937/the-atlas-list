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

export const metadata: Metadata = {
  title: "Ambassador Page Links",
  description: "Private team page.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
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
