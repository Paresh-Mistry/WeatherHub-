import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2, Plus, Search, MapPin, Thermometer, Droplets, Wind, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useWeatherByCity } from '../hooks/useWeather';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherUtils';
import { Loading } from '../components/Loading';

const FAVORITES_KEY = 'weather-favorites';

interface FavoriteCityProps {
  city: string;
  onRemove: () => void;
  onNavigate: () => void;
}

function FavoriteCity({ city, onRemove, onNavigate }: FavoriteCityProps) {
  const { data, isLoading } = useWeatherByCity(city);
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return (
        <Loading/>
    );
  }

  if (!data) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-red-700 dark:text-red-400 font-semibold text-lg">
              Unable to load {city}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              Remove from Favorites
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const icon = getWeatherIcon(data.current.condition);
  const gradient = getWeatherGradient(data.current.condition);

  return (
    <Card 
      className="group cursor-pointer border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
      onClick={onNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Header */}
      <div className={`bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Floating Orb */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        {/* Favorite Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
            <Heart className="h-4 w-4 fill-white text-white" />
          </div>
        </div>
        
        <div className="relative z-10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-2">
                <MapPin className="h-3 w-3" />
                <span>Favorite Location</span>
              </div>
              <h3 className="font-black text-2xl tracking-tight leading-tight">
                {data.location.city}
              </h3>
              <p className="text-sm font-semibold text-white/90 mt-1">
                {data.location.country}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className={`
                text-white hover:bg-red-500/20 h-10 w-10 rounded-xl transition-all duration-200
                ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
              `}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-end justify-between mt-6">
            <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <div className="text-right">
              <div className="text-5xl font-black tracking-tighter leading-none">
                {Math.round(data.current.tempC)}°
              </div>
              <p className="text-sm font-semibold text-white/90 mt-2">
                {data.current.condition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <CardContent className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Thermometer className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">
              Feels
            </p>
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              {Math.round(data.current.feelsLikeC)}°
            </p>
          </div>
          
          <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">
              Humidity
            </p>
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              {data.current.humidity}%
            </p>
          </div>
          
          <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                <Wind className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">
              Wind
            </p>
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              {data.current.windKph.toFixed(0)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const handleAddFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity.trim() && !favorites.includes(newCity.trim())) {
      setFavorites([...favorites, newCity.trim()]);
      setNewCity('');
    }
  };

  const handleRemoveFavorite = (city: string) => {
    setFavorites(favorites.filter(fav => fav !== city));
  };

  return (
    <div className="min-h-screen  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl shadow-xl">
                <Heart className="h-10 w-10 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
                  Favorite Cities
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mt-2">
                  Quick access to your most visited cities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Favorite Form */}
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl overflow-hidden">
         
          
          <CardContent className="pt-6 pb-6">
            <form onSubmit={handleAddFavorite} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Enter city name to add to favorites..."
                  className="
                    w-full pl-12 pr-4 py-4 
                    bg-gray-50 dark:bg-gray-900 
                    border-2 border-gray-200 dark:border-gray-700
                    rounded-2xl
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                    transition-all duration-200
                    font-medium
                  "
                />
              </div>
              <Button 
                type="submit" 
                disabled={!newCity.trim()}
                className="
                  px-8 py-4 h-auto
                  bg-gradient-to-r from-red-500 to-pink-500 
                  hover:from-red-600 hover:to-pink-600
                  text-white font-bold
                  rounded-2xl
                  shadow-lg hover:shadow-xl
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:scale-105
                "
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Favorite
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
            <CardContent className="p-16 text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
                    <Heart className="h-16 w-16 text-red-400 dark:text-red-500" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Star className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                    No Favorites Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    Add cities above to quickly access their weather information.
                    Your favorites will appear here!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Favorites Count Badge */}
            <div className="flex items-center gap-3">
              <div className="px-5 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg">
                <span className="text-sm font-bold text-white">
                  {favorites.length} {favorites.length === 1 ? 'Favorite' : 'Favorites'}
                </span>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((city) => (
                <FavoriteCity
                  key={city}    
                  city={city}
                  onRemove={() => handleRemoveFavorite(city)}
                  onNavigate={() => navigate(`/weather/${encodeURIComponent(city)}`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}