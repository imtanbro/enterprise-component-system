interface SetCollapsedPanels {
  (callback: (prevCollapsed: string[]) => string[]): void;
}

export const handleCollapseChange = (id: string, setCollapsedPanels: SetCollapsedPanels): void => {
  setCollapsedPanels((prevCollapsed: string[]) => {
    if (prevCollapsed.includes(id)) {
      return prevCollapsed.filter((panelId) => panelId !== id);
    } else {
      return [...prevCollapsed, id];
    }
  });
};
