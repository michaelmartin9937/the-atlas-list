import { NextResponse } from "next/server";
import {
  REFERRAL_COOKIE,
  REFERRAL_DESTINATION,
  REFERRAL_MAX_AGE_S,
  normalizeReferralCode,
  readReferralCookie,
} from "@/lib/referral";

export const dynamic = "force-dynamic";

// /r/<handle> → remember who sent this visitor, then show them the event.
// The destination is fixed (never taken from the URL), so this can't be used
// as an open redirect.
export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code: raw } = await ctx.params;
  const code = normalizeReferralCode(raw);

  const res = NextResponse.redirect(new URL(REFERRAL_DESTINATION, req.url), 307);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");

  // First click wins for 30 days: the ambassador who introduced someone keeps
  // the credit even if that person later taps another ambassador's link.
  const existing = readReferralCookie(req.headers.get("cookie"));
  if (code && !existing) {
    res.cookies.set(REFERRAL_COOKIE, code, {
      maxAge: REFERRAL_MAX_AGE_S,
      path: "/",
      sameSite: "lax",
      httpOnly: true, // only /api/apply needs it; page scripts never do
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
}
