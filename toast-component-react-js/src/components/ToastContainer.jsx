import { BUTTONS } from "../utils/constants";
import useToast from "../hooks/useToast";

const ToastContainer = () => {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <div className="container">
      {/* NOTIFICATIONS VIEWPORT: 
         This div is fixed to the top-right. It renders the list of active toasts.
      */}
      <div className="toast-container">
        {toasts.map(({ id, type, message }) => {
          return (
            /* We use the 'type' (success, error, etc.) as a CSS class for dynamic coloring */
            <div key={id} className={`toast ${type}`}>
              {message}
              {/* MANUAL REMOVE: User can click 'X' to dismiss early */}
              <span onClick={() => removeToast(id)}>X</span>
            </div>
          );
        })}
      </div>

      {/* TRIGGER BUTTONS: Maps through our configuration to create action buttons */}
      <div className="btn-container">
        {BUTTONS.map(({ label, type }) => (
          <button key={type} className="btn" onClick={() => addToast(type)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
