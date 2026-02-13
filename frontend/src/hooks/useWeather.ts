import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { weatherService, weatherKeys, WeatherAPIError } from '../services/weatherService';
import type { WeatherResponse, ForecastResponse } from '../types/weather';

/**
 * Hook to fetch current weather by city
 */
export const useWeatherByCity = (
    city: string,
    options?: Omit<
        UseQueryOptions<WeatherResponse, WeatherAPIError>,
        'queryKey' | 'queryFn'
    >
) => {
    return useQuery<WeatherResponse, WeatherAPIError>({
        queryKey: weatherKeys.weatherByCity(city),
        queryFn: () => weatherService.getWeatherByCity(city),
        enabled: !!city && city.trim().length > 0,
        ...options,
    });
};

/**
 * Hook to fetch current weather by coordinates
 */
export const useWeatherByCoordinates = (
    lat: number | null,
    lon: number | null,
    options?: Omit<
        UseQueryOptions<WeatherResponse, WeatherAPIError>,
        'queryKey' | 'queryFn'
    >
) => {
    return useQuery<WeatherResponse, WeatherAPIError>({
        queryKey: lat !== null && lon !== null
            ? weatherKeys.weatherByCoords(lat, lon)
            : ['weather', 'disabled'],
        queryFn: () => {
            if (lat === null || lon === null) {
                throw new Error('Coordinates are required');
            }
            return weatherService.getWeatherByCoordinates(lat, lon);
        },
        enabled: lat !== null && lon !== null,
        ...options,
    });
};

/**
 * Hook to fetch forecast by city
 */
export const useForecastByCity = (
    city: string,
    options?: Omit<
        UseQueryOptions<ForecastResponse, WeatherAPIError>,
        'queryKey' | 'queryFn'
    >
) => {
    return useQuery<ForecastResponse, WeatherAPIError>({
        queryKey: weatherKeys.forecastByCity(city),
        queryFn: () => weatherService.getForecastByCity(city),
        enabled: !!city && city.trim().length > 0,
        ...options,
    });
};

/**
 * Hook to fetch forecast by coordinates
 */
export const useForecastByCoordinates = (
    lat: number | null,
    lon: number | null,
    options?: Omit<
        UseQueryOptions<ForecastResponse, WeatherAPIError>,
        'queryKey' | 'queryFn'
    >
) => {
    return useQuery<ForecastResponse, WeatherAPIError>({
        queryKey: lat !== null && lon !== null
            ? weatherKeys.forecastByCoords(lat, lon)
            : ['forecast', 'disabled'],
        queryFn: () => {
            if (lat === null || lon === null) {
                throw new Error('Coordinates are required');
            }
            return weatherService.getForecastByCoordinates(lat, lon);
        },
        enabled: lat !== null && lon !== null,
        ...options,
    });
};

/**
 * Hook to fetch both weather and forecast by city
 * This is more efficient than calling two separate hooks
 */
export const useWeatherDataByCity = (city: string) => {
    const weatherQuery = useWeatherByCity(city);
    const forecastQuery = useForecastByCity(city);

    return {
        weather: weatherQuery.data,
        forecast: forecastQuery.data,
        isLoading: weatherQuery.isLoading || forecastQuery.isLoading,
        isError: weatherQuery.isError || forecastQuery.isError,
        error: weatherQuery.error || forecastQuery.error,
        isSuccess: weatherQuery.isSuccess && forecastQuery.isSuccess,
        refetch: () => {
            weatherQuery.refetch();
            forecastQuery.refetch();
        },
    };
};

/**
 * Hook to fetch both weather and forecast by coordinates
 */
export const useWeatherDataByCoordinates = (
    lat: number | null,
    lon: number | null
) => {
    const weatherQuery = useWeatherByCoordinates(lat, lon);
    const forecastQuery = useForecastByCoordinates(lat, lon);

    return {
        weather: weatherQuery.data,
        forecast: forecastQuery.data,
        isLoading: weatherQuery.isLoading || forecastQuery.isLoading,
        isError: weatherQuery.isError || forecastQuery.isError,
        error: weatherQuery.error || forecastQuery.error,
        isSuccess: weatherQuery.isSuccess && forecastQuery.isSuccess,
        refetch: () => {
            weatherQuery.refetch();
            forecastQuery.refetch();
        },
    };
};