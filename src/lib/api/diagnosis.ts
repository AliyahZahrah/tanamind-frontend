import { apiClient } from './client';

export interface DiagnosisResponse {
  tanaman: string;
  hasil: string;
  confidence: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const diagnosisApi = {
  predict: async (tanaman: string, file: File): Promise<DiagnosisResponse> => {
    const formData = new FormData();
    formData.append('tanaman', tanaman);
    formData.append('file', file);

    try {
      const response = await apiClient.post('/detection/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data as DiagnosisResponse;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: 'Terjadi kesalahan jaringan atau server',
      } as ApiError;
    }
  },
};
