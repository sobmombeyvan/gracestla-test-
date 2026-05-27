import React from 'react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => (
  <div>
    <PageHeader title="Analytique" subtitle="Indicateurs et tendances de la plateforme." />
    <div className="dash-card">
      <EmptyState
        title="Statistiques à venir"
        description="Les graphiques d’activité seront disponibles lorsque suffisamment de données seront collectées."
        action={
          <Link to="/dashboard/admin/submissions" className="dash-btn dash-btn-primary dash-btn-sm">
            Voir les demandes
          </Link>
        }
      />
    </div>
  </div>
);

export default AdminAnalytics;
