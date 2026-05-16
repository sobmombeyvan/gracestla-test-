import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuPairForm.css';

const AuPairForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aupair-page">
      <section className="ap-hero">
        <div className="ap-hero-content">
          <h1 className="ap-hero-title">Parfait, tu es au bon endroit</h1>
          <p className="ap-hero-subtitle">
            Prends quelques minutes pour nous partager<br />
            ton profil au pair
          </p>
        </div>
      </section>

      <section className="ap-main bg-sand-light">
        <div className="container">
          
          <div className="ap-header text-center">
            <p className="ap-intro">
              Explique ta situation afin que Grâce puisse vraiment t'aider.<br />
              Ce n'est pas un test, c'est un <span className="bold">partage pour mieux te connaître</span> : )
            </p>
          </div>

          <div className="ap-form-container">
            <div className="ap-form-left">
              <form className="ap-form" onSubmit={(e) => { e.preventDefault(); navigate('/calendrier'); }}>
                <div className="ap-form-group">
                  <label>Ton prénom</label>
                  <input type="text" className="ap-input" />
                </div>
                <div className="ap-form-group">
                  <label>Ton nom</label>
                  <input type="text" className="ap-input" />
                </div>
                <div className="ap-form-group">
                  <label>Ton email</label>
                  <input type="email" className="ap-input" placeholder="prenom@exemple.com" required />
                </div>
                <div className="ap-form-group">
                  <label>Ton pays de résidence actuel</label>
                  <input type="text" className="ap-input" placeholder="Ex: France, Sénégal, Canada..." required />
                </div>
                <div className="ap-form-group">
                  <label>Numéro de téléphone <span className="italic">(optionnel)</span></label>
                  <input type="tel" className="ap-input" />
                </div>
                
                <div className="ap-form-group mt-3">
                  <label className="large-label">Dis-nous où tu en es</label>
                  <textarea className="ap-input ap-textarea" placeholder="J'explique ma situation, mes envies, mes doutes..." rows="4"></textarea>
                </div>

                <ul className="ap-benefits">
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

                <div className="ap-submit-wrapper">
                  <button type="submit" className="btn btn-primary ap-submit-btn">Envoyer mon profil</button>
                  <p className="ap-submit-note">Tu recevras une réponse sous <span className="bold">24-48h</span> pour échanger<br/>directement avec nous.</p>
                </div>
              </form>
            </div>

            <div className="ap-form-right">
               <div className="ap-image-wrapper">
                 <img src="https://i.ibb.co/d0jRLnsN/151329-E8-8784-4601-96-D2-A7-C219-F03-ACB.png" alt="Grace" className="ap-image" />
               </div>
               <div className="ap-right-text">
                 nous répondons à toutes vos questions
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
export default AuPairForm;
