import React, { useEffect, useCallback } from "react";
import "./App.css";
import useFetchProducts from "./hooks/useFetchProducts";

function App() {
  const { products, loading, error, total, fetchProducts } = useFetchProducts();

  // --- 1. Performance Optimization: Throttle ---
  // Limits how often a function can fire.
  // 'last' keeps track of the timestamp of the last successful call.
  const myThrottle = (cb, delay) => {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last < delay) return; // If called too soon, do nothing
      last = now;
      return cb(...args);
    };
  };

  // --- 2. Scroll Logic ---
  // useCallback is used so the function reference stays the same between renders,
  // preventing unnecessary event listener removals/attachments.
  const handleScroll = useCallback(
    myThrottle(() => {
      /* SCROLL MATH EXPLAINED:
         window.innerHeight: Height of the visible browser window.
         document.documentElement.scrollTop: How many pixels you have scrolled down.
         document.documentElement.offsetHeight: Total height of the entire page content.
         
         We add +500 as a "buffer" so the API is called BEFORE the user 
         actually hits the absolute bottom. This makes the scroll feel seamless.
      */
      const isNearBottom =
        window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight;

      // --- ADDED CONDITION HERE ---
      // 1. isNearBottom: Is the user at the bottom?
      // 2. !loading: Are we currently free (not already fetching)?
      // 3. products.length < total: Are there actually more products left to get?

      if (isNearBottom && !loading && products.length < total) {
        fetchProducts();
      }
    }, 500), // Only check scroll position every 500ms
    [loading, fetchProducts, products.length, total],
  );

  // --- 3. Event Listener Lifecycle ---
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // CLEANUP: Always remove listeners to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) return <h2>Error fetching Products {error.message}</h2>;

  return (
    <div>
      <h1>All Products</h1>
      <div className="products">
        {products.map((prod, index) => (
          // Using a combination of id and index for key safety if IDs repeat
          <div key={`${prod.id}-${index}`} className="products__single">
            <img src={prod.thumbnail} alt={prod.title} />
            <span>{prod.title}</span>
          </div>
        ))}
      </div>

      {/* Show loader at the bottom while fetching next batch */}
      {loading && <div>Loading more items...</div>}
    </div>
  );
}

export default App;
