import React, { useCallback, useState } from "react";
import "./App.css";

interface Weather {
  temp: number;
  speed: number;
  humidity: number;
}

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const kelvinToCelsius = useCallback((temp: number) => {
    return temp - 273.15;
  }, []);

  const handleFetchData = useCallback(async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const tempInCelsius: number = kelvinToCelsius(data.main.temp);

      setWeather({
        temp: tempInCelsius,
        speed: data.wind.speed,
        humidity: data.main.humidity,
      });
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
      setCity("");
    }
  }, [city, kelvinToCelsius]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        placeholder="Enter City"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button onClick={handleFetchData} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
      {error && <p>{error}</p>}
      {weather && (
        <div id="weather-data">
          <p>Weather: {weather.temp.toFixed(2)}</p>
          <p>Speed: {weather.speed}</p>
          <p>Humidity: {weather.humidity}</p>
        </div>
      )}
    </div>
  );
}

export default App;
