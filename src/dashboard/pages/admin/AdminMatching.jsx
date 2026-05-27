import React from 'react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';

const AdminMatching = () => (
  <div>
    <PageHeader title="Matchings" subtitle="Mises en relation au pair / famille." />
    <div className="dash-card">
      <EmptyState
        title="Aucun matching actif"
        description="Les propositions de mise en relation validées par l’équipe s’afficheront ici."
      />
    </div>
  </div>
);

export default AdminMatching;
