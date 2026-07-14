import React from 'react';
import { Link } from 'react-router-dom';
import './ForWhom.css';

const paths = [
  {
    title: 'Je suis une famille',
    text: 'Nous clarifions vos attentes, votre organisation et le profil qui correspond réellement à votre mode de vie. Un bon matching repose sur des valeurs communes, une communication transparente et une vraie compatibilité humaine.',
    points: [
      'Clarifier attentes, cadre et organisation',
      'Matching basé sur la compatibilité humaine',
      'Accompagnement avant et pendant l’accueil',
    ],
    to: '/famille',
    label: 'Accueillir un au pair',
    image: 'https://i.ibb.co/Xkxypbvs/PHOTO-2026-05-19-14-36-07-3.jpg',
    alt: 'Famille d’accueil',
  },
  {
    title: 'Je suis un(e) jeune au pair',
    text: 'Avant le départ, nous t’aidons à comprendre le programme, à poser les bonnes questions, à connaître tes droits et responsabilités, et à préparer ton arrivée — pour ne plus dépendre seulement de la chance.',
    points: [
      'Comprendre le programme et poser les bonnes questions',
      'Vérifier que la famille te correspond réellement',
      'Soutien avant, pendant et après le séjour',
    ],
    to: '/au-pair',
    label: 'Partir au pair',
    image: 'https://i.ibb.co/TxrWwd4f/PHOTO-2026-05-19-14-36-06.jpg',
    alt: 'Jeune au pair',
  },
];

const ForWhom = () => {
  return (
    <section className="for-whom">
      <div className="container">
        <div className="section-header">
          <span className="line"></span>
          <h2 className="section-title">Pour qui ?</h2>
          <span className="line"></span>
        </div>
        <p className="for-whom-lead">
          Une belle expérience Au Pair ne repose pas uniquement sur une famille ou sur une jeune.
          Elle repose sur une rencontre entre deux projets de vie — et cette rencontre ne devrait
          jamais être laissée au hasard.
        </p>

        <div className="for-whom-grid">
          {paths.map((path) => (
            <article key={path.to} className="for-whom-path">
              <div className="for-whom-media">
                <img src={path.image} alt={path.alt} loading="lazy" />
              </div>
              <div className="for-whom-body">
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <ul>
                  {path.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link to={path.to} className="btn btn-primary for-whom-btn">
                  {path.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
