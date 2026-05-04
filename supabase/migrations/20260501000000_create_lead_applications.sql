create table public.lead_applications (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  phone        text not null,
  email        text not null,
  vouch_intro  text not null,
  sms_consent  boolean not null default false,
  source_page  text,
  status       text not null default 'pending',
  created_at   timestamptz not null default now()
);

create index lead_applications_created_at_idx on public.lead_applications (created_at desc);
create index lead_applications_status_idx on public.lead_applications (status);

alter table public.lead_applications enable row level security;
