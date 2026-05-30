-- Ouvre TOUS les créneaux (09:00 → 16:30) pour chaque jour
-- du 28 mai 2026 au 31 décembre 2026 — LUNDI À DIMANCHE (week-ends inclus).
-- Exécuter dans Supabase → SQL Editor → Run

insert into public.booking_availability (starts_at, slot_date, slot_time)
select
  ((d.dt + t.tm::time) at time zone 'Europe/Paris')::timestamptz as starts_at,
  d.dt::date as slot_date,
  t.tm as slot_time
from
  generate_series(date '2026-05-28', date '2026-12-31', interval '1 day') as d(dt),
  (values
    ('09:00'), ('09:30'), ('10:00'), ('10:30'), ('11:00'), ('11:30'),
    ('14:00'), ('14:30'), ('15:00'), ('15:30'), ('16:00'), ('16:30')
  ) as t(tm)
where ((d.dt + t.tm::time) at time zone 'Europe/Paris')::timestamptz > now()
on conflict (starts_at) do nothing;

-- Vérification
select slot_date, count(*) as nb_creneaux
from public.booking_availability
where slot_date >= '2026-05-28'
group by slot_date
order by slot_date
limit 10;
