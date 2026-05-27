/** Questionnaire Famille d'accueil — structure des sections et questions */

export const QUESTIONNAIRE_META = {
  title: "Questionnaire — Famille d'accueil (Au Pair)",
  tagline: 'Quand vous voulez éviter les erreurs, Grâce est là.',
  intro: [
    'Merci de prendre quelques minutes pour nous présenter votre famille.',
    'Ce questionnaire nous permet de mieux comprendre votre mode de vie, vos attentes et le type de jeune au pair qui pourrait s\'intégrer naturellement dans votre foyer.',
    'Il n\'y a pas de « bonne » ou « mauvaise » réponse. L\'objectif est simplement de construire une expérience humaine, claire et équilibrée pour chacun.',
  ],
  outro:
    'Merci. Nous reviendrons vers vous après analyse du questionnaire afin de proposer des profils compatibles.',
};

export const FAMILY_QUESTIONNAIRE_SECTIONS = [
  {
    id: 'famille',
    title: '1) Votre famille',
    questions: [
      { id: 'famille_presentation', label: 'Pouvez-vous nous présenter votre famille en quelques lignes ?' },
      { id: 'famille_ambiance', label: "Comment décririez-vous l'ambiance générale de votre foyer ?" },
      { id: 'famille_valeurs', label: 'Quelles sont les valeurs importantes dans votre famille ?' },
      { id: 'famille_partage', label: 'Qu\'aimez-vous partager ensemble au quotidien ?' },
      { id: 'famille_pourquoi_aupair', label: 'Pourquoi souhaitez-vous accueillir un(e) jeune au pair aujourd\'hui ?' },
      { id: 'famille_moment', label: 'Pourquoi ce moment vous semble-t-il adapté pour vivre cette expérience ?' },
      { id: 'famille_connaissance', label: 'Comment avez-vous connu le programme au pair ?' },
    ],
  },
  {
    id: 'enfants',
    title: '2) Vos enfants',
    questions: [
      { id: 'enfants_personnalites', label: 'Pouvez-vous nous parler de chacun de vos enfants et de leurs personnalités ?' },
      { id: 'enfants_activites', label: 'Qu\'aiment-ils faire au quotidien ?' },
      { id: 'enfants_habitudes', label: 'Y a-t-il certaines habitudes, routines ou besoins importants à connaître ?' },
      { id: 'enfants_nouvelles_personnes', label: 'Comment réagissent généralement vos enfants face aux nouvelles personnes ?' },
      { id: 'enfants_fatigue', label: 'Comment réagissent-ils lorsqu\'ils sont fatigués, contrariés ou frustrés ?' },
      { id: 'enfants_difficile', label: 'Y a-t-il certaines situations du quotidien qui peuvent être plus difficiles à gérer avec eux ?' },
      { id: 'enfants_accompagnement', label: 'Comment accompagnez-vous généralement vos enfants dans les moments compliqués ?' },
      { id: 'enfants_relation_aupair', label: 'Quel type de relation aimeriez-vous que votre/vos enfant(s) construise(nt) avec l\'au pair ?' },
      { id: 'enfants_comprendre', label: 'Qu\'aimeriez-vous que votre futur(e) au pair comprenne rapidement concernant vos enfants ?' },
    ],
  },
  {
    id: 'vie_maison',
    title: '3) La vie à la maison',
    questions: [
      { id: 'vie_journee', label: 'Comment se déroule une journée classique dans votre famille ?' },
      { id: 'vie_place_aupair', label: "Comment imaginez-vous la place de l'au pair dans votre quotidien ?" },
      { id: 'vie_relation_type', label: 'Souhaitez-vous une relation plutôt très intégrée, équilibrée avec des moments personnels, ou plus indépendante ? Expliquez votre vision.' },
      { id: 'vie_bien_etre', label: 'Quelles sont les choses importantes pour que chacun se sente bien dans la maison ?' },
      { id: 'vie_regles', label: "Comment gérez-vous généralement les règles et l'organisation familiale ?" },
      { id: 'vie_habitudes', label: 'Y a-t-il certaines habitudes de vie importantes à respecter chez vous ?' },
      { id: 'vie_respect', label: 'Selon vous, qu\'est-ce qui permet à plusieurs personnes vivant ensemble de se sentir respectées et à l\'aise au quotidien ?' },
    ],
  },
  {
    id: 'logement',
    title: '4) Logement & espace personnel',
    questions: [
      { id: 'logement_espace', label: "Pouvez-vous décrire l'espace de vie qui sera mis à disposition de votre au pair ?" },
      { id: 'logement_chambre', label: "L'au pair disposera-t-elle d'une chambre privée ? D'une salle de bain privée ou partagée ? D'un espace personnel calme ? Merci de préciser." },
      { id: 'logement_intimite', label: "Qu'est-ce qui est important pour vous concernant l'intimité et le respect des espaces de chacun ?" },
      { id: 'logement_temps_perso', label: 'Votre au pair aura-t-elle des moments où elle pourra profiter pleinement de son temps personnel sans interruption ?' },
      { id: 'logement_partage', label: 'Souhaitez-vous partager certains espaces ou habitudes du quotidien avec votre au pair ? Lesquels ?' },
    ],
  },
  {
    id: 'repas',
    title: '5) Repas & quotidien',
    questions: [
      { id: 'repas_habitude', label: 'Comment se passent généralement les repas dans votre famille ?' },
      { id: 'repas_aupair', label: "Souhaitez-vous que l'au pair prenne les repas régulièrement avec la famille, librement selon ses envies, ou un mélange des deux ? Expliquez." },
      { id: 'repas_alimentation', label: 'Y a-t-il des habitudes alimentaires importantes dans votre foyer ?' },
      { id: 'repas_culture', label: 'Êtes-vous ouverts à découvrir la culture ou les spécialités culinaires de votre au pair ?' },
      { id: 'repas_moments', label: 'Quels moments du quotidien aimez-vous partager ensemble en famille ?' },
    ],
  },
  {
    id: 'horaires',
    title: '6) Horaires & organisation',
    questions: [
      { id: 'horaires_semaine', label: 'À quoi ressemblerait idéalement une semaine type avec votre au pair ?' },
      { id: 'horaires_missions', label: 'Quelles seraient principalement les missions confiées à votre au pair au quotidien ?' },
      { id: 'horaires_moments', label: "À quels moments de la journée l'aide est-elle principalement nécessaire ?" },
      { id: 'horaires_heures', label: "Combien d'heures d'aide par semaine imaginez-vous raisonnablement ?" },
      { id: 'horaires_repos', label: 'Comment souhaitez-vous organiser les jours de repos, les soirées, les week-ends et les temps libres ?' },
      { id: 'horaires_temps_libre', label: 'Comment vous assurez-vous que votre au pair puisse réellement profiter de son temps libre et de son expérience personnelle ?' },
      { id: 'horaires_flexibilite', label: 'Y a-t-il certaines flexibilités que vous aimeriez parfois demander ? Dans quelles situations ?' },
      { id: 'horaires_equilibre', label: "Qu'est-ce qui vous semble important pour maintenir un bon équilibre entre aide apportée et temps personnel de l'au pair ?" },
    ],
  },
  {
    id: 'vacances',
    title: '7) Vacances & temps libre',
    questions: [
      { id: 'vacances_vision', label: 'Comment imaginez-vous les vacances ou périodes de congés avec votre au pair ?' },
      { id: 'vacances_participation', label: 'Souhaitez-vous que votre au pair participe parfois à certaines vacances familiales ?' },
      { id: 'vacances_conges', label: "Comment envisagez-vous l'organisation des congés et du temps de repos ?" },
      { id: 'vacances_separation', label: 'Que représente pour vous une bonne séparation entre temps de travail et temps personnel ?' },
      { id: 'vacances_decouverte', label: "Qu'aimeriez-vous que votre au pair puisse découvrir ou vivre en dehors de son rôle auprès des enfants ?" },
    ],
  },
  {
    id: 'vie_perso',
    title: '8) Vie personnelle & visites',
    questions: [
      { id: 'perso_equilibre', label: "Comment imaginez-vous l'équilibre entre la vie familiale et la vie personnelle de votre au pair ?" },
      { id: 'perso_amis', label: 'Votre au pair pourra-t-elle recevoir occasionnellement des amis ou des proches à votre domicile ? Précisez ce qui vous semble acceptable et les limites importantes.' },
      { id: 'perso_famille_pays', label: "Si votre au pair a de la famille ou des amis vivant dans le pays, comment percevez-vous le fait qu'elle puisse les voir pendant ses jours de repos ?" },
      { id: 'perso_regles_visites', label: 'Y a-t-il certaines habitudes ou règles importantes concernant les visites à votre domicile ?' },
      { id: 'perso_informer', label: "Souhaitez-vous que votre au pair vous informe à l'avance lorsqu'elle prévoit certaines sorties, visites ou déplacements ? Si oui, dans quel esprit ?" },
      { id: 'perso_respect', label: 'Qu\'est-ce qui vous semble important pour préserver le respect du foyer, la confiance et la liberté personnelle de chacun ?' },
    ],
  },
  {
    id: 'transports',
    title: '9) Transports & organisation pratique',
    questions: [
      { id: 'transports_acces', label: 'Votre au pair aura-t-elle accès à certains moyens de transport ? Merci de préciser ce qui est prévu ou possible.' },
      { id: 'transports_regles', label: 'Y a-t-il certaines règles importantes concernant les déplacements ou l\'utilisation des transports ?' },
      { id: 'transports_permis', label: 'Le permis de conduire est-il important dans votre organisation familiale ? Pourquoi ?' },
    ],
  },
  {
    id: 'habitudes',
    title: '10) Habitudes & organisation du quotidien',
    questions: [
      { id: 'habitudes_ecrans', label: "Y a-t-il certaines attentes concernant l'utilisation du téléphone ou des écrans pendant les moments avec les enfants ?" },
      { id: 'habitudes_soir', label: 'Y a-t-il des horaires ou règles importantes concernant les retours le soir ou les sorties ? Expliquez votre vision.' },
      { id: 'habitudes_taches', label: "Quelles tâches du quotidien vous semblent naturellement faire partie de l'expérience au pair dans votre famille ?" },
      { id: 'habitudes_hors_role', label: "Y a-t-il certaines tâches qui, selon vous, ne devraient pas faire partie du rôle d'une jeune au pair ?" },
    ],
  },
  {
    id: 'profil',
    title: '11) Le profil recherché',
    questions: [
      { id: 'profil_personnalite', label: 'Quel type de personnalité pensez-vous correspondre le mieux à votre famille ?' },
      { id: 'profil_qualities', label: "Quelles qualités appréciez-vous particulièrement chez une personne qui s'occupe d'enfants ?" },
      { id: 'profil_experience', label: 'Y a-t-il certaines expériences ou compétences qui vous semblent importantes ?' },
      { id: 'profil_eviter', label: 'Y a-t-il des comportements ou situations que vous souhaiteriez éviter dans cette expérience ?' },
      { id: 'profil_match', label: 'Si vous deviez décrire votre « match idéal », à quoi ressemblerait-il humainement ?' },
    ],
  },
  {
    id: 'communication',
    title: '12) Communication & relation humaine',
    questions: [
      { id: 'com_probleme', label: "Comment préférez-vous communiquer lorsqu'un problème ou une incompréhension apparaît ?" },
      { id: 'com_attentes', label: "Qu'attendez-vous d'une bonne communication avec votre au pair ?" },
      { id: 'com_partage', label: 'Comment imaginez-vous les moments de partage avec votre au pair ?' },
      { id: 'com_offrir', label: 'Que souhaitez-vous offrir humainement à votre futur(e) au pair durant cette expérience ?' },
      { id: 'com_fonctionnement', label: 'Selon vous, qu\'est-ce qui permet à une expérience au pair de vraiment bien fonctionner ?' },
    ],
  },
  {
    id: 'humain',
    title: '13) Questions importantes & humaines',
    questions: [
      { id: 'humain_rassurer', label: "Si votre futur(e) au pair avait une inquiétude avant de venir chez vous, que souhaiteriez-vous lui dire pour la rassurer ?" },
      { id: 'humain_offrir', label: "Selon vous, qu'est-ce qu'une famille d'accueil doit offrir à une jeune au pair pour qu'elle se sente bien ?" },
      { id: 'humain_decrire', label: "Comment aimeriez-vous que votre au pair décrive son expérience chez vous à la fin de son séjour ?" },
      { id: 'humain_eviter', label: 'Y a-t-il des choses que vous ne souhaitez absolument pas reproduire dans cette expérience ?' },
      { id: 'humain_pourquoi', label: 'Pourquoi est-il important pour vous que cette relation fonctionne humainement et pas seulement « pratiquement » ?' },
    ],
  },
  {
    id: 'cadre',
    title: '14) Cadre clair : budget, extras, règles, sécurité',
    questions: [
      { id: 'cadre_argent', label: "Quel montant d'argent de poche prévoyez-vous et à quelle fréquence (hebdomadaire / mensuelle) ?" },
      { id: 'cadre_garde_extra', label: 'Si vous demandez exceptionnellement une garde supplémentaire (soirée/urgence), comment envisagez-vous la compensation (récupération / argent / les deux) ?' },
      { id: 'cadre_frais', label: "Quels frais seront pris en charge (transport, téléphone, cours de langue, activités, repas à l'extérieur) ? Qu'est-ce qui n'est pas pris en charge ?" },
      { id: 'cadre_menage', label: 'Concernant les tâches ménagères : quelles tâches légères sont attendues (et lesquelles ne le sont pas) ?' },
      { id: 'cadre_planning', label: 'Pouvez-vous préciser le planning réel (jours/heures) et les créneaux non négociables ?' },
      { id: 'cadre_regles', label: 'Quelles sont vos règles non négociables à la maison (invités, écrans, horaires, bruit, etc.) ?' },
      { id: 'cadre_cameras', label: 'Y a-t-il des caméras à domicile ? Si oui, où (espaces concernés) ?' },
      { id: 'cadre_voiture', label: "Voiture / conduite : l'au pair aura-t-elle accès à une voiture ? Quelles conditions (assurance, trajets autorisés) ?" },
      { id: 'cadre_contrat', label: 'Êtes-vous d\'accord pour un contrat et des règles de vie écrites dès le début ?' },
      { id: 'cadre_mediation', label: "En cas de difficulté, acceptez-vous une médiation avant toute décision de fin d'accueil ?" },
      { id: 'cadre_preavis', label: "En cas d'arrêt de l'accueil, quel préavis vous semble raisonnable et comment souhaitez-vous procéder ?" },
      { id: 'cadre_langue', label: 'Quelle langue est parlée à la maison et quelles sont vos attentes (français/anglais/autre) ?' },
    ],
  },
  {
    id: 'fin',
    title: '15) Dernière question',
    questions: [
      {
        id: 'fin_ajout',
        label: "Y a-t-il quelque chose d'important que vous aimeriez ajouter afin que nous comprenions réellement votre famille, votre fonctionnement et vos attentes ?",
      },
    ],
  },
];

export const FAMILY_QUESTION_FIELD_OVERRIDES = {
  famille_connaissance: {
    type: 'select',
    options: [
      { value: 'reseaux', label: 'Réseaux sociaux' },
      { value: 'bouche_a_oreille', label: 'Bouche à oreille' },
      { value: 'recherche_web', label: 'Recherche web' },
      { value: 'ancien_client', label: 'Ancien client / recommandation' },
      { value: 'autre', label: 'Autre' },
    ],
    placeholder: 'Choisissez une option',
  },
  logement_chambre: {
    type: 'select',
    options: [
      { value: 'chambre_privee_sdb_privee', label: 'Chambre privée + salle de bain privée' },
      { value: 'chambre_privee_sdb_partagee', label: 'Chambre privée + salle de bain partagée' },
      { value: 'chambre_partagee', label: 'Chambre partagée' },
      { value: 'autre', label: 'Autre (précisez)' },
    ],
    placeholder: 'Choisissez une option',
  },
  logement_temps_perso: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'partiellement', label: 'Partiellement' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  repas_aupair: {
    type: 'select',
    options: [
      { value: 'avec_famille', label: 'Surtout avec la famille' },
      { value: 'libre', label: 'Plutôt libre' },
      { value: 'mixte', label: 'Mixte selon les jours' },
    ],
    placeholder: 'Choisissez une option',
  },
  horaires_moments: {
    type: 'select',
    options: [
      { value: 'matin', label: 'Principalement le matin' },
      { value: 'midi', label: 'Principalement le midi' },
      { value: 'apres_midi', label: 'Principalement l’après-midi' },
      { value: 'soir', label: 'Principalement le soir' },
      { value: 'variable', label: 'Variable selon les jours' },
    ],
    placeholder: 'Choisissez une option',
  },
  horaires_heures: {
    type: 'number',
    placeholder: 'Ex: 25',
  },
  vacances_participation: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'parfois', label: 'Parfois' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  perso_amis: {
    type: 'select',
    options: [
      { value: 'oui_conditions', label: 'Oui, avec conditions' },
      { value: 'occasionnellement', label: 'Oui, occasionnellement' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  transports_permis: {
    type: 'select',
    options: [
      { value: 'indispensable', label: 'Indispensable' },
      { value: 'souhaite', label: 'Souhaitable' },
      { value: 'non_necessaire', label: 'Non nécessaire' },
    ],
    placeholder: 'Choisissez une option',
  },
  habitudes_soir: {
    type: 'select',
    options: [
      { value: 'souple', label: 'Cadre souple' },
      { value: 'equilibre', label: 'Cadre équilibré' },
      { value: 'strict', label: 'Cadre strict' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_argent: {
    type: 'number',
    placeholder: 'Montant mensuel en euros',
  },
  cadre_garde_extra: {
    type: 'select',
    options: [
      { value: 'recuperation', label: 'Récupération' },
      { value: 'argent', label: 'Compensation financière' },
      { value: 'les_deux', label: 'Les deux' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_cameras: {
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui_parties_communes', label: 'Oui, uniquement parties communes' },
      { value: 'oui_autre', label: 'Oui, autre configuration' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_contrat: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'a_discuter', label: 'À discuter' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_mediation: {
    type: 'select',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_preavis: {
    type: 'select',
    options: [
      { value: '1_semaine', label: '1 semaine' },
      { value: '2_semaines', label: '2 semaines' },
      { value: '1_mois', label: '1 mois' },
      { value: 'a_discuter', label: 'À discuter' },
    ],
    placeholder: 'Choisissez une option',
  },
  cadre_langue: {
    type: 'select',
    options: [
      { value: 'francais', label: 'Français' },
      { value: 'anglais', label: 'Anglais' },
      { value: 'bilingue', label: 'Bilingue / mixte' },
      { value: 'autre', label: 'Autre' },
    ],
    placeholder: 'Choisissez une option',
  },
};

export function getAllQuestionIds() {
  return FAMILY_QUESTIONNAIRE_SECTIONS.flatMap((s) => s.questions.map((q) => q.id));
}

export function getQuestionLabel(questionId) {
  for (const section of FAMILY_QUESTIONNAIRE_SECTIONS) {
    const q = section.questions.find((item) => item.id === questionId);
    if (q) return q.label;
  }
  return questionId;
}
