# 🌦️ WeatherGlass

A beautiful glassmorphism weather app built with React.
Live weather data powered by OpenWeatherMap API.

## Features
- 🔍 Search any city worldwide
- 🌡️ Toggle between °C and °F
- 🎨 Dynamic background that changes with weather conditions
- 📅 5-day forecast
- 💨 Humidity, wind speed, and visibility stats
- ✨ Animated weather icons

## Tech Stack
- React 18
- Axios (API calls)
- OpenWeatherMap API
- CSS (Glassmorphism + animations)
- Google Fonts (Space Mono + Syne)

## Getting Started

### 1. Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/weather-glass.git
cd weather-glass
npm install
```

### 2. Get a free API key
1. Go to [openweathermap.org](https://openweathermap.org)
2. Sign up for a free account
3. Go to **API keys** tab
4. Copy your key

### 3. Add your API key
Create a `.env` file in the root:
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### 4. Start the app
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add `REACT_APP_WEATHER_API_KEY` in Vercel's Environment Variables settings.

## Project Structure
```
src/
├── App.jsx              # Root component
├── App.css              # Global styles
├── hooks/
│   └── useWeather.js    # Custom hook — API logic lives here
└── components/
    ├── Background.jsx   # Dynamic gradient background
    ├── SearchBar.jsx    # City search input
    ├── UnitToggle.jsx   # °C / °F toggle
    ├── WeatherCard.jsx  # Main weather display
    └── ForecastRow.jsx  # 5-day forecast strip
```

## What I Learned Building This
- Custom React hooks (`useWeather`) for clean separation of concerns
- API integration with Axios and error handling
- Dynamic theming based on weather conditions
- Glassmorphism UI with CSS backdrop-filter
- Environment variables for API key security

---
Built by **Oladimeji Ojo** · [Portfolio](https://your-portfolio-url.com)
