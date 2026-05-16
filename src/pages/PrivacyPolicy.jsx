import React, { useEffect } from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <h1>Politique de Confidentialité</h1>
        <div className="legal-content">
          <p>La protection de vos données personnelles est primordiale pour nous.</p>
          
          <h2>1. Collecte des données</h2>
          <p>
            Nous collectons les données que vous nous fournissez volontairement via nos formulaires de contact ou de candidature (nom, prénom, adresse e-mail, numéro de téléphone, informations sur votre projet).
          </p>
          
          <h2>2. Utilisation des données</h2>
          <p>
            Ces données sont utilisées uniquement dans le but de traiter votre demande, de vous recontacter et de vous accompagner dans votre démarche de Jeune Au Pair ou de Famille d'accueil. Elles ne sont en aucun cas vendues ou cédées à des tiers à des fins commerciales.
          </p>
          
          <h2>3. Conservation des données</h2>
          <p>
            Vos données sont conservées pour la durée nécessaire au traitement de votre demande et conformément aux obligations légales.
          </p>
          
          <h2>4. Vos droits</h2>
          <p>
            Conformément à la réglementation applicable (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, et de portabilité de vos données personnelles. Vous pouvez exercer ces droits à tout moment en nous contactant à l'adresse suivante : contact@graceestla.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
