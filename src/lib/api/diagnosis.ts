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

export interface SavedDiagnosisData {
  id: string;
  userId: string;
  tanaman: 'TOMAT' | 'CABAI' | 'SELADA';
  confidence: number;
  imageUrl: string;
  createdAt: string;
  diseaseId: string;
  disease: {
    id: string;
    name: string;
    label: string;
    penyebab: string;
    deskripsi: string;
    pencegahan: string[];
    pengendalian: string[];
    tanaman: 'TOMAT' | 'SELADA' | 'CABAI';
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

interface MultipleDiagnosesApiResponse {
  status: number;
  data: SavedDiagnosisData[];
  message: string;
}

interface SingleDiagnosisSaveResponse {
  status: number;
  data: SavedDiagnosisData;
  message: string;
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

  saveDiagnosisResult: async (
    userId: string,
    tanaman: 'TOMAT' | 'CABAI' | 'SELADA',
    hasil: string,
    confidence: number,
    file: File
  ): Promise<SavedDiagnosisData> => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('tanaman', tanaman);
    formData.append('hasil', hasil);
    formData.append('confidence', confidence.toString());
    formData.append('file', file);

    try {
      const response = await apiClient.post<SingleDiagnosisSaveResponse>(
        '/detection/save',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.status === 201) {
        return response.data.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Gagal menyimpan diagnosis',
        } as ApiError;
      }
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message:
          'Terjadi kesalahan jaringan atau server saat menyimpan diagnosis',
      } as ApiError;
    }
  },

  getDiagnosisHistoryByUser: async (
    userId: string
  ): Promise<SavedDiagnosisData[]> => {
    try {
      const response = await apiClient.get<MultipleDiagnosesApiResponse>(
        `/detection/history/${userId}`
      );
      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Gagal mengambil riwayat diagnosis',
        } as ApiError;
      }
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message:
          'Terjadi kesalahan jaringan atau server saat mengambil riwayat diagnosis',
      } as ApiError;
    }
  },
};
