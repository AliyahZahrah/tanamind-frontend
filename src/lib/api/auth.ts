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
      const response = await apiClient.post('/auth/signup', {
        email: data.email,
        name: data.name,
        password: data.password,
        repassword: data.repassword,
      });

      // ❌ Jangan simpan token di sini
      return {
        success: response.data.status === 200,
        message: response.data.message,
        data: {
          token: response.data.data.token, // tetap kirimkan token kalau kamu butuh validasi manual
          user: {
            id: response.data.data.userId,
            email: response.data.data.email,
            name: '',
            createdAt: '',
          },
        },
      };
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
      const response = await apiClient.post('/auth/login', data);
      const resData = response.data;

      if (resData.status === 200 && resData.data.token) {
        // Simpan token dan user data
        localStorage.setItem('auth_token', resData.data.token);
        localStorage.setItem(
          'user_data',
          JSON.stringify({
            id: resData.data.userId,
            email: resData.data.email,
          })
        );

        return {
          success: true,
          message: resData.message,
          data: {
            token: resData.data.token,
            user: {
              id: resData.data.userId,
              email: resData.data.email,
              name: '', // ← tidak tersedia, kosongkan saja atau fetch nanti
              createdAt: '', // ← tidak tersedia
            },
          },
        };
      }

      throw {
        success: false,
        message: resData.message || 'Login failed',
      };
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: 'Network error. Please try again.',
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
