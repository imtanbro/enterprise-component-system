import React from "react";

interface Column {
  field: string;
  header: string;
  frozen?: boolean;
  width?: number;
  renderer?: (value: any) => React.ReactNode;
}

const columns: Column[] = [
  { field: "id", header: "Order ID", frozen: true, width: 120 },
  { field: "trackingNumber", header: "Tracking #", width: 150 },
  { field: "customer", header: "Customer", width: 150 },
  { field: "origin", header: "Origin", width: 150 },
  { field: "destination", header: "Destination", width: 150 },
  {
    field: "status",
    header: "Status",
    width: 120,
    renderer: (value) => <span className={`status-badge ${value.toLowerCase().replace(" ", "-")}`}>{value}</span>,
  },
  { field: "estimatedDelivery", header: "Est. Delivery", width: 130 },
  {
    field: "priority",
    header: "Priority",
    width: 100,
    renderer: (value) => <span className={`priority-badge ${value.toLowerCase()}`}>{value}</span>,
  },
  {
    field: "weight",
    header: "Weight (kg)",
    width: 120,
    renderer: (value) => value.toFixed(2),
  },
  {
    field: "cost",
    header: "Cost ($)",
    width: 120,
    renderer: (value) =>
      value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  },
  { field: "carrier", header: "Carrier", width: 100 },
  {
    field: "lastUpdate",
    header: "Last Update",
    width: 200,
    renderer: (value) => new Date(value).toLocaleString(),
  },
];

export default columns;
