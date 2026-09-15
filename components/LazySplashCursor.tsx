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

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let activated = false;

    const enable = () => {
      if (activated) return;
      activated = true;
      setShow(true);
    };

    const handlePointerMove = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if ('requestIdleCallback' in window) {
        idleId = requestIdleCallback(enable, { timeout: 5000 });
      } else {
        timeoutId = window.setTimeout(enable, 3000);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { once: true, passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (idleId !== undefined) cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!show) return null;

  return (
    <Suspense fallback={null}>
      <SplashCursor />
    </Suspense>
  );
};

export default LazySplashCursor;
