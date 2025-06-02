import { apiClient } from './client';

export interface DiseaseData {
  id: string;
  label: string;
  name: string;
  image: string;
  penyebab: string;
  deskripsi: string;
  pencegahan: string[];
  pengendalian: string[];
  tanaman: 'TOMAT' | 'SELADA' | 'CABAI';
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

interface DiseasesApiResponse {
  status: number;
  data: DiseaseData[];
  message: string;
}

interface SingleDiseaseApiResponse {
  status: number;
  data: DiseaseData;
  message: string;
}

export const diseaseApi = {
  getDiseases: async (): Promise<DiseaseData[]> => {
    try {
      const response = await apiClient.get<DiseasesApiResponse>('/diseases');
      if (response.data.status === 200) {
        console.log(response);
        return response.data.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Failed to fetch diseases',
        } as ApiError;
      }
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message:
          'Terjadi kesalahan jaringan atau server saat mengambil daftar penyakit',
      } as ApiError;
    }
  },

  getDiseaseById: async (id: string): Promise<DiseaseData> => {
    try {
      const response = await apiClient.get<SingleDiseaseApiResponse>(
        `/diseases/${id}`
      );
      console.log('Response dari API getDiseaseById:', response.data);

      if (response.data.status === 200 && response.data.data) {
        return response.data.data; // ← langsung return
      } else {
        throw {
          success: false,
          message: response.data.message || `Disease with ID ${id} not found`,
        } as ApiError;
      }
    } catch (error: any) {
      console.error('Error in getDiseaseById:', error);
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message: `Terjadi kesalahan jaringan atau server saat mengambil detail penyakit dengan ID ${id}`,
      } as ApiError;
    }
  },
};
