import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MONTH_NAMES,
  getInitialMonth,
  toDateKey,
  parseDateKey,
  isPastDay,
  isPastTimeSlot,
  buildBookingSlotFromKey,
  BOOKING_TIME_SLOTS,
} from '../lib/bookingSlot';
import { fetchPublicAvailableSlots, isOpenAllBookingSlotsEnabled } from '../services/availability';
import { isSupabaseConfigured } from '../lib/supabase';
import '../pages/BookingCalendar.css';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay() || 7;
}

export default function BookingSlotPicker({
  selectedDateKey,
  selectedTime,
  onDateChange,
  onTimeChange,
  onMonthChange,
  id,
  compact = false,
}) {
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth);
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const updateMonth = (next) => {
    setCurrentMonth(next);
    onMonthChange?.(next);
  };

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();

  const loadAvailability = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setAvailabilityMap({});
      setLoadError('Les créneaux ne sont pas disponibles pour le moment.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(null);
    const from = toDateKey(year, monthIndex, 1);
    const lastDay = getDaysInMonth(year, monthIndex);
    const to = toDateKey(year, monthIndex, lastDay);

    try {
      const map = await fetchPublicAvailableSlots(from, to);
      setAvailabilityMap(map);
      if (Object.keys(map).length === 0 && !isOpenAllBookingSlotsEnabled()) {
        setLoadError('Aucun créneau ouvert ce mois-ci. L\'équipe ouvrira de nouvelles dates prochainement.');
      }
    } catch (err) {
      setAvailabilityMap({});
      setLoadError(err instanceof Error ? err.message : 'Impossible de charger les créneaux.');
    } finally {
      setLoading(false);
    }
  }, [year, monthIndex]);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  const days = useMemo(() => {
    const totalDays = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);
    const cells = [];
    for (let i = 1; i < firstDay; i++) cells.push(null);
    for (let i = 1; i <= totalDays; i++) cells.push(i);
    return cells;
  }, [year, monthIndex]);

  const shiftMonth = (delta) => {
    updateMonth(new Date(year, monthIndex + delta, 1));
    onDateChange(null);
    onTimeChange(null);
  };

  const slotsForDay = (dateKey) => {
    const times = availabilityMap[dateKey] ?? [];
    return times.filter((time) => !isPastTimeSlot(dateKey, time));
  };

  const availableSlots = selectedDateKey ? slotsForDay(selectedDateKey) : [];

  const selectedSummary = selectedDateKey && selectedTime
    ? buildBookingSlotFromKey(selectedDateKey, selectedTime)
    : null;

  const hasAnySlotsThisMonth = Object.keys(availabilityMap).some((key) => slotsForDay(key).length > 0);

  return (
    <div className={`calendar-layout ${compact ? 'calendar-layout-compact' : ''}`} id={id}>
      <div className="calendar-left">
        <h2>Sélectionnez une date</h2>
        <p className="calendar-hint">
          {isOpenAllBookingSlotsEnabled()
            ? 'Choisissez une date en surbrillance, puis un horaire disponible.'
            : 'Seules les dates ouvertes par notre équipe sont réservables.'}
        </p>
        {loading && <p className="calendar-loading">Chargement des créneaux…</p>}
        {!loading && loadError && !hasAnySlotsThisMonth && (
          <p className="calendar-no-slots calendar-no-slots-inline">{loadError}</p>
        )}
        <div className="calendar-grid-container">
          <div className="calendar-grid-header">
            <button type="button" className="nav-btn" onClick={() => shiftMonth(-1)} aria-label="Mois précédent">
              ‹
            </button>
            <h3>{MONTH_NAMES[monthIndex]} {year}</h3>
            <button type="button" className="nav-btn" onClick={() => shiftMonth(1)} aria-label="Mois suivant">
              ›
            </button>
          </div>
          <div className="weekday-header">
            <span>LUN</span><span>MAR</span><span>MER</span><span>JEU</span><span>VEN</span><span>SAM</span><span>DIM</span>
          </div>
          <div className="calendar-days">
            {days.map((day, idx) => {
              if (!day) return <div key={idx} className="day-cell" />;

              const dateKey = toDateKey(year, monthIndex, day);
              const daySlots = slotsForDay(dateKey);
              const hasSlots = daySlots.length > 0;
              const disabled = isPastDay(year, monthIndex, day) || !hasSlots || loading;
              const isSelected = selectedDateKey === dateKey;

              return (
                <div key={idx} className="day-cell">
                  <button
                    type="button"
                    disabled={disabled}
                    className={`day-num ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${hasSlots ? 'has-slots' : ''}`}
                    onClick={() => {
                      onDateChange(dateKey);
                      onTimeChange(null);
                    }}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="calendar-right">
        {selectedDateKey ? (
          <div className="time-selection animated-fade-in">
            <h2>
              {parseDateKey(selectedDateKey).day} {MONTH_NAMES[parseDateKey(selectedDateKey).monthIndex]}
            </h2>
            <p>Choisissez l&apos;heure de votre rendez-vous</p>
            {loading ? (
              <p className="calendar-loading">Chargement…</p>
            ) : availableSlots.length === 0 ? (
              <p className="calendar-no-slots">Aucun créneau disponible ce jour. Choisissez une autre date.</p>
            ) : (
              <div className="time-slots">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => onTimeChange(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
            {selectedSummary && (
              <div className="calendar-selected-banner">
                <span className="calendar-selected-icon">✓</span>
                <div>
                  <strong>Créneau sélectionné</strong>
                  <p>{selectedSummary.displayDate} · {selectedSummary.displayTime}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="calendar-icon">📅</div>
            <p>
              {hasAnySlotsThisMonth
                ? 'Sélectionnez une date en surbrillance pour voir les horaires.'
                : 'Aucune date ouverte pour le moment.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { BOOKING_TIME_SLOTS };
