const routeImports: Record<string, () => Promise<unknown>> = {
  '/': () => import('../pages/Home'),
  '/mountain-villas': () => import('../pages/MountainVillas'),
  '/safaris': () => import('../pages/Safaris'),
  '/urban-apartments': () => import('../pages/UrbanApartments'),
  '/others': () => import('../pages/Others'),
  '/auth': () => import('../pages/Auth'),
  '/booking': () => import('../pages/Booking'),
  '/profile': () => import('../pages/Profile'),
};

const prefetched = new Set<string>();

export function prefetchRoute(path: string): void {
  const normalized = path.split('?')[0] || '/';
  const loader = routeImports[normalized];
  if (!loader || prefetched.has(normalized)) return;
  prefetched.add(normalized);
  loader().catch(() => prefetched.delete(normalized));
}

export function prefetchCommonRoutes(): void {
  prefetchRoute('/');
  prefetchRoute('/mountain-villas');
  prefetchRoute('/safaris');
  prefetchRoute('/urban-apartments');
}
