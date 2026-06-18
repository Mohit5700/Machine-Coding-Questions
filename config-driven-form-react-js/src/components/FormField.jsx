import React from "react";
import {
  Checkbox,
  DatePicker,
  RadioButton,
  Slider,
  TextField,
} from "./FormElements";

/**
 * STRATEGY: Component Dictionary Mapping
 * Maps string identifiers directly to imported structural layout definitions.
 * This pattern completely avoids lengthy switch/case blocks and allows for clean code extension.
 */
const ComponentMapping = {
  TEXT_FIELD: TextField,
  RADIO_BUTTON: RadioButton,
  DATE_PICKER: DatePicker,
  SLIDER: Slider,
  CHECKBOX: Checkbox,
};

const FormField = ({ field, onChange }) => {
  // Look up the matching definition template based on the string value provided by the schema array
  const Component = ComponentMapping[field.component];

  // If a valid structural match is successfully resolved, render it out cleanly
  if (Component)
    return (
      <React.Fragment>
        {/* Pass down configuration attributes using the object spread operator */}
        <Component
          {...field}
          // ABSTRACTING THE EVENT: Individual inputs only emit raw values.
          // FormField automatically attaches the unique field 'name' back to the event payload.
          onChange={(value) => onChange(field.name, value)}
        />
        {/* Display descriptive error text underneath the field block if it exists */}
        {field?.error && <p style={{ color: "red" }}>{field?.error}</p>}
      </React.Fragment>
    );

  // Return null safely if an unknown component key is encountered
  return null;
};

export default FormField;
