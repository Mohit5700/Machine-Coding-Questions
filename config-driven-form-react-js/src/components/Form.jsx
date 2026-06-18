import { useState } from "react";
import FormField from "./FormField";
import * as yup from "yup";

const Form = ({ schema = [], onSubmit = () => {} }) => {
  // Global form state object mapping field name keys to user entries (e.g., { name: "John", email: "j@me.com" })
  const [formData, setFormData] = useState({});
  // Object tracking active validation errors (e.g., { email: "Invalid email address" })
  const [errors, setErrors] = useState({});

  /**
   * MECHANISM: Dynamic Object Schema Generation
   * Yup expects a master schema format like: yup.object().shape({ name: yup.string(), ... })
   * We parse the structural schema array using .reduce() to merge independent rules into an aggregate object.
   */
  const validationSchema = yup.object().shape(
    schema.reduce((acc, field) => {
      // Check if a validation rule property exists on the configuration item
      if (field.validate) {
        acc[field.name] = field.validate; // Map the validation rule directly onto the name key
      }
      return acc; // Return the growing validation registry object for the next loop pass
    }, {}), // Start the accumulator as an empty container object
  );

  /**
   * ACTION: Handle Form Submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Halt the standard page reload form behavior

    try {
      // Run Yup validation against the current state values
      // { abortEarly: false } ensures Yup parses ALL inputs instead of stopping at the first error found
      await validationSchema.validate(formData, { abortEarly: false });

      setErrors({}); // Empty out error tracks upon a valid evaluation pass
      onSubmit(formData); // Fire the callback function passed from the parent app wrapper
    } catch (err) {
      /**
       * ERROR PROCESSING: Extracting Validation Issues
       * Failed structural assertions throw exceptions containing an 'inner' list array of problems.
       * We run .reduce() over this collection to map them clearly into key-value pairs.
       */
      const validationErrors = err.inner.reduce((acc, error) => {
        // error.path matches the field name (e.g., 'name'), error.message contains the descriptive string
        acc[error.path] = error.message;
        return acc;
      }, {});

      setErrors(validationErrors); // Push errors into our UI component state
    }
  };

  /**
   * DYNAMIC STATE HANDLER: Updates specific keys dynamically
   * Uses dynamic object keys [name] to support abstract inputs.
   */
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Loop through the template schema arrays to generate UI configurations dynamically */}
      {schema.map((field, index) => {
        return (
          <FormField
            key={index}
            // Spread field config parameters down while appending an explicit contextual field error if it exists
            field={{ ...field, error: errors[field.name] }}
            // Feed the input its current value from the master source of truth, defaulting to empty space
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
