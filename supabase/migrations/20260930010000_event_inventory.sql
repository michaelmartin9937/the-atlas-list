-- Live ticket counter for the Desert After Dark sales page. One row per
-- event. The website reads it (anon SELECT only); the team updates
-- `remaining` by hand or from Make as tickets are sold.
create table if not exists public.event_inventory (
  event_slug text primary key,
  label text not null,
  total integer not null check (total >= 0),
  remaining integer not null check (remaining >= 0),
  updated_at timestamptz not null default now()
);
alter table public.event_inventory enable row level security;
drop policy if exists "anyone can read ticket counts" on public.event_inventory;
create policy "anyone can read ticket counts"
  on public.event_inventory for select to anon, authenticated using (true);
insert into public.event_inventory (event_slug, label, total, remaining)
values ('desert-after-dark-2026', 'Desert After Dark — men''s tickets', 100, 35)
on conflict (event_slug) do nothing;
notify pgrst, 'reload schema';
