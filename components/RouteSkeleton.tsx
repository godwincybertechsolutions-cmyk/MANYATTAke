import React from 'react';

/** Lightweight in-layout placeholder — avoids full-screen loader + framer-motion */
const RouteSkeleton: React.FC = () => (
  <div className="route-skeleton w-full py-12 px-4 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading page">
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="skeleton-bar h-10 w-2/3 max-w-md mx-auto" />
      <div className="skeleton-bar h-4 w-1/2 max-w-sm mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="skeleton-bar h-48 w-full rounded-none" />
            <div className="p-6 space-y-3">
              <div className="skeleton-bar h-5 w-3/4" />
              <div className="skeleton-bar h-4 w-full" />
              <div className="skeleton-bar h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RouteSkeleton;
