import React, { memo } from "react";

const Actions = () => {
  return (
    <div className="quick-actions">
      {["Reports", "Analytics", "Settings", "Support"].map((action) => (
        <button key={action} className="action-button">
          {action}
        </button>
      ))}
    </div>
  );
};

export default memo(Actions);
