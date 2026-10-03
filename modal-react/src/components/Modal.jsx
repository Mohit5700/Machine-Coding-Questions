import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useEffect } from "react";

/**
 * Modal Component with Click Outside & ESC key handling
 */
const Modal = ({ isOpen, closeModal }) => {
  // Ref attached to the internal modal container
  const modalContentRef = useRef();

  // Bind custom click outside hook to modal content node
  useClickOutside(modalContentRef, closeModal);

  // Close modal when pressing the ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Early return if modal is not active
  if (!isOpen) return null;

  return (
    <div ref={modalContentRef} className="modal-container">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sed quis
        iure accusantium cumque quos totam, ipsa hic modi illum qui nulla
        possimus tenetur illo amet explicabo, tempora ullam blanditiis?
      </p>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default Modal;
