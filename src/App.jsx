import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import CookieBanner from './components/CookieBanner';


function App() {
  return (
    <Router>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
