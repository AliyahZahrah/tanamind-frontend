'use client';

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../lib/api/auth';

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isOAuthCallback = location.pathname === '/callback-google';

    if (isOAuthCallback) {
      const handleCallback = async () => {
        try {
          const loadingToast = toast.loading('Completing Google sign-in...');

          const result = await authApi.handleOAuthCallback();

          toast.dismiss(loadingToast);
          toast.success('Login successful!');

          window.dispatchEvent(new Event('authChange'));

          navigate('/');
        } catch (error: any) {
          toast.error(error.message || 'Google login failed.');
          navigate('/login');
        }
      };

      handleCallback();
    }
  }, [location]);

  const initiateGoogleLogin = () => {
    try {
      console.log('🚀 Initiating Google login...');
      toast.info('Redirecting to Google...');
      authApi.loginWithGoogle();
    } catch (error) {
      console.error('Failed to initiate Google login:', error);
      toast.error('Failed to start Google login. Please try again.');
    }
  };

  return {
    initiateGoogleLogin,
  };
};
