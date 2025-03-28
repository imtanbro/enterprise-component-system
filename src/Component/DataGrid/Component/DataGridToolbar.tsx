import React from "react";
import { Download, Search } from "lucide-react";

interface DataGridToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
  filteredData: any[]; // Adjust the type if necessary
  showNoResults: boolean;
}

const DataGridToolbar: React.FC<DataGridToolbarProps> = ({ searchTerm, onSearchChange, onExport, filteredData, showNoResults }) => {
  return (
    <div className="data-grid-toolbar">
      <div className="search-box">
        <Search size={20} />
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
      </div>
      <button className="export-button" onClick={onExport} disabled={filteredData.length === 0 || showNoResults}>
        <Download size={20} />
        Export CSV
      </button>
    </div>
  );
};

export default DataGridToolbar;
