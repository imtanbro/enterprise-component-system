export const folderStructure = [
  {
    name: "public",
    id: "1",
    isFolder: true,
    children: [
      {
        name: "index.html",
        id: "2",
        isFolder: false,
      },
    ],
  },
  {
    name: "src",
    id: "3",
    isFolder: true,
    children: [
      {
        name: "App.tsx",
        id: "4",
        isFolder: false,
      },
      {
        name: "Component",
        id: "5",
        isFolder: true,
        children: [
          {
            name: "HierarchicalTree",
            id: "6",
            isFolder: true,
            children: [
              {
                name: "index.tsx",
                id: "7",
                isFolder: false,
              },
              {
                name: "config",
                id: "8",
                isFolder: true,
                children: [
                  {
                    name: "treeData.tsx",
                    id: "9",
                    isFolder: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Common",
        id: "10",
        isFolder: true,
        children: [
          {
            name: "Component",
            id: "11",
            isFolder: true,
            children: [
              {
                name: "ThemeContext.tsx",
                id: "13",
                isFolder: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "package.json",
    id: "12",
    isFolder: false,
  },
];
