import { useEffect, useState } from "react";
import { PRODUCTS_API } from "../utils/constants";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(PRODUCTS_API);
      const data = await res.json();

      if (data?.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
