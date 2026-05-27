import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { fetchPotentialContacts } from '../../../services/messages';
import { isSupabaseConfigured } from '../../../lib/supabase';

const FamilySearch = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    fetchPotentialContacts('aupair')
      .then(setRows)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((p) => {
      const hay = [p.full_name, p.email, p.country].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query]);

  return (
    <div>
      <PageHeader
        title="Rechercher des au pairs"
        subtitle="Profils au pair validés par l’administration."
      />
      <div className="dash-card" style={{ marginBottom: '1rem' }}>
        <input
          type="search"
          placeholder="Nom, email ou pays…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="dash-input"
          style={{ width: '100%', maxWidth: 420 }}
        />
      </div>
      <div className="dash-card">
        {loading ? (
          <p>Chargement…</p>
        ) : error ? (
          <p className="login-hint login-hint--warn">{error}</p>
        ) : results.length === 0 ? (
          <EmptyState
            title="Aucun au pair publié"
            description="Dès qu’un admin valide un profil au pair (KYC « Validé »), il apparaîtra ici."
          />
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Au pair</th>
                <th>Pays</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((ap) => (
                <tr key={ap.id}>
                  <td style={{ fontWeight: 600 }}>{ap.full_name || 'Au pair'}</td>
                  <td>{ap.country || '—'}</td>
                  <td>{ap.email || '—'}</td>
                  <td>
                    <button
                      type="button"
                      className="dash-btn dash-btn-primary dash-btn-sm"
                      onClick={() => navigate(`/dashboard/family/messages?to=${ap.id}`)}
                    >
                      Contacter
                    </button>
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

export default FamilySearch;
