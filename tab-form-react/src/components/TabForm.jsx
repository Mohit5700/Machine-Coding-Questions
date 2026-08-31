import { useState } from "react";
import Interests from "../components/Interests";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

// ==========================================
// VALIDATION HELPER FUNCTIONS
// Each function validates a specific section of the form data
// and returns an object containing error messages (if any).
// ==========================================

// Validates fields inside the Profile tab
const validateProfile = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name is not valid";
  }

  if (!data.age || Number(data.age) < 18) {
    errors.age = "Age must be at least 18";
  }

  if (!data.email || !data.email.includes("@")) {
    errors.email = "Email is not valid";
  }

  return errors;
};

// Validates fields inside the Interests tab
const validateInterests = (data) => {
  const errors = {};

  if (data.interests.length === 0) {
    errors.interests = "Select at least one interest";
  }

  return errors;
};

// ==========================================
// CONFIGURATION ARRAY
// Config-driven pattern: Maps each tab to its component and validator.
// Making it easy to add or reorder tabs in the future.
// ==========================================
const tabs = [
  {
    name: "Profile",
    component: Profile,
    validate: validateProfile,
  },
  {
    name: "Interests",
    component: Interests,
    validate: validateInterests,
  },
  {
    name: "Settings",
    component: Settings,
    validate: () => ({}), // Settings tab requires no validation
  },
];

const TabForm = () => {
  // Track currently active tab index (0: Profile, 1: Interests, 2: Settings)
  const [activeTab, setActiveTab] = useState(0);

  // Centralized state holding all multi-step form data
  const [data, setData] = useState({
    name: "Mohit",
    age: "26",
    email: "mohit@gmail.com",
    interests: [],
    theme: "dark",
  });

  // Object storing error messages for the current active tab
  const [errors, setErrors] = useState({});

  // Validates the active tab's fields; updates error state and returns boolean validity
  const validateCurrentTab = () => {
    const validationErrors = tabs[activeTab].validate(data);
    setErrors(validationErrors);

    // Returns true if no validation errors exist
    return Object.keys(validationErrors).length === 0;
  };

  // Handler for 'Next' button navigation
  const handleNext = () => {
    // Block navigation past the final tab
    if (activeTab === tabs.length - 1) return;

    // Proceed to next tab only if current tab data passes validation
    if (validateCurrentTab()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  // Handler for 'Prev' button navigation
  const handlePrev = () => {
    // Block navigation before the first tab
    if (activeTab === 0) return;

    // Clear active errors and step backward (no validation needed when moving back)
    setErrors({});
    setActiveTab((prev) => prev - 1);
  };

  // Handler for clicking directly on header tab buttons
  const handleTabChange = (index) => {
    if (index === activeTab) return;

    // Prevent skipping forward to future tabs without validating current step
    if (index > activeTab) {
      if (!validateCurrentTab()) return;
    }

    // Reset errors when switching tabs successfully
    setErrors({});
    setActiveTab(index);
  };

  // Final submit handler for the last step
  const handleSubmit = () => {
    if (!validateCurrentTab()) return;

    console.log("Form submitted:", data);
  };

  // Dynamically assign the component for the active tab (JSX requires capital letter variable)
  const ActiveTabComponent = tabs[activeTab].component;

  return (
    <div className="tab-form">
      {/* Tab Navigation Headers */}
      <div className="heading-container">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            className={`heading ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabChange(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Dynamic Body: Renders whichever component corresponds to active tab */}
      <div className="tab-body">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>

      {/* Action Navigation Controls */}
      <div className="actions">
        {/* Hide 'Prev' on the first step */}
        {activeTab > 0 && <button onClick={handlePrev}>Prev</button>}

        {/* Render 'Next' for intermediate tabs, 'Submit' for final tab */}
        {activeTab < tabs.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
