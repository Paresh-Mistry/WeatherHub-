import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Clock, Sparkles, CloudRain, Sun, Wind } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useWeatherPrefetch } from '../hooks/useWeatherPrefetch';

const FEATURED_CITIES = [
    { name: 'London', country: 'GB', image: '🇬🇧', gradient: 'from-gray-400 to-gray-600' },
    { name: 'New York', country: 'US', image: '🇺🇸', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Tokyo', country: 'JP', image: '🇯🇵', gradient: 'from-red-400 to-pink-600' },
    { name: 'Paris', country: 'FR', image: '🇫🇷', gradient: 'from-purple-400 to-purple-600' },
    { name: 'Sydney', country: 'AU', image: '🇦🇺', gradient: 'from-orange-400 to-orange-600' },
    { name: 'Dubai', country: 'AE', image: '🇦🇪', gradient: 'from-amber-400 to-amber-600' },
    { name: 'Singapore', country: 'SG', image: '🇸🇬', gradient: 'from-green-400 to-green-600' },
    { name: 'Mumbai', country: 'IN', image: '🇮🇳', gradient: 'from-cyan-400 to-cyan-600' },
];

export function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [focusedCity, setFocusedCity] = useState<string | null>(null);
    const navigate = useNavigate();
    const geolocation = useGeolocation();
    const { history, addToHistory } = useSearchHistory();
    const { prefetchWeatherByCity } = useWeatherPrefetch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            addToHistory({
                type: 'city',
                value: searchQuery.trim(),
                displayName: searchQuery.trim(),
            });
            navigate(`/weather/${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleCityClick = (city: string) => {
        addToHistory({
            type: 'city',
            value: city,
            displayName: city,
        });
        navigate(`/weather/${encodeURIComponent(city)}`);
    };

    const handleLocationClick = async () => {
        const coords = await geolocation.getCurrentPosition();
        if (coords) {
            navigate(`/weather/location?lat=${coords.lat}&lon=${coords.lon}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
                {/* Hero Section */}
                <section className="text-center space-y-6 pt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
                        <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Powered by Advanced Weather API
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                            Weather
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-reverse">
                            Anywhere
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Get accurate weather forecasts for any city in the world.
                        <br />
                        Plan your day with confidence.
                    </p>
                </section>

                {/* Search Section */}
                <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl overflow-hidden">
                    <div className="shadow-md">
                        <div className="bg-white dark:bg-gray-800 rounded-t-2xl">
                            <CardContent className="pt-8 pb-8 px-8">
                                <form onSubmit={handleSearch} className="space-y-5">
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 z-10" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search for a city... (e.g., London, Tokyo, Paris)"
                                                className="
                          w-full pl-14 pr-5 py-5
                          rounded-2xl
                          focus:outline-none
                          text-lg font-medium
                          text-gray-900 dark:text-white
                          placeholder:text-gray-400
                          transition-all duration-200
                        "
                                            />
                                        </div>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="lg"
                                            onClick={handleLocationClick}
                                            disabled={geolocation.loading}
                                            className="
                                            h-14
                                            bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20
                                            border-2 border-green-200 dark:border-green-800
                                            hover:border-green-400 dark:hover:border-green-600
                                            hover:shadow-lg
                                            text-gray-700 dark:text-gray-300
                                            font-semibold text-base
                                            rounded-2xl
                                            transition-all duration-200
                                            disabled:opacity-50
                                            "
                                        >
                                            <MapPin className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                                            {geolocation.loading ? 'Getting location...' : 'Use My Location'}
                                        </Button>
                                    </div>

                                    {geolocation.error && (
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                            <p className="text-sm text-red-700 dark:text-red-400 text-center font-medium">
                                                {geolocation.error}
                                            </p>
                                        </div>
                                    )}
                                </form>
                                {/* Recent Searches */}
                                {history.length > 0 && (
                                    <div className="flex flex-wrap gap-3 pt-4">
                                        {history.map((item, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                onClick={() => handleCityClick(item.value as string)}
                                                onMouseEnter={() => prefetchWeatherByCity(item.value as string)}
                                                className="
                                                px-5 py-3
                                                border-2 border-gray-200 dark:border-gray-600
                                                hover:border-blue-400 dark:hover:border-blue-500
                                                hover:shadow-md
                                                rounded-xl
                                                font-semibold
                                                transition-all duration-200
                                                hover:scale-105
                                                "
                                            >
                                                {item.displayName}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </div>
                    </div>
                </Card>


                {/* Featured Cities */}
                <section className="space-y-8">
                    <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                                Popular Cities
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                            Quick access to weather in major cities worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
                        {FEATURED_CITIES.map((city) => (
                            <Card
                                key={city.name}
                                className={`
                  group cursor-pointer border-0 shadow-xl overflow-hidden
                  transition-all duration-300
                  hover:shadow-2xl hover:scale-105
                  ${focusedCity === city.name ? 'ring-2 ring-blue-500 scale-105' : ''}
                `}
                                onClick={() => handleCityClick(city.name)}
                                onMouseEnter={() => {
                                    setFocusedCity(city.name);
                                    prefetchWeatherByCity(city.name);
                                }}
                                onMouseLeave={() => setFocusedCity(null)}
                            >
                                <div className={`bg-gradient-to-br ${city.gradient} p-1`}>
                                    <div className="bg-white dark:bg-gray-800 rounded-xl">
                                        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                                            <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                                                {city.image}
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className="font-black text-xl text-gray-900 dark:text-white tracking-tight">
                                                    {city.name}
                                                </p>
                                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    {city.country}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                            Why Choose Us?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <Card className="group border-0 shadow-xl bg-gradient-to-br py-6 from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                                        <Sun className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="text-gray-900 dark:text-white font-black">Real-time Data</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    Get up-to-date weather information with temperature, humidity, wind speed, and atmospheric conditions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group border-0 shadow-xl bg-gradient-to-br py-6 from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                                        <CloudRain className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="text-gray-900 dark:text-white font-black">15-Hour Forecast</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    Plan ahead with detailed forecasts shown in 3-hour intervals for the next 15 hours.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group border-0 shadow-xl bg-gradient-to-br py-6 from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                                        <Wind className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="text-gray-900 dark:text-white font-black">Global Coverage</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    Search weather for any city around the world with accurate, reliable data from trusted sources.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
}