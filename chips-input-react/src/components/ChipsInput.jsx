import { useState } from "react";

const ChipsInput = () => {
  // State for tracking current text inside the input box
  const [inputText, setInputText] = useState("");

  // State for holding the list of generated chips
  const [chips, setChips] = useState([]);

  // Controlled component handler: updates local state as user types
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Keyboard handler: listens for 'Enter' key to create a new chip
  const handleKeyPress = (e) => {
    const key = e.key;

    // Check if key is Enter and input contains non-whitespace characters
    if (key === "Enter" && inputText.trim()) {
      // Append sanitized input to existing chips list immutably
      setChips((prev) => [...prev, inputText.trim()]);

      // Reset input field after successfully adding chip
      setInputText("");
    }
  };

  // Deletes chip at target index while keeping state immutable
  const removeChip = (indexToRemove) => {
    // Create shallow copy to avoid mutating original state directly
    const copyChips = [...chips];

    // Remove 1 item at the given index position
    copyChips.splice(indexToRemove, 1);

    // Update state with newly filtered array
    setChips(copyChips);
  };

  return (
    <div className="chips-input-container">
      <h1>Chips Input</h1>

      {/* Controlled input element listening for text change & enter keydown */}
      <input
        value={inputText}
        className="chips-input"
        type="text"
        placeholder="Type a chip and press enter"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />

      {/* Container displaying generated chips */}
      <div className="chips-container">
        {chips.map((chip, index) => (
          // Using index as key (acceptable for simple list reordering without unique IDs)
          <div key={index} className="chip">
            <span>{chip}</span>

            {/* Remove button bound to chip's specific index */}
            <button className="remove-btn" onClick={() => removeChip(index)}>
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChipsInput;
