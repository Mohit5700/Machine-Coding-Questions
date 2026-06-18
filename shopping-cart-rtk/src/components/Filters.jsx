import { useSearchParams } from "react-router-dom";
import StarRating from "./StarRating";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  filterByRating,
  filterBySearch,
  filterByStock,
  sortByPrice,
} from "../utils/filterSlice";

const filterMap = {
  sort: sortByPrice,
  byStock: filterByStock,
  byRating: filterByRating,
  searchQuery: filterBySearch,
};

const Filters = () => {
  const dispatch = useDispatch();

  const { sort, byStock, byRating, searchQuery } = useSelector(
    (store) => store.filter,
  );

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
      dispatch(filterMap[key](parsedValue));
    });
  }, [searchParams, dispatch]); // Runs when parameters shift or context hotloads

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
    if (searchQuery.trim()) {
      params.searchQuery = searchQuery;
    }

    // Rewrite the browser address bar query strings (e.g., localhost:3000/?sort=highToLow)
    setSearchParams(params);
  }, [sort, byStock, byRating, searchQuery, setSearchParams]);

  // --- LOCAL EVENT DISPATCHERS ---
  const handleSortChange = (value) => {
    dispatch(sortByPrice(value));
  };

  const handleStockChange = () => {
    dispatch(filterByStock(!byStock));
  };

  const handleRatingChange = (rating) => {
    dispatch(filterByRating(rating));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
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
