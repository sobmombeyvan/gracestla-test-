import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

const CONSENT_KEY = 'graceestla-cookie-consent';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (value) => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  const handleAccept = () => saveConsent('accepted');
  const handleRefuse = () => saveConsent('refused');

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Gestion des cookies">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          Ce site utilise des cookies strictement nécessaires au fonctionnement
          (mémorisation de votre choix) et peut charger des ressources tierces
          (polices). En cliquant sur «&nbsp;Tout accepter&nbsp;», vous acceptez
          l'utilisation des cookies non essentiels s'ils sont ajoutés ultérieurement.
          En savoir plus :{' '}
          <Link to="/politique-cookies">Politique de cookies</Link> et{' '}
          <Link to="/politique-confidentialite">Politique de confidentialité</Link>.
        </p>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-btn cookie-btn-refuse" onClick={handleRefuse}>
            Refuser
          </button>
          <button type="button" className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
