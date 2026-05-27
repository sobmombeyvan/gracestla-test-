import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({
  title = 'Rien pour le moment',
  description = 'Les informations apparaîtront ici dès qu’elles seront disponibles.',
  action,
}) => (
  <div className="dash-empty">
    <div className="dash-empty-icon" aria-hidden>
      <Inbox size={28} strokeWidth={1.5} />
    </div>
    <h3 className="dash-empty-title">{title}</h3>
    <p className="dash-empty-text">{description}</p>
    {action}
  </div>
);

export default EmptyState;
