import { useState, useCallback } from "react";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastRow from "./components/ForecastRow";
import UnitToggle from "./components/UnitToggle";
import Background from "./components/Background";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("Lagos");
  const [unit, setUnit] = useState("C"); // "C" or "F"
  const { data, loading, error } = useWeather(city);

  const handleSearch = useCallback((query) => {
    setCity(query);
  }, []);

  return (
    <div className="app">
      <Background theme={data?.theme || "default"} />

      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <main className="content">
        <p className="app-title">WeatherGlass</p>

        <SearchBar onSearch={handleSearch} />

        <UnitToggle unit={unit} onChange={setUnit} />

        {error && <div className="error-msg">{error}</div>}

        {loading ? (
          <div className="loading-msg">Fetching weather data...</div>
        ) : data ? (
          <>
            <WeatherCard data={data} unit={unit} />
            <ForecastRow forecast={data.forecast} unit={unit} />
          </>
        ) : null}

        <p className="demo-notice">
          ⚡ Powered by OpenWeatherMap API
        </p>
      </main>
    </div>
  );
}
