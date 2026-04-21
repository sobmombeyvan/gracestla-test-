import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us bg-sand">
      <div className="container text-center">
        <div className="section-header">
          <span className="line"></span>
          <h2 className="section-title">Pourquoi nous choisir ?</h2>
          <span className="line"></span>
        </div>

        <div className="cards-grid">
          <div className="feature-card">
            <img src="/why_1.png" alt="Sécurité & Confiance" className="feature-img" />
            <div className="feature-content text-center">
              <h3 className="feature-title">Sécurité & Confiance</h3>
              <p className="feature-description">Un accompagnement rassurant</p>
            </div>
          </div>
          
          <div className="feature-card">
            <img src="/why_2.png" alt="Expérience Authentique" className="feature-img" />
            <div className="feature-content text-center">
              <h3 className="feature-title">Expérience Authentique</h3>
              <p className="feature-description">Des échanges enrichissants</p>
            </div>
          </div>
          
          <div className="feature-card">
            <img src="/why_3.png" alt="Soutien Professionnel" className="feature-img" />
            <div className="feature-content text-center">
              <h3 className="feature-title">Soutien Professionnel</h3>
              <p className="feature-description">Un suivi dédié à chaque étape</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
