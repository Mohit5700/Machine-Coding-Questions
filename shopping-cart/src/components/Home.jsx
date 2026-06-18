import { useMemo } from "react";
import { useProductContext } from "../context/Context";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { filterProducts } from "../utils/filterProducts";

const Home = () => {
  // Extract raw unmutated product catalogs along with user preference structures
  const {
    state: { products, loading, error },
    filterState,
  } = useProductContext();

  /**
   * PERFORMANCE OPTIMIZATION: Memoized Multi-Criteria Filtering
   * filterProducts is an expensive calculation loop. Running it on every single
   * minor UI re-render would lag the application.
   *
   * useMemo ensures this filtering logic runs ONLY when:
   * 1. The raw API data changes ([products])
   * 2. The user changes a filter setting ([filterState])
   */
  const filteredProducts = useMemo(() => {
    return filterProducts({
      products,
      ...filterState, // Pass sort, byStock, byRating, and searchQuery properties
    });
  }, [products, filterState]);

  // Loading indicator guard clause
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // API Error feedback guard clause
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="flex">
      {/* Sidebar containing checkboxes, radios, and reset actions */}
      <Filters />
      {/* Main viewport displays only items matching criteria rules */}

      <Pagination products={filteredProducts} />
    </div>
  );
};

export default Home;
