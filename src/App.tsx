import React, { lazy, Suspense, memo } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Common/Component/ThemeContext";
import { ModalProvider } from "./Common/Component/Modal/ModalContext";
import { withCenteredLayout } from "./Component/RepositionCards";
import Loader from "./Common/Component/Loader";

const Navbar = lazy(() => import("./Component/LandingPage/Component/NavBar"));
const DashboardLayout = lazy(() => import("./Component/DashboardLayout"));
const RepositionCards = lazy(() => import("./Component/RepositionCards"));
const DataGrid = lazy(() => import("./Component/DataGrid"));
const Modal = lazy(() => import("./Common/Component/Modal"));
const ErrorPage = lazy(() => import("./Common/Component/ErrorPage"));
const MultiStepForm = lazy(() => import("./Component/MultiStepForm"));

const HomePageComp = withCenteredLayout(RepositionCards);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="layout-container">
          <Suspense fallback={<Loader size={50} color="#ff6347" />}>
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
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default memo(App);
