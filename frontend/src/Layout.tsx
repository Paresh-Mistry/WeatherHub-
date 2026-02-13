import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { CloudSun, Home, GitCompare, Heart, Sun, Moon, Sparkles, Github, Twitter } from 'lucide-react';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Compare', href: '/compare', icon: GitCompare },
  { name: 'Favorites', href: '/favorites', icon: Heart },
];

export function Layout() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "border-b backdrop-blur-xl sticky top-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 dark:bg-gray-900/95 shadow-xl" 
          : "bg-white/80 dark:bg-gray-900/80 shadow-md"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <CloudSun className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  WeatherHub
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 -mt-1">
                  Global Forecasts
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200',
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-2 h-11 w-11 rounded-xl hover:scale-110 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-500 rotate-0 transition-transform duration-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600 rotate-0 transition-transform duration-500" />
                )}
              </Button>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex md:hidden items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-10 w-10 rounded-xl hover:scale-110 transition-all"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2 pb-4 overflow-x-auto scrollbar-hide">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200',
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                  <CloudSun className="h-6 w-6 text-white" />
                </div>
                <span className="font-black text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  WeatherHub
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                Your go-to destination for accurate weather forecasts worldwide. 
                Stay informed with real-time data, detailed forecasts, and intuitive visualizations.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-blue-600 transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Built With</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  React + TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  React Query
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-pink-500" />
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-green-500" />
                  FastAPI
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span>Weather data powered by OpenWeatherMap</span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} WeatherHub. Crafted with{' '}
              <span className="text-red-500 animate-pulse">❤️</span>
              {' '}for weather enthusiasts
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}