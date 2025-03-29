import React from "react";
import { Download, Search } from "lucide-react";
import exportToCSV from "../Methods/exportToCSV";

interface DataGridToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
  filteredData: any[];
  showNoResults: boolean;
  rowVirtualizer: any;
  sortedData: any[];
  columns: any[];
}

const DataGridToolbar: React.FC<DataGridToolbarProps> = ({
  searchTerm,
  onSearchChange,
  rowVirtualizer,
  sortedData,
  columns,
  filteredData,
  showNoResults,
}) => {
  return (
    <div className="data-grid-toolbar">
      <div className="search-box">
        <Search size={20} />
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
      </div>
      <button
        className="export-button"
        onClick={() => exportToCSV(rowVirtualizer, sortedData, columns)}
        disabled={filteredData.length === 0 || showNoResults}
      >
        <Download size={20} />
        Export CSV
      </button>
    </div>
  );
};

export default DataGridToolbar;
