import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import ErrorBoundary from "./Common/Component/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
