-- ═══════════════════════════════════════════════════════════════════════════
-- GRÂCE EST LÀ — Script COMPLET à coller dans Supabase → SQL Editor → Run
-- Fonctionne même si vous n'avez pas exécuté les autres migrations avant.
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── Prérequis minimaux (ignorés si déjà présents) ─────────────────────────
create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_allowlist a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to authenticated;

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'aupair', 'family', 'reservation')),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  email text,
  name text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

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

-- ── 1. Table créneaux admin ───────────────────────────────────────────────
create table if not exists public.booking_availability (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null unique,
  slot_date date not null,
  slot_time text not null check (slot_time ~ '^\d{2}:\d{2}$'),
  created_at timestamptz not null default now()
);

create index if not exists booking_availability_slot_date_idx
  on public.booking_availability (slot_date);

alter table public.booking_availability enable row level security;

drop policy if exists "booking_availability_select_public" on public.booking_availability;
create policy "booking_availability_select_public"
  on public.booking_availability for select to anon, authenticated using (true);

drop policy if exists "booking_availability_admin_insert" on public.booking_availability;
create policy "booking_availability_admin_insert"
  on public.booking_availability for insert to authenticated
  with check (public.is_admin());

drop policy if exists "booking_availability_admin_update" on public.booking_availability;
create policy "booking_availability_admin_update"
  on public.booking_availability for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "booking_availability_admin_delete" on public.booking_availability;
create policy "booking_availability_admin_delete"
  on public.booking_availability for delete to authenticated
  using (public.is_admin());

create or replace function public.get_available_booking_slots(p_from date, p_to date)
returns table (slot_date date, slot_time text)
language sql stable security definer set search_path = public
as $$
  select a.slot_date, a.slot_time
  from public.booking_availability a
  where a.slot_date between p_from and p_to
    and a.starts_at > now()
    and not exists (
      select 1 from public.bookings b
      where b.status = 'confirmed' and b.starts_at = a.starts_at
    )
  order by a.slot_date, a.slot_time;
$$;

grant execute on function public.get_available_booking_slots(date, date) to anon, authenticated;

-- ── 2. RLS formulaires + RPC insert public ──────────────────────────────────
alter table public.form_submissions enable row level security;
alter table public.bookings enable row level security;

drop policy if exists "form_submissions_insert_public" on public.form_submissions;
create policy "form_submissions_insert_public"
  on public.form_submissions for insert to anon, authenticated with check (true);

drop policy if exists "form_submissions_select_admin" on public.form_submissions;
create policy "form_submissions_select_admin"
  on public.form_submissions for select to authenticated using (public.is_admin());

drop policy if exists "form_submissions_update_admin" on public.form_submissions;
create policy "form_submissions_update_admin"
  on public.form_submissions for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "bookings_insert_public" on public.bookings;
create policy "bookings_insert_public"
  on public.bookings for insert to anon, authenticated with check (true);

drop policy if exists "bookings_select_admin" on public.bookings;
create policy "bookings_select_admin"
  on public.bookings for select to authenticated using (public.is_admin());

create or replace function public.create_form_submission(
  p_type text, p_email text, p_name text, p_payload jsonb default '{}'::jsonb
)
returns public.form_submissions
language plpgsql security definer set search_path = public
as $$
declare rec public.form_submissions;
begin
  if p_type not in ('contact', 'aupair', 'family', 'reservation') then
    raise exception 'Type de formulaire invalide: %', p_type;
  end if;
  insert into public.form_submissions (type, email, name, payload)
  values (
    p_type,
    nullif(trim(coalesce(p_email, '')), ''),
    nullif(trim(coalesce(p_name, '')), ''),
    coalesce(p_payload, '{}'::jsonb)
  )
  returning * into rec;
  return rec;
end;
$$;

grant execute on function public.create_form_submission(text, text, text, jsonb) to anon, authenticated;

create or replace function public.create_public_booking(
  p_submission_id uuid, p_email text, p_name text,
  p_starts_at timestamptz, p_display_date text, p_display_time text
)
returns public.bookings
language plpgsql security definer set search_path = public
as $$
declare rec public.bookings;
begin
  insert into public.bookings (submission_id, email, name, starts_at, display_date, display_time)
  values (
    p_submission_id,
    nullif(trim(coalesce(p_email, '')), ''),
    nullif(trim(coalesce(p_name, '')), ''),
    p_starts_at, p_display_date, p_display_time
  )
  returning * into rec;
  return rec;
end;
$$;

grant execute on function public.create_public_booking(uuid, text, text, timestamptz, text, text) to anon, authenticated;

-- ── Admin : remplacez par votre email ───────────────────────────────────────
-- insert into public.admin_allowlist (email) values ('votre@email.com')
-- on conflict (email) do nothing;

-- ── Vérification ────────────────────────────────────────────────────────────
select
  exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'booking_availability') as table_ok,
  exists (select 1 from pg_proc where proname = 'get_available_booking_slots') as rpc_ok;
