import React, { useEffect } from 'react';
import './Legal.css';

const LegalMentions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <h1>Mentions Légales</h1>
        <div className="legal-content">
          <p>Le présent site est édité par Grâce est là.</p>
          
          <h2>1. Éditeur du site</h2>
          <p>
            Nom de l'entreprise : Grâce est là<br />
            Adresse : [À compléter]<br />
            Email : contact@graceestla.com<br />
            Directeur de la publication : [À compléter]
          </p>
          
          <h2>2. Hébergement</h2>
          <p>
            Le site est hébergé par : [À compléter]
          </p>
          
          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalMentions;
