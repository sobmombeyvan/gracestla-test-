import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingAuPair.css';
import './PricingAuPair.css';

const PricingAuPair = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pricing-page">
      
      <section className="pa-hero">
        <div className="container pa-hero-container">
          <h1 className="pa-title">Nos tarifs pour partir au pair 🌍</h1>
          <p className="pa-subtitle">Choisissez votre accompagnement pour trouver la bonne famille</p>
          <div className="pa-hero-text">
            <p>Partir au pair est une expérience unique... mais sans les bons repères,<br/>elle peut vite devenir difficile.</p>
            <p>Être bien accompagnée par une ancienne jeune au pair<br/>fait toute la différence.</p>
          </div>
        </div>
      </section>

      <section className="pa-cards-section">
        <div className="container pf-cards-container">
          
          {/* Card 1 */}
          <div className="pf-card pfc-aupair">
            <h3 className="pfc-title">Essentiel</h3>
            <p className="pfc-price">99<span>€</span></p>
            <div className="pfc-img-wrapper">
              <img src="/why_1.png" alt="Emma" className="pfc-img" />
              <div className="pfc-img-label">🇫🇷 Emma, 19, France</div>
            </div>
            <ul className="pfc-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span><strong>Profil Optimisé :</strong> CV, lettre de motivation, & coaching personnalisé</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Listing des familles fiables</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Modèles de contrats work & travel</li>
            </ul>
            <div className="pfc-bottom">
              <p className="pfc-summary">Idéal pour partir seule</p>
              <button className="btn btn-primary pfc-btn" onClick={() => navigate('/reservation')}>Je commence mon aventure</button>
              <div className="pfc-footer-text">
                <p>Paiement en 1 ou 2 fois</p>
                <p>A partir de 49€ /mois</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="pf-card pfc-aupair highlighted">
            <div className="pfc-badge">Le plus CHOISI</div>
            <h3 className="pfc-title">Sérénité</h3>
            <p className="pfc-price">290<span>€</span></p>
            <div className="pfc-img-wrapper">
              <img src="/why_1.png" alt="Laura" className="pfc-img" />
              <div className="pfc-img-label">🇪🇸 Laura, 20, Espagne</div>
            </div>
            <ul className="pfc-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Annonce boostée</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Présélection de 3 familles</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Entretiens Visio sécurisés</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Accompagnement personnalisé jusqu'au départ</li>
            </ul>
            <div className="pfc-bottom">
              <p className="pfc-summary">Idéal pour partir en tout sérénité</p>
              <button className="btn btn-primary pfc-btn" onClick={() => navigate('/reservation')}>Je pars en toute sérénité</button>
              <div className="pfc-footer-text">
                <p>Paiement flexible à partir de</p>
                <p>49€/mois</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="pf-card pfc-aupair">
            <h3 className="pfc-title">Premium</h3>
            <p className="pfc-price">490<span>€</span></p>
            <div className="pfc-img-wrapper">
              <img src="/why_2.png" alt="Ryan" className="pfc-img" />
              <div className="pfc-img-label">🇺🇸 Ryan, 21, USA</div>
            </div>
            <ul className="pfc-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Accompagnement complet jusqu'à placement finalisé</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Cours d'anglais inclus (pré-test)</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Assistance illimitée ☎️</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Échanges avec des au pairs expérimentés</li>
            </ul>
            <div className="pfc-bottom">
              <p className="pfc-summary">Idéal pour partir sans se soucier<br/>des détails</p>
              <button className="btn btn-primary pfc-btn" onClick={() => navigate('/reservation')}>Je profite du tout inclus</button>
              <div className="pfc-footer-text">
                <p>Paiement en plusieurs fois possible</p>
                <p>A partir de 79€/mois</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="pf-why pa-why">
        <div className="container">
          <div className="pf-why-header text-center" style={{display:'block'}}>
            <h2 className="pa-why-title" style={{marginBottom:0}}>Pourquoi choisir grâce ✈️ ?</h2>
          </div>
          <ul className="pf-why-list" style={{marginTop:'2rem'}}>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Expérience Sécurisée :</strong> Familles fiables sélectionnées avec soin.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Succès Garanti :</strong> Accompagnement réel jusqu'à la bonne famille.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Transparence Totale :</strong> Pas de mauvaises surprises, on annonce tout.</li>
          </ul>
          
          <p className="pf-why-footer pa-why-footer" style={{marginTop:'2rem'}}>Prêt à vivre l'expérience de ta vie ?</p>
          <div className="text-center" style={{marginTop: '2rem'}}>
             <button className="btn btn-primary pfc-btn" style={{width:'auto', padding:'1rem 3rem'}} onClick={() => navigate('/reservation')}>Contactons-nous</button>
          </div>
        </div>
      </section>

    </div>
  );
};
export default PricingAuPair;
