import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="app">
      <button onClick={openModal}>Show Modal</button>

      {/* Render Modal passing visibility state and close handler */}
      <Modal isOpen={showModal} closeModal={closeModal} />
    </div>
  );
}

export default App;
