import { useEffect } from "react";

/**
 * Custom Hook: Fires a callback handler when a click/mousedown event occurs
 * outside the referenced DOM node.
 *
 * @param {React.RefObject} elementRef - Ref attached to the inner modal box
 * @param {Function} handler - Callback function to trigger (closeModal)
 */
const useClickOutside = (elementRef, handler) => {
  // Event listener callback
  useEffect(() => {
    const listener = (event) => {
      // 1. Check if ref exists and points to a valid DOM element
      // 2. Check if the clicked target element is inside the ref container
      if (!elementRef.current || elementRef.current?.contains(event.target)) {
        return; // Click happened INSIDE the element -> Do nothing
      }

      // Click happened OUTSIDE the element -> Trigger close handler
      handler(event);
    };

    /**
     * Using 'mousedown' instead of 'click':
     * Prevents edge cases where user clicks and drags outside, or where
     * event bubbling from the button opening the modal triggers an immediate close.
     */
    document.addEventListener("mousedown", listener);

    // Clean up event listeners on unmount or when ref/handler changes
    return () => document.removeEventListener("click", listener);
  }, [elementRef, handler]);
};

export default useClickOutside;
