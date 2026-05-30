-- Créneaux ouverts par l'admin pour les réservations publiques

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
  on public.booking_availability
  for select
  to anon, authenticated
  using (true);

drop policy if exists "booking_availability_admin_insert" on public.booking_availability;
create policy "booking_availability_admin_insert"
  on public.booking_availability
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "booking_availability_admin_update" on public.booking_availability;
create policy "booking_availability_admin_update"
  on public.booking_availability
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "booking_availability_admin_delete" on public.booking_availability;
create policy "booking_availability_admin_delete"
  on public.booking_availability
  for delete
  to authenticated
  using (public.is_admin());

-- Créneaux ouverts non encore réservés (lecture publique)
create or replace function public.get_available_booking_slots(p_from date, p_to date)
returns table (slot_date date, slot_time text)
language sql
stable
security definer
set search_path = public
as $$
  select a.slot_date, a.slot_time
  from public.booking_availability a
  where a.slot_date between p_from and p_to
    and a.starts_at > now()
    and not exists (
      select 1
      from public.bookings b
      where b.status = 'confirmed'
        and b.starts_at = a.starts_at
    )
  order by a.slot_date, a.slot_time;
$$;

grant execute on function public.get_available_booking_slots(date, date) to anon, authenticated;
