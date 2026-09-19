// Silent marketing attribution. The first page a visitor lands on records
// where they came from; the application form sends it along on submit so
// Airtable can answer "which ad brought the best applicants", not just the
// most clicks. Stored per tab in sessionStorage — no cookies, nothing sent
// anywhere until someone actually applies.

export type Attribution = {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

const KEY = "atlas.attribution.v1";
const clip = (s: string | null, max: number) => (s ? s.slice(0, max) : undefined);

export function captureAttribution(): void {
  try {
    const q = new URLSearchParams(window.location.search);
    const hasUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].some((k) => q.get(k));
    // First touch wins, unless a later visit in the same tab arrives from a
    // tagged link — a tagged click is the more useful thing to know.
    if (window.sessionStorage.getItem(KEY) && !hasUtm) return;

    const external =
      document.referrer && !document.referrer.startsWith(window.location.origin)
        ? document.referrer
        : null;
    const value: Attribution = {
      // Path only: query strings can carry personal data we have no use for.
      landingPage: clip(window.location.pathname, 500),
      referrer: clip(external, 500),
      utmSource: clip(q.get("utm_source"), 200),
      utmMedium: clip(q.get("utm_medium"), 200),
      utmCampaign: clip(q.get("utm_campaign"), 200),
      utmContent: clip(q.get("utm_content"), 200),
    };
    window.sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode, strict settings) — attribution is optional.
  }
}

export function readAttribution(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
