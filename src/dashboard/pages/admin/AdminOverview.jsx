import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { adminPriorityQueue } from '../../data/dashboardConstants';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { fetchSubmissionStats } from '../../../services/submissions';

const AdminOverview = () => {
  const [stats, setStats] = useState({ total: 0, newCount: 0, byType: {} });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchSubmissionStats()
      .then(setStats)
      .catch(() => setStats({ total: 0, newCount: 0, byType: {} }));
  }, []);

  const priorityCards = adminPriorityQueue.map((item) =>
    item.id === 'submissions' ? { ...item, count: stats.newCount } : item,
  );

  return (
    <div>
      <PageHeader
        title="Vue d'ensemble"
        subtitle="Suivi des demandes et de l’activité sur la plateforme."
      />

      <div className="admin-priority-grid">
        {priorityCards.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`admin-priority-card ${item.attention && item.count > 0 ? 'admin-priority-card--attention' : ''}`}
          >
            <strong>{item.count}</strong>
            <span>{item.label}</span>
            <em>{item.hint}</em>
          </Link>
        ))}
      </div>

      <div className="stat-bar">
        <div className="stat-bar-item">
          <span className="stat-bar-label">Demandes totales</span>
          <span className="stat-bar-value">{stats.total}</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Nouvelles</span>
          <span className="stat-bar-value">{stats.newCount}</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Au pair</span>
          <span className="stat-bar-value">{stats.byType?.aupair ?? 0}</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Familles</span>
          <span className="stat-bar-value">{stats.byType?.family ?? 0}</span>
        </div>
      </div>

      <div className="dash-card">
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Activité récente</h2>
        <EmptyState
          title="Journal d’activité"
          description="Les actions récentes sur la plateforme seront listées ici. Consultez les demandes pour traiter les formulaires entrants."
          action={
            <Link to="/dashboard/admin/submissions" className="dash-btn dash-btn-primary dash-btn-sm">
              Voir les demandes
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default AdminOverview;
