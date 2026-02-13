import { useState } from 'react';
import { Droplets, Wind, Thermometer, MapPin, Clock, Eye, Gauge } from 'lucide-react';
import {
    formatDateTime,
    getWeatherIcon,
    getWeatherGradient,
    getTemperatureColor,
    getHumidityLevel,
} from '../utils/weatherUtils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { WeatherResponse } from '../types/weather';

interface WeatherCardProps {
    data: WeatherResponse;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
    const [hoveredStat, setHoveredStat] = useState<string | null>(null);
    const { location, current } = data;
    const icon = getWeatherIcon(current.condition);
    const gradient = getWeatherGradient(current.condition);
    const tempColor = getTemperatureColor(current.tempC);

    return (
        <Card className="overflow-hidden border-0 shadow-2xl bg-white dark:bg-gray-900 hover:shadow-3xl transition-shadow duration-500">
            {/* Hero Section with Gradient */}
            <div className={`bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D')] opacity-20 bg-no-repeat bg-cover"></div>

                {/* Floating Orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

                <CardHeader className="relative z-10 pt-8">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                <MapPin className="h-4 w-4" />
                                <span>Current Location</span>
                            </div>
                            <CardTitle className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                {location.city}
                            </CardTitle>
                            <p className="text-xl font-semibold text-white/90">
                                {location.country}
                            </p>
                            <div className="flex items-center gap-2 text-white/70 text-sm mt-3">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{formatDateTime(current.updatedAt)}</span>
                            </div>
                        </div>

                        {/* Animated Weather Icon */}
                        <div className="text-8xl md:text-9xl animate-bounce-slow drop-shadow-2xl">
                            {icon}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pb-10 relative z-10">
                    <div className="flex items-start justify-between">
                        <div className="space-y-3">
                            {/* Temperature Display */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-8xl md:text-9xl font-black tracking-tighter drop-shadow-lg">
                                    {Math.round(current.tempC)}
                                </span>
                                <span className="text-5xl font-bold text-white/90">°C</span>
                            </div>

                            {/* Condition */}
                            <p className="text-2xl md:text-3xl font-bold text-white/95 tracking-wide">
                                {current.condition}
                            </p>

                            {/* Feels Like */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                                <Thermometer className="h-4 w-4" />
                                <span className="text-sm font-semibold">
                                    Feels like {Math.round(current.feelsLikeC)}°C
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 md:gap-6">
                            {/* Feels Like Stat */}
                            <div
                                onMouseEnter={() => setHoveredStat('feels-like')}
                                onMouseLeave={() => setHoveredStat(null)}
                                className={`
              group relative flex flex-col items-center p-5 md:p-6 rounded-2xl
              transition-all duration-300 cursor-pointer bg-gradient-to-br from-red-500/20 to-orange-500/20 scale-105 shadow-xl ring-2 ring-red-500/50
            `}
                            >
                                {/* Icon Badge */}
                                <div className='p-3 rounded-xl mb-3 transition-all duration-300'>
                                    <Thermometer className="h-6 w-6 md:h-7 md:w-7 text-white" />
                                </div>

                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    Feels Like
                                </p>

                                <p className={`text-3xl md:text-4xl font-black ${tempColor} tracking-tight`}>
                                    {Math.round(current.feelsLikeC)}°
                                </p>

                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                                    Celsius
                                </p>

                                {/* Hover Effect Indicator */}
                                {hoveredStat === 'feels-like' && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                )}
                            </div>

                            {/* Humidity Stat */}
                            <div
                                onMouseEnter={() => setHoveredStat('humidity')}
                                onMouseLeave={() => setHoveredStat(null)}
                                className={`group relative flex flex-col items-center p-5 md:p-6 rounded-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-500/20 to-cyan-500/20 scale-105 shadow-xl ring-2 ring-blue-500/50
                                `}
                            >
                                {/* Icon Badge */}
                                <div className='p-3 rounded-xl mb-3 transition-all duration-300'>

                                    <Droplets className="h-6 w-6 md:h-7 md:w-7 text-white" />
                                </div>

                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    Humidity
                                </p>

                                <p className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                                    {current.humidity}
                                </p>

                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                                    {getHumidityLevel(current.humidity)}
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
                                        style={{ width: `${current.humidity}%` }}
                                    ></div>
                                </div>

                                {hoveredStat === 'humidity' && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                                )}
                            </div>

                            {/* Wind Speed Stat */}
                            <div
                                onMouseEnter={() => setHoveredStat('wind')}
                                onMouseLeave={() => setHoveredStat(null)}
                                className={`
              group relative flex flex-col items-center p-5 md:p-6 rounded-2xl
              transition-all duration-300 cursor-pointer bg-gradient-to-br from-cyan-500/20 to-teal-500/20 scale-105 shadow-xl ring-2 ring-cyan-500/50
            `}
                            >
                                {/* Icon Badge */}
                                <div className='p-3 rounded-xl mb-3 transition-all duration-300'>

                                    <Wind className="h-6 w-6 md:h-7 md:w-7 text-white" />
                                </div>

                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    Wind Speed
                                </p>

                                <p className="text-3xl md:text-4xl font-black text-cyan-600 dark:text-cyan-400 tracking-tight">
                                    {current.windKph.toFixed(1)}
                                </p>

                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                                    km/h
                                </p>

                                {hoveredStat === 'wind' && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};