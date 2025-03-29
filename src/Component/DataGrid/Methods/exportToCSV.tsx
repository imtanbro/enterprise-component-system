interface VirtualRow {
  index: number;
}

interface Column {
  header: string;
  field: string;
}

const exportToCSV = (rowVirtualizer: { getVirtualItems: () => VirtualRow[] }, sortedData: Record<string, any>[], columns: Column[]): void => {
  const visibleRows = rowVirtualizer.getVirtualItems();

  const visibleData = visibleRows.map((virtualRow: VirtualRow) => sortedData[virtualRow.index]);

  const headers = columns.map((col) => col.header).join(",");
  const rows = visibleData.map((row) => columns.map((col) => JSON.stringify(row[col.field as keyof typeof row])).join(","));
  const csv = [headers, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "logistics-data.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

export default exportToCSV;
