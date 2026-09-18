import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/content/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of The Atlas List website and events.",
};

export default function TermsPage() {
  return (
    <LegalPage
      current="terms"
      partLabel="Part One"
      title="Terms of Service"
      intro={terms.intro}
      effectiveDate={terms.effectiveDate}
      sections={terms.sections}
    />
  );
}
