import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

const LegalMentions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <h1>Mentions légales</h1>
        <div className="legal-content">
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575
            du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), les
            présentes mentions légales s'appliquent au site <strong>Grâce est là</strong>.
          </p>

          <h2>1. Éditeur du site</h2>
          <p>
            <strong>Dénomination :</strong> Grâce est là<br />
            <strong>Activité :</strong> Accompagnement et mise en relation au pair pour
            les jeunes au pair et les familles d'accueil<br />
            <strong>Fondatrice :</strong> Gracela<br />
            <strong>Email :</strong>{' '}
            <a href="mailto:contact@graceestla.com">contact@graceestla.com</a>
          </p>

          <h2>2. Directeur de la publication</h2>
          <p>
            Gracela, fondatrice de Grâce est là — contact :{' '}
            <a href="mailto:contact@graceestla.com">contact@graceestla.com</a>
          </p>

          <h2>3. Objet du site</h2>
          <p>
            Le site Grâce est là a pour objet de présenter les services d'accompagnement
            au pair proposés par l'éditeur : information sur le programme, présentation
            des offres (familles et jeunes au pair), formulaires de contact et de
            candidature, réservation d'appels et ressources d'information (FAQ, pages
            tarifaires, services).
          </p>

          <h2>4. Hébergement</h2>
          <p>
            Pour toute information relative à l'hébergement technique du site, vous
            pouvez nous contacter à l'adresse :{' '}
            <a href="mailto:contact@graceestla.com">contact@graceestla.com</a>.
          </p>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, logos, graphismes, structure)
            est la propriété de Grâce est là ou de ses partenaires et est protégé par le
            droit d'auteur et le droit des marques. Toute reproduction, représentation,
            modification ou exploitation, totale ou partielle, sans autorisation écrite
            préalable de l'éditeur est interdite.
          </p>

          <h2>6. Responsabilité</h2>
          <p>
            Grâce est là s'efforce d'assurer l'exactitude des informations publiées sur
            ce site. Toutefois, l'éditeur ne saurait garantir l'absence d'erreurs ou
            d'omissions. L'utilisateur reconnaît utiliser les informations du site sous
            sa responsabilité exclusive.
          </p>
          <p>
            Les services proposés consistent en un accompagnement et une mise en relation ;
            Grâce est là n'est pas responsable des relations contractuelles conclues entre
            les familles et les jeunes au pair, sous réserve de l'exécution des prestations
            d'accompagnement convenues.
          </p>

          <h2>7. Données personnelles et cookies</h2>
          <p>
            Les données collectées via les formulaires du site sont traitées conformément
            à notre{' '}
            <Link to="/politique-confidentialite">politique de confidentialité</Link>.
            Pour les cookies, consultez notre{' '}
            <Link to="/politique-cookies">politique de cookies</Link>.
          </p>

          <h2>8. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers des sites tiers. Grâce est là n'exerce
            aucun contrôle sur ces sites et décline toute responsabilité quant à leur
            contenu.
          </p>

          <h2>9. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de
            litige, et à défaut de résolution amiable, les tribunaux français seront seuls
            compétents.
          </p>

          <h2>10. Contact</h2>
          <p>
            Pour toute question relative au site ou à ses mentions légales :{' '}
            <a href="mailto:contact@graceestla.com">contact@graceestla.com</a> —{' '}
            <Link to="/contact">formulaire de contact</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalMentions;
