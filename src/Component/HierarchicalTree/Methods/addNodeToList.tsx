interface TreeNode {
  id: string;
  name: string;
  isFolder: boolean;
  children: TreeNode[] | undefined;
}

type SetTreeData = (treeData: TreeNode[]) => void;

export const addNodeToList = (parentId: string, setTreeData: SetTreeData, treeData: TreeNode[], isFolder: boolean) => {
  const name = prompt(`Enter the name of the new ${isFolder ? "folder" : "file"}:`);
  if (!name) return;

  const newNode = {
    id: Math.random().toString(36).substring(2, 15),
    name: name,
    isFolder: isFolder,
    children: isFolder ? [] : undefined, // Only folders will have children
  };

  const addNode = (nodes: any[]): any[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        // If the node is the one we want to add to, add the new child node.
        return {
          ...node,
          children: node.isFolder ? [...(node.children || []), newNode] : node.children,
        };
      }
      if (node.children) {
        return { ...node, children: addNode(node.children) };
      }
      return node;
    });
  };

  // If parentId is empty (creating root node), directly add the node to the root of treeData
  if (parentId === "") {
    setTreeData((prevData) => [...prevData, newNode]);
  } else {
    setTreeData(addNode(treeData));
  }
};
