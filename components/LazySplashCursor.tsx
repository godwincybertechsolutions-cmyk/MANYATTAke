import React, { lazy, Suspense, useEffect, useState } from 'react';

const SplashCursor = lazy(() => import('./SplashCursor'));

function shouldEnableSplash(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  if (window.innerWidth < 1024) return false;
  return true;
}

/** Defers heavy WebGL cursor until after first paint; off on mobile & reduced-motion */
const LazySplashCursor: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!shouldEnableSplash()) return;

    const enable = () => setShow(true);

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(enable, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }

    const t = window.setTimeout(enable, 2000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <Suspense fallback={null}>
      <SplashCursor />
    </Suspense>
  );
};

export default LazySplashCursor;
