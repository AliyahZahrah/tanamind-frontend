import { apiClient } from './client';

export interface PlantingData {
  id: string;
  userId: string;
  tanaman: 'TOMAT' | 'CABAI' | 'SELADA';
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  diagnosisCount: number;
  lastDiagnosisDate: string | null;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

interface SinglePlantingApiResponse {
  status: number;
  data: PlantingData;
  message: string;
}

interface MultiplePlantingsApiResponse {
  status: number;
  data: PlantingData[];
  message: string;
}

export const plantingApi = {
  startPlanting: async (
    userId: string,
    tanaman: 'TOMAT' | 'CABAI' | 'SELADA'
  ): Promise<PlantingData> => {
    try {
      const response = await apiClient.post<SinglePlantingApiResponse>(
        '/planting/start',
        { userId, tanaman }
      );
      if (response.data.status === 201) {
        return response.data.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Gagal memulai penanaman',
        } as ApiError;
      }
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message:
          'Terjadi kesalahan jaringan atau server saat memulai penanaman',
      } as ApiError;
    }
  },

  getUserPlantings: async (userId: string): Promise<PlantingData[]> => {
    try {
      const response = await apiClient.get<MultiplePlantingsApiResponse>(
        `/planting/${userId}`
      );
      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Gagal mengambil daftar penanaman',
        } as ApiError;
      }
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message:
          'Terjadi kesalahan jaringan atau server saat mengambil daftar penanaman',
      } as ApiError;
    }
  },

  completePlanting: async (id: string): Promise<PlantingData> => {
    try {
      const response = await apiClient.patch<SinglePlantingApiResponse>(
        `/planting/${id}/complete`
      );
      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Gagal menyelesaikan penanaman',
        } as ApiError;
      }
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message:
          'Terjadi kesalahan jaringan atau server saat menyelesaikan penanaman',
      } as ApiError;
    }
  },
};
