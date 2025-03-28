import React from "react";
import { ChevronUp, ChevronDown, Pin, PinOff, Filter } from "lucide-react";

interface DataGridHeaderProps {
  columns: { field: string; header: string; width?: number }[];
  frozenColumns: string[];
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  onToggleFreeze: (field: string) => void;
  onFilter: (field: string, header: string) => void;
}

const DataGridHeader: React.FC<DataGridHeaderProps> = ({ columns, frozenColumns, sortField, sortDirection, onSort, onToggleFreeze, onFilter }) => {
  return (
    <div className="data-grid-header">
      {columns.map((column) => (
        <div
          key={column.field}
          className={`data-grid-cell header-cell ${frozenColumns.includes(column.field) ? "frozen" : ""}`}
          style={{ width: column.width || 150 }}
        >
          <div className="header-content">
            <span onClick={() => onSort(column.field)}>
              {column.header}
              {sortField === column.field && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </span>
            <div className="header-controls">
              <button className="pin-button" onClick={() => onToggleFreeze(column.field)}>
                {frozenColumns.includes(column.field) ? <PinOff size={16} /> : <Pin size={16} />}
              </button>
              <button
                className="filter-button"
                onClick={() => {
                  const value = prompt(`Filter ${column.header}:`);
                  if (value !== null) {
                    onFilter(column.field, value);
                  }
                }}
              >
                <Filter size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataGridHeader;
