import { apiClient } from './client';
import type { RegisterFormData, LoginFormData } from '../validation/auth';
import { jwtDecode } from 'jwt-decode';

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

interface JwtPayload {
  email: string;
  name?: string;
  userId?: string;
  exp?: number;
  iat?: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const authApi = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/signup', {
        email: data.email,
        name: data.name,
        password: data.password,
        repassword: data.repassword,
      });

      return {
        success: response.data.status === 200,
        message: response.data.message,
        data: {
          token: response.data.data.token,
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

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', data);
      const resData = response.data;

      if (resData.status === 200 && resData.data.token) {
        localStorage.setItem('auth_token', resData.data.token);
        localStorage.setItem(
          'user_data',
          JSON.stringify({
            id: resData.data.userId,
            email: resData.data.email,
            name: resData.data.name,
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
              name: resData.data.name,
              createdAt: '',
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

  // Google OAuth login - redirect to backend OAuth endpoint
  loginWithGoogle: () => {
    console.log('🔗 Redirecting to Google OAuth...');
    const backendUrl =
      import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000';
    window.location.href = `${backendUrl}/auth/google`;
  },

  handleOAuthCallback: (): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          return reject({
            success: false,
            message: 'Missing token in callback URL',
          });
        }

        const decoded = jwtDecode<JwtPayload>(token);

        const user = {
          id: decoded.userId || '',
          email: decoded.email,
          name: decoded.name || '',
          createdAt: '',
        };

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        resolve({
          success: true,
          message: 'Google login successful',
          data: { token, user },
        });
      } catch (err) {
        reject({
          success: false,
          message: 'Failed to process OAuth callback',
        });
      }
    });
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },
};
