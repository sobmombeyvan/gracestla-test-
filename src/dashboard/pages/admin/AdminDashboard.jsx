import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { buildDashboardUser } from '../../../utils/userDisplay';
import { LayoutDashboard, Inbox, Users, User, Home, GitBranch, MessageSquare, FileText, AlertTriangle, BarChart3, Bell, Settings, ClipboardList, Calendar, CalendarClock } from 'lucide-react';
import AdminSubmissions from './AdminSubmissions';
import AdminBookings from './AdminBookings';
import AdminAvailability from './AdminAvailability';
import AdminFamilyQuestionnaires from './AdminFamilyQuestionnaires';
import AdminAuPairQuestionnaires from './AdminAuPairQuestionnaires';
import DashboardLayout from '../../layouts/DashboardLayout';
import '../../styles/admin.css';
import AdminOverview from './AdminOverview';
import AdminUsers from './AdminUsers';
import AdminMatching from './AdminMatching';
import AdminAnalytics from './AdminAnalytics';
import { AdminAuPairs, AdminFamilies, AdminMessages, AdminDocuments, AdminIncidents, AdminAudit, AdminNotifications, AdminSettings } from './AdminPages';

const sidebarItems = [
  {
    label: 'Général',
    items: [
      { name: 'Vue d\'ensemble', path: '/dashboard/admin', icon: <LayoutDashboard size={18} /> },
      { name: 'Demandes', path: '/dashboard/admin/submissions', icon: <Inbox size={18} /> },
      { name: 'Rendez-vous', path: '/dashboard/admin/bookings', icon: <Calendar size={18} /> },
      { name: 'Créneaux', path: '/dashboard/admin/availability', icon: <CalendarClock size={18} /> },
      { name: 'Quest. familles', path: '/dashboard/admin/questionnaires-familles', icon: <ClipboardList size={18} /> },
      { name: 'Quest. au pairs', path: '/dashboard/admin/questionnaires-aupairs', icon: <ClipboardList size={18} /> },
      { name: 'Utilisateurs', path: '/dashboard/admin/users', icon: <Users size={18} /> },
      { name: 'Profils Au Pair', path: '/dashboard/admin/aupairs', icon: <User size={18} /> },
      { name: 'Profils Familles', path: '/dashboard/admin/families', icon: <Home size={18} /> },
    ]
  },
  {
    label: 'Opérations',
    items: [
      { name: 'Matchings', path: '/dashboard/admin/matching', icon: <GitBranch size={18} /> },
      { name: 'Messages', path: '/dashboard/admin/messages', icon: <MessageSquare size={18} /> },
      { name: 'Documents', path: '/dashboard/admin/documents', icon: <FileText size={18} /> },
      { name: 'Incidents', path: '/dashboard/admin/incidents', icon: <AlertTriangle size={18} /> },
    ]
  },
  {
    label: 'Analyse',
    items: [
      { name: 'Analytique', path: '/dashboard/admin/analytics', icon: <BarChart3 size={18} /> },
      { name: 'Journal d\'audit', path: '/dashboard/admin/audit', icon: <ClipboardList size={18} /> },
      { name: 'Notifications', path: '/dashboard/admin/notifications', icon: <Bell size={18} /> },
      { name: 'Paramètres', path: '/dashboard/admin/settings', icon: <Settings size={18} /> },
    ]
  },
];

const AdminDashboard = () => {
  const { profile, user: authUser } = useAuth();
  const user = buildDashboardUser(profile, authUser);

  return (
    <DashboardLayout sidebarItems={sidebarItems} user={user} roleLabel="Administration">
      <div className="admin-shell">
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="submissions" element={<AdminSubmissions />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="availability" element={<AdminAvailability />} />
        <Route path="questionnaires-familles" element={<AdminFamilyQuestionnaires />} />
        <Route path="questionnaires-aupairs" element={<AdminAuPairQuestionnaires />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="aupairs" element={<AdminAuPairs />} />
        <Route path="families" element={<AdminFamilies />} />
        <Route path="matching" element={<AdminMatching />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="documents" element={<AdminDocuments />} />
        <Route path="incidents" element={<AdminIncidents />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="audit" element={<AdminAudit />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<AdminOverview />} />
      </Routes>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
