import "./WeatherCard.css";

const toF = (c) => Math.round(c * 9 / 5 + 32);

export default function WeatherCard({ data, unit }) {
  const temp   = unit === "C" ? data.temp   : toF(data.temp);
  const feels  = unit === "C" ? data.feels  : toF(data.feels);
  const label  = unit === "C" ? "°C"        : "°F";

  const now    = new Date();
  const days   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dateStr = `${days[now.getDay()]} · ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className="glass-card fade-up">
      {/* Top row: location + icon */}
      <div className="weather-top">
        <div className="location-info">
          <h2>{data.city}</h2>
          <p>{data.country} · {dateStr}</p>
        </div>
        <div className="weather-icon">{data.icon}</div>
      </div>

      {/* Temperature */}
      <div className="temp-display">
        <span className="temp-main">{temp}</span>
        <span className="temp-unit">{label}</span>
      </div>
      <p className="feels-like">Feels like {feels}{label}</p>

      {/* Condition badge */}
      <span className="condition-badge">{data.condition}</span>

      {/* Stats */}
      <div className="stats-row">
        <StatItem icon="💧" value={`${data.humidity}%`}    label="Humidity"   />
        <StatItem icon="💨" value={`${data.wind} km/h`}   label="Wind"       />
        <StatItem icon="👁️" value={`${data.visibility} km`} label="Visibility" />
      </div>
    </div>
  );
}

function StatItem({ icon, value, label }) {
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-val">{value}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}
