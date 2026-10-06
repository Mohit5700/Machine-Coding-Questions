import Checkbox from "./Checkbox";

/**
 * RECURSIVE COMPONENT: Renders checkbox nodes and nested child containers
 */
const CheckboxContainer = ({ checkboxData, handleChange }) => {
  return (
    <div>
      {checkboxData.map((node) => (
        <div
          key={node.id}
          style={{
            marginLeft: "16px",
            padding: "4px",
          }}
        >
          {/* Individual Checkbox Node */}
          <Checkbox
            id={node.id}
            label={node.label}
            status={node.status}
            handleChange={handleChange}
          />

          {/* Recursive Call: Render child items if present */}
          {node.children?.length > 0 && (
            <CheckboxContainer
              checkboxData={node.children}
              handleChange={handleChange}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckboxContainer;
