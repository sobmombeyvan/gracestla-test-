import { requireSupabase } from '../lib/supabase';

async function getCurrentUserId() {
  const client = requireSupabase();
  const { data, error } = await client.auth.getUser();
  if (error) throw new Error(error.message);
  const userId = data?.user?.id;
  if (!userId) throw new Error('Utilisateur non authentifie.');
  return userId;
}

export async function fetchPotentialContacts(targetRole) {
  const client = requireSupabase();
  const currentUserId = await getCurrentUserId();
  const { data, error } = await client
    .from('profiles')
    .select('id, full_name, email, role, avatar_url, country, kyc_status, created_at')
    .eq('role', targetRole)
    .eq('kyc_status', 'verified')
    .neq('id', currentUserId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function fetchInbox() {
  const client = requireSupabase();
  const currentUserId = await getCurrentUserId();

  const { data: rows, error } = await client
    .from('direct_messages')
    .select('id, sender_id, recipient_id, body, created_at')
    .or(`sender_id.eq.${currentUserId},recipient_id.eq.${currentUserId}`)
    .order('created_at', { ascending: false })
    .limit(300);
  if (error) throw new Error(error.message);

  const messages = rows ?? [];
  const otherUserIds = Array.from(
    new Set(
      messages.map((m) => (m.sender_id === currentUserId ? m.recipient_id : m.sender_id)).filter(Boolean),
    ),
  );

  if (otherUserIds.length === 0) return [];

  const { data: profiles, error: profilesError } = await client
    .from('profiles')
    .select('id, full_name, email, role, avatar_url')
    .in('id', otherUserIds);
  if (profilesError) throw new Error(profilesError.message);

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));
  const convoByUser = new Map();

  for (const msg of messages) {
    const otherUserId = msg.sender_id === currentUserId ? msg.recipient_id : msg.sender_id;
    if (!convoByUser.has(otherUserId)) {
      convoByUser.set(otherUserId, {
        userId: otherUserId,
        profile: profileById.get(otherUserId) ?? null,
        lastMessage: msg,
      });
    }
  }

  return Array.from(convoByUser.values());
}

export async function fetchConversation(otherUserId) {
  const client = requireSupabase();
  const currentUserId = await getCurrentUserId();
  const query = `and(sender_id.eq.${currentUserId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${currentUserId})`;
  const { data, error } = await client
    .from('direct_messages')
    .select('id, sender_id, recipient_id, body, created_at')
    .or(query)
    .order('created_at', { ascending: true })
    .limit(500);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function sendMessage(recipientId, body) {
  const client = requireSupabase();
  const senderId = await getCurrentUserId();
  const cleanBody = (body || '').trim();
  if (!cleanBody) throw new Error('Le message est vide.');

  const { data, error } = await client
    .from('direct_messages')
    .insert({
      sender_id: senderId,
      recipient_id: recipientId,
      body: cleanBody,
    })
    .select('id, sender_id, recipient_id, body, created_at')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchAdminMessages(limit = 200) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('direct_messages')
    .select('id, sender_id, recipient_id, body, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);

  const rows = data ?? [];
  const userIds = Array.from(new Set(rows.flatMap((r) => [r.sender_id, r.recipient_id]).filter(Boolean)));

  if (userIds.length === 0) return [];

  const { data: profiles, error: profilesError } = await client
    .from('profiles')
    .select('id, full_name, email, role')
    .in('id', userIds);
  if (profilesError) throw new Error(profilesError.message);

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));
  return rows.map((row) => ({
    ...row,
    sender: profileById.get(row.sender_id) ?? null,
    recipient: profileById.get(row.recipient_id) ?? null,
  }));
}
