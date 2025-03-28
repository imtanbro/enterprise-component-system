import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./Component/NavBar";

const LandingPage: React.FC = () => {
  console.log("LandingPage Component Rendered");

  return (
    <div className="layout-container">
      <header>
        <NavBar />
      </header>

      {/* The Outlet is where nested routes will render */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingPage;
