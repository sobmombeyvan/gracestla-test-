import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './dashboard/components/ProtectedRoute';
import SessionGate from './dashboard/components/SessionGate';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import AuPairForm from './pages/AuPairForm';
import FamilyForm from './pages/FamilyForm';
import Success from './pages/Success';
import PricingFamily from './pages/PricingFamily';
import PricingAuPair from './pages/PricingAuPair';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingCalendar from './pages/BookingCalendar';
import Program from './pages/Program';
import LegalMentions from './pages/LegalMentions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import CookiePolicy from './pages/CookiePolicy';
import FamilyArchives from './pages/archive/FamilyArchives';
import FamilyDetail from './pages/archive/FamilyDetail';
import AuPairArchives from './pages/archive/AuPairArchives';
import AuPairDetail from './pages/archive/AuPairDetail';
import CookieBanner from './components/CookieBanner';
import './dashboard/styles/dashboard.css';

// Dashboard lazy imports
const DashboardLogin = lazy(() => import('./dashboard/pages/DashboardLogin'));
const DashboardSignup = lazy(() => import('./dashboard/pages/DashboardSignup'));
const RoleOnboarding = lazy(() => import('./dashboard/pages/RoleOnboarding'));
const AuthCallback = lazy(() => import('./dashboard/pages/AuthCallback'));
const AuPairDashboard = lazy(() => import('./dashboard/pages/aupair/AuPairDashboard'));
const FamilyDashboard = lazy(() => import('./dashboard/pages/family/FamilyDashboard'));
const AdminDashboard = lazy(() => import('./dashboard/pages/admin/AdminDashboard'));

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>Chargement...</div>}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLogin />} />
          <Route path="/dashboard/inscription" element={<DashboardSignup />} />
          <Route path="/dashboard/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard/bienvenue"
            element={
              <SessionGate>
                <RoleOnboarding />
              </SessionGate>
            }
          />
          <Route
            path="/dashboard/aupair/*"
            element={
              <ProtectedRoute role="aupair">
                <AuPairDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/family/*"
            element={
              <ProtectedRoute role="family">
                <FamilyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="app-shell">
      <CookieBanner />
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/au-pair" element={<AuPairForm />} />
          <Route path="/famille" element={<FamilyForm />} />
          <Route path="/calendrier" element={<BookingCalendar />} />
          <Route path="/success" element={<Success />} />
          <Route path="/tarifs-famille" element={<PricingFamily />} />
          <Route path="/tarifs-au-pair" element={<PricingAuPair />} />
          <Route path="/services" element={<Services />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/programme" element={<Program />} />
          <Route path="/mentions-legales" element={<LegalMentions />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/politique-cookies" element={<CookiePolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/jeunes-au-pair/familles" element={<FamilyArchives />} />
          <Route path="/jeunes-au-pair/familles/:id" element={<FamilyDetail />} />
          <Route path="/familles-d-accueil/au-pairs" element={<AuPairArchives />} />
          <Route path="/familles-d-accueil/au-pairs/:id" element={<AuPairDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
