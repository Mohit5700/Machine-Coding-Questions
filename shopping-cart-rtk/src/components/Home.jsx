import { useEffect, useMemo } from "react";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { filterProducts } from "../utils/filterProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../utils/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.products);
  const filterState = useSelector((store) => store.filter);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
