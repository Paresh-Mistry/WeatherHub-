import { useState } from 'react';
import {
    Cloud,
    Droplets,
    Wind,
    Thermometer,
    TrendingUp,
    BarChart3,
    Grid3x3,
    Activity,
    Sun,
    CloudRain,
    Snowflake
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { type ForecastResponse } from '../types/weather';
import {
    formatTime,
    getWeatherIcon,
    getTemperatureColor,
} from '../utils/weatherUtils';

interface ForecastProps {
    data: ForecastResponse;
}

export const Forecast = ({ data }: ForecastProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (!data || !data.forecast || data.forecast.length === 0) {
        return null;
    }

    // Prepare chart data
    const chartData = data.forecast.map((item, index) => ({
        name: formatTime(item.time),
        temperature: Math.round(item.tempC),
        humidity: item.humidity,
        wind: Math.round(item.windKph),
        feelsLike: Math.round(item.tempC - 2),
    }));

    // Enhanced custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-2xl">
                    <p className="font-bold text-base mb-3 text-gray-900 dark:text-white">
                        {payload[0].payload.name}
                    </p>
                    <div className="space-y-2">
                        {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {entry.name}:
                                </span>
                                <span className="text-sm font-bold" style={{ color: entry.color }}>
                                    {entry.value}
                                    {entry.name === 'Temperature' || entry.name === 'Feels Like'
                                        ? '°C'
                                        : entry.name === 'Humidity'
                                            ? '%'
                                            : ' km/h'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Modern Header */}
                <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <Cloud className="h-8 w-8" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold tracking-tight">
                                    Weather Forecast
                                </CardTitle>
                                <p className="text-blue-100 text-sm font-medium mt-1">
                                    Next 15 hours • 3-hour intervals
                                </p>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-8">
                    <Tabs defaultValue="cards" className="w-full">
                        {/* Modern Tab List */}
                        <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl h-auto">
                            <TabsTrigger
                                value="cards"
                                className="gap-2 py-3 px-4 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
                            >
                                <Grid3x3 className="h-4 w-4" />
                                <span className="font-semibold">Cards</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="temperature"
                                className="gap-2 py-3 px-4 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
                            >
                                <Thermometer className="h-4 w-4" />
                                <span className="font-semibold">Temperature</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="conditions"
                                className="gap-2 py-3 px-4 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
                            >
                                <BarChart3 className="h-4 w-4" />
                                <span className="font-semibold">Conditions</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="overview"
                                className="gap-2 py-3 px-4 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
                            >
                                <Activity className="h-4 w-4" />
                                <span className="font-semibold">Overview</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Cards View */}
                        <TabsContent value="cards" className="space-y-6 mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                                {data.forecast.map((item, index) => {
                                    const icon = getWeatherIcon(item.condition);
                                    const tempColor = getTemperatureColor(item.tempC);
                                    const isSelected = selectedIndex === index;
                                    const isHovered = hoveredIndex === index;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedIndex(isSelected ? null : index)}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            className={`
                        group relative flex flex-col items-center p-6 rounded-3xl
                        transition-all duration-300 cursor-pointer
                        ${isSelected
                                                    ? 'bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 ring-2 ring-blue-500 scale-[1.05] shadow-2xl shadow-blue-500/20'
                                                    : isHovered
                                                        ? 'bg-white dark:bg-gray-800 shadow-xl scale-[1.02]'
                                                        : 'bg-white dark:bg-gray-800 shadow-md hover:shadow-xl'
                                                }
                        border border-gray-200 dark:border-gray-700
                      `}
                                        >
                                            {isSelected && (
                                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                                                    <span className="text-sm text-white font-bold">✓</span>
                                                </div>
                                            )}

                                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                                                {formatTime(item.time)}
                                            </p>

                                            <div className={`text-7xl mb-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                                                {icon}
                                            </div>

                                            <p className={`text-4xl font-black ${tempColor} mb-2 tracking-tight`}>
                                                {Math.round(item.tempC)}°
                                            </p>

                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                                                {item.condition}
                                            </p>

                                            <div className="w-full space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                            <Droplets className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Humidity</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{item.humidity}%</span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                                                            <Wind className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Wind</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {Math.round(item.windKph)} km/h
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Enhanced Selected Card Details */}
                            {selectedIndex !== null && (
                                <Card className="bg-gradient-to-br py-4 from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-800 shadow-xl animate-in slide-in-from-top-4 duration-500">
                                    <CardHeader className="py-4">
                                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                                            <div className="p-2 bg-blue-500 rounded-xl">
                                                <Cloud className="h-5 w-5 text-white" />
                                            </div>
                                            Detailed View - {formatTime(data.forecast[selectedIndex].time)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl inline-block mb-3">
                                                    <Thermometer className="h-7 w-7 text-red-600 dark:text-red-400" />
                                                </div>
                                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                                    {Math.round(data.forecast[selectedIndex].tempC)}°C
                                                </p>
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Temperature
                                                </p>
                                            </div>
                                            <div className="text-center p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl inline-block mb-3">
                                                    <Droplets className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                                    {data.forecast[selectedIndex].humidity}%
                                                </p>
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Humidity
                                                </p>
                                            </div>
                                            <div className="text-center p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl inline-block mb-3">
                                                    <Wind className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                                                </div>
                                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                                    {Math.round(data.forecast[selectedIndex].windKph)}
                                                </p>
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Wind (km/h)
                                                </p>
                                            </div>
                                            <div className="text-center p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl inline-block mb-3">
                                                    <Cloud className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <p className="text-lg font-black text-gray-900 dark:text-white mb-1">
                                                    {data.forecast[selectedIndex].condition}
                                                </p>
                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Condition
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Temperature Chart */}
                        <TabsContent value="temperature" className="space-y-6 mt-0">
                            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                                            <Thermometer className="h-5 w-5 text-white" />
                                        </div>
                                        Temperature Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#6b7280"
                                                style={{ fontSize: '12px', fontWeight: '600' }}
                                            />
                                            <YAxis
                                                stroke="#6b7280"
                                                style={{ fontSize: '12px', fontWeight: '600' }}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: '600' }} />
                                            <Area
                                                type="monotone"
                                                dataKey="temperature"
                                                name="Temperature"
                                                stroke="#f97316"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorTemp)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Enhanced Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <p className="text-xs font-bold uppercase tracking-wider mb-2 text-red-100">Highest</p>
                                        <p className="text-4xl font-black">
                                            {Math.max(...data.forecast.map(f => f.tempC)).toFixed(0)}°
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <p className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-100">Lowest</p>
                                        <p className="text-4xl font-black">
                                            {Math.min(...data.forecast.map(f => f.tempC)).toFixed(0)}°
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <p className="text-xs font-bold uppercase tracking-wider mb-2 text-green-100">Average</p>
                                        <p className="text-4xl font-black">
                                            {(data.forecast.reduce((a, b) => a + b.tempC, 0) / data.forecast.length).toFixed(0)}°
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <p className="text-xs font-bold uppercase tracking-wider mb-2 text-purple-100">Range</p>
                                        <p className="text-4xl font-black">
                                            {(Math.max(...data.forecast.map(f => f.tempC)) - Math.min(...data.forecast.map(f => f.tempC))).toFixed(0)}°
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Conditions Chart */}
                        <TabsContent value="conditions" className="space-y-6 mt-0">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                                <Droplets className="h-5 w-5 text-white" />
                                            </div>
                                            Humidity Levels
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={280}>
                                            <BarChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                                <XAxis
                                                    dataKey="name"
                                                    stroke="#6b7280"
                                                    style={{ fontSize: '12px', fontWeight: '600' }}
                                                />
                                                <YAxis
                                                    stroke="#6b7280"
                                                    style={{ fontSize: '12px', fontWeight: '600' }}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Bar
                                                    dataKey="humidity"
                                                    name="Humidity"
                                                    fill="url(#humidityGradient)"
                                                    radius={[12, 12, 0, 0]}
                                                />
                                                <defs>
                                                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#3b82f6" />
                                                        <stop offset="100%" stopColor="#60a5fa" />
                                                    </linearGradient>
                                                </defs>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl">
                                                <Wind className="h-5 w-5 text-white" />
                                            </div>
                                            Wind Speed
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={280}>
                                            <BarChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                                <XAxis
                                                    dataKey="name"
                                                    stroke="#6b7280"
                                                    style={{ fontSize: '12px', fontWeight: '600' }}
                                                />
                                                <YAxis
                                                    stroke="#6b7280"
                                                    style={{ fontSize: '12px', fontWeight: '600' }}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Bar
                                                    dataKey="wind"
                                                    name="Wind Speed"
                                                    fill="url(#windGradient)"
                                                    radius={[12, 12, 0, 0]}
                                                />
                                                <defs>
                                                    <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#06b6d4" />
                                                        <stop offset="100%" stopColor="#22d3ee" />
                                                    </linearGradient>
                                                </defs>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Overview */}
                        <TabsContent value="overview" className="space-y-6 mt-0">
                            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-bold">Complete Weather Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#6b7280"
                                                style={{ fontSize: '12px', fontWeight: '600' }}
                                            />
                                            <YAxis
                                                stroke="#6b7280"
                                                style={{ fontSize: '12px', fontWeight: '600' }}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: '600' }} />
                                            <Line
                                                type="monotone"
                                                dataKey="temperature"
                                                name="Temperature"
                                                stroke="#f97316"
                                                strokeWidth={4}
                                                dot={{ r: 6, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 8 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="humidity"
                                                name="Humidity"
                                                stroke="#3b82f6"
                                                strokeWidth={3}
                                                dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="wind"
                                                name="Wind Speed"
                                                stroke="#06b6d4"
                                                strokeWidth={3}
                                                dot={{ r: 5, fill: '#06b6d4', strokeWidth: 2, stroke: '#fff' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Enhanced Weather Summary */}
                            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-bold">Weather Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-3 gap-5">
                                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold mb-3 flex items-center gap-2 text-lg">
                                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                                                    <Thermometer className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                </div>
                                                Temperature
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                Ranging from{' '}
                                                <strong className="text-gray-900 dark:text-white font-bold">
                                                    {Math.min(...data.forecast.map(f => f.tempC)).toFixed(0)}°C
                                                </strong>{' '}
                                                to{' '}
                                                <strong className="text-gray-900 dark:text-white font-bold">
                                                    {Math.max(...data.forecast.map(f => f.tempC)).toFixed(0)}°C
                                                </strong>{' '}
                                                over the next 15 hours.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold mb-3 flex items-center gap-2 text-lg">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                                    <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                Humidity
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                Average humidity of{' '}
                                                <strong className="text-gray-900 dark:text-white font-bold">
                                                    {(data.forecast.reduce((a, b) => a + b.humidity, 0) / data.forecast.length).toFixed(0)}%
                                                </strong>{' '}
                                                with variations throughout the period.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold mb-3 flex items-center gap-2 text-lg">
                                                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                                                    <Wind className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                                </div>
                                                Wind
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                Wind speeds between{' '}
                                                <strong className="text-gray-900 dark:text-white font-bold">
                                                    {Math.min(...data.forecast.map(f => f.windKph)).toFixed(0)}
                                                </strong>{' '}
                                                and{' '}
                                                <strong className="text-gray-900 dark:text-white font-bold">
                                                    {Math.max(...data.forecast.map(f => f.windKph)).toFixed(0)} km/h
                                                </strong>.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};