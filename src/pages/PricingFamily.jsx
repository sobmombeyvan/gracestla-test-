import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingFamily.css';

const PricingFamily = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pricing-page">
      
      <section className="pf-hero">
        <div className="container pf-hero-container">
          <h1 className="pf-title">Nos tarifs pour trouver l'au pair idéal 😄</h1>
          <p className="pf-subtitle">Accompagnements personnalisés adaptés à chaque besoin de votre famille</p>
          <p className="pf-text">Laissez-nous vous aider à trouver la perle rare.</p>
          
          <ul className="pf-hero-checks">
            <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Paiement possible en plusieurs fois</li>
            <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Sans frais cachés</li>
            <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Accompagnement adapté à votre rythme</li>
          </ul>
        </div>
      </section>

      <section className="pf-cards-section">
        <div className="container pf-cards-container">
          
          {/* Card 1 */}
          <div className="pf-card">
            <h3 className="pfc-title">Démarrage Sécurisé</h3>
            <p className="pfc-price">590<span>€</span></p>
            <div className="pfc-img-wrapper">
              <img src="/why_1.png" alt="Emma" className="pfc-img" />
              <div className="pfc-img-label">🇫🇷 Emma, 21, France</div>
            </div>
            <ul className="pfc-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Accès aux profils appropriés</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Outils de recrutement (checklist, trame d'entretien, points de vigilance...)</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Support de base (questions simples, orientation)</span></li>
            </ul>
            <div className="pfc-bottom">
              <p className="pfc-summary">Vous avancez seul, mais avec<br/>les bonnes bases</p>
              <button className="btn btn-primary pfc-btn" onClick={() => navigate('/reservation')}>Je démarre sécurisé</button>
              <p className="pfc-footer-text">Paiement en 1 ou plusieurs fois disponible</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="pf-card highlighted">
            <div className="pfc-badge">Le plus CHOISI</div>
            <h3 className="pfc-title">Choix Maitrisé</h3>
            <p className="pfc-price">1 090<span>€</span></p>
            <div className="pfc-img-wrapper">
              <img src="/why_1.png" alt="Laura" className="pfc-img" />
              <div className="pfc-img-label">🇪🇸 Laura, 20, Espagne</div>
            </div>
            <ul className="pfc-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Brief personnalisé (besoins, rythme, cadre familial)</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Présélection de 3 profils correspondant à votre famille</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Accompagnement spécialisé jusqu'à l'aide à la décision</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Organisation des formalités</span></li>
            </ul>
            <div className="pfc-bottom">
              <p className="pfc-summary">Vous êtes guidé pour éviter<br/>les erreurs</p>
              <button className="btn btn-primary pfc-btn" onClick={() => navigate('/reservation')}>Je sécurise mon choix</button>
              <p className="pfc-footer-text">Paiement flexible pour plus de sérénité</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="pf-card">
            <h3 className="pfc-title">Expérience Sans Stress</h3>
            <p className="pfc-price">1 890<span>€</span></p>
            <div className="pfc-img-wrapper">
              <img src="/why_2.png" alt="Ryan & Emma" className="pfc-img" />
              <div className="pfc-img-label">🇺🇸 Ryan & Emma, 23, USA</div>
            </div>
            <ul className="pfc-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Recherche complète du profil idéal</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Kit d'accueil détaillé & règles clés</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Gestion sécurisée des démarches (contrat, permis de résidence...)</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>RDV. d'intégration Visio</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Assistance Visio illimitée<br/><span className="italic-dash">- pour avancer sereinement</span></span></li>
            </ul>
            <div className="pfc-bottom">
              <button className="btn btn-primary pfc-btn" onClick={() => navigate('/reservation')}>Je délègue tout</button>
              <p className="pfc-footer-text">Paiement en plusieurs fois possible<br/><span className="italic-dash">- pour avancer sereinement</span></p>
            </div>
          </div>

        </div>
      </section>

      <section className="pf-why">
        <div className="container">
          <div className="pf-why-header">
            <span className="line"></span>
            <h2>Pourquoi choisir grâce ✈️ ?</h2>
            <span className="line"></span>
          </div>
          <ul className="pf-why-list">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Sélection rigoureuse :</strong> Trouvez des profils fiables, en phase avec vos attentes.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Gain de Temps :</strong> Réduisez les démarches longues et incertaines.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Confiance & Sérénité :</strong> Encadrement jusqu'à l'arrivée (suivi, médiation, conseils...).</li>
          </ul>
          
          <p className="pf-why-footer">Prêt à sécuriser le bien-être de votre famille ?</p>
        </div>
      </section>

    </div>
  );
};
export default PricingFamily;
