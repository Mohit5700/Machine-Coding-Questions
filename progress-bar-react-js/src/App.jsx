import { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

const App = () => {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Simulate a process (like a file upload) by incrementing value
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    // Cleanup interval to prevent memory leaks if the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <span>Progress Bar</span>

      {/* SCALABILITY: Passing 'onComplete' allows the parent to decide 
        what happens when finished (e.g., showing a message, redirecting, etc.)
      */}
      <ProgressBar value={value} onComplete={() => setSuccess(true)} />

      <span>{success ? "Complete!" : "Loading..."}</span>
    </div>
  );
};

export default App;
