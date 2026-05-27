import { requireSupabase } from '../lib/supabase';

export async function fetchMyAuPairQuestionnaire() {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('Non authentifié.');

  const { data, error } = await client
    .from('aupair_questionnaires')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function saveAuPairQuestionnaireDraft(answers) {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('Non authentifié.');

  const existing = await fetchMyAuPairQuestionnaire();

  if (existing) {
    const { data, error } = await client
      .from('aupair_questionnaires')
      .update({ answers, status: 'draft', updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, error } = await client
    .from('aupair_questionnaires')
    .insert({ user_id: user.id, answers, status: 'draft' })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function submitAuPairQuestionnaire(answers) {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('Non authentifié.');

  const existing = await fetchMyAuPairQuestionnaire();
  const row = {
    answers,
    status: 'submitted',
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { data, error } = await client
      .from('aupair_questionnaires')
      .update(row)
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, error } = await client
    .from('aupair_questionnaires')
    .insert({ user_id: user.id, ...row })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchAllAuPairQuestionnairesAdmin() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('aupair_questionnaires')
    .select('*, profiles(full_name, email)')
    .order('submitted_at', { ascending: false, nullsFirst: false })
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function fetchAuPairQuestionnaireByIdAdmin(id) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('aupair_questionnaires')
    .select('*, profiles(full_name, email, phone, country)')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
