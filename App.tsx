import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LazySplashCursor from './components/LazySplashCursor';
import RouteSkeleton from './components/RouteSkeleton';
import { prefetchCommonRoutes } from './utils/routePrefetch';

const Home = React.lazy(() => import('./pages/Home'));
const MountainVillas = React.lazy(() => import('./pages/MountainVillas'));
const Safaris = React.lazy(() => import('./pages/Safaris'));
const UrbanApartments = React.lazy(() => import('./pages/UrbanApartments'));
const Others = React.lazy(() => import('./pages/Others'));
const Booking = React.lazy(() => import('./pages/Booking'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    const schedulePrefetch = () => prefetchCommonRoutes();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(schedulePrefetch, { timeout: 2500 });
    } else {
      setTimeout(schedulePrefetch, 1200);
    }

    let cleanup: (() => void) | undefined;
    if (import.meta.env.DEV) {
      import('./services/webVitalsMonitor').then(({ default: webVitalsMonitor }) => {
        webVitalsMonitor.onReport((report) => {
          console.log('[Web Vitals Report]', report);
        });
        const handleBeforeUnload = () => webVitalsMonitor.sendReport();
        window.addEventListener('beforeunload', handleBeforeUnload);
        cleanup = () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          webVitalsMonitor.destroy();
        };
      });
    }

    return () => cleanup?.();
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <LazySplashCursor />
          <ScrollToTop />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
          >
            Skip to main content
          </a>
          <div className="flex flex-col min-h-screen bg-white font-sans text-dark selection:bg-primary selection:text-white">
            <Navbar />
            <main id="main-content" className="flex-grow pt-24" role="main">
              <Suspense fallback={<RouteSkeleton />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/mountain-villas" element={<MountainVillas />} />
                  <Route path="/safaris" element={<Safaris />} />
                  <Route path="/urban-apartments" element={<UrbanApartments />} />
                  <Route path="/others" element={<Others />} />
                  <Route path="/booking" element={<Booking />} />
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
