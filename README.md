# 🌤️ WeatherHub - Global Weather Forecast Application

A modern, feature-rich weather application built with React, TypeScript, and FastAPI. Get accurate real-time weather data and forecasts for any city worldwide with a beautiful, intuitive interface.

![WeatherHub](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan)

## ✨ Features

- 🌍 **Global Coverage** - Search weather for any city worldwide
- 🌡️ **Real-time Data** - Live temperature, humidity, wind speed, and conditions
- 📅 **15-Hour Forecast** - Detailed forecasts in 3-hour intervals
- 📊 **Interactive Charts** - Visualize weather trends with beautiful charts
- 🔄 **Compare Cities** - Side-by-side weather comparison for multiple cities
- ❤️ **Favorites** - Save your most-visited cities for quick access
- 🌓 **Dark Mode** - Fully functional light/dark theme with persistence
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful gradients, animations, and glass morphism effects
- 📍 **Geolocation** - Automatically detect and show weather for your location

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **React Query (TanStack Query)** - Data fetching and caching
- **Recharts** - Weather data visualization
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Build tool

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Requests** - HTTP library for API calls
- **Python 3.8+** - Programming language

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **pip** - Python package manager

## 🔑 API Key Setup

This application uses **OpenWeatherMap** as the weather data provider.

### Getting Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Click on **Sign Up** in the top right corner
3. Create a free account
4. After logging in, go to **API Keys** section
5. Copy your default API key (or generate a new one)
6. The free tier includes:
   - 1,000 API calls per day
   - Current weather data
   - 5-day forecast
   - All features needed for this application

**Note:** It may take up to 2 hours for your API key to be activated after registration.

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weatherhub.git
cd weatherhub
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment (recommended):

```bash
pipx install poetry
```

Install Python dependencies:

```bash
poetry install 
```

Create a `.env` file in the `backend` directory:

```bash
# backend/.env
OPENWEATHER_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OpenWeatherMap API key.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install Node.js dependencies:

```bash
npm install
# or
yarn install
```

Create a `.env` file in the `frontend` directory:

```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:8000
```

## 🏃 Running the Application

### Start the Backend Server

In the backend directory (with virtual environment activated):

```bash
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

You can access the API documentation at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Start the Frontend Development Server

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm run dev
# or
yarn dev
```

The frontend application will be available at `http://localhost:5173`

## 📁 Project Structure

```
weatherhub/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── WeatherCard.tsx
│   │   │   └── Forecast.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useWeather.ts
│   │   │   ├── useGeolocation.ts
│   │   │   └── useSearchHistory.ts
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ComparePage.tsx
│   │   │   └── FavoritesPage.tsx
│   │   ├── utils/            # Utility functions
│   │   │   └── weatherUtils.ts
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── weather.ts
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├──src
|   |    ├── main.py                # FastAPI application
|   |    ├── api/                
|   |    ├── config/              
|   |    ├── schema/              
|   |    ├── util/              
|   |    ├── core/               
│   ├──tests
│   ├── poetry.lock        
│   ├── pyproject.toml        # Python dependencies
│   └── .env                  # Environment variables
│
└── README.md
```

## 🌐 API Endpoints

### Backend API Endpoints

- `GET /api/weather/city/{city}` - Get current weather by city name
- `GET /api/weather/coords?lat={lat}&lon={lon}` - Get weather by coordinates
- `GET /api/forecast/city/{city}` - Get 15-hour forecast by city name
- `GET /api/forecast/coords?lat={lat}&lon={lon}` - Get forecast by coordinates

### Example Response

```json
{
  "location": {
    "city": "London",
    "country": "GB",
    "lat": 51.5074,
    "lon": -0.1278
  },
  "current": {
    "tempC": 15.5,
    "feelsLikeC": 14.2,
    "humidity": 72,
    "windKph": 18.5,
    "condition": "Partly Cloudy",
    "updatedAt": "2024-02-13T10:30:00"
  },
  "forecast": [
    {
      "time": "2024-02-13T12:00:00",
      "tempC": 16.8,
      "humidity": 68,
      "windKph": 20.1,
      "condition": "Sunny"
    }
    // ... more forecast items
  ]
}
```

## 🎨 Features Overview

### Home Page
- Hero section with animated gradients
- Search bar with city autocomplete
- Geolocation support
- Recent searches history
- Popular cities quick access
- Feature highlights

### Weather Details Page
- Large weather card with current conditions
- Temperature, feels-like, humidity, wind speed
- Interactive 15-hour forecast
- Multiple chart views (cards, temperature, conditions, overview)
- Beautiful visualizations with Recharts

### Compare Cities
- Add multiple cities for comparison
- Side-by-side weather cards
- Real-time data for each city
- Easy removal of cities

### Favorites
- Save frequently checked cities
- Quick access to favorite locations
- Persistent storage with localStorage
- Beautiful heart-themed design

## 🔧 Configuration

### Environment Variables

#### Backend (`backend/.env`)
```env
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

#### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Customization

**Theme Colors**: Edit `frontend/tailwind.config.js` to customize the color scheme

**API Endpoints**: Modify `frontend/src/hooks/useWeather.ts` to change API base URL

**Forecast Intervals**: Adjust in `backend/main.py` to change forecast data points

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm run test
# or
yarn test
```

## 📦 Building for Production

### Frontend Build

```bash
cd frontend
npm run build
# or
yarn build
```

The production-ready files will be in the `frontend/dist` directory.

### Backend Deployment

For production, use a production ASGI server:

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🚨 Assumptions & Limitations

### Assumptions
1. **API Key**: Users have access to a valid OpenWeatherMap API key
2. **Network**: Application requires active internet connection
3. **Browser Support**: Modern browsers with ES6+ support
4. **Geolocation**: Browser geolocation API is available and permitted
5. **LocalStorage**: Browser supports localStorage for favorites and theme

### Limitations
1. **API Rate Limits**: Free tier limited to 1,000 calls/day (~60 searches per hour)
2. **Forecast Data**: 15-hour forecast (5 data points at 3-hour intervals)
3. **City Search**: Relies on OpenWeatherMap's city database
4. **Historical Data**: No historical weather data available
5. **Accuracy**: Weather data accuracy depends on OpenWeatherMap
6. **Offline Mode**: Application requires internet connection to function
7. **Cache Duration**: Weather data cached for 5 minutes to reduce API calls

### Known Issues
- Some smaller cities may not be found in the OpenWeatherMap database
- API key activation can take up to 2 hours after registration
- Geolocation may be blocked by browser privacy settings
- Very high API usage may require upgrading to a paid plan

## 🔐 Security Notes

- Never commit `.env` files to version control
- Keep your API keys secure and rotate them regularly
- Use environment variables for all sensitive configuration
- The backend includes CORS middleware for development
- For production, configure proper CORS origins

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** - Weather data provider
- **shadcn/ui** - Beautiful UI components
- **Lucide** - Icon library
- **Recharts** - Chart library
- **React Query** - Data fetching solution

## 🗺️ Roadmap

- [ ] Add weather alerts and warnings
- [ ] Extended 7-day forecast
- [ ] Weather maps and radar
- [ ] Air quality index
- [ ] UV index and sun times
- [ ] Weather widgets for embedding
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Unit conversion (Celsius/Fahrenheit)
- [ ] Export weather data (CSV, PDF)

---

**Made with ❤️ by Paresh Mistry**

**Last Updated:** February 2024
