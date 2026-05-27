import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <h1>Politique de cookies</h1>
        <div className="legal-content">
          <p>
            Cette politique explique comment le site <strong>Grâce est là</strong> utilise
            des cookies et traceurs, conformément à la réglementation en vigueur (RGPD et
            recommandations de la CNIL).
          </p>

          <h2>1. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur,
            tablette, smartphone) lors de la visite d'un site. Il permet de mémoriser des
            informations relatives à votre navigation.
          </p>

          <h2>2. Cookies utilisés sur ce site</h2>

          <h3>Cookies strictement nécessaires</h3>
          <p>
            Ces cookies sont indispensables au fonctionnement du site. Ils ne nécessitent
            pas votre consentement préalable.
          </p>
          <ul>
            <li>
              <strong>graceestla-cookie-consent</strong> — mémorise votre choix concernant
              les cookies (acceptation ou refus). Durée : 13 mois.
            </li>
          </ul>

          <h3>Cookies soumis à votre consentement</h3>
          <p>
            À ce jour, le site <strong>Grâce est là</strong> n'utilise pas de cookies
            publicitaires ni de mesure d'audience (type Google Analytics). Si de tels
            outils venaient à être ajoutés, ils ne seraient activés qu'après votre
            acceptation via la bannière cookies.
          </p>

          <h3>Ressources tierces</h3>
          <p>
            Le site peut charger des polices depuis Google Fonts. Cette connexion peut
            entraîner un échange de données avec Google. Pour limiter ce type de chargement,
            vous pouvez configurer votre navigateur ou utiliser une extension de blocage.
          </p>

          <h2>3. Gérer vos préférences</h2>
          <p>
            Lors de votre première visite, une bannière vous permet d'accepter ou de
            refuser les cookies non essentiels. Vous pouvez modifier votre choix à tout
            moment en supprimant le cookie de consentement dans les paramètres de votre
            navigateur, puis en rechargeant la page : la bannière réapparaîtra.
          </p>

          <h2>4. Paramétrage du navigateur</h2>
          <p>
            Vous pouvez également configurer votre navigateur pour refuser tout ou partie
            des cookies. Consultez l'aide de votre navigateur (Chrome, Firefox, Safari,
            Edge…) pour plus d'informations.
          </p>

          <h2>5. Contact</h2>
          <p>
            Pour toute question relative aux cookies :{' '}
            <a href="mailto:contact@graceestla.com">contact@graceestla.com</a>.
            Pour vos droits sur les données personnelles, consultez notre{' '}
            <Link to="/politique-confidentialite">politique de confidentialité</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
