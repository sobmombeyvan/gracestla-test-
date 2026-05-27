import React, { useEffect, useState } from 'react';
import { ClipboardList, Eye } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { AUPAIR_QUESTIONNAIRE_SECTIONS } from '../../../data/aupairQuestionnaireSchema';
import {
  fetchAllAuPairQuestionnairesAdmin,
  fetchAuPairQuestionnaireByIdAdmin,
} from '../../../services/aupairQuestionnaire';
import { isSupabaseConfigured } from '../../../lib/supabase';

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const AdminAuPairQuestionnaires = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState('submitted');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    fetchAllAuPairQuestionnairesAdmin()
      .then(setRows)
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setDetail(null);
      return;
    }
    fetchAuPairQuestionnaireByIdAdmin(selectedId).then(setDetail).catch(() => setDetail(null));
  }, [selectedId]);

  const filtered = rows.filter((r) => (filter === 'all' ? true : r.status === filter));

  return (
    <div>
      <PageHeader
        title="Questionnaires au pair"
        subtitle="Réponses des jeunes au pair — matching international."
        icon={<ClipboardList size={22} />}
      />

      <div className="admin-toolbar">
        <select className="dash-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="submitted">Envoyés</option>
          <option value="draft">Brouillons</option>
          <option value="all">Tous</option>
        </select>
      </div>

      <div className="admin-submissions-layout">
        <div className="admin-table-card">
          {loading ? (
            <p style={{ padding: '1.5rem' }}>Chargement…</p>
          ) : filtered.length === 0 ? (
            <EmptyState title="Aucun questionnaire" description="Les au pairs verront le formulaire dans leur espace." />
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Au pair</th>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className={selectedId === row.id ? 'is-selected' : ''}>
                    <td style={{ fontWeight: 500 }}>{row.profiles?.full_name || '—'}</td>
                    <td>{row.profiles?.email || '—'}</td>
                    <td>
                      <span className={`admin-status admin-status-${row.status === 'submitted' ? 'new' : 'read'}`}>
                        {row.status === 'submitted' ? 'Envoyé' : 'Brouillon'}
                      </span>
                    </td>
                    <td>{formatDate(row.submitted_at || row.updated_at)}</td>
                    <td>
                      <button
                        type="button"
                        className="dash-icon-btn"
                        title="Voir les réponses"
                        onClick={() => setSelectedId(row.id)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {detail && (
          <aside className="admin-submission-detail fq-admin-detail">
            <div className="admin-submission-detail-head">
              <h3>{detail.profiles?.full_name || 'Au pair'}</h3>
              <button type="button" className="dash-btn-ghost" onClick={() => setSelectedId(null)}>
                Fermer
              </button>
            </div>
            <p className="admin-detail-meta">
              {detail.profiles?.email} · {formatDate(detail.submitted_at || detail.updated_at)}
            </p>
            <div className="fq-admin-scroll">
              {AUPAIR_QUESTIONNAIRE_SECTIONS.map((sec) => (
                <div key={sec.id} className="fq-admin-section">
                  <h4>{sec.title}</h4>
                  {sec.questions.map((q) => (
                    <div key={q.id} className="fq-admin-qa">
                      <p className="fq-admin-q">{q.label}</p>
                      <p className="fq-admin-a">{(detail.answers && detail.answers[q.id]) || '—'}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdminAuPairQuestionnaires;
