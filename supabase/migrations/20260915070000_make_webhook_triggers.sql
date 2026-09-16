-- Website → Supabase → Make → Airtable.
-- Every INSERT into lead_applications / partner_inquiries is POSTed to a Make
-- custom webhook. URLs live in integration_config so they can be set without
-- another migration; until a URL is set the trigger is a no-op.
-- Applied to the-curated-life (vnnhcjvkhcwrenlglfnw) on 2026-09-15 as
-- "make_webhook_triggers". See docs/integrations.md.
create extension if not exists pg_net with schema extensions;

create table if not exists public.integration_config (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.integration_config enable row level security;
-- No policies: only the postgres/service role can read or write this table.

insert into public.integration_config (key, value) values
  ('make_webhook_url_lead_applications', ''),
  ('make_webhook_url_partner_inquiries', ''),
  ('make_webhook_secret', encode(gen_random_bytes(24), 'hex'))
on conflict (key) do nothing;

create or replace function public.notify_make_webhook()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  url text;
  secret text;
  payload jsonb;
begin
  select nullif(value, '') into url
    from public.integration_config
   where key = 'make_webhook_url_' || TG_TABLE_NAME;
  if url is null then
    return new;
  end if;

  select value into secret from public.integration_config where key = 'make_webhook_secret';

  -- Same shape as Supabase's built-in Database Webhooks, so Make modules and
  -- templates written for those work unchanged.
  payload := jsonb_build_object(
    'type', 'INSERT',
    'table', TG_TABLE_NAME,
    'schema', TG_TABLE_SCHEMA,
    'record', to_jsonb(new),
    'old_record', null,
    -- Make's custom-webhook bundle exposes body fields directly, so the
    -- shared secret rides in the body as well as the header.
    'secret', coalesce(secret, '')
  );

  perform net.http_post(
    url := url,
    body := payload,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-atlas-webhook-secret', coalesce(secret, '')
    ),
    timeout_milliseconds := 5000
  );
  return new;
end;
$$;

drop trigger if exists lead_applications_to_make on public.lead_applications;
create trigger lead_applications_to_make
  after insert on public.lead_applications
  for each row execute function public.notify_make_webhook();

drop trigger if exists partner_inquiries_to_make on public.partner_inquiries;
create trigger partner_inquiries_to_make
  after insert on public.partner_inquiries
  for each row execute function public.notify_make_webhook();
