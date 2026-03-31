import "./ForecastRow.css";

const toF = (c) => Math.round(c * 9 / 5 + 32);

export default function ForecastRow({ forecast, unit }) {
  if (!forecast?.length) return null;

  return (
    <div className="forecast-card fade-up">
      <p className="forecast-title">📅 Next 5 days</p>
      <div className="forecast-row">
        {forecast.map((day, i) => (
          <div className="forecast-item" key={i}>
            <div className="fc-day">{day.d}</div>
            <div className="fc-icon">{day.i}</div>
            <div className="fc-temp">
              {unit === "C" ? day.t : toF(day.t)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
