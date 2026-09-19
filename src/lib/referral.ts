// Brand Ambassador links: theatlaslist.club/r/<instagram-handle>
//
// Any well-formed handle works with no deploy — the link just records the
// code. Credit is resolved later in Airtable, where Make matches the code to
// a Contact whose "Referral Code" equals it (see docs/integrations.md §4d).

export const REFERRAL_COOKIE = "atlas_ref";
export const REFERRAL_MAX_AGE_S = 60 * 60 * 24 * 30; // 30 days
export const REFERRAL_DESTINATION = "/desert-after-dark";

// Instagram's own username rules: letters, digits, dot, underscore, ≤ 30.
const CODE = /^[a-z0-9._]{1,30}$/;

// Accepts "Brianna", "@brianna", "brianna/" → "brianna"; anything else → null.
export function normalizeReferralCode(raw: string | undefined | null): string | null {
  if (!raw) return null;
  let s: string;
  try {
    s = decodeURIComponent(raw);
  } catch {
    return null;
  }
  s = s.trim().replace(/^@+/, "").replace(/\/+$/, "").toLowerCase();
  return CODE.test(s) ? s : null;
}

export function readReferralCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    if (part.slice(0, i).trim() === REFERRAL_COOKIE) {
      return normalizeReferralCode(part.slice(i + 1));
    }
  }
  return null;
}
