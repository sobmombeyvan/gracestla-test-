import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookingSlotPicker from '../components/BookingSlotPicker';
import { FormFeedback } from '../components/FormFeedback';
import { isSupabaseConfigured } from '../lib/supabase';
import { buildBookingSlotFromKey } from '../lib/bookingSlot';
import { loadPendingBooking, clearPendingBooking } from '../lib/formData';
import { createBooking } from '../services/bookings';
import { isSlotStillAvailable } from '../services/availability';
import './BookingCalendar.css';

const BookingCalendar = () => {
  const navigate = useNavigate();
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [pending] = useState(() => loadPendingBooking());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slotComplete = Boolean(selectedDateKey && selectedTime);

  const handleConfirm = async () => {
    if (!slotComplete) return;

    const slot = buildBookingSlotFromKey(selectedDateKey, selectedTime);

    localStorage.setItem('bookedDate', slot.displayDate);
    localStorage.setItem('bookedTime', slot.displayTime);
    localStorage.setItem('bookedStartISO', slot.startsAt);

    if (!isSupabaseConfigured) {
      setError('Supabase n’est pas configuré. Le créneau est affiché localement uniquement.');
      navigate('/success');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const stillFree = await isSlotStillAvailable(selectedDateKey, selectedTime);
      if (!stillFree) {
        throw new Error('Ce créneau n\'est plus disponible. Choisissez un autre horaire.');
      }

      await createBooking({
        submissionId: pending?.submissionId ?? null,
        email: pending?.email ?? null,
        name: pending?.name ?? null,
        startsAt: slot.startsAt,
        displayDate: slot.displayDate,
        displayTime: slot.displayTime,
      });
      clearPendingBooking();
      navigate('/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de confirmer le rendez-vous.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="calendar-page">
      <div className="container">
        <div className="calendar-page-header">
          <h1>Réservez votre appel</h1>
          <p>Choisissez la date et l&apos;heure qui vous conviennent le mieux.</p>
          {pending?.name ? (
            <p className="calendar-page-meta">Demande de <strong>{pending.name}</strong></p>
          ) : (
            <p className="calendar-page-meta">
              Pas encore de formulaire ?{' '}
              <Link to="/famille">Famille</Link> · <Link to="/au-pair">Au pair</Link> ·{' '}
              <Link to="/reservation">Réservation</Link>
            </p>
          )}
        </div>

        <FormFeedback error={error} loading={saving} />
        <BookingSlotPicker
          selectedDateKey={selectedDateKey}
          selectedTime={selectedTime}
          onDateChange={setSelectedDateKey}
          onTimeChange={setSelectedTime}
        />
        {slotComplete && (
          <div className="calendar-confirm-wrapper">
            <button
              type="button"
              className="btn btn-primary next-btn animated-slide-up"
              onClick={handleConfirm}
              disabled={saving}
            >
              {saving ? 'Confirmation…' : 'Confirmer mon rendez-vous'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
