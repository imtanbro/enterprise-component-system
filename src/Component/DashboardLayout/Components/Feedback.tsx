import React, { memo } from "react";

const Feedback = () => {
  return (
    <div>
      <div className="stat-card danger">
        <p className="stat-label">User Feedback</p>
        <h4 className="stat-value">3 New Feedbacks</h4>
      </div>
    </div>
  );
};

export default memo(Feedback);
