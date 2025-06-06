import { apiClient } from './client';

export interface DailyForecast {
  date: string;
  temp: number;
  weather: string;
  icon: string;
}

export type WeatherData = DailyForecast[];

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

interface WeatherApiResponse {
  status: number;
  data: WeatherData;
  message: string;
}

export const weatherApi = {
  getWeatherForecastByCoords: async (
    lat: number,
    lon: number
  ): Promise<WeatherData> => {
    try {
      const response = await apiClient.get<WeatherApiResponse>('/weather', {
        params: { lat, lon },
      });

      console.log(response);

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw {
          success: false,
          message:
            response.data.message || 'Gagal mengambil data prakiraan cuaca',
        } as ApiError;
      }
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        message:
          'Terjadi kesalahan jaringan atau server saat mengambil data prakiraan cuaca',
      } as ApiError;
    }
  },
};
