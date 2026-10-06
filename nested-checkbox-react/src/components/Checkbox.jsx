import { useEffect, useRef } from "react";

import { STATUS } from "../utils/constants";

/**
 * ATOMIC CHECKBOX COMPONENT
 * Handles imperatively setting the DOM 'indeterminate' property via useRef
 */
const Checkbox = ({ label, status, id, handleChange }) => {
  const checkboxRef = useRef(null);

  // Sync the DOM imperative property 'indeterminate' whenever status changes
  useEffect(() => {
    checkboxRef.current.indeterminate = status === STATUS.INDETERMINATE;
  }, [status]);

  return (
    <div>
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={status === STATUS.CHECKED}
        onChange={() => handleChange(id)}
      />

      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
