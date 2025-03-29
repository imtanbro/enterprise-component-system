import React, { memo } from "react";
import "./Loader.css";
interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 40, color = "#3498db" }) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner" style={{ width: `${size}px`, height: `${size}px`, borderColor: color }} />
    </div>
  );
};

export default memo(Loader);
