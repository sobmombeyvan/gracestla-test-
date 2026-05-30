import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock, Mail, RefreshCw, User } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { fetchBookings } from '../../../services/bookings';

function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function groupByDay(bookings) {
  return bookings.reduce((acc, b) => {
    const key = b.starts_at ? b.starts_at.slice(0, 10) : 'unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});
}

const AdminBookings = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('upcoming');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookings(200);
      setRows(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const now = Date.now();
  const filtered = useMemo(() => {
    const sorted = [...rows].sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
    if (filter === 'upcoming') return sorted.filter((b) => new Date(b.starts_at).getTime() >= now);
    if (filter === 'past') return sorted.filter((b) => new Date(b.starts_at).getTime() < now).reverse();
    return sorted;
  }, [rows, filter, now]);

  const grouped = useMemo(() => groupByDay(filtered), [filtered]);

  return (
    <div>
      <PageHeader
        title="Rendez-vous"
        subtitle="Créneaux réservés depuis les formulaires du site"
        icon={<Calendar size={22} />}
      />

      <div className="admin-toolbar">
        <select className="dash-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="upcoming">À venir</option>
          <option value="past">Passés</option>
          <option value="all">Tous</option>
        </select>
        <button type="button" className="dash-btn-secondary" onClick={load}>
          <RefreshCw size={16} /> Actualiser
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <p className="admin-muted">Chargement…</p>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-card">
          <Calendar size={32} />
          <p>Aucun rendez-vous pour le moment.</p>
        </div>
      ) : (
        <div className="admin-bookings-grid">
          {Object.entries(grouped).map(([day, items]) => (
            <section key={day} className="admin-bookings-day">
              <h3 className="admin-bookings-day-title">
                {day !== 'unknown'
                  ? new Date(`${day}T12:00:00`).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'Date inconnue'}
              </h3>
              <div className="admin-bookings-list">
                {items.map((b) => (
                  <article key={b.id} className="admin-booking-card">
                    <div className="admin-booking-time">
                      <Clock size={16} />
                      {b.display_time || new Date(b.starts_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="admin-booking-body">
                      <p className="admin-booking-name">
                        <User size={14} /> {b.name || 'Sans nom'}
                      </p>
                      {b.email && (
                        <a href={`mailto:${b.email}`} className="admin-link admin-booking-email">
                          <Mail size={14} /> {b.email}
                        </a>
                      )}
                      <p className="admin-booking-meta">{formatDateTime(b.starts_at)}</p>
                    </div>
                    <span className={`admin-status admin-status-${b.status === 'cancelled' ? 'archived' : 'new'}`}>
                      {b.status === 'cancelled' ? 'Annulé' : 'Confirmé'}
                    </span>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
