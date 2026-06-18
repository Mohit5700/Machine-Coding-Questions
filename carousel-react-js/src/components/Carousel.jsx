import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ images = [], isLoading = false }) => {
  // index: Tracks which image is currently visible
  const [index, setIndex] = useState(0);

  // intervalRef: Stores the ID of the setInterval so we can stop it later.
  // We use useRef because changing it doesn't trigger a re-render.
  const intervalRef = useRef(null);

  // --- Handlers ---
  const handlePrev = () => {
    // If at first image (0), go to the last one. Otherwise, decrement.
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    // If at last image, loop back to the first (0). Otherwise, increment.
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // --- Timer Management ---
  const startAutoSlide = () => {
    stopAutoSlide(); // Safety check: Clear any existing timers before starting a new one
    intervalRef.current = setInterval(handleNext, 1000); // 1-second interval
  };

  const stopAutoSlide = () => {
    // Stop the interval using the stored reference
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Effect to start the timer when images are loaded
  useEffect(() => {
    if (!images.length) return;

    startAutoSlide();

    // CLEANUP: If the component is removed from the screen (unmounted),
    // we MUST clear the interval to avoid memory leaks or errors.
    return stopAutoSlide;
  }, []);

  // --- Conditional Rendering ---
  if (isLoading) return <div>Loading...</div>;
  if (!images.length) return <div>No images</div>;

  return (
    <div
      className="container"
      /* Pause on hover, Resume on mouse leave */
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <button className="left-btn" onClick={handlePrev}>
        {"<"}
      </button>

      {/* Dynamic image based on state index */}
      <img src={images[index].download_url} alt="carousel" />

      <button className="right-btn" onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
