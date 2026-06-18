import { useState } from "react";
import Products from "./Products";
import Pages from "./Pages";
import { PAGE_SIZE } from "../utils/constants";

const Pagination = ({ products }) => {
  // Track the current page locally
  const [currentPage, setCurrentPage] = useState(1);

  // --- PAGINATION CALCULATIONS ---
  // Determine total pages based on data length and size per page
  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  // Calculate index range for the .slice() method
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // Create a subset of products for the current view
  const currentProducts = products.slice(start, end);

  return (
    <div>
      {/* Pass only the 10 relevant products to the list component */}
      <Products products={currentProducts} />

      {/* Only render pagination controls if there is data */}
      {totalPages > 0 && (
        <Pages
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Pagination;
