import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../context/Context";
import StarRating from "./StarRating";
import { useEffect } from "react";
import {
  SORT_BY_PRICE,
  FILTER_BY_STOCK,
  FILTER_BY_RATING,
  CLEAR_FILTERS,
  FILTER_BY_SEARCH,
} from "../context/actionTypes";

/**
 * MAP DICTIONARY PATTERN:
 * Maps URL query parameter keys to their corresponding reducer action types.
 * This lets us run clean loops over incoming URL params instead of writing 10 separate if-statements.
 */
const filterMap = {
  sort: SORT_BY_PRICE,
  byRating: FILTER_BY_RATING,
  byStock: FILTER_BY_STOCK,
  searchQuery: FILTER_BY_SEARCH,
};

const Filters = () => {
  // Connect to our global global filter context
  const { filterState, filterDispatch } = useProductContext();
  const { byStock, sort, byRating } = filterState;

  // React Router hook to read and write URL query strings (e.g., ?sort=lowToHigh&byRating=4)
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * SYNC DEEP LINKING: PHASE 1 (URL ➔ REDUCER STATE)
   * This effect runs once when the page loads. It checks the URL parameters
   * and dispatches them to the reducer so the UI matches the link shared by a user.
   */
  useEffect(() => {
    if (!searchParams.size) return; // Exit if URL has no filter parameters

    searchParams.forEach((value, key) => {
      let parsedValue = value;

      // DATA TYPE SANITIZATION: URL values are always strings. We must convert them to match our reducer types.
      if (key === "byStock") {
        parsedValue = value === "true"; // Convert string "true" into boolean true
      }

      if (key === "byRating") {
        parsedValue = Number(value); // Convert string "4" into numerical integer 4
      }

      // Automatically dispatch the parameter straight into our global state slice
      filterDispatch({
        type: filterMap[key],
        payload: parsedValue,
      });
    });
  }, [searchParams, filterDispatch]); // Runs when parameters shift or context hotloads

  /**
   * SYNC DEEP LINKING: PHASE 2 (REDUCER STATE ➔ URL)
   * This effect listens to our global filterState. Whenever a user clicks a button,
   * checkbox, or types a search string, this code updates the browser's URL bar in real-time.
   */
  useEffect(() => {
    const params = {};

    if (sort) params.sort = sort;
    if (byStock) params.byStock = true; // Only append active condition triggers
    if (byRating) params.byRating = byRating;
    if (filterState.searchQuery.trim()) {
      params.searchQuery = filterState.searchQuery;
    }

    // Rewrite the browser address bar query strings (e.g., localhost:3000/?sort=highToLow)
    setSearchParams(params);
  }, [filterState, setSearchParams]);

  // --- LOCAL EVENT DISPATCHERS ---
  const handleSortChange = (value) => {
    filterDispatch({ type: SORT_BY_PRICE, payload: value });
  };

  const handleStockChange = () => {
    filterDispatch({ type: FILTER_BY_STOCK, payload: !byStock });
  };

  const handleRatingChange = (rating) => {
    filterDispatch({ type: FILTER_BY_RATING, payload: rating });
  };

  const handleClearFilters = () => {
    filterDispatch({ type: CLEAR_FILTERS });
  };

  return (
    <div className="flex flex-col w-80 gap-3 p-4">
      <h2 className="font-bold text-lg">Filter Products</h2>

      {/* SORT CONTROLS */}
      <span>
        <input
          className="mr-2"
          type="radio"
          name="sort"
          id="ascending"
          checked={sort === "lowToHigh"}
          onChange={() => handleSortChange("lowToHigh")}
        />
        <label htmlFor="ascending">Price: Low to High</label>
      </span>

      <span>
        <input
          className="mr-2"
          type="radio"
          name="sort"
          id="descending"
          checked={sort === "highToLow"}
          onChange={() => handleSortChange("highToLow")}
        />
        <label htmlFor="descending">Price: High to Low</label>
      </span>

      {/* STOCK CONTROL */}
      <span>
        <input
          className="mr-2"
          type="checkbox"
          id="out-of-stock"
          checked={byStock}
          onChange={handleStockChange}
        />
        <label htmlFor="out-of-stock">Include Out of Stock</label>
      </span>

      {/* RATING CONTROL */}
      <div className="flex items-center">
        <span className="pr-2">Rating:</span>
        <StarRating value={byRating} onChange={handleRatingChange} />
      </div>

      {/* RESET CONTROL */}
      <button
        className="bg-slate-500 text-white rounded-sm p-2 cursor-pointer"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
