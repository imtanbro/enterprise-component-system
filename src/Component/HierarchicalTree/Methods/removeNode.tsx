interface TreeNode {
  id: string;
  name: string;
  isFolder: boolean;
  children: TreeNode[] | undefined;
}

// This function removes a node from the tree recursively by node ID
export const removeNode = (nodeId: string, treeData: TreeNode[], setTreeData: React.Dispatch<React.SetStateAction<TreeNode[]>>) => {
  const removeNodeRecursively = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.id === nodeId) {
        return false; // Skip the node to delete
      }
      if (node.children) {
        node.children = removeNodeRecursively(node.children);
      }
      return true;
    });
  };

  // Update the treeData state with the new tree structure
  setTreeData(removeNodeRecursively(treeData));
};
