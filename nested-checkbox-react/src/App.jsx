import { useState } from "react";
import "./App.css";
import CheckboxContainer from "./components/CheckboxContainer";

import data from "./utils/data";
import { STATUS } from "./utils/constants";

function App() {
  const [checkboxData, setCheckboxData] = useState(data);

  /**
   * BOTTOM-UP RECALCULATION
   * Computes parent status based on the aggregated statuses of its direct children.
   */
  const computeParentStatus = (node) => {
    if (!node.children?.length) {
      return;
    }

    const children = node.children;

    const allChildrenChecked = children.every(
      (child) => child.status === STATUS.CHECKED,
    );

    const allChildrenUnchecked = children.every(
      (child) => child.status === STATUS.UNCHECKED,
    );

    if (allChildrenChecked) {
      node.status = STATUS.CHECKED;
    } else if (allChildrenUnchecked) {
      node.status = STATUS.UNCHECKED;
    } else {
      node.status = STATUS.INDETERMINATE;
    }
  };

  /**
   * RECURSIVE TREE UPDATE TRAVERSAL
   * Handles top-down updates for descendants & bottom-up updates for parents.
   */
  const updateTree = (
    node,
    targetId,
    shouldUpdateDescendants = false,
    parentStatus = null,
  ) => {
    // 1. Target Node Found: Toggle state and trigger descendant updates
    if (node.id === targetId) {
      node.status =
        node.status === STATUS.CHECKED ? STATUS.UNCHECKED : STATUS.CHECKED;
      shouldUpdateDescendants = true;
      parentStatus = node.status;
    }

    // 2. Top-Down Update: Force descendant children to inherit parent status
    if (shouldUpdateDescendants) {
      node.status = parentStatus;
    }

    // 3. Recursive Step: Process child nodes deeply
    if (node.children?.length) {
      node.children.forEach((child) => {
        updateTree(child, targetId, shouldUpdateDescendants, node.status);
      });
    }

    // 4. Bottom-Up Computation: Recalculate this node's status after children update
    computeParentStatus(node);
  };

  /**
   * CHECKBOX CHANGE HANDLER
   * Creates a deep clone of tree state and runs recursive update.
   */
  const handleCheckboxChange = (targetId) => {
    // Clone the tree before modifying it
    const updatedTree = structuredClone(checkboxData);

    updatedTree.forEach((rootNode) => {
      updateTree(rootNode, targetId);
    });

    setCheckboxData(updatedTree);
  };
  return (
    <div>
      <CheckboxContainer
        checkboxData={checkboxData}
        handleChange={handleCheckboxChange}
      />
    </div>
  );
}

export default App;
