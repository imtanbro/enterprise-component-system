import React, { memo } from "react";
import "./Loader.css"; // Import CSS for animation

interface LoaderProps {
  size?: number; // Optional size prop to customize the size of the spinner
  color?: string; // Optional color prop to customize the color of the spinner
}

const Loader: React.FC<LoaderProps> = ({ size = 40, color = "#3498db" }) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner" style={{ width: `${size}px`, height: `${size}px`, borderColor: color }} />
    </div>
  );
};

export default memo(Loader);
