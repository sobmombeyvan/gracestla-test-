import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
      <h1>Page introuvable</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Retour à l&apos;accueil
      </Link>
    </div>
  );
};

export default NotFound;
