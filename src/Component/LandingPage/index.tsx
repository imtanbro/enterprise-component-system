import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Component/NavBar";

const LandingPage: React.FC = () => {
  return (
    <div className="layout-container">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default memo(LandingPage);
