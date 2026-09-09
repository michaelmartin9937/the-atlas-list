import { createClient } from "@supabase/supabase-js";

// Production database target.
//
// Writes go through the project's anon key on purpose: `lead_applications`
// has RLS enabled with a single insert-only policy (see
// supabase/migrations/20260909000000_lead_applications_anon_insert_policy.sql),
// so this key can create applications but can never read, update, or delete
// them. The anon key is public by design — it ships in every Supabase client
// bundle — which is what lets the form work without a secret in the deploy
// environment.
//
// To move to a different project, or to use a service-role key instead, set
// ATLAS_SUPABASE_URL / ATLAS_SUPABASE_KEY in Vercel (Settings → Environment
// Variables) and redeploy; they override the defaults below.
const DEFAULT_SUPABASE_URL = "https://nvglelxsjohkmkemztxt.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Z2xlbHhzam9oa21rZW16dHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNDE4ODAsImV4cCI6MjAyODcxNzg4MH0.IeuR9Kmo3ZsJoKPbs0zamZatCRikCg-uXKtZlRZBQ5Q";

export function createServerSupabaseClient() {
  const url = process.env.ATLAS_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.ATLAS_SUPABASE_KEY || DEFAULT_SUPABASE_KEY;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
