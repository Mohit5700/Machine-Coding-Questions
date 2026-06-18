import { useState } from "react";
import "./App.css";
import StarRating from "./components/StarRating";

const App = () => {
  // State to hold the final rating selected by the user
  const [rating, setRating] = useState(0);

  // Handler passed to the child to update parent state
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Star Rating</h2>
      {/* Reusable: We can change 'size' to any number 
         without changing the StarRating logic 
      */}
      <StarRating size={10} value={rating} onChange={handleRatingChange} />
      <h3>Current rating: {rating}</h3>
    </div>
  );
};

export default App;
