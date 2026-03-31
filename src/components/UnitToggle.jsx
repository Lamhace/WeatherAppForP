import "./UnitToggle.css";

export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn ${unit === "C" ? "active" : ""}`}
        onClick={() => onChange("C")}
      >
        °C
      </button>
      <button
        className={`unit-btn ${unit === "F" ? "active" : ""}`}
        onClick={() => onChange("F")}
      >
        °F
      </button>
    </div>
  );
}
