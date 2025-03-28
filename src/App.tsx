import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Common/Component/ThemeContext";
import Navbar from "./Component/LandingPage/Component/NavBar";
import DashboardLayout from "./Component/DashboardLayout";
import RepositionCards from "./Component/RepositionCards";
import DataGrid from "./Component/DataGrid";
import { ModalProvider } from "./Common/Component/Modal/ModalContext";
import Modal from "./Common/Component/Modal";
import ErrorPage from "./Common/Component/ErrorPage";

function App() {
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
                    <RepositionCards />
                    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Welcome to the Dashboard</h1>
                  </div>
                }
              />
              <Route path="/dashboard" element={<DashboardLayout />} />
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

// import React, { memo, Suspense } from "react";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./Component/LandingPage";
// import ErrorPage from "./Common/Component/ErrorPage";
// import Loader from "./Common/Component/Loader";
// import RepositionCards from "./Component/RepositionCards";

// const DataGrid = React.lazy(() => import("./Component/DataGrid"));

// const App: React.FC = () => {
//   console.log("App Component Rendered");

//   return (
//     <Router>
//       <Suspense fallback={<Loader />}>
//         <div>
//           <Routes>
//             <Route path="/" element={<LandingPage />}>
//               <Route path="/" element={<RepositionCards />} />
//               <Route
//                 path="/data-grid"
//                 element={
//                   <Suspense fallback={<Loader />}>
//                     <DataGrid />
//                   </Suspense>
//                 }
//               />
//               {/* <Route path="/contact" element={<div>Contact Page</div>} /> */}
//             </Route>
//           </Routes>
//         </div>
//       </Suspense>
//     </Router>
//   );
// };

// export default memo(App);
