import { AUPAIR_PROFILES, FAMILY_PROFILES } from './archiveProfiles';

export const AUPAIR_FILTER_INITIAL = {
  country: '',
  gender: '',
  language: '',
  ageMin: '',
  ageMax: '',
  experience: '',
  drivingLicense: '',
  availability: '',
};

export const AUPAIR_FILTER_FIELDS = [
  {
    key: 'country',
    label: 'Nationalité / pays',
    type: 'select',
    options: [...new Set(AUPAIR_PROFILES.map((p) => p.nationality))].map((c) => ({ value: c, label: c })),
  },
  {
    key: 'gender',
    label: 'Sexe',
    type: 'select',
    options: [
      { value: 'Femme', label: 'Femme' },
      { value: 'Homme', label: 'Homme' },
    ],
  },
  {
    key: 'language',
    label: 'Langue parlée',
    type: 'select',
    options: ['Français', 'Anglais', 'Espagnol', 'Italien', 'Allemand', 'Wolof'].map((l) => ({
      value: l,
      label: l,
    })),
  },
  { key: 'ageMin', label: 'Âge min', type: 'number', placeholder: '18' },
  { key: 'ageMax', label: 'Âge max', type: 'number', placeholder: '28' },
  {
    key: 'experience',
    label: 'Expérience',
    type: 'select',
    options: [
      { value: '1+', label: 'Avec expérience' },
      { value: 'none', label: 'Débutante' },
    ],
  },
  {
    key: 'drivingLicense',
    label: 'Permis de conduire',
    type: 'select',
    options: [
      { value: 'yes', label: 'Oui' },
      { value: 'no', label: 'Non' },
    ],
  },
  { key: 'availability', label: 'Disponibilité', placeholder: 'ex. Immédiate' },
];

export const FAMILY_FILTER_INITIAL = {
  country: '',
  language: '',
  ageSought: '',
  childrenCount: '',
  stayDuration: '',
  drivingLicense: '',
};

export const FAMILY_FILTER_FIELDS = [
  {
    key: 'country',
    label: 'Pays',
    type: 'select',
    options: [...new Set(FAMILY_PROFILES.map((p) => p.country))].map((c) => ({ value: c, label: c })),
  },
  {
    key: 'language',
    label: 'Langue',
    type: 'select',
    options: ['Français', 'Anglais', 'Allemand', 'Italien', 'Espagnol', 'Néerlandais', 'Danois'].map((l) => ({
      value: l,
      label: l,
    })),
  },
  { key: 'ageSought', label: 'Âge recherché', placeholder: 'ex. 18' },
  {
    key: 'childrenCount',
    label: "Nombre d'enfants",
    type: 'select',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3+' },
    ],
  },
  {
    key: 'stayDuration',
    label: 'Durée du séjour',
    type: 'select',
    options: [
      { value: '6', label: '6 mois' },
      { value: '12', label: '12 mois' },
    ],
  },
  {
    key: 'drivingLicense',
    label: 'Permis de conduire',
    type: 'select',
    options: [
      { value: 'yes', label: 'Requis' },
      { value: 'no', label: 'Non requis' },
    ],
  },
];
