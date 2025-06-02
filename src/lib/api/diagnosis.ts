import type { DiseaseData } from './disease';
import { apiClient } from './client';

export interface PredictionData {
  tanaman: string;
  confidence: number;
  disease: DiseaseData | null;
}

export interface DiagnosisApiResponse {
  status: number;
  data: PredictionData;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const diagnosisApi = {
  predict: async (
    tanaman: string,
    file: File
  ): Promise<DiagnosisApiResponse> => {
    const formData = new FormData();
    formData.append('tanaman', tanaman);
    formData.append('file', file);

    try {
      const response = await apiClient.post<DiagnosisApiResponse>(
        '/detection/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
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
