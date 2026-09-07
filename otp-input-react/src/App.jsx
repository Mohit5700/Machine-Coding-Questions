import { useEffect, useRef, useState } from "react";
import "./App.css";

// Configurable length for the OTP code
const OTP_LENGTH = 5;

function App() {
  // Initialize state with an array of empty strings matching OTP length
  const [otpValues, setOtpValues] = useState(new Array(OTP_LENGTH).fill(""));

  // Ref array to store references to all input DOM elements for focus control
  const inputRefs = useRef([]);

  // Auto-focus the first input box when the component mounts
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handles character input for individual boxes
  const handleInputChange = (value, index) => {
    // Sanitize input: Reject non-numeric characters completely
    if (isNaN(value)) {
      return;
    }

    // Extract only the latest entered character (handles fast typing/overwriting)
    const digit = value.slice(-1);

    // Update state immutably by replacing character at target index
    setOtpValues((previousValues) => {
      const updatedValues = [...previousValues];
      updatedValues[index] = digit;
      return updatedValues;
    });

    // Auto-advance focus to the next input box if a digit was entered
    if (digit) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handles non-character keyboard shortcuts (Backspace & Arrow Keys)
  const handleKeyDown = (event, index) => {
    // Backspace logic: If current field is empty, move focus back to previous input
    if (event.key === "Backspace" && !otpValues[index]) {
      inputRefs.current[index - 1]?.focus();
    }

    // Left Arrow key: Move focus one box to the left
    if (event.key === "ArrowLeft") {
      inputRefs.current[index - 1]?.focus();
    }

    // Right Arrow key: Move focus one box to the right
    if (event.key === "ArrowRight") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Derived state values computed on each render
  const otp = otpValues.join("");
  const isOtpComplete = otp.length === OTP_LENGTH;

  return (
    <div className="app">
      <h1>Validate OTP</h1>

      <div className="otp-container">
        {otpValues.map((digit, index) => (
          <input
            key={index}
            // Callback Ref Pattern: Dynamically assign DOM nodes to our ref array
            ref={(inputElement) => {
              inputRefs.current[index] = inputElement;
            }}
            type="text"
            // Mobile-friendly optimization: Forces numeric keypad display
            inputMode="numeric"
            maxLength={1}
            className="otp-input"
            value={digit}
            onChange={(event) => handleInputChange(event.target.value, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        ))}
      </div>

      {/* Render status message once all input boxes contain a character */}
      {isOtpComplete && <p>OTP entered: {otp}</p>}
    </div>
  );
}

export default App;
