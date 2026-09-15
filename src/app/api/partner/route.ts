import { NextResponse, after } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { partnerInquirySchema } from "@/lib/partner-validation";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { notifyPartnerInquiry } from "@/lib/notify-partner";

export const runtime = "nodejs";

// Partnership inquiries from /partner. Saved to public.partner_inquiries
// (anon insert-only, status = 'pending'), then the team is emailed.
export async function POST(req: Request) {
  const clientKey = getClientKey(req.headers);
  const rate = checkRateLimit(clientKey);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec ?? 3600) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = partnerInquirySchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot triggered — pretend success, drop silently
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = data.email.toLowerCase();
  const payload = {
    company_name: data.companyName,
    contact_name: data.contactName,
    email,
    category: data.category?.trim() || null,
    budget_range: data.budgetRange?.trim() || null,
    message: data.message?.trim() || null,
  };

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("partner_inquiries").insert(payload);
  if (error) {
    console.error("Supabase insert failed (partner_inquiries)", error);
    return NextResponse.json(
      { error: "We couldn't save your inquiry. Please try again." },
      { status: 500 }
    );
  }

  after(async () => {
    try {
      const result = await notifyPartnerInquiry({
        companyName: data.companyName,
        contactName: data.contactName,
        email,
        category: payload.category,
        budgetRange: payload.budget_range,
        message: payload.message,
      });
      if (!result.sent) console.warn("Partner inquiry notification skipped:", result.reason);
    } catch (err) {
      console.error("Partner inquiry notification failed", err);
    }
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
