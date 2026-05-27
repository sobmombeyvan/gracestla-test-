import React from 'react';
import './FormFeedback.css';

export function FormFeedback({ error, success, loading }) {
  if (!error && !success && !loading) return null;

  return (
    <div className="form-feedback" role="status">
      {loading && <p className="form-feedback-loading">Envoi en cours…</p>}
      {error && <p className="form-feedback-error">{error}</p>}
      {success && <p className="form-feedback-success">{success}</p>}
    </div>
  );
}
