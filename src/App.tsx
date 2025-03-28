import React, { memo, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import ErrorPage from "./Common/Component/ErrorPage";
import Loader from "./Common/Component/Loader";

const DataGrid = React.lazy(() => import("./Component/DataGrid"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />}>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/data-grid"
                element={
                  <Suspense fallback={<Loader />}>
                    <DataGrid />
                  </Suspense>
                }
              />
              {/* <Route path="/contact" element={<div>Contact Page</div>} /> */}
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default memo(App);
