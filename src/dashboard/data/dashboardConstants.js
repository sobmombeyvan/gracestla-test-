/** Liens admin (sans données fictives) */
export const adminPriorityQueue = [
  {
    id: 'submissions',
    count: 0,
    label: 'Nouvelles demandes',
    hint: 'Formulaires reçus sur le site',
    path: '/dashboard/admin/submissions',
    attention: true,
  },
  {
    id: 'documents',
    count: 0,
    label: 'Documents',
    hint: 'Dossiers à traiter',
    path: '/dashboard/admin/documents',
    attention: false,
  },
  {
    id: 'messages',
    count: 0,
    label: 'Messages',
    hint: 'Conversations support',
    path: '/dashboard/admin/messages',
    attention: false,
  },
];
