import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { WeatherCard } from '../components/weatherCard';
import { Forecast } from '../components/Forecast';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useWeatherDataByCoordinates } from '../hooks/useWeather';

export function LocationWeatherPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const { weather, forecast, isLoading, isError, error, refetch } = 
    useWeatherDataByCoordinates(
      lat ? parseFloat(lat) : null,
      lon ? parseFloat(lon) : null
    );

  if (!lat || !lon) {
    return (
      <ErrorMessage 
        message="Invalid location coordinates" 
        onRetry={() => navigate('/')} 
      />
    );
  }

  return (
    <div className="space-y-6">
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

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Your Location
        </div>
      </div>

      {/* Content */}
      {isLoading && <Loading />}

      {isError && error && (
        <ErrorMessage message={error.message} onRetry={() => refetch()} />
      )}

      {!isLoading && !isError && weather && (
        <div className="space-y-6">
          <WeatherCard data={weather} />
          {forecast && <Forecast data={forecast} />}
        </div>
      )}
    </div>
  );
}