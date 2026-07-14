import React from 'react';
import { Link } from 'react-router-dom';
import './HomeAccompaniment.css';

const stages = [
  {
    title: 'Avant le départ',
    text: 'Comprendre le programme, poser les bonnes questions, connaître ses droits et responsabilités, et préparer l’arrivée dans un cadre clair.',
  },
  {
    title: 'Pendant le séjour',
    text: 'Rester présents lorsque les doutes apparaissent sur place — pour écouter, conseiller, rassurer et aider à trouver des solutions.',
  },
  {
    title: 'Après le retour',
    text: 'Accompagner aussi la suite : parce qu’une belle aventure ne s’arrête pas le jour où l’on rentre, et que le soutien compte encore.',
  },
];

const HomeAccompaniment = () => {
  return (
    <section className="home-accompaniment">
      <div className="container">
        <div className="section-header">
          <span className="line"></span>
          <h2 className="section-title">Plus qu’une mise en relation</h2>
          <span className="line"></span>
        </div>

        <p className="home-accompaniment-lead">
          Notre mission ne consiste pas simplement à mettre une famille et une jeune Au Pair
          en contact. Nous créons les meilleures conditions pour que cette expérience
          fonctionne réellement — à chaque étape du parcours.
        </p>

        <div className="home-accompaniment-stages">
          {stages.map((stage, index) => (
            <article key={stage.title} className="home-accompaniment-stage">
              <span className="home-accompaniment-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>

        <div className="home-accompaniment-aside">
          <p>
            Être accompagné, c’est aussi savoir que quelqu’un est là pour écouter,
            conseiller, rassurer et aider à trouver des solutions lorsque cela devient
            nécessaire.
          </p>
          <Link to="/services" className="home-accompaniment-link">
            Découvrir l’accompagnement
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAccompaniment;
