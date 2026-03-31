import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getIconAndTheme(weatherId, isNight) {
  if (isNight) return { icon: "🌙", theme: "night" };
  if (weatherId >= 200 && weatherId < 300) return { icon: "⛈️",  theme: "rainy" };
  if (weatherId >= 300 && weatherId < 400) return { icon: "🌦️", theme: "rainy" };
  if (weatherId >= 500 && weatherId < 600) return { icon: "🌧️", theme: "rainy" };
  if (weatherId >= 600 && weatherId < 700) return { icon: "❄️",  theme: "snowy" };
  if (weatherId >= 700 && weatherId < 800) return { icon: "🌫️", theme: "cloudy" };
  if (weatherId === 800)                   return { icon: "☀️",  theme: "sunny" };
  if (weatherId === 801)                   return { icon: "🌤️", theme: "sunny" };
  if (weatherId <= 804)                    return { icon: "⛅",  theme: "cloudy" };
  return { icon: "🌡️", theme: "default" };
}

function formatForecast(list) {
  const dayLabels = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  const seen = new Set();
  const days = [];

  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    if (!seen.has(dayKey) && days.length < 5) {
      seen.add(dayKey);
      const { icon } = getIconAndTheme(item.weather[0].id, false);
      days.push({
        d: dayLabels[date.getDay()],
        i: icon,
        t: Math.round(item.main.temp),
      });
    }
  }
  return days;
}

export default function useWeather(city) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const currentRes = await axios.get(`${BASE_URL}/weather`, {
          params: { q: city, appid: API_KEY, units: "metric" },
        });

        // Fetch 5-day forecast
        const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
          params: { q: city, appid: API_KEY, units: "metric" },
        });

        const w = currentRes.data;
        const now = new Date();
        const sunrise = new Date(w.sys.sunrise * 1000);
        const sunset  = new Date(w.sys.sunset  * 1000);
        const isNight = now < sunrise || now > sunset;

        const { icon, theme } = getIconAndTheme(w.weather[0].id, isNight);

        setData({
          city:       w.name,
          country:    w.sys.country,
          temp:       Math.round(w.main.temp),
          feels:      Math.round(w.main.feels_like),
          condition:  w.weather[0].main,
          humidity:   w.main.humidity,
          wind:       Math.round(w.wind.speed * 3.6), // m/s → km/h
          visibility: Math.round((w.visibility || 10000) / 1000),
          icon,
          theme,
          forecast: formatForecast(forecastRes.data.list),
        });
      } catch (err) {
        if (err.response?.status === 404) {
          setError(`City "${city}" not found. Please check the spelling.`);
        } else if (err.response?.status === 401) {
          setError("Invalid API key. Add your key to .env as REACT_APP_WEATHER_API_KEY.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, loading, error };
}
