import React, { useState } from "react";
import { folderStructure } from "./config/treeData";
import { FilePlus, FolderPlus, Trash2 } from "lucide-react";
import { addNodeToList } from "./Methods/addNodeToList";
import List from "./Component/List";
import { removeNode } from "./Methods/removeNode";

const HierarchicalTree: React.FC = () => {
  const [treeData, setTreeData] = useState<any[]>(folderStructure);

  const isTreeEmpty = treeData.length === 0 || treeData.every((node) => !node.children || node.children.length === 0);

  return (
    <div className="container" style={{ padding: "1rem" }}>
      <div className="header">
        <h1>Hierarchical Tree</h1>
        <p>This is the Hierarchical Tree component.</p>
        <p>It will display a tree structure based on the provided data.</p>
      </div>

      <div>
        <h2 className="folderStructure">File/Folder Structure</h2>

        {/* Show Create Folder button when tree is empty */}
        {isTreeEmpty && (
          <div className="create-folder-btn">
            <button onClick={() => addNodeToList("", setTreeData, treeData, true)}>Create Folder</button>
          </div>
        )}

        <div className="tree-container">
          {treeData.map((node) => (
            <List
              key={node.id}
              data={[node]}
              addNodeToList={(parentId, isFolder) => addNodeToList(parentId, setTreeData, treeData, isFolder)}
              removeNode={(nodeId) => removeNode(nodeId, treeData, setTreeData)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HierarchicalTree;
