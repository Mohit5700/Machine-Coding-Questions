const FileNode = ({ node, expandedFolders, onToggle }) => {
  // Lookup expansion status for this specific node ID from shared state
  const isExpanded = expandedFolders[node.id];

  // Delegate folder toggle action back to root state handler
  const handleToggle = () => {
    onToggle(node.id);
  };

  return (
    <div className="file-node">
      {/* Node Header Row */}
      <div className="file-name">
        {/* Render toggle button only if node is a folder */}
        {node.isFolder && (
          <button className="expand-button" onClick={handleToggle}>
            {isExpanded ? "-" : "+"}
          </button>
        )}

        {/* Display appropriate icon based on node type */}
        <span>
          {node.isFolder ? "📁" : "📄"} {node.name}
        </span>
      </div>

      {/* RECURSIVE BRANCHING:
          If current node is a folder, is expanded, and contains children,
          recursively render <FileNode /> for each child node. */}
      {node.isFolder && isExpanded && node.children?.length > 0 && (
        <div className="children">
          {node.children.map((childNode) => (
            <FileNode
              key={childNode.id}
              node={childNode}
              expandedFolders={expandedFolders}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileNode;
