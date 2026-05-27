import React, { useEffect, useMemo, useState } from 'react';
import {
  FileText,
  CheckCircle,
  Bell,
  Save,
  Send,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { fetchAdminMessages } from '../../../services/messages';
import { fetchAllProfiles } from '../../../services/profiles';
import { fetchAllDocumentsAdmin, updateDocumentStatus } from '../../../services/documents';
import { isSupabaseConfigured } from '../../../lib/supabase';

const SuccessToast = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <div className="dash-toast" role="status">
      <CheckCircle size={16} />
      {message}
    </div>
  );
};

function useProfiles(role) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    fetchAllProfiles()
      .then((all) => setRows(all.filter((p) => p.role === role)))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [role]);
  return { rows, loading };
}

export const AdminAuPairs = () => {
  const { rows, loading } = useProfiles('aupair');
  return (
    <div>
      <PageHeader title="Profils au pair" subtitle="Validation et suivi des candidatures." />
      <div className="admin-table-card">
        {loading ? (
          <p style={{ padding: '1.5rem', color: 'var(--dash-gray-500)' }}>Chargement…</p>
        ) : rows.length === 0 ? (
          <EmptyState title="Aucun profil au pair" description="Les profils au pair inscrits apparaîtront ici." />
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Nom</th><th>Email</th><th>Inscription</th></tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500 }}>{u.full_name || '—'}</td>
                  <td>{u.email || '—'}</td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export const AdminFamilies = () => {
  const { rows, loading } = useProfiles('family');
  return (
    <div>
      <PageHeader title="Profils familles" subtitle="Familles d'accueil inscrites sur la plateforme." />
      <div className="admin-table-card">
        {loading ? (
          <p style={{ padding: '1.5rem', color: 'var(--dash-gray-500)' }}>Chargement…</p>
        ) : rows.length === 0 ? (
          <EmptyState title="Aucun profil famille" description="Les familles inscrites apparaîtront ici." />
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Nom</th><th>Email</th><th>Inscription</th></tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500 }}>{u.full_name || '—'}</td>
                  <td>{u.email || '—'}</td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    fetchAdminMessages()
      .then(setMessages)
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter((m) =>
      (m.sender?.full_name || m.sender?.email || '').toLowerCase().includes(q) ||
      (m.recipient?.full_name || m.recipient?.email || '').toLowerCase().includes(q) ||
      m.body.toLowerCase().includes(q),
    );
  }, [messages, search]);

  return (
    <div>
      <PageHeader title="Support – Messages" subtitle="Tous les échanges entre utilisateurs." />
      <div className="admin-toolbar">
        <input
          type="search"
          placeholder="Chercher expéditeur, destinataire…"
          className="dash-select"
          style={{ flex: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="admin-table-card">
        {loading ? (
          <p style={{ padding: '1.5rem', color: 'var(--dash-gray-500)' }}>Chargement…</p>
        ) : filtered.length === 0 ? (
          <EmptyState title="Aucune conversation" description="Les messages support apparaîtront ici." />
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>De</th>
                <th>A</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((msg) => (
                <tr
                  key={msg.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                >
                  <td style={{ fontSize: '0.78rem', color: 'var(--dash-gray-500)' }}>
                    {new Date(msg.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ fontWeight: 500 }}>{msg.sender?.full_name || msg.sender?.email || '—'}</td>
                  <td>{msg.recipient?.full_name || msg.recipient?.email || '—'}</td>
                  <td>
                    {expanded === msg.id ? (
                      <span>{msg.body}</span>
                    ) : (
                      <span style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        {msg.body}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export const AdminDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [toast, setToast] = useState({ message: '', visible: false });

  const load = () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    fetchAllDocumentsAdmin()
      .then(setDocs)
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = docs.filter((d) => (filter === 'all' ? true : d.status === filter));

  const handleDocAction = async (id, applicant, action) => {
    try {
      await updateDocumentStatus(id, action === 'approve' ? 'verified' : 'rejected');
      setToast({
        message: `Document de ${applicant} ${action === 'approve' ? 'approuvé' : 'refusé'}`,
        visible: true,
      });
      setTimeout(() => setToast({ message: '', visible: false }), 3000);
      load();
    } catch {
      setToast({ message: 'Erreur lors de la mise à jour', visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 3000);
    }
  };

  return (
    <div>
      <SuccessToast {...toast} />
      <PageHeader title="Documents KYC" subtitle="Validation des pièces téléversées par les utilisateurs." />

      <div className="admin-toolbar">
        <select className="dash-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="pending">En attente</option>
          <option value="verified">Validés</option>
          <option value="rejected">Refusés</option>
          <option value="all">Tous</option>
        </select>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <p style={{ padding: '1.5rem' }}>Chargement…</p>
        ) : filtered.length > 0 ? (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Demandeur</th>
                <th>Document</th>
                <th>Statut</th>
                <th>Reçu le</th>
                <th>Décision</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 500 }}>{doc.profiles?.full_name || doc.profiles?.email || '—'}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                      <FileText size={15} style={{ color: 'var(--dash-gray-400)' }} />
                      {doc.doc_type}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${doc.status}`}>{doc.status}</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--dash-gray-600)' }}>
                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td>
                    {doc.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="dash-btn dash-btn-sm dash-btn-primary"
                          onClick={() => handleDocAction(doc.id, doc.profiles?.full_name, 'approve')}
                        >
                          Approuver
                        </button>
                        <button
                          type="button"
                          className="dash-btn dash-btn-sm dash-btn-outline"
                          onClick={() => handleDocAction(doc.id, doc.profiles?.full_name, 'reject')}
                        >
                          Refuser
                        </button>
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="admin-empty">
            <CheckCircle size={36} />
            <p>Aucun document pour ce filtre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminIncidents = () => {
  return (
    <div>
      <PageHeader title="Signalements" subtitle="Incidents remontés par les familles et au pairs." />
      <div className="dash-card">
        <EmptyState
          title="Aucun signalement enregistré"
          description="Ce module affichera uniquement les signalements réels quand la collecte sera activée."
        />
      </div>
    </div>
  );
};

export const AdminAudit = () => {
  return (
    <div>
      <PageHeader title="Journal d'audit" subtitle="Historique des actions administratives." />
      <div className="dash-card">
        <EmptyState
          title="Journal d’audit vide"
          description="Aucune ligne factice n'est affichée. Les événements apparaîtront ici lorsque l'audit applicatif sera branché."
        />
      </div>
    </div>
  );
};

export const AdminNotifications = () => {
  return (
    <div>
      <PageHeader title="Annonces" subtitle="Message diffusé à une audience ciblée." />
      <div className="dash-card">
        <EmptyState
          title="Campagnes non activées"
          description="Cette section n'envoie aucun message de démonstration. Branchez une table + edge function pour diffusion réelle."
        />
      </div>
    </div>
  );
};

export const AdminSettings = () => {
  return (
    <div>
      <PageHeader title="Paramètres" subtitle="Configuration du matching et des services." />
      <div className="dash-card">
        <EmptyState
          title="Paramètres avancés non branchés"
          description="Aucune valeur de test n'est affichée. Cette section sera connectée a une table de configuration admin."
        />
      </div>
    </div>
  );
};
