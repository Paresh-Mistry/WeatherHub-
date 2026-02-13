/**
 * Utility functions for weather data formatting and display
 */

/**
 * Format date/time for display
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format time only
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format date for forecast
 */
export const formatForecastDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return formatTime(dateString);
  }
  
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get weather icon emoji based on condition
 */
export const getWeatherIcon = (condition: string): string => {
  const iconMap: Record<string, string> = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️',
    Smoke: '🌫️',
    Dust: '🌫️',
    Sand: '🌫️',
    Ash: '🌋',
    Squall: '💨',
    Tornado: '🌪️',
  };

  return iconMap[condition] || '🌤️';
};

/**
 * Get background gradient based on condition
 */
export const getWeatherGradient = (condition: string): string => {
  const gradientMap: Record<string, string> = {
    Clear: 'from-blue-400 to-blue-600',
    Clouds: 'from-gray-400 to-gray-600',
    Rain: 'from-blue-700 to-gray-700',
    Drizzle: 'from-blue-500 to-gray-500',
    Thunderstorm: 'from-purple-700 to-gray-900',
    Snow: 'from-blue-200 to-blue-400',
    Mist: 'from-gray-300 to-gray-500',
    Fog: 'from-gray-300 to-gray-500',
    Haze: 'from-yellow-300 to-gray-400',
  };

  return gradientMap[condition] || 'from-blue-500 to-purple-600';
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Get geolocation from browser
 */
export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let message = 'Unable to retrieve location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timeout';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Get temperature color based on value
 */
export const getTemperatureColor = (tempC: number): string => {
  if (tempC < 0) return 'text-blue-600';
  if (tempC < 10) return 'text-blue-500';
  if (tempC < 20) return 'text-green-500';
  if (tempC < 30) return 'text-yellow-500';
  return 'text-red-500';
};

/**
 * Get humidity level description
 */
export const getHumidityLevel = (humidity: number): string => {
  if (humidity < 30) return 'Low';
  if (humidity < 60) return 'Moderate';
  if (humidity < 80) return 'High';
  return 'Very High';
};

/**
 * Get wind speed description
 */
export const getWindSpeedDescription = (windKph: number): string => {
  if (windKph < 5) return 'Calm';
  if (windKph < 20) return 'Light';
  if (windKph < 40) return 'Moderate';
  if (windKph < 60) return 'Strong';
  return 'Very Strong';
};