import React, { useState, useEffect, useRef, useCallback } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTheme } from "../../Common/Component/ThemeContext";
import exportToCSV from "./Methods/exportToCSV";
import DataGridToolbar from "./Component/DataGridToolbar";
import NoResultsMessage from "./Component/NoResultsMessage";
import generateData from "./Methods/generateData";
import columns from "./Methods/ColumnList";
import { useModal } from "../../Common/Component/Modal/ModalContext";

const DataGrid: React.FC = () => {
  const [data] = useState(generateData());
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [frozenColumns, setFrozenColumns] = useState<string[]>(["id"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [showNoResults, setShowNoResults] = useState(false);
  const [invalidFilter, setInvalidFilter] = useState(false);

  const { openModal } = useModal();

  const parentRef = useRef<HTMLDivElement>(null);

  // Virtual scrolling setup
  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  // Update filtered data based on search and filters
  useEffect(() => {
    const filtered = data.filter((row) => {
      // Apply filters
      const matchesFilters = Object.entries(filters).every(([field, value]) => {
        if (!value) return true;
        const cellValue = String(row[field as keyof typeof row]).toLowerCase();
        return cellValue.includes(value.toLowerCase());
      });

      // Apply search
      const matchesSearch = searchTerm === "" || Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesFilters && matchesSearch;
    });

    setFilteredData(filtered);

    // Show no results if filteredData is empty and search term is not empty
    if (filtered.length === 0 && searchTerm !== "") {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }

    // If no results after filters, set invalidFilter to true
    if (filtered.length === 0 && Object.keys(filters).length > 0) {
      setInvalidFilter(true);
    } else {
      setInvalidFilter(false);
    }
  }, [searchTerm, filters, data]);

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleRowClick = (row: any, column: { field: string; header: string }[]) => {
    // Open the modal with the clicked row data
    openModal(
      <div>
        <h3>Details of {row.id}</h3>
        {column.map((value) => {
          return (
            <div key={value.field}>
              <strong>{value.header} : </strong> {row[value.field]}
            </div>
          );
        })}
      </div>
    );
  };
  const handleRefreshData = useCallback(() => {
    setFilters({}); // Reset filters
    setShowNoResults(false); // Hide the no results message
    setSearchTerm(""); // Reset search term
  }, []);

  return (
    <div className="data-grid-container">
      <DataGridToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={() => exportToCSV(rowVirtualizer, sortedData, columns)}
        rowVirtualizer={rowVirtualizer}
        sortedData={sortedData}
        columns={columns}
        filteredData={filteredData}
        showNoResults={showNoResults}
      />

      {showNoResults || invalidFilter ? (
        <div>
          <NoResultsMessage handleRefreshData={handleRefreshData} />
        </div>
      ) : (
        <div className="data-grid-wrapper" ref={parentRef}>
          <div className="data-grid-header">
            {columns.map((column) => {
              if (["id", "trackingNumber", "customer", "status", "priority", "estimatedDelivery", "lastUpdate"].includes(column.field))
                return (
                  <div
                    key={column.field}
                    className={`data-grid-cell header-cell ${frozenColumns.includes(column.field) ? "frozen" : ""}`}
                    style={{ width: column.width || 150 }}
                  >
                    <div className="header-content">
                      <span onClick={() => handleSort(column.field)}>
                        {column.header}
                        {sortField === column.field && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </span>
                      <div className="header-controls">
                        <button
                          className="filter-button"
                          onClick={() => {
                            const value = prompt(`Filter ${column.header}:`);
                            if (value !== null) {
                              setFilters((prev) => ({
                                ...prev,
                                [column.field]: value,
                              }));
                            }
                          }}
                        >
                          <Filter size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>

          <div
            className="data-grid-body"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow: { index: number; size: number; start: number }) => {
              const row = sortedData[virtualRow.index];
              return (
                <div
                  key={virtualRow.index}
                  className="data-grid-row"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {columns.map((column) => {
                    if (["id", "trackingNumber", "customer", "status", "priority", "estimatedDelivery", "lastUpdate"].includes(column.field))
                      return (
                        <div
                          onClick={() => handleRowClick(row, columns)} // Handle row click
                          key={column.field}
                          className={`data-grid-cell ${frozenColumns.includes(column.field) ? "frozen" : ""}`}
                          style={{ width: column.width || 150 }}
                        >
                          {column.renderer ? column.renderer(row[column.field as keyof typeof row]) : row[column.field as keyof typeof row]}
                        </div>
                      );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
