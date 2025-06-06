'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, type ApiError } from '../lib/api/auth';
import type { RegisterFormData, LoginFormData } from '../lib/validation/auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.register(data);

      if (response.success) {
        navigate('/login');
        window.dispatchEvent(new Event('storage'));
        return response;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(data);

      if (response.success) {
        navigate('/');
        window.dispatchEvent(new Event('storage'));
        return response;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(
        apiError.message ||
          'Login failed. Please check your credentials and try again.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.dispatchEvent(new Event('storage'));
      navigate('/login');
      setIsLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
