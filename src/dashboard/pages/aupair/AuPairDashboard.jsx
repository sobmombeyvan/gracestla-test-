import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { buildDashboardUser } from '../../../utils/userDisplay';
import { LayoutDashboard, User, Heart, MessageSquare, FileText, Bell, Settings, Users, ClipboardList } from 'lucide-react';
import AuPairQuestionnaire from './AuPairQuestionnaire';
import DashboardLayout from '../../layouts/DashboardLayout';
import AuPairOverview from './AuPairOverview';
import AuPairFamilies from './AuPairFamilies';
import AuPairMessages from './AuPairMessages';
import AuPairProfile from './AuPairProfile';
import AuPairFavorites from './AuPairFavorites';
import { AuPairDocuments, AuPairNotifications, AuPairSettings } from './AuPairPages';

const sidebarItems = [
  {
    label: 'Principal',
    items: [
      { name: 'Tableau de bord', path: '/dashboard/aupair', icon: <LayoutDashboard size={18} /> },
      { name: 'Mon Profil', path: '/dashboard/aupair/profile', icon: <User size={18} /> },
      { name: 'Familles recommandées', path: '/dashboard/aupair/families', icon: <Users size={18} /> },
      { name: 'Favoris', path: '/dashboard/aupair/favorites', icon: <Heart size={18} /> },
    ]
  },
  {
    label: 'Communication',
    items: [
      { name: 'Messages', path: '/dashboard/aupair/messages', icon: <MessageSquare size={18} /> },
    ]
  },
  {
    label: 'Préparation',
    items: [
      { name: 'Questionnaire', path: '/dashboard/aupair/questionnaire', icon: <ClipboardList size={18} /> },
      { name: 'Documents', path: '/dashboard/aupair/documents', icon: <FileText size={18} /> },
    ]
  },
  {
    label: '',
    items: [
      { name: 'Notifications', path: '/dashboard/aupair/notifications', icon: <Bell size={18} /> },
      { name: 'Paramètres', path: '/dashboard/aupair/settings', icon: <Settings size={18} /> },
    ]
  },
];

const AuPairDashboard = () => {
  const { profile, user: authUser } = useAuth();
  const user = buildDashboardUser(profile, authUser);

  return (
    <DashboardLayout sidebarItems={sidebarItems} user={user} roleLabel="Espace Au Pair">
      <Routes>
        <Route index element={<AuPairOverview />} />
        <Route path="profile" element={<AuPairProfile />} />
        <Route path="families" element={<AuPairFamilies />} />
        <Route path="favorites" element={<AuPairFavorites />} />
        <Route path="messages" element={<AuPairMessages />} />
        <Route path="questionnaire" element={<AuPairQuestionnaire />} />
        <Route path="documents" element={<AuPairDocuments />} />
        <Route path="notifications" element={<AuPairNotifications />} />
        <Route path="settings" element={<AuPairSettings />} />
        <Route path="*" element={<AuPairOverview />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AuPairDashboard;
