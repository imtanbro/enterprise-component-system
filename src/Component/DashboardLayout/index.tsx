import React, { memo, useCallback, useState } from "react";
import Panel from "./Components/Panel";
import { handleMaximizedChange } from "./Methods/handleMaximizedChange";
import { handleCollapseChange } from "./Methods/handleCollapseChange";
import Overview from "./Components/Overview";
import Activity from "./Components/Activity";
import Actions from "./Components/Actions";
import Notification from "./Components/Notification";
import Feedback from "./Components/Feedback";

const DashboardLayout: React.FC = () => {
  const [maximizedPanelId, setMaximizedPanelId] = useState<string | null>(null);
  const [collapsedPanels, setCollapsedPanels] = useState<string[]>([]);

  const panels = [
    { id: "overview", title: "Overview" },
    { id: "activity", title: "Recent Activity" },
    { id: "actions", title: "Quick Actions" },
    { id: "notifications", title: "Notifications" },
    { id: "feedback", title: "User Feedback" },
  ];

  const handleMaximized = useCallback((id: string) => {
    handleMaximizedChange(id, setMaximizedPanelId, setCollapsedPanels);
  }, []);

  const handleCollapse = useCallback((id: string) => {
    handleCollapseChange(id, setCollapsedPanels);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {panels.map((panel) => (
          <Panel
            key={panel.id}
            id={panel.id}
            title={panel.title}
            isMaximized={maximizedPanelId === panel.id} // Check if this panel is maximized
            onMaximizedChange={handleMaximized} // Passing the callback function
            isCollapsed={collapsedPanels.includes(panel.id)} // Panel's collapse state
            onCollapseChange={handleCollapse} // Collapse/Expand handler
          >
            {/* Panel content */}
            {panel.id === "overview" && <Overview />}
            {panel.id === "activity" && <Activity />}
            {panel.id === "actions" && <Actions />}
            {panel.id === "notifications" && <Notification />}
            {panel.id === "feedback" && <Feedback />}
          </Panel>
        ))}
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
