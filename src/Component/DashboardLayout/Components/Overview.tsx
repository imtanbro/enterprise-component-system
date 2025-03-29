import React, { memo } from "react";

const Overview = () => {
  return (
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
  );
};

export default memo(Overview);
