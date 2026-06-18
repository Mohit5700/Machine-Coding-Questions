import { useEffect, useRef, useState } from "react";
import { SEARCH_API } from "../utils/constants";

const useSearchSuggestions = (searchQuery) => {
  const [suggestions, setSuggestions] = useState([]);

  /**
   * CACHE OPTIMIZATION:
   * We use useRef to store a 'cache' object.
   * Since it's a Ref, it persists across re-renders but doesn't trigger
   * a re-render when we add new data to it.
   * Format: { "pizza": [...results], "pasta": [...results] }
   */
  const cacheRef = useRef({});

  const getSearchSuggestions = async () => {
    try {
      // 1. CACHE CHECK: If we already searched for this string, use the local data
      if (cacheRef.current[searchQuery]) {
        setSuggestions(cacheRef.current[searchQuery]);
        return;
      }

      // 2. API CALL: Only happens if the result isn't in our cache
      const res = await fetch(SEARCH_API + searchQuery);
      const data = await res.json();

      const results = data?.recipes || [];
      setSuggestions(results);

      // 3. CACHE UPDATE: Store the result for future use
      cacheRef.current[searchQuery] = results;
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  /**
   * DEBOUNCING PATTERN:
   * Instead of calling the API on every key press, we wait for a 300ms
   * pause in typing. If the user types again before 300ms, the previous
   * timer is killed (clearTimeout) and a new one starts.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchSuggestions();
    }, 300);

    // CLEANUP: This runs when the component re-renders or searchQuery changes
    return () => clearTimeout(timer);
  }, [searchQuery]); // Effect dependency: trigger on every character change

  return suggestions;
};

export default useSearchSuggestions;
