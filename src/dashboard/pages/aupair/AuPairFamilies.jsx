import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { useNavigate } from 'react-router-dom';
import { fetchPotentialContacts } from '../../../services/messages';
import { isSupabaseConfigured } from '../../../lib/supabase';

const AuPairFamilies = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    fetchPotentialContacts('family')
      .then(setRows)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Familles suggérées"
        subtitle="Profils publiés par l'administration."
      />
      <div className="dash-card">
        {loading ? (
          <p>Chargement…</p>
        ) : error ? (
          <p className="login-hint login-hint--warn">{error}</p>
        ) : rows.length === 0 ? (
          <EmptyState
            title="Aucune famille publiée"
            description="Dès qu’un admin publie un profil famille, il apparaîtra ici."
          />
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Famille</th>
                <th>Pays</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((family) => (
                <tr key={family.id}>
                  <td style={{ fontWeight: 600 }}>{family.full_name || 'Famille'}</td>
                  <td>{family.country || '—'}</td>
                  <td>{family.email || '—'}</td>
                  <td>
                    <button
                      type="button"
                      className="dash-btn dash-btn-primary dash-btn-sm"
                      onClick={() => navigate(`/dashboard/aupair/messages?user=${family.id}`)}
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

export default AuPairFamilies;
