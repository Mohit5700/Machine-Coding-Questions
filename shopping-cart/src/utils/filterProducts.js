export const filterProducts = ({
  products,
  sort,
  byStock,
  byRating,
  searchQuery,
}) => {
  // CRITICAL STEP: Create a shallow copy array using spread operator [...products]
  // Array.prototype.sort() mutates the original reference.
  // Modifying original React states directly is a fatal error; copying keeps it safe.
  let filteredProducts = [...products];

  // Pipeline Step 1: Price Sorting
  if (sort) {
    filteredProducts.sort((a, b) =>
      sort === "lowToHigh" ? a.price - b.price : b.price - a.price,
    );
  }

  // Pipeline Step 2: Stock Availability Checks
  if (!byStock) {
    filteredProducts = filteredProducts.filter(
      (product) => product.availabilityStatus !== "Low Stock",
    );
  }

  // Pipeline Step 3: Minimum Star Thresholding
  if (byRating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= byRating,
    );
  }

  // Pipeline Step 4: Text Regex Target Match Query Checks
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  // Return the fully massaged results collection to Home's useMemo hooks container
  return filteredProducts;
};
