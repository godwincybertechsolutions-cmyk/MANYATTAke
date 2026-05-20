import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../src/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24" aria-busy="true">
        <div
          className="w-8 h-8 border-2 border-gray-200 border-t-primary rounded-full animate-spin"
          role="status"
          aria-label="Checking sign-in"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/auth" replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
