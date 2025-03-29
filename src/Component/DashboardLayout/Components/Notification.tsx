import React, { memo } from "react";

const Notification = () => {
  return (
    <div>
      <div className="stat-card warning">
        <p className="stat-label">New Notifications</p>
        <h4 className="stat-value">5</h4>
      </div>
    </div>
  );
};

export default memo(Notification);
