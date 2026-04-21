import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>Tu n'es pas ici par hasard.</h1>
          <p>
            Prends quelques minutes pour comprendre<br />
            pourquoi Grâce est là existe.
          </p>
        </div>
      </div>

      <div className="about-intro">
        <h2>Partir au pair, c'est souvent un rêve.</h2>
        <p>Mais parfois... la réalité est différente.</p>
      </div>

      <div className="about-container">
        <div className="about-card">
          <div className="about-story">
            <h3 className="section-subtitle">MON HISTOIRE</h3>
            
            <p>En 2022, j'ai décidé de partir.</p>
            
            <p className="space-before">
              J'ai quitté ma famille, mon pays, mes repères.<br />
              J'étais motivée.<br />
              Prête à vivre une belle expérience.
            </p>
            
            <p className="space-before">
              J'ai trouvé une famille.<br />
              On échange, on définit un cadre, on signe un contrat.<br />
              Sur le papier, tout était clair.
            </p>
            
            <p className="space-before">
              Mais une fois sur place...<br />
              les choses ont changé.
            </p>
            
            <p className="space-before">
              Les heures ont augmenté.<br />
              Les responsabilités aussi.<br />
              Le cadre n'était plus respecté.
            </p>
            
            <p className="space-before">Et moi...</p>
            <p>
              J'étais <strong>seule</strong><br />
              dans un pays que je ne connaissais pas<br />
              <strong>sans repères</strong>
            </p>
            
            <p className="space-before">
              J'ai accepté.<br />
              Pas parce que c'était normal.
            </p>
            
            <p className="space-before">
              <strong>15 jours</strong> pour partir.
            </p>
            
            <p className="space-before">
              Sans solution. <strong>Sans accompagnement.</strong>
            </p>
            
            <p className="space-before">
              Ce moment-là... je ne l'oublierai jamais
            </p>
            
            <p className="space-before"><strong>La peur.</strong></p>
            
            <p className="space-before"><strong>Le doute. La solitude.</strong></p>
          </div>

          <div className="about-founder-section">
            <div className="founder-image-container">
              <img 
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Gracela - Fondatrice" 
                className="founder-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x800/E5D9D7/5A474A?text=Portrait+Fondatrice";
                }}
              />
              <p className="founder-caption">Gracela — Fondatrice de Grâce est là</p>
            </div>
            
            <div className="why-box">
              <h3>POURQUOI GRÂCE EST LÀ</h3>
              <p>Grâce est là est née de cette expérience.</p>
              
              <p className="space-before">
                Pas pour faire peur<br />
                Pas pour vendre du rêve.
              </p>
              
              <p className="space-before text-highlight">
                Mais pour éviter que d'autres vivent<br />
                ça seules.
              </p>
              
              <Link to="/reservation" className="btn-accompany">Je veux être accompagnée</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
