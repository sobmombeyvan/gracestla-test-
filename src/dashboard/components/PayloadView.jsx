import React from 'react';

const FIELD_LABELS = {
  firstName: 'Prénom',
  lastName: 'Nom',
  name: 'Nom',
  email: 'Email',
  phone: 'Téléphone',
  country: 'Pays',
  gender: 'Civilité',
  situation: 'Situation',
  role: 'Profil',
  preferredDate: 'Date souhaitée',
  preferredTime: 'Heure souhaitée',
  message: 'Message',
  subject: 'Sujet',
};

function PayloadView({ payload }) {
  if (!payload || typeof payload !== 'object') {
    return <p className="admin-muted">Aucune donnée.</p>;
  }

  const entries = Object.entries(payload).filter(
    ([key, value]) => value != null && String(value).trim() !== '' && !key.startsWith('booking'),
  );

  if (entries.length === 0) {
    return <p className="admin-muted">Aucune donnée.</p>;
  }

  return (
    <dl className="admin-payload-fields">
      {entries.map(([key, value]) => (
        <div key={key} className="admin-payload-row">
          <dt>{FIELD_LABELS[key] || key}</dt>
          <dd>{Array.isArray(value) ? value.join(', ') : String(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

export default PayloadView;
