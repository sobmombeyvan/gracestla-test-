import { useState, useCallback } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { formDataToObject, savePendingBooking, emailFromPayload, displayNameFromPayload } from '../lib/formData';
import { createSubmission } from '../services/submissions';

export function usePublicFormSubmit({ type, onSuccess, needsBooking = false }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      const payload = formDataToObject(new FormData(e.target));
      const fallbackRow = { id: null };
      setLoading(true);

      try {
        const row = isSupabaseConfigured
          ? await createSubmission(type, payload)
          : fallbackRow;

        if (needsBooking) {
          savePendingBooking({
            submissionId: row?.id ?? null,
            type,
            email: emailFromPayload(payload),
            name: displayNameFromPayload(type, payload),
          });
        }

        onSuccess?.(row, payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
      } finally {
        setLoading(false);
      }
    },
    [type, onSuccess, needsBooking],
  );

  return { handleSubmit, loading, error, clearError: () => setError(null) };
}
