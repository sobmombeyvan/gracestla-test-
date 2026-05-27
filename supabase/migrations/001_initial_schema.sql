-- Grâce est là — Supabase schema (run in SQL Editor or via supabase db push)

create extension if not exists "pgcrypto";

-- Admins allowed to read dashboard data (add emails after creating Auth users)
create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'aupair', 'family', 'reservation')),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  email text,
  name text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists form_submissions_created_at_idx on public.form_submissions (created_at desc);
create index if not exists form_submissions_type_idx on public.form_submissions (type);
create index if not exists form_submissions_status_idx on public.form_submissions (status);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.form_submissions (id) on delete set null,
  email text,
  name text,
  starts_at timestamptz not null,
  display_date text,
  display_time text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_starts_at_idx on public.bookings (starts_at desc);

-- Returns true when the signed-in user is on the admin allowlist
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to authenticated;

alter table public.admin_allowlist enable row level security;
alter table public.form_submissions enable row level security;
alter table public.bookings enable row level security;

-- No public access to allowlist
drop policy if exists "admin_allowlist_no_public" on public.admin_allowlist;
create policy "admin_allowlist_no_public"
  on public.admin_allowlist
  for all
  using (false);

-- Anyone can submit forms (anon + authenticated)
drop policy if exists "form_submissions_insert_public" on public.form_submissions;
create policy "form_submissions_insert_public"
  on public.form_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "form_submissions_select_admin" on public.form_submissions;
create policy "form_submissions_select_admin"
  on public.form_submissions
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "form_submissions_update_admin" on public.form_submissions;
create policy "form_submissions_update_admin"
  on public.form_submissions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Bookings: public insert after form + calendar
drop policy if exists "bookings_insert_public" on public.bookings;
create policy "bookings_insert_public"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "bookings_select_admin" on public.bookings;
create policy "bookings_select_admin"
  on public.bookings
  for select
  to authenticated
  using (public.is_admin());

-- Replace with your admin email(s):
-- insert into public.admin_allowlist (email) values ('admin@votredomaine.com');
