import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Des relations au pair<br />
          <span className="italic">qui fonctionnent vraiment</span>
        </h1>
        <p className="hero-subtitle">
          Accompagnement & mise en relation au pair
        </p>
        <Link to="/reservation" className="btn btn-primary hero-btn" style={{textDecoration: 'none'}}>Découvrir nos services</Link>
      </div>
    </section>
  );
};
export default Hero;
