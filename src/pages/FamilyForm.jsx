import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FamilyForm.css';

const FamilyForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="family-page">
      
      <section className="fam-hero">
        <div className="container">
          <div className="fam-hero-content">
            <h1 className="fam-hero-title">Parlez-nous de votre famille</h1>
            <p className="fam-hero-subtitle bold-sub">
              Quelques minutes pour nous partager votre<br />
              famille & votre projet au pair
            </p>
            <p className="fam-hero-subtitle">
              Partagez votre situation afin que Grâce puisse<br />
              vraiment vous aider à trouver la bonne personne.
            </p>
          </div>
        </div>
      </section>

      <section className="fam-main">
        <div className="container">
          <div className="fam-form-container">
            <form className="fam-form" onSubmit={(e) => { e.preventDefault(); navigate('/calendrier'); }}>
              
              <div className="fam-gender-row">
                <span className="fam-gender-label"><span className="line"></span> Je suis...</span>
                <label className="radio-label">
                  <input type="radio" name="gender" value="madame" />
                  <span className="radio-custom"></span> Madame
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="monsieur" />
                  <span className="radio-custom"></span> Monsieur
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="autre" />
                  <span className="radio-custom"></span> Autre...
                </label>
              </div>

              <div className="fam-form-row">
                <div className="fam-form-group">
                  <label>Votre prénom</label>
                  <input type="text" className="fam-input" />
                </div>
                <div className="fam-form-group">
                  <label>Votre nom</label>
                  <input type="text" className="fam-input" />
                </div>
              </div>

              <div className="fam-form-row">
                <div className="fam-form-group">
                  <label>Votre email</label>
                  <input type="email" className="fam-input" placeholder="dupont@exemple.com" required />
                </div>
                <div className="fam-form-group">
                  <label>Pays de résidence</label>
                  <input type="text" className="fam-input" placeholder="Ex: Belgique, Canada, etc." required />
                </div>
              </div>

              <div className="fam-form-group full-width">
                <label>Numéro de téléphone <span className="italic">(optionnel)</span></label>
                <div className="input-with-icon">
                  <span className="phone-icon">📞</span>
                  <input type="tel" className="fam-input icon-input" />
                </div>
              </div>

              <div className="fam-situation-box">
                <label className="fam-situation-label">Votre situation ?</label>
                <textarea className="fam-input fam-textarea" placeholder="Le nombre et l'âge de vos enfants, les dates de début souhaitées, vos attentes, vos doutes..." rows="4"></textarea>
                
                <ul className="fam-benefits">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    20-30 min de votre temps
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Réponse personnalisée (visio, mail...)
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    100% confidentiel
                  </li>
                </ul>
              </div>

              <div className="fam-submit-wrapper">
                <button type="submit" className="btn btn-primary fam-submit-btn">Envoyer ma demande</button>
                <p className="fam-submit-note">Vous recevrez une réponse sous <span style={{fontWeight: 600}}>24-48h</span> pour échanger directement avec nous.</p>
              </div>

            </form>
          </div>
        </div>
      </section>

      <section className="fam-bottom">
        <h2 className="fam-bottom-title">Trouvez-vous aussi votre au pair idéal ✈️</h2>
        <button className="btn btn-primary fam-bottom-btn">Je remplis le formulaire</button>
      </section>

    </div>
  );
};

export default FamilyForm;
