// DataGridRow.tsx
import React from "react";

interface DataGridRowProps {
  row: any;
  columns: { field: string; width?: number; renderer?: (value: any) => React.ReactNode }[];
  frozenColumns: string[];
}

const DataGridRow: React.FC<DataGridRowProps> = ({ row, columns, frozenColumns }) => {
  return (
    <div className="data-grid-row">
      {columns.map((column) => (
        <div
          key={column.field}
          className={`data-grid-cell ${frozenColumns.includes(column.field) ? "frozen" : ""}`}
          style={{ width: column.width || 150 }}
        >
          {column.renderer ? column.renderer(row[column.field]) : row[column.field]}
        </div>
      ))}
    </div>
  );
};

export default DataGridRow;
