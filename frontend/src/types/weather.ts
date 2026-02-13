interface Location {
  city: string;
  country: string;
}

interface CurrentWeather {
  tempC: number;
  feelsLikeC: number;
  condition: string;
  humidity: number;
  windKph: number;
  updatedAt: string;
}

interface WeatherResponse {
  location: Location;
  current: CurrentWeather;
}

interface ForecastItem {
  time: string;
  tempC: number;
  condition: string;
  humidity: number;
  windKph: number;
}

interface ForecastResponse {
  location: Location;
  forecast: ForecastItem[];
}

interface ErrorResponse {
  detail: string;
}

export type {
  Location,
  CurrentWeather,
  WeatherResponse,
  ForecastItem,
  ForecastResponse,
  ErrorResponse,
};
