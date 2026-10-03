import { NextResponse, type NextRequest } from "next/server";
import {
  REFERRAL_COOKIE,
  REFERRAL_MAX_AGE_S,
  normalizeReferralCode,
  readReferralCookie,
} from "@/lib/referral";

// Brand Ambassador credit from a query string: any page URL may carry
// ?ref=<handle> (for example an ad whose destination must stay the ticket
// page). It sets the same 30-day, first-click-wins cookie that /r/<handle>
// does, so /api/apply and Make need no changes. Nothing is redirected.
export function middleware(req: NextRequest) {
  const code = normalizeReferralCode(req.nextUrl.searchParams.get("ref"));
  if (!code) return NextResponse.next();

  const res = NextResponse.next();
  const existing = readReferralCookie(req.headers.get("cookie"));
  if (!existing) {
    res.cookies.set(REFERRAL_COOKIE, code, {
      maxAge: REFERRAL_MAX_AGE_S,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
}

export const config = {
  // Pages only: skip Next internals, API routes and static assets.
  matcher: ["/((?!_next/|api/|images/|media/|videos/|brand/|fonts/|favicon|robots|sitemap).*)"],
};
