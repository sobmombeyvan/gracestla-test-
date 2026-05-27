import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

const faqItems = [
  {
    question: "Qu'est-ce que Grâce est là ?",
    answer:
      "Grâce est là est un service d'accompagnement et de mise en relation au pair, né de l'expérience vécue par sa fondatrice Gracela. Nous aidons les jeunes au pair et les familles d'accueil à vivre une expérience culturelle enrichissante, sécurisée et basée sur la confiance, le respect et l'humain.",
  },
  {
    question: "À qui s'adressent vos services ?",
    answer:
      "Nos services s'adressent aux jeunes souhaitant partir au pair (découverte culturelle, amélioration linguistique, accompagnement des enfants) et aux familles d'accueil recherchant une aide au quotidien dans un cadre bienveillant et structuré.",
  },
  {
    question: "Comment se déroule l'accompagnement ?",
    answer:
      "Nous vous accompagnons en cinq étapes : compréhension de vos besoins, sélection des profils adaptés, facilitation des échanges, préparation de l'arrivée, puis suivi avant, pendant et après le début de l'expérience. Chaque étape est pensée pour sécuriser le parcours des deux parties.",
  },
  {
    question: "Quelle est la différence entre le programme au pair et une simple garde d'enfants ?",
    answer:
      "Le programme au pair est un échange culturel : le ou la jeune vit au sein de la famille, partage son quotidien et sa culture, améliore une langue et accompagne les enfants dans un cadre défini. Grâce est là ne se limite pas à une mise en relation : nous sécurisons, accompagnons et guidons chaque étape.",
  },
  {
    question: "Quels sont vos tarifs ?",
    answer: (
      <>
        <p><strong>Pour les familles :</strong></p>
        <ul>
          <li>Démarrage Sécurisé — 590 €</li>
          <li>Choix Maîtrisé — 1 090 € (formule la plus choisie)</li>
          <li>Expérience Sans Stress — 1 890 €</li>
        </ul>
        <p><strong>Pour les jeunes au pair :</strong></p>
        <ul>
          <li>Essentiel — 99 €</li>
          <li>Sérénité — 290 € (formule la plus choisie)</li>
          <li>Premium — 490 €</li>
        </ul>
        <p>
          Consultez les pages détaillées :{' '}
          <Link to="/tarifs-famille">tarifs familles</Link> et{' '}
          <Link to="/tarifs-au-pair">tarifs au pair</Link>.
        </p>
      </>
    ),
  },
  {
    question: "Puis-je payer en plusieurs fois ?",
    answer:
      "Oui. Le paiement en plusieurs fois est possible selon la formule choisie. Pour les familles, le paiement flexible est proposé sans frais cachés. Pour les jeunes au pair, des facilités sont indiquées à partir de 49 €/mois (Essentiel et Sérénité) ou 79 €/mois (Premium), selon l'offre.",
  },
  {
    question: "Comment démarrer avec Grâce est là ?",
    answer: (
      <>
        <p>Rendez-vous sur la page <Link to="/reservation">Je suis intéressé(e)</Link>, indiquez si vous êtes jeune au pair ou famille, puis complétez le formulaire correspondant (<Link to="/au-pair">au pair</Link> ou <Link to="/famille">famille</Link>). Vous pouvez aussi réserver un appel via notre calendrier ou nous écrire via la page <Link to="/contact">Contact</Link>.</p>
      </>
    ),
  },
  {
    question: "Proposez-vous un suivi après le début de l'expérience ?",
    answer:
      "Oui. Le suivi fait partie de notre approche : nous restons disponibles pour vous conseiller, faciliter les échanges et, selon la formule choisie, assurer un accompagnement jusqu'à l'arrivée et au-delà (médiation, conseils, assistance visio selon les offres Premium ou Expérience Sans Stress).",
  },
  {
    question: "Mes données personnelles sont-elles protégées ?",
    answer: (
      <>
        <p>Oui. Les données collectées via nos formulaires sont utilisées uniquement pour traiter votre demande. Consultez notre <Link to="/politique-confidentialite">politique de confidentialité</Link> et notre <Link to="/politique-cookies">politique de cookies</Link>.</p>
      </>
    ),
  },
  {
    question: "Comment vous contacter ?",
    answer: (
      <>
        Écrivez-nous à <a href="mailto:contact@graceestla.com">contact@graceestla.com</a> ou utilisez le <Link to="/contact">formulaire de contact</Link>. Nous répondons à toutes vos questions sur le programme, les tarifs et l'accompagnement.
      </>
    ),
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="legal-page faq-page">
      <div className="container">
        <h1>Questions fréquentes</h1>
        <p className="legal-intro">
          Retrouvez ici les réponses aux questions les plus posées sur Grâce est là,
          le programme au pair et nos accompagnements.
        </p>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="faq-cta">
          Vous ne trouvez pas votre réponse ?{' '}
          <Link to="/contact">Contactez-nous</Link> ou{' '}
          <Link to="/reservation">réservez un appel</Link>.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
