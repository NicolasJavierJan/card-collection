import React, { useEffect, useState } from 'react';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF?: number;
  summary: string;
}

const App: React.FC = () => {
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5236/weatherforecast')
      .then(res => res.json())
      .then((data: WeatherForecast[]) => {
        setForecast(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Weather Forecast</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {forecast.map((entry, idx) => (
            <li key={idx}>
              {entry.date} - {entry.summary} - {entry.temperatureC}°C
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
