import { useEffect, useRef, useState } from "react";
import { TOAST_MESSAGES } from "../utils/constants";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  /**
   * WHY USE REF FOR TIMERS?
   * timersRef.current is an object that stores our active setTimeout IDs.
   * Using a Ref allows us to keep track of these IDs without causing
   * the component to re-render every time a timer starts or stops.
   */
  const timersRef = useRef({});

  const removeToast = (id) => {
    // 1. Clear the specific timer associated with this ID to prevent memory leaks
    clearTimeout(timersRef.current[id]);
    // 2. Clean up our tracking object
    delete timersRef.current[id];

    // 3. Update state to filter out the removed toast
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const addToast = (type) => {
    // Use modern browser API to generate a unique ID for each notification
    const id = crypto.randomUUID();
    const message = TOAST_MESSAGES[type];

    // ADD: Add the new toast to our list
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);

    // AUTO-REMOVE: Set a timer to automatically delete this toast after 5 seconds
    timersRef.current[id] = setTimeout(() => removeToast(id), 5000);
  };

  /**
   * CLEANUP ON UNMOUNT:
   * If the user leaves the page/component while toasts are still active,
   * we must kill all pending timers. This prevents "state updates on unmounted components."
   */
  useEffect(() => {
    return () => {
      // Loop through all active timer IDs and cancel them
      Object.values(timersRef.current).forEach(clearTimeout);
      timersRef.current = {};
    };
  }, []);

  return { toasts, addToast, removeToast };
};

export default useToast;
