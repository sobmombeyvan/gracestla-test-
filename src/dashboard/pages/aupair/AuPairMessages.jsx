import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { fetchConversation, fetchInbox, sendMessage } from '../../../services/messages';
import { useSearchParams } from 'react-router-dom';
import { isSupabaseConfigured } from '../../../lib/supabase';

const AuPairMessages = () => {
  const [searchParams] = useSearchParams();
  const preselectedUser = searchParams.get('user');
  const [conversations, setConversations] = useState([]);
  const [activeUserId, setActiveUserId] = useState(preselectedUser || '');
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.userId === activeUserId) || null,
    [conversations, activeUserId],
  );

  const loadInbox = async () => {
    if (!isSupabaseConfigured) return;
    const inbox = await fetchInbox();
    setConversations(inbox);
    if (!activeUserId && inbox[0]) setActiveUserId(inbox[0].userId);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    loadInbox()
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeUserId || !isSupabaseConfigured) {
      setThread([]);
      return;
    }
    fetchConversation(activeUserId)
      .then(setThread)
      .catch((err) => setError(err instanceof Error ? err.message : 'Impossible de charger la conversation'));
  }, [activeUserId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!activeUserId) return;
    try {
      const sent = await sendMessage(activeUserId, draft);
      setThread((prev) => [...prev, sent]);
      setDraft('');
      await loadInbox();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Envoi impossible');
    }
  };

  return (
    <div>
      <PageHeader title="Messages" subtitle="Vos conversations avec les familles et l’équipe." />
      <div className="dash-card messages-layout">
        {loading ? (
          <p>Chargement…</p>
        ) : !isSupabaseConfigured ? (
          <p className="login-hint login-hint--warn">Supabase n'est pas configure.</p>
        ) : (
          <>
            <aside className="messages-list">
              {conversations.length === 0 ? (
                <EmptyState
                  title="Messagerie vide"
                  description="Lorsque vous échangerez avec une famille ou Grâce est là, vos messages apparaîtront ici."
                />
              ) : (
                conversations.map((item) => (
                  <button
                    key={item.userId}
                    type="button"
                    className={`messages-item ${item.userId === activeUserId ? 'active' : ''}`}
                    onClick={() => setActiveUserId(item.userId)}
                  >
                    <strong>{item.profile?.full_name || item.profile?.email || 'Utilisateur'}</strong>
                    <span>{item.lastMessage.body}</span>
                  </button>
                ))
              )}
            </aside>
            <section className="messages-thread">
              {activeConversation ? (
                <>
                  <h3>{activeConversation.profile?.full_name || activeConversation.profile?.email}</h3>
                  <div className="messages-bubble-list">
                    {thread.map((msg) => (
                      <div
                        key={msg.id}
                        className={`messages-bubble ${
                          msg.sender_id === activeUserId ? 'incoming' : 'outgoing'
                        }`}
                      >
                        {msg.body}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSend} className="messages-form">
                    <input
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Ecrire un message..."
                    />
                    <button type="submit" className="dash-btn dash-btn-primary dash-btn-sm">
                      Envoyer
                    </button>
                  </form>
                </>
              ) : (
                <EmptyState title="Choisissez une conversation" description="Selectionnez une personne pour afficher les messages." />
              )}
            </section>
          </>
        )}
      </div>
      {error && <p className="login-hint login-hint--warn">{error}</p>}
    </div>
  );
};

export default AuPairMessages;
