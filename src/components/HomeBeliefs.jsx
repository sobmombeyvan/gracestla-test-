import React from 'react';
import { Link } from 'react-router-dom';
import './HomeBeliefs.css';

const beliefs = [
  'Nous croyons qu’une expérience Au Pair ne devrait jamais dépendre de la chance.',
  'Nous croyons qu’une bonne préparation permet d’éviter de nombreuses difficultés.',
  'Nous croyons qu’une relation de confiance se construit avant même la première rencontre.',
  'Nous croyons qu’une famille mérite d’être accompagnée autant qu’une jeune Au Pair.',
  'Nous croyons surtout qu’aucune personne ne devrait avoir à vivre cette aventure seule.',
];

const HomeBeliefs = () => {
  return (
    <section className="home-beliefs bg-sand">
      <div className="container home-beliefs-layout">
        <div className="home-beliefs-intro">
          <span className="home-beliefs-label">Notre mission</span>
          <h2>Créer des expériences Au Pair sereines, équilibrées et enrichissantes</h2>
          <p>
            Des expériences où chacun se sent respecté. Écouté. Préparé. Accompagné.
            Parce qu’une belle aventure ne commence pas le jour où l’on monte dans un avion.
            Elle commence bien avant.
          </p>
          <Link to="/a-propos" className="home-beliefs-link">
            Lire toute l’histoire
          </Link>
        </div>

        <ul className="home-beliefs-list">
          {beliefs.map((belief) => (
            <li key={belief}>{belief}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeBeliefs;
