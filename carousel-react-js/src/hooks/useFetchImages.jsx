import { useEffect, useState } from "react";
import { IMAGES_URL } from "../utils/constants";

const useFetchImages = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${IMAGES_URL}`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run once on mount to trigger the API call
  useEffect(() => {
    fetchImages();
  }, []);

  // Return values that the component needs to track state
  return { loading, images };
};

export default useFetchImages;
