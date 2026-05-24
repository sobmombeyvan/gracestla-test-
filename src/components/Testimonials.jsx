import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const testimonialsData = [
  {
    quote: "On avait peur de se tromper dans le choix. Grâce est là nous a aidés à cadrer nos attentes, à poser les bonnes questions en entretien et à trouver une au pair vraiment en phase avec notre famille.",
    author: "Camille & Antoine",
    role: "Famille d'accueil, Bordeaux",
  },
  {
    quote: "Mon premier séjour au pair avait mal tourné. Cette fois, j'ai été accompagnée de A à Z : profil, entretiens, contrat… Je me suis sentie écoutée et jamais seule.",
    author: "Léa",
    role: "Jeune au pair, 21 ans",
  },
  {
    quote: "Ce qui nous a convaincus, c'est le suivi après l'arrivée. Quand un malentendu est arrivé, mediation rapide et conseils clairs. Notre expérience reste très positive.",
    author: "Nadia & Karim",
    role: "Famille d'accueil, Genève",
  },
  {
    quote: "J'ai choisi la formule Sérénité et je ne regrette pas : présélection de familles, visios préparées, accompagnement jusqu'au départ. Tout était transparent.",
    author: "Sofia",
    role: "Jeune au pair, 20 ans",
  },
  {
    quote: "Enfin une structure qui comprend les réalités du quotidien : horaires, cadre, respect mutuel. On a recruté sereinement, sans mauvaises surprises.",
    author: "Élise & Marc",
    role: "Famille d'accueil, Lyon",
  },
  {
    quote: "Gracela connaît vraiment ce que vit une jeune au pair à l'étranger. Son expérience se ressent dans chaque conseil. Je recommande les yeux fermés.",
    author: "Inès",
    role: "Jeune au pair, 23 ans",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonialsData[currentIndex];

  return (
    <section className="testimonials text-center">
      <div className="container">
        <div className="section-header">
          <span className="line"></span>
          <h2 className="section-title">Elles en parlent mieux que nous</h2>
          <span className="line"></span>
        </div>

        <div className="testimonial-box">
          <div className="testimonial-text-container">
            <span className="quote-mark open" aria-hidden="true">"</span>
            <p className="quote">{current.quote}</p>
            <span className="quote-mark close" aria-hidden="true">"</span>
            <p className="author-name">{current.author}</p>
            <p className="author-role">{current.role}</p>
          </div>
        </div>

        <div className="pagination" role="tablist" aria-label="Témoignages">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Témoignage ${index + 1}`}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="cta-container">
          <Link to="/reservation" className="btn btn-primary cta-btn">
            Prêt à vous lancer ?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
