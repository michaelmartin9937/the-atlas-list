-- The public application form writes through the anon key. RLS stays enabled
-- and this is the ONLY policy on the table, so anon can INSERT but never
-- SELECT, UPDATE, or DELETE. The check pins status to its default so nobody
-- can insert a pre-approved row.

drop policy if exists "anon can submit applications" on public.lead_applications;

create policy "anon can submit applications"
  on public.lead_applications
  for insert
  to anon
  with check (status = 'pending');
