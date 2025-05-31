import React from 'react';
import { useUser } from '../hooks/use-user';
import AuthRequiredPage from '../pages/auth/AuthRequiredPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
        <p className="ml-4 text-lg text-gray-700">Memeriksa status login...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthRequiredPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
