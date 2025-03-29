import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Common/Component/ThemeContext";
import Navbar from "./Component/LandingPage/Component/NavBar";
import DashboardLayout from "./Component/DashboardLayout";
import RepositionCards, { withCenteredLayout } from "./Component/RepositionCards";
import DataGrid from "./Component/DataGrid";
import { ModalProvider } from "./Common/Component/Modal/ModalContext";
import Modal from "./Common/Component/Modal";
import ErrorPage from "./Common/Component/ErrorPage";
import MultiStepForm from "./Component/MultiStepForm";

const HomePageComp = withCenteredLayout(RepositionCards);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="layout-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePageComp />} />
              <Route path="/dashboard" element={<DashboardLayout />} />
              <Route path="/multi-step-form" element={<MultiStepForm />} />
              <Route
                path="/data-grid"
                element={
                  <ModalProvider>
                    <DataGrid />
                    <Modal />
                  </ModalProvider>
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
