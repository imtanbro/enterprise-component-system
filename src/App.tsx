import React, { useState, useEffect, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Common/Component/ThemeContext";
import Navbar from "./Component/LandingPage/Component/NavBar";

import RepositionCards from "./Component/RepositionCards";
import { ModalProvider } from "./Common/Component/Modal/ModalContext";
import Modal from "./Common/Component/Modal";
import ErrorPage from "./Common/Component/ErrorPage";

const DashboardLayout = React.lazy(() => import("./Component/DashboardLayout"));
const DataGrid = React.lazy(() => import("./Component/DataGrid"));

function App() {
  // State to detect mobile/tablet view
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Effect hook to detect window size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      // Check if screen size is mobile or tablet (e.g., 768px or below for tablet, below 480px for mobile)
      setIsMobileOrTablet(width <= 768); // You can adjust this value based on your needs
    };

    // Initial check
    checkScreenSize();

    // Event listener to handle window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="layout-container">
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "calc(100vh - 4rem)",
                    }}
                  >
                    {!isMobileOrTablet && <RepositionCards />}
                    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Welcome to the Dashboard</h1>
                  </div>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <DashboardLayout />
                  </Suspense>
                }
              />
              <Route
                path="/data-grid"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ModalProvider>
                      <DataGrid />
                      <Modal />
                    </ModalProvider>
                  </Suspense>
                }
              />
              <Route path="*" element={<ErrorPage />} />
              <Route
                path="/contact"
                element={
                  <div style={{ padding: "1rem" }}>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Contact</h1>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
