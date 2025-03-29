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

export default generateData;
