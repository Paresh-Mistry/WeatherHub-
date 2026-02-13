import { useState, useCallback } from 'react';

interface GeolocationState {
  lat: number | null;
  lon: number | null;
  error: string | null;
  loading: boolean;
}

/**
 * Custom hook to manage browser geolocation
 */
export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lon: null,
    error: null,
    loading: false,
  });

  const getCurrentPosition = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        lat: null,
        lon: null,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      });
      return null;
    }

    return new Promise<{ lat: number; lon: number } | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setState({
            ...coords,
            error: null,
            loading: false,
          });
          resolve(coords);
        },
        (error) => {
          let message = 'Unable to retrieve location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location permission denied. Please enable location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              message = 'Location request timeout';
              break;
          }
          setState({
            lat: null,
            lon: null,
            error: message,
            loading: false,
          });
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      lat: null,
      lon: null,
      error: null,
      loading: false,
    });
  }, []);

  return {
    ...state,
    getCurrentPosition,
    reset,
    hasLocation: state.lat !== null && state.lon !== null,
  };
};