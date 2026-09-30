import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_SLUG = "desert-after-dark-2026";

// Live ticket count for the sales page. Reads public.event_inventory (anon
// SELECT only). Cached at the edge for a minute so a busy page never hits
// the database more than once every 60s.
export async function GET() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("event_inventory")
    .select("total, remaining, updated_at")
    .eq("event_slug", EVENT_SLUG)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
