import { useState } from "react";
import useSearchSuggestions from "../hooks/useSearchSuggestions";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // UI state to show/hide the suggestion box (e.g., hide when clicking away)
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Hook handles all the complex debouncing and caching logic internally
  const suggestions = useSearchSuggestions(searchQuery);

  return (
    <div className="search-container">
      <h1>Autocomplete Search Bar</h1>

      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Type something (e.g. Pizza)...."
          value={searchQuery}
          // Simple binding: update local state on every keystroke
          onChange={(e) => setSearchQuery(e.target.value)}
          // UX: Show suggestions only when the user is actively typing/clicked inside
          onFocus={() => setShowSuggestions(true)}
          /**
           * NOTE: In a real app, onBlur can trigger before a click on a suggestion.
           * Often handled with a small setTimeout or using 'onMouseDown' on the <li>
           */
          onBlur={() => setShowSuggestions(false)}
        />
      </div>

      {/* CONDITIONAL RENDERING: Only show the box if focused*/}
      {showSuggestions && (
        <div className="search-suggestions">
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="suggestion-item">
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
