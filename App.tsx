import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import MountainVillas from './pages/MountainVillas';
import Safaris from './pages/Safaris';
import UrbanApartments from './pages/UrbanApartments';
import Others from './pages/Others';
// import Auth from './pages/Auth';
// import { AuthProvider } from './src/auth/AuthContext';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white font-sans text-dark selection:bg-primary selection:text-white">
          <Navbar />
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mountain-villas" element={<MountainVillas />} />
              <Route path="/safaris" element={<Safaris />} />
              <Route path="/urban-apartments" element={<UrbanApartments />} />
              <Route path="/others" element={<Others />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;