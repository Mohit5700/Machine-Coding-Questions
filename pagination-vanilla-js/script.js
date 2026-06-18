// --- 1. Configuration & Global State ---
const PAGE_SIZE = 10; // Number of items to display per page

let products = []; // Will store the full list of 100 products
let page = 1; // Tracks the current active page

const app = document.querySelector(".app");

// --- 2. Data Fetching ---
const fetchProducts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data?.products) {
      products = data.products;
      render(); // Initial render once data is ready
    }
  } catch (error) {
    console.error("Error fetching products", error);
    app.innerHTML = "<h2>Failed to load products</h2>";
  }
};

// --- 3. Orchestration Render Function ---
// Clears the UI and re-builds both the product grid and the pagination buttons
const render = () => {
  app.innerHTML = "";

  const productsContainer = renderProducts();
  const paginationContainer = renderPagination();

  app.append(productsContainer);
  app.append(paginationContainer);
};

// --- 4. Product Grid Logic ---
const renderProducts = () => {
  const productsContainer = document.createElement("div");
  productsContainer.className = "products";

  // PAGINATION MATH:
  // start = (1 - 1) * 10 = 0
  // end   = 0 + 10 = 10
  // slice(0, 10) gets products at index 0 through 9
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const currentProducts = products.slice(start, end);

  currentProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "products__single";
    productCard.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" />
        <span>${product.title}</span>
    `;
    productsContainer.appendChild(productCard);
  });

  return productsContainer;
};

// --- 5. Pagination UI & Interaction ---
const renderPagination = () => {
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination";

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  // PREVIOUS Button: Only show if not on page 1
  if (page > 1) {
    const prevButton = createButton("⬅️", page - 1);
    paginationContainer.appendChild(prevButton);
  }

  // NUMERIC Page Buttons: Loop through total pages
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createButton(i, i, page === i);
    paginationContainer.appendChild(pageButton);
  }

  // NEXT Button: Only show if not on the last page
  if (page < totalPages) {
    const nextButton = createButton("➡️", page + 1);
    paginationContainer.appendChild(nextButton);
  }

  // EVENT DELEGATION:
  // Instead of adding listeners to every button, we listen on the container.
  paginationContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const selectedPage = Number(button.dataset.page);

    // Only re-render if a different page was clicked
    if (selectedPage !== page) {
      page = selectedPage;
      render(); // Re-trigger the whole render flow
      window.scrollTo(0, 0); // Optional: scroll back to top of page
    }
  });

  return paginationContainer;
};

// --- 6. Helper Function: Button Creation ---
const createButton = (text, pageNumber, isSelected = false) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.dataset.page = pageNumber; // Store page number in data attribute

  if (isSelected) {
    button.className = "pagination__selected";
  }

  return button;
};

fetchProducts();
