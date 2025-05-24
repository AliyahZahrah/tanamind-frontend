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
        // Registration successful, redirect to dashboard or plant guide
        navigate('/plant-guide');
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
        // Login successful, redirect to dashboard
        navigate('/plant-guide');
        return response;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await authApi.logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
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
