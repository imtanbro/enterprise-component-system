import { FilePlus, FolderPlus, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Node {
  id: string;
  name: string;
  isFolder: boolean;
  children: Node[] | undefined;
}

interface ListProps {
  data: Node[];
  addNodeToList: (parentId: string, isFolder: boolean) => void;
  removeNode: (nodeId: string) => void;
}

const List: React.FC<ListProps> = ({ data, addNodeToList, removeNode }) => {
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="list-container">
      {data.map((node) => (
        <div key={node.id} className="node">
          <div className="node-header" onClick={() => setIsExpanded((prev) => ({ ...prev, [node.name]: !prev[node.name] }))}>
            <div className="node-name">
              {node.isFolder && <span>{isExpanded[node.name] ? "- " : "+ "} </span>}
              <span>{node.name}</span>
            </div>
            <div className="node-actions">
              {node.isFolder && (
                <span className="add-folder" onClick={() => addNodeToList(node.id, true)}>
                  <FolderPlus size={20} />
                </span>
              )}
              <span className="add-file" onClick={() => addNodeToList(node.id, false)}>
                {node.isFolder && <FilePlus size={20} />}
              </span>
              <span className="remove-node" onClick={() => removeNode(node.id)}>
                <Trash2 size={20} />
              </span>
            </div>
          </div>

          {isExpanded[node.name] && node.children && node.children.length > 0 && (
            <List data={node.children} addNodeToList={addNodeToList} removeNode={removeNode} />
          )}
        </div>
      ))}
    </div>
  );
};

export default List;