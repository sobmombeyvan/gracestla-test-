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
            <img src="https://i.ibb.co/ynsRxK1f/345c1e8d-0705-4f69-876f-a0b9d3709821.jpg" alt="Sécurité & Confiance" className="feature-img" />
            <div className="feature-content text-center">
              <h3 className="feature-title">Sécurité & Confiance</h3>
              <p className="feature-description">Un accompagnement rassurant</p>
            </div>
          </div>
          
          <div className="feature-card">
            <img src="https://i.ibb.co/4ncNS6ky/5e2aeba4-eb30-466a-8040-2b4fc6b346b9.jpg" alt="Expérience Authentique" className="feature-img" />
            <div className="feature-content text-center">
              <h3 className="feature-title">Expérience Authentique</h3>
              <p className="feature-description">Des échanges enrichissants</p>
            </div>
          </div>
          
          <div className="feature-card">
            <img src="https://i.ibb.co/bj5HDgd0/653422ad-f084-4450-b82b-b24fea775e1e.jpg" alt="Soutien Professionnel" className="feature-img" />
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
