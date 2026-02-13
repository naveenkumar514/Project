import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      // 1️⃣ Geocoding API
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      const geoData = geoRes.data;

      if (!geoData.results) throw new Error("City not found");

      const { latitude, longitude, name, country } = geoData.results[0];
      setLocation(`${name}, ${country}`);

      // 2️⃣ Weather API
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude: latitude,
            longitude: longitude,
            current_weather: true,
            daily: "temperature_2m_max,temperature_2m_min",
            timezone: "auto",
          },
        }
      );

      setWeather(weatherRes.data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md w-full max-w-md rounded-3xl shadow-2xl p-8 border border-white/30">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Weather App
        </h1>

        <SearchBar onSearch={fetchWeather} />

        {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {weather && (
          <>
            <WeatherCard weather={weather} location={location} />
            <Forecast daily={weather.daily} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
