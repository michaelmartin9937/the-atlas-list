import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Atlas List collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      current="privacy"
      partLabel="Part Two"
      title="Privacy Policy"
      intro={privacy.intro}
      effectiveDate={privacy.effectiveDate}
      sections={privacy.sections}
    />
  );
}
