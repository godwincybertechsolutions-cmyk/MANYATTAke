import React, { useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SplashCursor from './components/SplashCursor';
import PageLoader from './components/PageLoader';

// Lazy load page components for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const MountainVillas = React.lazy(() => import('./pages/MountainVillas'));
const Safaris = React.lazy(() => import('./pages/Safaris'));
const UrbanApartments = React.lazy(() => import('./pages/UrbanApartments'));
const Others = React.lazy(() => import('./pages/Others'));
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
      <HelmetProvider>
        <Router>
          <SplashCursor />
          <ScrollToTop />
          {/* Skip to main content link for keyboard users */}
          <a 
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
          >
            Skip to main content
          </a>
          <div className="flex flex-col min-h-screen bg-white font-sans text-dark selection:bg-primary selection:text-white">
            <Navbar />
            <main 
              id="main-content"
              className="flex-grow pt-24"
              role="main"
            >
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/mountain-villas" element={<MountainVillas />} />
                  <Route path="/safaris" element={<Safaris />} />
                  <Route path="/urban-apartments" element={<UrbanApartments />} />
                  <Route path="/others" element={<Others />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;