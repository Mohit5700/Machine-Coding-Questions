import { useState } from "react";
import fileData from "../utils/data.json";
import FileNode from "./FileNode";

const FileExplorer = () => {
  // Hash map state tracking expand/collapse status by folder ID (e.g., { "1": true, "2": false })
  // Using an object avoids mutating deep tree structures directly
  const [expandedFolders, setExpandedFolders] = useState({});

  // Toggles the visibility state of a single folder given its unique ID
  const toggleFolder = (id) => {
    setExpandedFolders((previousState) => ({
      ...previousState,
      [id]: !previousState[id], // Flips boolean flag for target ID
    }));
  };

  return (
    <div className="file-explorer">
      <h1>File Explorer</h1>

      {/* Render top-level nodes of the file tree */}
      <div className="file-tree">
        {fileData.map((node) => (
          <FileNode
            key={node.id}
            node={node}
            expandedFolders={expandedFolders}
            onToggle={toggleFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
