import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Maximize2, Minimize2 } from "lucide-react";

interface PanelProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMaximized: boolean;
  onMaximizedChange: (id: string) => void;
  isCollapsed: boolean;
  onCollapseChange: (id: string) => void;
}

const Panel: React.FC<PanelProps> = ({ id, title, children, isMaximized, onMaximizedChange, isCollapsed, onCollapseChange }) => {
  return (
    <div className={`panel ${isMaximized ? "maximized" : ""}`}>
      <div className="panel-header">
        <h3 className="panel-title">{title}</h3>
        <div className="panel-controls">
          <button onClick={() => onMaximizedChange(id)} className="panel-button">
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button onClick={() => onCollapseChange(id)} className="panel-button">
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
      <div className={`panel-content ${isCollapsed ? "collapsed" : ""}`}>{children}</div>
    </div>
  );
};

export default Panel;
