// DataGrid.tsx
import React, { useState, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTheme } from "../../Common/Component/ThemeContext";
import DataGridToolbar from "./Component/DataGridToolbar";
import DataGridHeader from "./Component/DataGridHeader";
import NoResultsMessage from "./Component/NoResultsMessage";
import DataGridRow from "./Component/DataGridRow";

// Generate 10,000 rows of data
const generateData = () => {
  const data = [];
  const statuses = ["In Transit", "Delivered", "Pending", "Delayed"];
  const priorities = ["High", "Medium", "Low"];
  const carriers = ["FedEx", "UPS", "DHL", "USPS"];

  for (let i = 0; i < 10000; i++) {
    data.push({
      id: `ORD${String(i + 1).padStart(6, "0")}`,
      trackingNumber: `TRK${Math.random().toString(36).substring(7).toUpperCase()}`,
      customer: `Customer ${i + 1}`,
      origin: `City ${Math.floor(Math.random() * 100)}`,
      destination: `City ${Math.floor(Math.random() * 100)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      estimatedDelivery: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      weight: +(Math.random() * 100).toFixed(2),
      cost: +(Math.random() * 1000).toFixed(2),
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return data;
};

// Define the columns array
const columns = [
  { field: "id", header: "Order ID" },
  { field: "trackingNumber", header: "Tracking #" },
  { field: "customer", header: "Customer" },
  { field: "origin", header: "Origin" },
  { field: "destination", header: "Destination" },
  { field: "status", header: "Status" },
  { field: "estimatedDelivery", header: "Est. Delivery" },
  { field: "priority", header: "Priority" },
  { field: "weight", header: "Weight (kg)" },
  { field: "cost", header: "Cost ($)" },
  { field: "carrier", header: "Carrier" },
  { field: "lastUpdate", header: "Last Update" },
];

const DataGrid: React.FC = () => {
  const [data] = useState(generateData());
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [frozenColumns, setFrozenColumns] = useState<string[]>(["id"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [showNoResults, setShowNoResults] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

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
      const matchesFilters = Object.entries(filters).every(([field, value]) => {
        if (!value) return true;
        const cellValue = String(row[field as keyof typeof row]).toLowerCase();
        return cellValue.includes(value.toLowerCase());
      });

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

  const toggleColumnFreeze = (field: string) => {
    setFrozenColumns((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]));
  };

  const handleFilter = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const exportToCSV = () => {
    // Get the indices of the visible rows from the virtualizer
    const visibleRows = rowVirtualizer.getVirtualItems();

    // Get the data for only the visible rows
    const visibleData = visibleRows.map((virtualRow) => sortedData[virtualRow.index]);

    // Create the CSV headers and rows
    const headers = columns.map((col) => col.header).join(",");
    const rows = visibleData.map((row) => columns.map((col) => JSON.stringify(row[col.field as keyof typeof row])).join(","));
    const csv = [headers, ...rows].join("\n");

    // Create a Blob from the CSV data and trigger the download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logistics-data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="data-grid-container">
      <DataGridToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={exportToCSV}
        filteredData={filteredData}
        showNoResults={showNoResults}
      />
      <div className="data-grid-wrapper" ref={parentRef}>
        <DataGridHeader
          columns={columns}
          frozenColumns={frozenColumns}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onToggleFreeze={toggleColumnFreeze}
          onFilter={handleFilter}
        />

        {showNoResults ? (
          <NoResultsMessage />
        ) : (
          <div className="data-grid-body" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = sortedData[virtualRow.index];
              return <DataGridRow key={virtualRow.index} row={row} columns={columns} frozenColumns={frozenColumns} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataGrid;

// import React, { useState, useEffect, useRef } from "react";
// import { Download, Filter, Pin, PinOff, ChevronDown, ChevronUp, Search } from "lucide-react";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import { useTheme } from "../../Common/Component/ThemeContext";

// // Generate 10,000 rows of data
// const generateData = () => {
//   const data = [];
//   const statuses = ["In Transit", "Delivered", "Pending", "Delayed"];
//   const priorities = ["High", "Medium", "Low"];
//   const carriers = ["FedEx", "UPS", "DHL", "USPS"];

//   for (let i = 0; i < 10000; i++) {
//     data.push({
//       id: `ORD${String(i + 1).padStart(6, "0")}`,
//       trackingNumber: `TRK${Math.random().toString(36).substring(7).toUpperCase()}`,
//       customer: `Customer ${i + 1}`,
//       origin: `City ${Math.floor(Math.random() * 100)}`,
//       destination: `City ${Math.floor(Math.random() * 100)}`,
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       estimatedDelivery: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
//       priority: priorities[Math.floor(Math.random() * priorities.length)],
//       weight: +(Math.random() * 100).toFixed(2),
//       cost: +(Math.random() * 1000).toFixed(2),
//       carrier: carriers[Math.floor(Math.random() * carriers.length)],
//       lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
//     });
//   }
//   return data;
// };

// interface Column {
//   field: string;
//   header: string;
//   frozen?: boolean;
//   width?: number;
//   renderer?: (value: any) => React.ReactNode;
// }

// const columns: Column[] = [
//   { field: "id", header: "Order ID", frozen: true, width: 120 },
//   { field: "trackingNumber", header: "Tracking #", width: 150 },
//   { field: "customer", header: "Customer", width: 150 },
//   { field: "origin", header: "Origin", width: 150 },
//   { field: "destination", header: "Destination", width: 150 },
//   {
//     field: "status",
//     header: "Status",
//     width: 120,
//     renderer: (value) => <span className={`status-badge ${value.toLowerCase().replace(" ", "-")}`}>{value}</span>,
//   },
//   { field: "estimatedDelivery", header: "Est. Delivery", width: 130 },
//   {
//     field: "priority",
//     header: "Priority",
//     width: 100,
//     renderer: (value) => <span className={`priority-badge ${value.toLowerCase()}`}>{value}</span>,
//   },
//   {
//     field: "weight",
//     header: "Weight (kg)",
//     width: 120,
//     renderer: (value) => value.toFixed(2),
//   },
//   {
//     field: "cost",
//     header: "Cost ($)",
//     width: 120,
//     renderer: (value) =>
//       value.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       }),
//   },
//   { field: "carrier", header: "Carrier", width: 100 },
//   {
//     field: "lastUpdate",
//     header: "Last Update",
//     width: 200,
//     renderer: (value) => new Date(value).toLocaleString(),
//   },
// ];

// const DataGrid: React.FC = () => {
//   const [data] = useState(generateData());
//   const [sortField, setSortField] = useState<string>("");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
//   const [filters, setFilters] = useState<Record<string, string>>({});
//   const [frozenColumns, setFrozenColumns] = useState<string[]>(["id"]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState(data);
//   const [showNoResults, setShowNoResults] = useState(false);

//   const parentRef = useRef<HTMLDivElement>(null);
//   const { isDarkMode } = useTheme();

//   // Virtual scrolling setup
//   const rowVirtualizer = useVirtualizer({
//     count: filteredData.length,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => 48,
//     overscan: 5,
//   });

//   // Update filtered data based on search and filters
//   useEffect(() => {
//     const filtered = data.filter((row) => {
//       // Apply filters
//       const matchesFilters = Object.entries(filters).every(([field, value]) => {
//         if (!value) return true;
//         const cellValue = String(row[field as keyof typeof row]).toLowerCase();
//         return cellValue.includes(value.toLowerCase());
//       });

//       // Apply search
//       const matchesSearch = searchTerm === "" || Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()));

//       return matchesFilters && matchesSearch;
//     });

//     setFilteredData(filtered);

//     // Show no results if filteredData is empty and search term is not empty
//     if (filtered.length === 0 && searchTerm !== "") {
//       setShowNoResults(true);
//     } else {
//       setShowNoResults(false);
//     }
//   }, [searchTerm, filters, data]);

//   // Sorting logic
//   const sortedData = [...filteredData].sort((a, b) => {
//     if (!sortField) return 0;

//     const aValue = a[sortField as keyof typeof a];
//     const bValue = b[sortField as keyof typeof b];

//     if (typeof aValue === "string" && typeof bValue === "string") {
//       return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
//     }

//     return sortDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
//   });

//   // Export functions
//   const exportToCSV = () => {
//     const headers = columns.map((col) => col.header).join(",");
//     const rows = data.map((row) => columns.map((col) => JSON.stringify(row[col.field as keyof typeof row])).join(","));
//     const csv = [headers, ...rows].join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "logistics-data.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const handleSort = (field: string) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   const toggleColumnFreeze = (field: string) => {
//     setFrozenColumns((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]));
//   };

//   return (
//     <div className="data-grid-container">
//       <div className="data-grid-toolbar">
//         <div className="search-box">
//           <Search size={20} />
//           <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//         </div>
//         <button className="export-button" onClick={exportToCSV}>
//           <Download size={20} />
//           Export CSV
//         </button>
//       </div>

//       {showNoResults ? (
//         <div className="no-results-message">No results found</div>
//       ) : (
//         <div className="data-grid-wrapper" ref={parentRef}>
//           <div className="data-grid-header">
//             {columns.map((column) => (
//               <div
//                 key={column.field}
//                 className={`data-grid-cell header-cell ${frozenColumns.includes(column.field) ? "frozen" : ""}`}
//                 style={{ width: column.width || 150 }}
//               >
//                 <div className="header-content">
//                   <span onClick={() => handleSort(column.field)}>
//                     {column.header}
//                     {sortField === column.field && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
//                   </span>
//                   <div className="header-controls">
//                     <button className="pin-button" onClick={() => toggleColumnFreeze(column.field)}>
//                       {frozenColumns.includes(column.field) ? <PinOff size={16} /> : <Pin size={16} />}
//                     </button>
//                     <button
//                       className="filter-button"
//                       onClick={() => {
//                         const value = prompt(`Filter ${column.header}:`);
//                         if (value !== null) {
//                           setFilters((prev) => ({
//                             ...prev,
//                             [column.field]: value,
//                           }));
//                         }
//                       }}
//                     >
//                       <Filter size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div
//             className="data-grid-body"
//             style={{
//               height: `${rowVirtualizer.getTotalSize()}px`,
//               width: "100%",
//               position: "relative",
//             }}
//           >
//             {rowVirtualizer.getVirtualItems().map((virtualRow: { index: number; size: number; start: number }) => {
//               const row = sortedData[virtualRow.index];
//               return (
//                 <div
//                   key={virtualRow.index}
//                   className="data-grid-row"
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: `${virtualRow.size}px`,
//                     transform: `translateY(${virtualRow.start}px)`,
//                   }}
//                 >
//                   {columns.map((column) => (
//                     <div
//                       key={column.field}
//                       className={`data-grid-cell ${frozenColumns.includes(column.field) ? "frozen" : ""}`}
//                       style={{ width: column.width || 150 }}
//                     >
//                       {column.renderer ? column.renderer(row[column.field as keyof typeof row]) : row[column.field as keyof typeof row]}
//                     </div>
//                   ))}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataGrid;
