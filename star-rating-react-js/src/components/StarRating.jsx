import React, { useState } from "react";

const StarRating = ({ size = 5, value = 0, onChange = () => {} }) => {
  // INTERNAL STATE: Tracks which star the mouse is currently over
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="star-rating">
      {/* Create an array of 'size' length and map through it to render stars */}
      {Array(size)
        .fill("")
        .map((_, index) => {
          // index is 0-based, so we add 1 for star values (1, 2, 3...)
          const starNumber = index + 1;

          // LOGIC: A star should be gold if:
          // 1. User is hovering AND this star is <= the hovered star
          // 2. User is NOT hovering AND this star is <= the saved rating (value)
          const isActive =
            hoverValue > 0 ? starNumber <= hoverValue : starNumber <= value;

          return (
            <span
              key={index}
              className={isActive ? "gold" : ""}
              // Updates persistent parent state
              onClick={() => onChange(starNumber)}
              // Updates temporary hover state
              onMouseEnter={() => setHoverValue(starNumber)}
              // Resets hover state so the saved rating becomes visible again
              onMouseLeave={() => setHoverValue(0)}
            >
              {/* HTML Entity for a star symbol */}
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
