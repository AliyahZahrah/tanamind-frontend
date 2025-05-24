import { apiClient } from './client';
import type { RegisterFormData, LoginFormData } from '../validation/auth';

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: string;
    };
    token: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const authApi = {
  // Register new user
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signup', {
        email: data.email,
        name: data.name,
        password: data.password,
        repassword: data.repassword,
      });

      // Store token and user data
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem(
          'user_data',
          JSON.stringify(response.data.data.user)
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      } as ApiError;
    }
  },

  // Login user
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', data);

      // Store token and user data
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem(
          'user_data',
          JSON.stringify(response.data.data.user)
        );
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      } as ApiError;
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: 'Failed to fetch user profile',
      } as ApiError;
    }
  },
};
