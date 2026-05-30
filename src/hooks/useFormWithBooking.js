import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabase';
import { buildBookingSlotFromKey } from '../lib/bookingSlot';
import { formDataToObject, emailFromPayload, displayNameFromPayload } from '../lib/formData';
import { createSubmission } from '../services/submissions';
import { createBooking } from '../services/bookings';
import { isSlotStillAvailable } from '../services/availability';

export function useFormWithBooking(type) {
  const navigate = useNavigate();
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slotError, setSlotError] = useState(null);

  const slotComplete = Boolean(selectedDateKey && selectedTime);

  const handleSubmit = useCallback(
    async (e, { scrollTargetId } = {}) => {
      e.preventDefault();
      setError(null);

      if (!slotComplete) {
        setSlotError('Veuillez choisir une date et un créneau avant d\'envoyer.');
        if (scrollTargetId) {
          document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      setSlotError(null);
      const payload = formDataToObject(new FormData(e.target));
      const slot = buildBookingSlotFromKey(selectedDateKey, selectedTime);
      payload.preferredDate = slot.displayDate;
      payload.preferredTime = slot.displayTime;
      payload.bookingStartsAt = slot.startsAt;

      setLoading(true);

      try {
        if (!isSupabaseConfigured) {
          throw new Error('Service indisponible. Vérifiez la configuration Supabase.');
        }

        const stillFree = await isSlotStillAvailable(selectedDateKey, selectedTime);
        if (!stillFree) {
          throw new Error('Ce créneau vient d\'être réservé. Choisissez un autre horaire.');
        }

        const row = await createSubmission(type, payload);
        await createBooking({
          submissionId: row?.id ?? null,
          email: emailFromPayload(payload),
          name: displayNameFromPayload(type, payload),
          startsAt: slot.startsAt,
          displayDate: slot.displayDate,
          displayTime: slot.displayTime,
        });

        localStorage.setItem('bookedDate', slot.displayDate);
        localStorage.setItem('bookedTime', slot.displayTime);
        localStorage.setItem('bookedStartISO', slot.startsAt);
        navigate('/success');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
      } finally {
        setLoading(false);
      }
    },
    [type, slotComplete, selectedDateKey, selectedTime, navigate],
  );

  const onTimeChange = useCallback((time) => {
    setSelectedTime(time);
    if (time) setSlotError(null);
  }, []);

  return {
    selectedDateKey,
    setSelectedDateKey,
    selectedTime,
    onTimeChange,
    slotComplete,
    loading,
    error: error || slotError,
    handleSubmit,
  };
}
