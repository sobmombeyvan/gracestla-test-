import React, { useEffect, useState } from 'react';
import { Inbox, Mail, Archive, Eye, Calendar } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import PayloadView from '../../components/PayloadView';import {
  fetchSubmissions,
  updateSubmissionStatus,
  getSubmissionTypeLabel,
} from '../../../services/submissions';

const STATUS_OPTIONS = [
  { value: 'new', label: 'Nouveau' },
  { value: 'read', label: 'Lu' },
  { value: 'archived', label: 'Archivé' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'Tous les types' },
  { value: 'aupair', label: 'Au Pair' },
  { value: 'family', label: 'Famille' },
  { value: 'reservation', label: 'Réservation' },
  { value: 'contact', label: 'Contact' },
];

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

const AdminSubmissions = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSubmissions({
        type: filterType || undefined,
        status: filterStatus || undefined,
      });
      setRows(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filterType, filterStatus]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateSubmissionStatus(id, status);
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      if (selected?.id === id) setSelected((s) => ({ ...s, status }));
      setToast('Statut mis à jour');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  };

  return (
    <div>
      {toast && <div className="dash-toast">{toast}</div>}
      <PageHeader
        title="Demandes"
        subtitle="Formulaires reçus depuis le site"
        icon={<Inbox size={22} />}
      />

      <div className="admin-toolbar">
        <select
          className="dash-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          className="dash-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button type="button" className="dash-btn-secondary" onClick={load}>
          Actualiser
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-submissions-layout">
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Créneau</th>
                <th>Statut</th>
                <th></th>              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>Chargement…</td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7}>Aucune demande pour le moment.</td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className={selected?.id === row.id ? 'is-selected' : ''}>
                    <td>{formatDate(row.created_at)}</td>
                    <td>
                      <span className="admin-badge">{getSubmissionTypeLabel(row.type)}</span>
                    </td>
                    <td>{row.name || '—'}</td>
                    <td>
                      {row.email ? (
                        <a href={`mailto:${row.email}`} className="admin-link">
                          {row.email}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>
                      {row.payload?.preferredDate ? (
                        <span className="admin-slot-chip">
                          <Calendar size={12} />
                          {row.payload.preferredDate}
                          {row.payload.preferredTime ? ` · ${row.payload.preferredTime}` : ''}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>                    <td>
                      <span className={`admin-status admin-status-${row.status}`}>
                        {STATUS_OPTIONS.find((s) => s.value === row.status)?.label ?? row.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="dash-icon-btn"
                        title="Voir le détail"
                        onClick={() => setSelected(row)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <aside className="admin-submission-detail">
            <div className="admin-submission-detail-head">
              <h3>{selected.name || 'Sans nom'}</h3>
              <button type="button" className="dash-btn-ghost" onClick={() => setSelected(null)}>
                Fermer
              </button>
            </div>
            <p className="admin-detail-meta">
              <Mail size={14} /> {selected.email || '—'}
            </p>
            <p className="admin-detail-meta">
              {getSubmissionTypeLabel(selected.type)} · {formatDate(selected.created_at)}
            </p>
            <label className="admin-detail-label">Statut</label>
            <select
              className="dash-select"
              value={selected.status}
              onChange={(e) => handleStatusChange(selected.id, e.target.value)}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <label className="admin-detail-label">Contenu du formulaire</label>
            <PayloadView payload={selected.payload} />            {selected.status !== 'archived' && (
              <button
                type="button"
                className="dash-btn-secondary"
                onClick={() => handleStatusChange(selected.id, 'archived')}
              >
                <Archive size={16} /> Archiver
              </button>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdminSubmissions;
