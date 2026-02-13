function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function Forecast({ daily }) {
  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-3 text-center">5-Day Forecast</h3>

      <div className="grid grid-cols-2 gap-3">
        {daily.time.slice(0, 5).map((date, index) => (
          <div
            key={date}
            className="bg-gray-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm text-gray-600">{formatDate(date)}</p>
            <p className="font-semibold mt-2 text-blue-600">
              {daily.temperature_2m_max[index]}°
            </p>
            <p className="text-gray-500 text-sm">{daily.temperature_2m_min[index]}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
