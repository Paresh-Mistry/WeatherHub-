import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useWeatherDataByCity } from '../hooks/useWeather';
import { WeatherCard } from '../components/weatherCard';
import { Button } from '../components/ui/button';
import { Forecast } from '../components/Forecast';
import { ErrorMessage } from '../components/ErrorMessage';

export function WeatherPage() {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const { weather, forecast, isLoading, isError, error, refetch } = 
    useWeatherDataByCity(city || '');

  if (!city) {
    return (
      <ErrorMessage 
        message="No city specified" 
        onRetry={() => navigate('/')} 
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {weather && (
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>

      {/* Content */}
      {isLoading && "Loading.."}

      {!isLoading && !isError && weather && (
        <div className="space-y-6">
          <WeatherCard data={weather} />
          {forecast && <Forecast data={forecast} />}
        </div>
      )}
    </div>
  );
}