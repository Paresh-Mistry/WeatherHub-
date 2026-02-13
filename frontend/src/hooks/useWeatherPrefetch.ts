import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { weatherKeys, weatherService } from '../services/weatherService';

/**
 * Hook for prefetching weather data
 * Useful for optimistic data loading (e.g., on hover)
 */
export const useWeatherPrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchWeatherByCity = useCallback(
    async (city: string) => {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: weatherKeys.weatherByCity(city),
          queryFn: () => weatherService.getWeatherByCity(city),
          staleTime: 5 * 60 * 1000, // 5 minutes
        }),
        queryClient.prefetchQuery({
          queryKey: weatherKeys.forecastByCity(city),
          queryFn: () => weatherService.getForecastByCity(city),
          staleTime: 5 * 60 * 1000,
        }),
      ]);
    },
    [queryClient]
  );

  const prefetchWeatherByCoordinates = useCallback(
    async (lat: number, lon: number) => {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: weatherKeys.weatherByCoords(lat, lon),
          queryFn: () => weatherService.getWeatherByCoordinates(lat, lon),
          staleTime: 5 * 60 * 1000,
        }),
        queryClient.prefetchQuery({
          queryKey: weatherKeys.forecastByCoords(lat, lon),
          queryFn: () => weatherService.getForecastByCoordinates(lat, lon),
          staleTime: 5 * 60 * 1000,
        }),
      ]);
    },
    [queryClient]
  );

  return {
    prefetchWeatherByCity,
    prefetchWeatherByCoordinates,
  };
};