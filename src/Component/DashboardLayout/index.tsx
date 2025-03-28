import React, { useState } from "react";
import Panel from "./Panel";

const DashboardLayout: React.FC = () => {
  const [maximizedPanelId, setMaximizedPanelId] = useState<string | null>(null);
  const [collapsedPanels, setCollapsedPanels] = useState<string[]>([]);

  // Handle maximization logic
  const handleMaximizedChange = (id: string) => {
    setMaximizedPanelId((prevId) => {
      // If we click on the currently maximized panel, minimize it
      if (prevId === id) {
        return null;
      } else {
        // Maximize the clicked panel and ensure it is uncollapsed
        setCollapsedPanels((prevCollapsed) => prevCollapsed.filter((panelId) => panelId !== id));
        return id;
      }
    });
  };

  // Handle collapse/expand logic for panels
  const handleCollapseChange = (id: string) => {
    setCollapsedPanels((prevCollapsed) => {
      if (prevCollapsed.includes(id)) {
        return prevCollapsed.filter((panelId) => panelId !== id); // Expand the panel
      } else {
        return [...prevCollapsed, id]; // Collapse the panel
      }
    });
  };

  const panels = [
    { id: "overview", title: "Overview" },
    { id: "activity", title: "Recent Activity" },
    { id: "actions", title: "Quick Actions" },
    { id: "notifications", title: "Notifications" },
    { id: "feedback", title: "User Feedback" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {panels.map((panel) => (
          <Panel
            key={panel.id}
            id={panel.id}
            title={panel.title}
            isMaximized={maximizedPanelId === panel.id} // Check if this panel is maximized
            onMaximizedChange={handleMaximizedChange}
            isCollapsed={collapsedPanels.includes(panel.id)} // Panel's collapse state
            onCollapseChange={handleCollapseChange}
          >
            {/* Panel content */}
            {panel.id === "overview" && (
              <div>
                <div className="stat-card primary">
                  <p className="stat-label">Total Users</p>
                  <h4 className="stat-value">1,234</h4>
                </div>
                <div className="stat-card success">
                  <p className="stat-label">Revenue</p>
                  <h4 className="stat-value">$12,345</h4>
                </div>
              </div>
            )}
            {panel.id === "activity" && (
              <div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-indicator"></div>
                    <div>
                      <p className="activity-title">User Action {i}</p>
                      <p className="activity-time">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {panel.id === "actions" && (
              <div className="quick-actions">
                {["Reports", "Analytics", "Settings", "Support"].map((action) => (
                  <button key={action} className="action-button">
                    {action}
                  </button>
                ))}
              </div>
            )}
            {panel.id === "notifications" && (
              <div>
                <div className="stat-card warning">
                  <p className="stat-label">New Notifications</p>
                  <h4 className="stat-value">5</h4>
                </div>
              </div>
            )}
            {panel.id === "feedback" && (
              <div>
                <div className="stat-card danger">
                  <p className="stat-label">User Feedback</p>
                  <h4 className="stat-value">3 New Feedbacks</h4>
                </div>
              </div>
            )}
          </Panel>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
