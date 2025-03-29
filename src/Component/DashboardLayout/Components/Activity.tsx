import React, { memo } from "react";

const Activity = () => {
  return (
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
  );
};

export default memo(Activity);
