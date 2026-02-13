function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

function WeatherCard({ weather, location }) {
  const { temperature, windspeed, weathercode } = weather.current_weather;

  return (
    <div className="mt-6 text-center">

      <h2 className="text-lg font-semibold text-gray-700">{location}</h2>

      <div className="text-6xl mt-3">{getWeatherIcon(weathercode)}</div>

      <div className="text-4xl font-bold mt-2 text-blue-600">
        {temperature}°C
      </div>

      <p className="text-gray-500 mt-2">Wind Speed: {windspeed} km/h</p>
    </div>
  );
}

export default WeatherCard;
