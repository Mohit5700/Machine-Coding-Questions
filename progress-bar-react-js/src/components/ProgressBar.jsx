import { useEffect, useState } from "react";
import { MAX, MIN } from "../utils/constants";

const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    // CLAMPING: Ensures value stays between 0 and 100 even if wrong props are passed
    const newPercent = Math.min(MAX, Math.max(value, MIN));

    setPercent(newPercent);

    // Trigger the callback once completion is reached
    if (newPercent >= MAX) {
      onComplete();
    }
  }, [value, onComplete]);

  return (
    <div
      className="progress"
      /* ACCESSIBILITY: These ARIA roles tell Screen Readers exactly what this element is */
      role="progressbar"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={percent}
    >
      {/* VISIBILITY: Changing text color based on progress ensures the number 
        remains readable against the moving green background.
      */}
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>

      <div
        /* PERFORMANCE TIP: Using 'transform: scaleX' is better than 'width'. 
          'width' triggers a "Reflow" (re-calculating the layout of the whole page), 
          while 'transform' happens on the GPU (Compositor stage), making it much smoother.
        */
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left", // Ensures the bar grows from left to right
        }}
      />
    </div>
  );
};

export default ProgressBar;
