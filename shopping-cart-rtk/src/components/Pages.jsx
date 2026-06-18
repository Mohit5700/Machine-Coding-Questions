import { MAX_VISIBLE_PAGES } from "../utils/constants";

const Pages = ({ currentPage, totalPages, setCurrentPage }) => {
  // --- 1. Page Change Handler ---
  const selectPageHandler = (selectedPage) => {
    // Only update if the target page is valid and not already active
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== currentPage
    ) {
      setCurrentPage(selectedPage);
      window.scrollTo(0, 0); // Scroll to top for better UX
    }
  };

  // --- 2. Helper: Individual Button Renderer ---
  const renderPageButton = (pageToRender, key) => {
    const isEllipsis = pageToRender === "...";

    return (
      <button
        key={key}
        // Apply active styling if this button matches the current state
        className={currentPage === pageToRender ? "pagination__selected" : ""}
        // Disable click functionality for ellipsis strings
        onClick={() => !isEllipsis && selectPageHandler(pageToRender)}
      >
        {pageToRender}
      </button>
    );
  };

  // --- 3. Main Logic: Generating the Number Array ---
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // CASE 1: Small total pages. If we have 4 pages total and max is 5, just show all of them.
    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i, i));
      }
    }

    // CASE 2: Huge total pages. We must truncate.
    else {
      /* Calculating "startPage" (The left edge of our window):
      We try to center the current page. If currentPage = 10, and MAX_VISIBLE_PAGES = 5:
      10 - Math.floor(5 / 2) => 10 - 2 = 8.
      Math.max(1, 8) ensures we never get a start page less than 1.
    */
      const startPage = Math.max(
        1,
        currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
      );

      /* Calculating "endPage" (The right edge of our window):
      If startPage is 8: 8 + 5 - 1 = 12.
      Math.min(20, 12) ensures our end page never exceeds the total page count (20).
    */
      const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

      // --- STEP A: Handling the LEFT side (Start Ellipsis) ---
      // If our window starts at page 3 or more, we need an ellipsis on the left.
      if (startPage > 1) {
        // If there's a gap, always show page [1] first
        if (startPage > 2) {
          pageNumbers.push(renderPageButton(1, 1));
        }
        // Then insert the left ellipsis: [1] [ ... ]
        pageNumbers.push(renderPageButton("...", "ellipsis-start"));
      }

      // --- STEP B: Render the Active Window ---
      // Loops from startPage (8) to endPage (12) and pushes buttons: [8] [9] [10] [11] [12]
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageButton(i, i));
      }

      // --- STEP C: Handling the RIGHT side (End Ellipsis) ---
      // If our window ends before the final page, we need an ellipsis on the right.
      if (endPage < totalPages) {
        // Insert the right ellipsis: [ ... ]
        pageNumbers.push(renderPageButton("...", "ellipsis-end"));

        // If there's a gap, make sure the very last page is always accessible: [ ... ] [20]
        if (endPage < totalPages - 1) {
          pageNumbers.push(renderPageButton(totalPages, totalPages));
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {/* Previous Button: Disabled if on the first page */}
      <button
        disabled={currentPage === 1}
        className={currentPage === 1 ? "pagination__disable" : ""}
        onClick={() => selectPageHandler(currentPage - 1)}
      >
        ◀
      </button>

      {/* Dynamic list of numbers and ellipsis */}
      {renderPageNumbers()}

      {/* Next Button: Disabled if on the last page */}
      <button
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "pagination__disable" : ""}
        onClick={() => selectPageHandler(currentPage + 1)}
      >
        ▶
      </button>
    </div>
  );
};

export default Pages;
