import React, { forwardRef } from "react";

interface CardProps {
  id: number;
  initialPos?: { x: number; y: number };
  text: string;
  onMouseDown: (e: any) => void;
  isDarkMode: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ id, initialPos, text, onMouseDown, isDarkMode }, ref) => {
  return (
    <div
      onMouseDown={onMouseDown}
      ref={ref}
      key={id}
      className={`card ${isDarkMode ? "dark" : ""}`}
      style={{
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
      }}
    >
      <p>{text}</p>
    </div>
  );
});

export default Card;
