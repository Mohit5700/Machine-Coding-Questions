import { useState } from "react";
import { items } from "../utils/constants";

const Accordion = () => {
  // Track index of currently expanded item (null means all items are collapsed)
  const [open, setOpen] = useState(null);

  // Toggle behavior: If clicking the open item, collapse it (null); otherwise, set new open index
  const handleClick = (index) => {
    setOpen(open === index ? null : index);
  };

  // Guard Clause: Prevent runtime crashes if data source is missing, undefined, or empty
  if (!items || items.length === 0) return <div>No items available</div>;

  return (
    <div className="accordion">
      {items.map((item, index) => {
        // Derive boolean flag to determine if current item is expanded
        const isOpen = open === index;

        return (
          <div key={item.id} className="accordion-item">
            {/* Header button triggers toggle action */}
            <button
              className="accordion-title"
              onClick={() => handleClick(index)}
            >
              {item.title}
              {/* Indicator icon updates dynamically based on toggle state */}
              <span>{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* Conditional Rendering: Only mount content div when section is expanded */}
            {isOpen && <div className="accordion-content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
