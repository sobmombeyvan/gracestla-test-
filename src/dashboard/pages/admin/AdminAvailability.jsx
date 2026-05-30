import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarClock, Check, Lock, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import {
  BOOKING_TIME_SLOTS,
  MONTH_NAMES,
  getInitialMonth,
  toDateKey,
  parseDateKey,
  isPastDay,
} from '../../../lib/bookingSlot';
import {
  fetchAdminAvailabilityForMonth,
  fetchBookedSlotsForMonth,
  openAvailabilitySlot,
  closeAvailabilitySlot,
  isAvailabilitySetupError,
} from '../../../services/availability';

const SETUP_SQL = `-- Coller dans Supabase → SQL Editor → Run
-- https://supabase.com/dashboard/project/bhkzezfufndflmdzerjj/sql/new

create extension if not exists "pgcrypto";

create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admin_allowlist a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.booking_availability (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null unique,
  slot_date date not null,
  slot_time text not null,
  created_at timestamptz not null default now()
);

alter table public.booking_availability enable row level security;

drop policy if exists "booking_availability_select_public" on public.booking_availability;
create policy "booking_availability_select_public"
  on public.booking_availability for select to anon, authenticated using (true);

drop policy if exists "booking_availability_admin_insert" on public.booking_availability;
create policy "booking_availability_admin_insert"
  on public.booking_availability for insert to authenticated with check (public.is_admin());

drop policy if exists "booking_availability_admin_delete" on public.booking_availability;
create policy "booking_availability_admin_delete"
  on public.booking_availability for delete to authenticated using (public.is_admin());

create or replace function public.get_available_booking_slots(p_from date, p_to date)
returns table (slot_date date, slot_time text)
language sql stable security definer set search_path = public as $$
  select a.slot_date, a.slot_time from public.booking_availability a
  where a.slot_date between p_from and p_to and a.starts_at > now()
  order by a.slot_date, a.slot_time;
$$;
grant execute on function public.get_available_booking_slots(date, date) to anon, authenticated;`;

const AdminAvailability = () => {
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [openSlots, setOpenSlots] = useState({});
  const [bookedSlots, setBookedSlots] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [open, booked] = await Promise.all([
        fetchAdminAvailabilityForMonth(year, monthIndex),
        fetchBookedSlotsForMonth(year, monthIndex),
      ]);
      setOpenSlots(open);
      setBookedSlots(booked);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [year, monthIndex]);

  useEffect(() => {
    load();
  }, [load]);

  const days = useMemo(() => {
    const total = new Date(year, monthIndex + 1, 0).getDate();
    const first = new Date(year, monthIndex, 1).getDay() || 7;
    const cells = [];
    for (let i = 1; i < first; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  }, [year, monthIndex]);

  const shiftMonth = (delta) => {
    setCurrentMonth(new Date(year, monthIndex + delta, 1));
    setSelectedDateKey(null);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const toggleSlot = async (time) => {
    if (!selectedDateKey) return;
    const isBooked = (bookedSlots[selectedDateKey] ?? []).some(
      (t) => t.replace('h', ':') === time || t === time,
    );
    if (isBooked) return;

    const isOpen = (openSlots[selectedDateKey] ?? []).includes(time);
    setSaving(time);
    setError(null);

    try {
      if (isOpen) {
        await closeAvailabilitySlot(selectedDateKey, time);
        setOpenSlots((prev) => {
          const next = { ...prev };
          next[selectedDateKey] = (next[selectedDateKey] ?? []).filter((t) => t !== time);
          if (next[selectedDateKey].length === 0) delete next[selectedDateKey];
          return next;
        });
        showToast('Créneau fermé');
      } else {
        await openAvailabilitySlot(selectedDateKey, time);
        setOpenSlots((prev) => ({
          ...prev,
          [selectedDateKey]: [...(prev[selectedDateKey] ?? []), time].sort(),
        }));
        showToast('Créneau ouvert');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSaving(null);
    }
  };

  const openAllStandard = async () => {
    if (!selectedDateKey || isPastDay(parseDateKey(selectedDateKey).year, parseDateKey(selectedDateKey).monthIndex, parseDateKey(selectedDateKey).day)) return;
    setSaving('all');
    try {
      for (const time of BOOKING_TIME_SLOTS) {
        const isBooked = (bookedSlots[selectedDateKey] ?? []).some((t) => t.replace('h', ':') === time);
        if (!isBooked && !(openSlots[selectedDateKey] ?? []).includes(time)) {
          await openAvailabilitySlot(selectedDateKey, time);
        }
      }
      await load();
      showToast('Journée ouverte');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSaving(null);
    }
  };

  const closeAllForDay = async () => {
    if (!selectedDateKey) return;
    setSaving('all');
    try {
      for (const time of openSlots[selectedDateKey] ?? []) {
        const isBooked = (bookedSlots[selectedDateKey] ?? []).some((t) => t.replace('h', ':') === time);
        if (!isBooked) await closeAvailabilitySlot(selectedDateKey, time);
      }
      await load();
      showToast('Créneaux libres fermés');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSaving(null);
    }
  };

  const dayOpenCount = (dateKey) => (openSlots[dateKey] ?? []).length;

  return (
    <div>
      {toast && <div className="dash-toast">{toast}</div>}
      <PageHeader
        title="Créneaux disponibles"
        subtitle="Ouvrez les dates et horaires visibles sur les formulaires publics. Sans créneau ouvert = jour vide."
        icon={<CalendarClock size={22} />}
      />

      <div className="admin-toolbar">
        <button type="button" className="dash-btn-secondary" onClick={load}>
          <RefreshCw size={16} /> Actualiser
        </button>
      </div>

      {error && isAvailabilitySetupError(error) ? (
        <div className="admin-setup-box">
          <h3>Configuration requise (une seule fois)</h3>
          <p>
            La table <code>booking_availability</code> n&apos;existe pas encore sur Supabase.
            Copiez le SQL ci-dessous, ouvrez{' '}
            <a href="https://supabase.com/dashboard/project/bhkzezfufndflmdzerjj/sql/new" target="_blank" rel="noopener noreferrer">
              SQL Editor
            </a>
            , collez, cliquez <strong>Run</strong>, puis actualisez cette page.
          </p>
          <textarea className="admin-setup-sql" readOnly value={SETUP_SQL} rows={12} />
          <button
            type="button"
            className="dash-btn-secondary"
            onClick={() => {
              navigator.clipboard.writeText(SETUP_SQL);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? 'Copié !' : 'Copier le SQL'}
          </button>
        </div>
      ) : error ? (
        <p className="admin-error">{error}</p>
      ) : null}

      <div className="admin-availability-layout">
        <div className="admin-availability-calendar">
          <div className="admin-availability-nav">
            <button type="button" className="nav-btn" onClick={() => shiftMonth(-1)}>‹</button>
            <h3>{MONTH_NAMES[monthIndex]} {year}</h3>
            <button type="button" className="nav-btn" onClick={() => shiftMonth(1)}>›</button>
          </div>

          {loading ? (
            <p className="admin-muted">Chargement…</p>
          ) : (
            <>
              <div className="weekday-header">
                <span>LUN</span><span>MAR</span><span>MER</span><span>JEU</span><span>VEN</span><span>SAM</span><span>DIM</span>
              </div>
              <div className="calendar-days admin-availability-days">
                {days.map((day, idx) => {
                  if (!day) return <div key={idx} className="day-cell" />;
                  const dateKey = toDateKey(year, monthIndex, day);
                  const past = isPastDay(year, monthIndex, day);
                  const count = dayOpenCount(dateKey);
                  const bookedCount = (bookedSlots[dateKey] ?? []).length;
                  const isSelected = selectedDateKey === dateKey;

                  return (
                    <div key={idx} className="day-cell">
                      <button
                        type="button"
                        disabled={past}
                        className={`day-num admin-avail-day ${isSelected ? 'selected' : ''} ${past ? 'disabled' : ''} ${count > 0 ? 'has-slots' : ''}`}
                        onClick={() => setSelectedDateKey(dateKey)}
                      >
                        {day}
                        {count > 0 && <span className="admin-avail-dot">{count}</span>}
                        {bookedCount > 0 && count === 0 && <span className="admin-avail-dot booked">•</span>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <aside className="admin-availability-panel">
          {selectedDateKey ? (
            <>
              <h3>
                {parseDateKey(selectedDateKey).day} {MONTH_NAMES[parseDateKey(selectedDateKey).monthIndex]} {year}
              </h3>
              <p className="admin-muted">
                Cliquez sur un horaire pour l&apos;ouvrir ou le fermer. Les créneaux réservés restent verrouillés.
              </p>

              <div className="admin-avail-actions">
                <button type="button" className="dash-btn-secondary" onClick={openAllStandard} disabled={saving === 'all'}>
                  Ouvrir toute la journée
                </button>
                <button type="button" className="dash-btn-ghost" onClick={closeAllForDay} disabled={saving === 'all'}>
                  Tout fermer (libres)
                </button>
              </div>

              <div className="admin-avail-slots">
                {BOOKING_TIME_SLOTS.map((time) => {
                  const isOpen = (openSlots[selectedDateKey] ?? []).includes(time);
                  const isBooked = (bookedSlots[selectedDateKey] ?? []).some(
                    (t) => t.replace('h', ':') === time || t === time,
                  );

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isBooked || saving === time}
                      className={`admin-avail-slot ${isOpen ? 'is-open' : ''} ${isBooked ? 'is-booked' : ''}`}
                      onClick={() => toggleSlot(time)}
                    >
                      {time}
                      {isBooked && <Lock size={14} />}
                      {isOpen && !isBooked && <Check size={14} />}
                      {saving === time && '…'}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="admin-empty-card">
              <CalendarClock size={28} />
              <p>Sélectionnez un jour pour gérer ses créneaux.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default AdminAvailability;
