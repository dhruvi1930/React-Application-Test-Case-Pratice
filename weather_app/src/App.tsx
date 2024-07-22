import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=surat&appid=${apiKey}`
      );

      const data = await response.json();
      console.log(data);
    };

    fetchWeather();
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input placeholder="Enter City" />
      <button>Search</button>
    </div>
  );
}

export default App;
