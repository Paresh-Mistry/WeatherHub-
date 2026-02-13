import axios, { AxiosError } from 'axios';
import type { WeatherResponse, ForecastResponse } from '../types/weather';


const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom error class
export class WeatherAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public detail?: string 
  ) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

// Error handler
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ detail: string }>;
    const message = axiosError.response?.data?.detail || axiosError.message;
    const statusCode = axiosError.response?.status;
    throw new WeatherAPIError(message, statusCode, message);
  }
  throw new WeatherAPIError('An unexpected error occurred');
};

// Query Keys - Centralized for cache management
export const weatherKeys = {
  all: ['weather'] as const,
  
  // Weather queries
  weather: () => [...weatherKeys.all, 'current'] as const,
  weatherByCity: (city: string) => 
    [...weatherKeys.weather(), 'city', city] as const,
  weatherByCoords: (lat: number, lon: number) => 
    [...weatherKeys.weather(), 'coords', { lat, lon }] as const,
  
  // Forecast queries
  forecast: () => [...weatherKeys.all, 'forecast'] as const,
  forecastByCity: (city: string) => 
    [...weatherKeys.forecast(), 'city', city] as const,
  forecastByCoords: (lat: number, lon: number) => 
    [...weatherKeys.forecast(), 'coords', { lat, lon }] as const,
};

// Weather Service - All API calls
export const weatherService = {
  /**
   * Get current weather by city name
   */
  getWeatherByCity: async (city: string): Promise<WeatherResponse> => {
    try {
      const response = await apiClient.get<WeatherResponse>('/api/weather', {
        params: { city },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get current weather by coordinates
   */
  getWeatherByCoordinates: async (
    lat: number,
    lon: number
  ): Promise<WeatherResponse> => {
    try {
      const response = await apiClient.get<WeatherResponse>('/api/weather', {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get weather forecast by city name
   */
  getForecastByCity: async (city: string): Promise<ForecastResponse> => {
    try {
      const response = await apiClient.get<ForecastResponse>('/api/forecast', {
        params: { city },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get weather forecast by coordinates
   */
  getForecastByCoordinates: async (
    lat: number,
    lon: number
  ): Promise<ForecastResponse> => {
    try {
      const response = await apiClient.get<ForecastResponse>('/api/forecast', {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get both weather and forecast by city
   */
  getWeatherDataByCity: async (city: string) => {
    const [weather, forecast] = await Promise.all([
      weatherService.getWeatherByCity(city),
      weatherService.getForecastByCity(city),
    ]);
    return { weather, forecast };
  },

  /**
   * Get both weather and forecast by coordinates
   */
  getWeatherDataByCoordinates: async (lat: number, lon: number) => {
    const [weather, forecast] = await Promise.all([
      weatherService.getWeatherByCoordinates(lat, lon),
      weatherService.getForecastByCoordinates(lat, lon),
    ]);
    return { weather, forecast };
  },

  /**
   * Health check
   */
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    try {
      const response = await apiClient.get('/api/health');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};