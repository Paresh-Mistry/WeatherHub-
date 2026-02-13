import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/Home';
import { WeatherPage } from './pages/WeatherPage';
import { LocationWeatherPage } from './pages/LocationWeatherPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ComparePage } from './pages/CompareCities';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="weather/:city" element={<WeatherPage />} />
          <Route path="weather/location" element={<LocationWeatherPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;