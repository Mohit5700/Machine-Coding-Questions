import React, { useEffect, useState } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    // If we're already fetching, don't start another request
    if (loading) return;

    setLoading(true);
    try {
      // Logic: skip = (page - 1) * 10
      // Page 1: skip 0, Page 2: skip 10, etc.
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`,
      );
      const data = await res.json();

      // IMPORTANT: Append new products to the existing list using the spread operator
      setProducts((prev) => [...prev, ...data.products]);

      // Store the total number of products
      setTotal(data.total);

      // Increment page number for the next fetch
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, total, fetchProducts };
};

export default useFetchProducts;
