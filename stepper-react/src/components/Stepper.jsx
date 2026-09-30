import { useState } from "react";

/**
 * Stepper Component
 * @param {Array} steps - Array of step objects, e.g., [{ label: "Step 1", content: <Component /> }]
 */
const Stepper = ({ steps }) => {
  // State tracking active step index (0-indexed)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Derived state flags for boundary conditions
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Handler to advance to the next step
  const handleContinue = () => {
    if (!isLastStep) {
      setCurrentStepIndex((previousIndex) => previousIndex + 1);
    }
  };

  // Handler to regress to the previous step
  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((previousIndex) => previousIndex - 1);
    }
  };

  // Guard clause: Prevent rendering if steps array is empty/unprovided
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="stepper">
      {/* Step Indicators Header Container */}
      <div>
        {steps.map(({ label }, index) => {
          // Derived booleans for step status relative to active step index
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div key={label} className="stepper-container">
              {/* Step Badge / Circle */}
              <div
                className={`step-number ${
                  isCompleted || isActive ? "active" : ""
                }`}
              >
                {/* Show checkmark icon for completed steps, otherwise 1-based index */}
                {isCompleted ? "✓" : index + 1}

                {/* Vertical connecting line rendered between steps (omitted for the final step) */}
                {index < steps.length - 1 && (
                  <div
                    className={`step-line ${isCompleted ? "active" : ""}`}
                  ></div>
                )}
              </div>

              {/* Step Label Title */}
              <div className="step-label">{label}</div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Content Panel for current active step */}
      <div className="stepper-content">{steps[currentStepIndex].content}</div>

      {/* Action Controls */}
      <div className="stepper-controls">
        {/* Render 'Back' button on all steps except the first step.*/}
        {!isFirstStep && <button onClick={handleBack}>Back</button>}

        {/* Render 'Continue' or 'Finish' action depending on current step */}
        <button onClick={handleContinue}>
          {isLastStep ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Stepper;
