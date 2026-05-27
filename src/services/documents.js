import { requireSupabase } from '../lib/supabase';

const BUCKET = 'documents';

export async function fetchMyDocuments() {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) throw new Error(authError.message);
  if (!authData?.user?.id) throw new Error('Utilisateur non authentifié.');

  const { data, error } = await client
    .from('documents')
    .select('*')
    .eq('owner_id', authData.user.id)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function uploadKycDocument({ docType, file }) {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) throw new Error(authError.message);
  if (!authData?.user?.id) throw new Error('Utilisateur non authentifié.');
  if (!file) throw new Error('Fichier manquant.');

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${authData.user.id}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await client.storage
    .from(BUCKET)
    .upload(storagePath, file, { upsert: false });
  if (uploadError) throw new Error(uploadError.message);

  const { data, error } = await client
    .from('documents')
    .insert({
      owner_id: authData.user.id,
      doc_type: docType,
      file_name: file.name,
      storage_path: storagePath,
      status: 'pending',
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchAllDocumentsAdmin() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('documents')
    .select('*, profiles(full_name, email, role)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateDocumentStatus(id, status, rejectReason = null) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('documents')
    .update({
      status,
      reject_reason: rejectReason,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, profiles(full_name, email)')
    .single();
  if (error) throw new Error(error.message);

  if (data?.owner_id && ['verified', 'rejected', 'pending'].includes(status)) {
    await client
      .rpc('admin_set_kyc_status', {
        target_user_id: data.owner_id,
        new_status: status,
      })
      .catch(() => {});
  }

  return data;
}

export async function getDocumentSignedUrl(storagePath) {
  const client = requireSupabase();
  const { data } = await client.storage.from(BUCKET).createSignedUrl(storagePath, 3600);
  return data?.signedUrl ?? null;
}
