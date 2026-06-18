// --- Text input type layout interface ---
const TextField = ({ name, label, isRequired, type, onChange }) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>

      {/* onBlur captures user entries only when focus is shifted away from the input, 
          which helps prevent excessive re-renders while typing */}
      <input type={type} name={name} onBlur={(e) => onChange(e.target.value)} />
    </div>
  );
};

// --- Radio collection selection layout interface ---
const RadioButton = ({ name, label, isRequired, options, onChange }) => {
  return (
    <div className="inputContainer">
      <label>
        {label}
        {isRequired && <span>*</span>}
      </label>

      {/* Map through the configuration option array to create each radio item option */}
      {options.map((option) => {
        return (
          <div className="inputContainer" key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              // Standard inputs emit strings via target value attributes
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        );
      })}
    </div>
  );
};

// --- Calendar target date interface ---
const DatePicker = ({ name, label, isRequired, onChange }) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>

      <input
        type="date"
        name={name}
        placeholder="MM/DD/YYYY"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

// --- Numerical slider control interface ---
const Slider = ({ name, label, minValue, maxValue, isRequired, onChange }) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>

      <input
        type="range"
        name={name}
        min={minValue}
        max={maxValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

// --- Boolean toggle checkbox interface ---
const Checkbox = ({ name, label, isRequired, onChange }) => {
  return (
    <div className="inputContainer">
      <input
        type="checkbox"
        name={name}
        // CRITICAL CONTEXT DIFFERENCE: Checkboxes store values under the '.checked' property, NOT the '.value' property
        onChange={(e) => onChange(e.target.checked)}
      />

      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>
    </div>
  );
};

export { TextField, RadioButton, DatePicker, Slider, Checkbox };
