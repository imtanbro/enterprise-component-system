interface SetMaximizedPanelId {
  (callback: (prevId: string | null) => string | null): void;
}

interface SetCollapsedPanels {
  (callback: (prevCollapsed: string[]) => string[]): void;
}

export const handleMaximizedChange = (id: string, setMaximizedPanelId: SetMaximizedPanelId, setCollapsedPanels: SetCollapsedPanels) => {
  setMaximizedPanelId((prevId) => {
    if (prevId === id) {
      return null;
    } else {
      setCollapsedPanels((prevCollapsed) => prevCollapsed.filter((panelId) => panelId !== id));
      return id;
    }
  });
};
