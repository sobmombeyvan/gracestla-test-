import { requireSupabase } from '../lib/supabase';

export async function fetchMyQuestionnaire() {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('Non authentifié.');

  const { data, error } = await client
    .from('family_questionnaires')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function saveQuestionnaireDraft(answers) {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('Non authentifié.');

  const existing = await fetchMyQuestionnaire();

  if (existing) {
    const { data, error } = await client
      .from('family_questionnaires')
      .update({
        answers,
        status: 'draft',
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, error } = await client
    .from('family_questionnaires')
    .insert({
      user_id: user.id,
      answers,
      status: 'draft',
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function submitQuestionnaire(answers) {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('Non authentifié.');

  const existing = await fetchMyQuestionnaire();

  const row = {
    answers,
    status: 'submitted',
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { data, error } = await client
      .from('family_questionnaires')
      .update(row)
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, error } = await client
    .from('family_questionnaires')
    .insert({ user_id: user.id, ...row })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchAllQuestionnairesAdmin() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('family_questionnaires')
    .select('*, profiles(full_name, email)')
    .order('submitted_at', { ascending: false, nullsFirst: false })
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function fetchQuestionnaireByIdAdmin(id) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('family_questionnaires')
    .select('*, profiles(full_name, email, phone, country)')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
