import { useState, useRef, useEffect } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery]         = useState("");
  const [focused, setFocused]     = useState(false);
  const inputRef                  = useRef(null);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
      setQuery("");
      setFocused(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!inputRef.current?.closest(".search-wrap")?.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="search-wrap" ref={inputRef}>
      <input
        className="search-bar"
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        onFocus={() => setFocused(true)}
        autoComplete="off"
      />
      <button className="search-btn" onClick={handleSubmit} aria-label="Search">
        →
      </button>
    </div>
  );
}
