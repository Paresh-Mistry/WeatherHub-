import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, Code, Database, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <h1 className="text-5xl font-bold mb-4">About Weather App</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A modern, full-stack weather application built with cutting-edge technologies
          to provide accurate and real-time weather information.
        </p>
      </div>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            Technology Stack
          </CardTitle>
          <CardDescription>Built with modern tools and frameworks</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">Frontend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <strong>React 18</strong> - UI Library
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <strong>TypeScript</strong> - Type Safety
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <strong>React Query</strong> - Data Fetching & Caching
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <strong>React Router</strong> - Navigation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <strong>Tailwind CSS</strong> - Styling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <strong>shadcn/ui</strong> - Component Library
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <strong>Vite</strong> - Build Tool
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">Backend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                <strong>FastAPI</strong> - Python Framework
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                <strong>Pydantic</strong> - Data Validation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                <strong>Uvicorn</strong> - ASGI Server
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                <strong>HTTPX</strong> - HTTP Client
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                <strong>OpenWeatherMap API</strong> - Weather Data
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <Cloud className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>Real-time Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get current weather conditions including temperature, humidity, wind speed, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-yellow-500 mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Powered by React Query for instant data loading with automatic caching and background updates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>Smart Caching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Intelligent caching reduces API calls while keeping your data fresh and up-to-date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-cyan-500 mb-2" />
              <CardTitle>Global Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Search weather for any city worldwide with accurate, localized data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-red-500 mb-2" />
              <CardTitle>Type Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built with TypeScript for reliability, better developer experience, and fewer bugs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-10 w-10 text-purple-500 mb-2" />
              <CardTitle>Clean Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Well-structured codebase with separation of concerns and best practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Information */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Data Source</CardTitle>
          <CardDescription>Powered by OpenWeatherMap</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This application uses the OpenWeatherMap API to provide accurate and reliable weather data.
            OpenWeatherMap collects and processes weather data from different sources such as global and 
            local weather models, satellites, radars and a vast network of weather stations.
          </p>
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="font-semibold mb-2">Data Points</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Current temperature</li>
                <li>• Feels like temperature</li>
                <li>• Weather conditions</li>
                <li>• Humidity levels</li>
                <li>• Wind speed and direction</li>
                <li>• 5-point forecast</li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-2">Coverage</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 200,000+ cities worldwide</li>
                <li>• Real-time updates</li>
                <li>• Accurate forecasts</li>
                <li>• Multiple languages</li>
                <li>• Historical data available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>Architecture Overview</CardTitle>
          <CardDescription>How the application works</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">User Interface</h4>
                <p className="text-sm text-muted-foreground">
                  Built with React and Tailwind CSS, providing a responsive and intuitive interface
                  for users to search and view weather data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">React Query Layer</h4>
                <p className="text-sm text-muted-foreground">
                  Manages data fetching, caching, and synchronization. Automatically handles loading states,
                  errors, and background updates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">FastAPI Backend</h4>
                <p className="text-sm text-muted-foreground">
                  Python backend that handles API requests, validates data, and communicates with
                  OpenWeatherMap API securely.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">External API</h4>
                <p className="text-sm text-muted-foreground">
                  OpenWeatherMap provides the actual weather data, which is then normalized and
                  returned to the frontend.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Built as a full-stack development showcase project
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2024 Weather App. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}