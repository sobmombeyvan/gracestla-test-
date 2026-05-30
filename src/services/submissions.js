import { requireSupabase } from '../lib/supabase';
import { displayNameFromPayload, emailFromPayload } from '../lib/formData';
import { sendNotification } from './notifications';

const TYPE_LABELS = {
  contact: 'Contact',
  aupair: 'Au Pair',
  family: 'Famille',
  reservation: 'Réservation',
};

function mapSubmissionError(error) {
  const msg = error?.message || '';
  const low = msg.toLowerCase();
  if (low.includes('row-level security') || low.includes('row level security')) {
    return new Error(
      'Accès refusé (RLS). Exécutez la migration 013_fix_public_form_rls.sql sur Supabase puis réessayez.',
    );
  }
  if (
    low.includes('form_submissions') &&
    (low.includes('does not exist') || low.includes('relation') || low.includes('could not find'))
  ) {
    return new Error(
      "Table form_submissions absente sur Supabase. Executez les migrations SQL de base (001+) puis rechargez.",
    );
  }
  if (low.includes('create_form_submission')) {
    return new Error(
      'Fonction create_form_submission absente. Exécutez la migration 013_fix_public_form_rls.sql sur Supabase.',
    );
  }
  return new Error(msg || 'Erreur lors du chargement des demandes.');
}

export function getSubmissionTypeLabel(type) {
  return TYPE_LABELS[type] ?? type;
}

export async function createSubmission(type, payload) {
  const client = requireSupabase();
  const email = emailFromPayload(payload);
  const name = displayNameFromPayload(type, payload);

  const { data, error } = await client.rpc('create_form_submission', {
    p_type: type,
    p_email: email || null,
    p_name: name || null,
    p_payload: payload,
  });

  if (error) throw mapSubmissionError(error);

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.id) {
    throw new Error('La demande n\'a pas pu être enregistrée. Réessayez.');
  }

  await sendNotification({
    event: 'submission_created',
    type,
    record: row,
  }).catch(() => {});

  return row;
}

export async function fetchSubmissions({ type, status, limit = 100 } = {}) {
  const client = requireSupabase();
  let query = client
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (type) query = query.eq('type', type);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw mapSubmissionError(error);
  return data ?? [];
}

export async function updateSubmissionStatus(id, status) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('form_submissions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw mapSubmissionError(error);
  return data;
}

export async function fetchSubmissionStats() {
  const client = requireSupabase();
  const { data, error } = await client.from('form_submissions').select('status, type');
  if (error) throw mapSubmissionError(error);

  const rows = data ?? [];
  return {
    total: rows.length,
    newCount: rows.filter((r) => r.status === 'new').length,
    byType: rows.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {}),
  };
}
