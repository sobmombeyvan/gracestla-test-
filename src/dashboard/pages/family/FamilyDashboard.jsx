import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { buildDashboardUser } from '../../../utils/userDisplay';
import { LayoutDashboard, Search, Heart, MessageSquare, FileText, GitBranch, Settings, Bell, ClipboardList } from 'lucide-react';
import FamilyQuestionnaire from './FamilyQuestionnaire';
import DashboardLayout from '../../layouts/DashboardLayout';
import FamilyOverview from './FamilyOverview';
import FamilySearch from './FamilySearch';
import FamilyMessages from './FamilyMessages';
import { FamilyFavorites, FamilyDocuments, FamilyProgress, FamilyNotifications, FamilySettings } from './FamilyPages';

const sidebarItems = [
  {
    label: 'Principal',
    items: [
      { name: 'Tableau de bord', path: '/dashboard/family', icon: <LayoutDashboard size={18} /> },
      { name: 'Rechercher Au Pairs', path: '/dashboard/family/search', icon: <Search size={18} /> },
      { name: 'Favoris', path: '/dashboard/family/favorites', icon: <Heart size={18} /> },
    ]
  },
  {
    label: 'Communication',
    items: [
      { name: 'Messages', path: '/dashboard/family/messages', icon: <MessageSquare size={18} /> },
    ]
  },
  {
    label: 'Gestion',
    items: [
      { name: 'Questionnaire', path: '/dashboard/family/questionnaire', icon: <ClipboardList size={18} /> },
      { name: 'Documents', path: '/dashboard/family/documents', icon: <FileText size={18} /> },
      { name: 'Progression', path: '/dashboard/family/progress', icon: <GitBranch size={18} /> },
      { name: 'Notifications', path: '/dashboard/family/notifications', icon: <Bell size={18} /> },
      { name: 'Paramètres', path: '/dashboard/family/settings', icon: <Settings size={18} /> },
    ]
  },
];

const FamilyDashboard = () => {
  const { profile, user: authUser } = useAuth();
  const user = buildDashboardUser(profile, authUser);

  return (
    <DashboardLayout sidebarItems={sidebarItems} user={user} roleLabel="Espace Famille">
      <Routes>
        <Route index element={<FamilyOverview />} />
        <Route path="search" element={<FamilySearch />} />
        <Route path="favorites" element={<FamilyFavorites />} />
        <Route path="messages" element={<FamilyMessages />} />
        <Route path="questionnaire" element={<FamilyQuestionnaire />} />
        <Route path="documents" element={<FamilyDocuments />} />
        <Route path="progress" element={<FamilyProgress />} />
        <Route path="notifications" element={<FamilyNotifications />} />
        <Route path="settings" element={<FamilySettings />} />
        <Route path="*" element={<FamilyOverview />} />
      </Routes>
    </DashboardLayout>
  );
};

export default FamilyDashboard;
