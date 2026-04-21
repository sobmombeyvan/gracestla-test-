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


function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
