import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Search, MapPin, Thermometer, Droplets, Wind } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useWeatherByCity } from '../hooks/useWeather';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherUtils';
import { Loading } from '../components/Loading';

interface CityWeatherProps {
    city: string;
    onRemove: () => void;
}

function CityWeatherCompact({ city, onRemove }: CityWeatherProps) {
    const { data, isLoading, isError } = useWeatherByCity(city);
    const [isHovered, setIsHovered] = useState(false);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (isError || !data) {
        return (
            <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 shadow-lg">
                <CardContent className="p-8 text-center">
                    <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <X className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <p className="text-red-700 dark:text-red-400 font-semibold">Error loading {city}</p>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onRemove}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                            Remove City
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
            className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

                {/* Floating Orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-2">
                                <MapPin className="h-3 w-3" />
                                <span>Location</span>
                            </div>
                            <h3 className="font-black text-2xl tracking-tight leading-tight">{data.location.city}</h3>
                            <p className="text-sm font-semibold text-white/90 mt-1">{data.location.country}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onRemove}
                            className={`
                text-white hover:bg-white/20 h-9 w-9 rounded-xl transition-all duration-200
                ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
              `}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-end justify-between mt-6">
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                            {icon}
                        </div>
                        <div className="text-right">
                            <div className="text-5xl font-black tracking-tighter leading-none">
                                {Math.round(data.current.tempC)}°
                            </div>
                            <p className="text-sm font-semibold text-white/90 mt-2">{data.current.condition}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <CardContent className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
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

                    <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
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

                    <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex justify-center mb-2">
                            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                                <Wind className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">
                            Wind
                        </p>
                        <p className="font-bold text-lg text-gray-900 dark:text-white">
                            {data.current.windKph.toFixed(1)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function ComparePage() {
    const navigate = useNavigate();
    const [cities, setCities] = useState<string[]>(['London', 'New York']);
    const [newCity, setNewCity] = useState('');

    const handleAddCity = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCity.trim() && !cities.includes(newCity.trim())) {
            setCities([...cities, newCity.trim()]);
            setNewCity('');
        }
    };

    const handleRemoveCity = (cityToRemove: string) => {
        setCities(cities.filter(city => city !== cityToRemove));
    };

    return (
        <div className="min-h-screen  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-all"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Button>

                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
                            Compare Cities
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl">
                            Compare weather conditions across multiple cities side by side
                        </p>
                    </div>
                </div>

                {/* Add City Form */}
                <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 overflow-hidden">

                    <CardContent className="pt-6 pb-6">
                        <form onSubmit={handleAddCity} className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={newCity}
                                    onChange={(e) => setNewCity(e.target.value)}
                                    placeholder="Enter city name (e.g., Tokyo, Paris, Mumbai)..."
                                    className="
                    w-full pl-12 pr-4 py-4 
                    bg-gray-50 dark:bg-gray-900 
                    border-2 border-gray-200 dark:border-gray-700
                    rounded-2xl
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
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
                  bg-gradient-to-r from-blue-500 to-indigo-500 
                  hover:from-blue-600 hover:to-indigo-600
                  text-white font-bold
                  rounded-2xl
                  shadow-lg hover:shadow-xl
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add City
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Cities Grid */}
                {cities.length === 0 ? (
                    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                        <CardContent className="p-16 text-center">
                            <div className="max-w-md mx-auto space-y-4">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                                    <MapPin className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    No Cities Added Yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Add cities above to start comparing weather conditions
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Cities Count Badge */}
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                                    {cities.length} {cities.length === 1 ? 'City' : 'Cities'}
                                </span>
                            </div>
                        </div>

                        {/* Cities Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cities.map((city) => (
                                <CityWeatherCompact
                                    key={city}
                                    city={city}
                                    onRemove={() => handleRemoveCity(city)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}