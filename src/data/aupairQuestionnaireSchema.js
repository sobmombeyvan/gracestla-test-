/** Questionnaire Jeune Au Pair — structure v6 */

export const AUPAIR_QUESTIONNAIRE_META = {
  title: 'Questionnaire — Jeune Au Pair (International)',
  tagline: 'Quand vous doutez, Grâce est là.',
  intro: [
    'Merci de répondre avec sincérité et précision. Ce questionnaire est conçu pour sécuriser le matching et éviter les mauvaises surprises, en France, en Europe ou à l\'international.',
  ],
  outro:
    'Merci. Plus vos réponses sont détaillées, plus Grâce est là peut vous proposer une famille réellement compatible et sécuriser votre expérience.',
};

export const AUPAIR_QUESTIONNAIRE_SECTIONS = [
  {
    id: 'infos',
    title: '0) Informations & éligibilité',
    questions: [
      { id: 'infos_nom', label: 'Nom / Prénom', type: 'text' },
      { id: 'infos_age', label: 'Âge', type: 'text' },
      { id: 'infos_nationalite', label: 'Nationalité', type: 'text' },
      { id: 'infos_ville_pays', label: 'Ville actuelle + Pays de résidence', type: 'text' },
      { id: 'infos_statut', label: 'Statut actuel (étudiante, salariée, autre) — précisez', type: 'textarea' },
      { id: 'infos_france', label: 'Êtes-vous déjà en France ? Oui / Non — Si oui : depuis quand ?', type: 'textarea' },
      { id: 'infos_disponibilite', label: 'Disponibilité (date)', type: 'text' },
      { id: 'infos_duree', label: 'Durée souhaitée : 3 / 6 / 9 / 12 mois / + (précisez)', type: 'text' },
      { id: 'infos_destination', label: 'Destination souhaitée : France / Europe / International (pays/ville) + pourquoi', type: 'textarea' },
      { id: 'infos_etudes', label: "Niveau d'études (ex : Bac, Bac+…)", type: 'text' },
      { id: 'infos_mobilite', label: 'Êtes-vous ouverte à changer de ville/pays si la famille est très compatible ? Expliquez', type: 'textarea' },
    ],
  },
  {
    id: 'langues',
    title: '1) Langues & communication',
    questions: [
      { id: 'langues_liste', label: 'Langues parlées + niveau (A2/B1/B2/C1)', type: 'textarea' },
      { id: 'langues_desaccord', label: 'Dans quelle langue êtes-vous la plus à l\'aise pour gérer un désaccord ? Pourquoi ?', type: 'textarea' },
      { id: 'langues_situation', label: 'Racontez une situation où vous avez dû vous faire comprendre dans une langue qui n\'était pas la vôtre', type: 'textarea' },
    ],
  },
  {
    id: 'permis',
    title: '2) Permis / conduite',
    questions: [
      { id: 'permis_oui', label: 'Permis de conduire : Oui / Non — depuis quand ?', type: 'textarea' },
      {
        id: 'permis_conduite',
        label: 'Conduite régulière (indiquez : Ville, Route, Autoroute, Longs trajets, Je ne conduis presque jamais)',
        type: 'textarea',
      },
      { id: 'permis_enfant', label: 'Conduire avec un enfant : OK / pas OK / selon conditions — précisez', type: 'textarea' },
      {
        id: 'permis_aise',
        label: 'À l\'aise avec (indiquez : Stationnement, Trajets école/crèche, Conduite de nuit, Longs trajets)',
        type: 'textarea',
      },
      { id: 'permis_moins_aise', label: 'Dans quelles situations vous sentez-vous moins à l\'aise au volant ? Comment vous sécurisez-vous ?', type: 'textarea' },
    ],
  },
  {
    id: 'experience',
    title: '3) Expérience enfants',
    questions: [
      { id: 'exp_experiences', label: 'Décrivez 2 expériences précises avec enfants (âge, durée, tâches exactes)', type: 'textarea' },
      { id: 'exp_gere', label: 'Avez-vous déjà géré (indiquez : Repas, Bain, Sieste, Coucher)', type: 'textarea' },
      { id: 'exp_plusieurs', label: 'Avez-vous déjà gardé plusieurs enfants seule ? Si oui, combien et quels âges ?', type: 'textarea' },
      { id: 'exp_references', label: 'Références disponibles ? Oui / Non — contact possible', type: 'textarea' },
      { id: 'exp_certifications', label: 'Certifications / formations : premiers secours / BAFA / autre (précisez)', type: 'textarea' },
    ],
  },
  {
    id: 'cadre',
    title: '4) Cadre & tâches acceptées',
    questions: [
      { id: 'cadre_enfants', label: 'Acceptez-vous les tâches « liées aux enfants » (ranger, lessive enfant, repas simple) ? Oui / Non — précisez', type: 'textarea' },
      { id: 'cadre_menage', label: 'Seriez-vous prête à aider ponctuellement à quelques tâches ménagères légères ? Oui / Non — précisez', type: 'textarea' },
      { id: 'cadre_refus', label: 'Ce que vous refusez absolument (liste claire)', type: 'textarea' },
      { id: 'cadre_tolerance', label: 'Votre tolérance au bruit / désordre / rythme intense : faible / moyen / élevé — expliquez', type: 'textarea' },
    ],
  },
  {
    id: 'sante',
    title: '5) Santé, habitudes, contraintes',
    questions: [
      { id: 'sante_allergies', label: 'Allergies / régime alimentaire / contraintes de santé', type: 'textarea' },
      { id: 'sante_fumeur', label: 'Fumeuse : Oui / Non — si oui : uniquement dehors ?', type: 'textarea' },
      { id: 'sante_animaux', label: 'Animaux : OK chiens / chats / aucun — expliquez', type: 'textarea' },
      { id: 'sante_nager', label: 'Sait nager : Oui / Non', type: 'text' },
      { id: 'sante_vaccins', label: 'Vaccins / documents parfois demandés selon pays : OK / pas OK / à discuter — précisez', type: 'textarea' },
    ],
  },
  {
    id: 'projet',
    title: '6) Projet personnel',
    questions: [
      { id: 'projet_pourquoi', label: 'Le vrai déclencheur : pourquoi maintenant ? Qu\'est-ce qui vous a décidée ?', type: 'textarea' },
      { id: 'projet_peurs', label: 'Vos 3 peurs principales concernant l\'expérience au pair', type: 'textarea' },
      { id: 'projet_limites', label: 'Vos 3 limites non négociables (respect, temps libre, tâches, communication, intimité)', type: 'textarea' },
      { id: 'projet_depassement', label: 'Comment vous vous dépassez concrètement : donnez un exemple de situation où vous avez « tenu bon »', type: 'textarea' },
      { id: 'projet_pression', label: 'Comment vous réagissez quand vous vous sentez seule / sous pression : que faites-vous en premier ?', type: 'textarea' },
    ],
  },
  {
    id: 'securite',
    title: '7) Sécurité & suivi',
    questions: [
      { id: 'sec_suivi', label: 'Êtes-vous d\'accord avec un suivi (check-in régulier) pendant l\'expérience ? Oui / Non — pourquoi ?', type: 'textarea' },
      {
        id: 'sec_probleme',
        label: 'En cas de problème, vous préférez (indiquez : En parler directement, Médiation, Prendre du recul d\'abord)',
        type: 'textarea',
      },
      { id: 'sec_conflit', label: 'Expliquez ce qui vous aide le plus à résoudre un conflit', type: 'textarea' },
      { id: 'sec_heures', label: 'Heures supplémentaires exceptionnelles avec compensation : Oui / Non — vos limites', type: 'textarea' },
    ],
  },
  {
    id: 'questions_famille',
    title: '8) Questions à poser à la famille',
    questions: [
      { id: 'qf_journee', label: 'À quoi ressemble une journée type (horaires parents/enfants, école/crèche, sieste, coucher) ?', type: 'textarea' },
      { id: 'qf_planning', label: 'Quel est le planning exact attendu (horaires, coupures, jours off) et comment est-il confirmé ?', type: 'textarea' },
      { id: 'qf_taches', label: 'Quelles seront précisément mes tâches liées aux enfants ?', type: 'textarea' },
      { id: 'qf_menage', label: 'Y a-t-il des tâches ménagères légères attendues ? Lesquelles ne sont pas attendues ?', type: 'textarea' },
      { id: 'qf_weekend', label: 'Comment se passent les week-ends et vacances ?', type: 'textarea' },
      { id: 'qf_sante_enfants', label: 'Les enfants ont-ils allergies, traitements médicaux, besoins particuliers ?', type: 'textarea' },
      { id: 'qf_conduire', label: 'Devrai-je conduire ? Si oui : voiture, trajets, assurances, habitudes ?', type: 'textarea' },
      { id: 'qf_intimite', label: 'Quelle intimité est prévue (chambre, salle de bain, temps libre, sorties, invités) ?', type: 'textarea' },
      { id: 'qf_place', label: 'Quelle place imaginez-vous pour l\'au pair (très intégrée / plus indépendante) ?', type: 'textarea' },
      { id: 'qf_difficulte', label: 'En cas de difficulté, qui est mon interlocuteur principal et comment se fait la communication ?', type: 'textarea' },
      { id: 'qf_regles', label: 'Quelles règles de vie sont non négociables (invités, bruit, écrans, etc.) ?', type: 'textarea' },
      { id: 'qf_langue', label: 'Quelle langue est parlée à la maison ? Attente sur la langue ?', type: 'textarea' },
    ],
  },
  {
    id: 'fin',
    title: '9) Dernière question',
    questions: [
      {
        id: 'fin_ajout',
        label: 'Y a-t-il une information importante que vous souhaitez partager pour que nous vous accompagnions au mieux ?',
        type: 'textarea',
      },
    ],
  },
];

export const AUPAIR_QUESTION_FIELD_OVERRIDES = {
  infos_age: { type: 'number', placeholder: 'Ex: 24' },
  infos_france: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  infos_disponibilite: { type: 'date' },
  infos_duree: {
    type: 'select',
    options: [
      { value: '3_mois', label: '3 mois' },
      { value: '6_mois', label: '6 mois' },
      { value: '9_mois', label: '9 mois' },
      { value: '12_mois', label: '12 mois' },
      { value: 'plus', label: 'Plus de 12 mois' },
    ],
    placeholder: 'Choisissez une durée',
  },
  permis_oui: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  permis_conduite: {
    type: 'select',
    options: [
      { value: 'ville', label: 'Ville' },
      { value: 'route', label: 'Route' },
      { value: 'autoroute', label: 'Autoroute' },
      { value: 'longs_trajets', label: 'Longs trajets' },
      { value: 'rare', label: 'Je conduis rarement' },
    ],
    placeholder: 'Choisissez une option',
  },
  permis_enfant: {
    type: 'select',
    options: [
      { value: 'ok', label: 'OK' },
      { value: 'pas_ok', label: 'Pas OK' },
      { value: 'selon_conditions', label: 'Selon conditions' },
    ],
    placeholder: 'Choisissez une option',
  },
  exp_references: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'en_cours', label: 'En cours' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_enfants: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'a_discuter', label: 'À discuter' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_menage: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'a_discuter', label: 'À discuter' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_tolerance: {
    type: 'select',
    options: [
      { value: 'faible', label: 'Faible' },
      { value: 'moyen', label: 'Moyen' },
      { value: 'eleve', label: 'Élevé' },
    ],
    placeholder: 'Choisissez une option',
  },
  sante_fumeur: {
    type: 'select',
    options: [
      { value: 'non', label: 'Non fumeuse' },
      { value: 'oui_exterieur', label: 'Oui, seulement à l’extérieur' },
      { value: 'oui', label: 'Oui' },
    ],
    placeholder: 'Choisissez une option',
  },
  sante_animaux: {
    type: 'select',
    options: [
      { value: 'chiens_ok', label: 'Chiens: OK' },
      { value: 'chats_ok', label: 'Chats: OK' },
      { value: 'tous_ok', label: 'Tous: OK' },
      { value: 'aucun', label: 'Aucun animal' },
    ],
    placeholder: 'Choisissez une option',
  },
  sante_nager: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  sec_suivi: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  sec_probleme: {
    type: 'select',
    options: [
      { value: 'direct', label: 'En parler directement' },
      { value: 'mediation', label: 'Médiation' },
      { value: 'recul', label: 'Prendre du recul d’abord' },
    ],
    placeholder: 'Choisissez une option',
  },
  sec_heures: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'selon_conditions', label: 'Selon conditions' },
    ],
    placeholder: 'Choisissez une option',
  },
};
