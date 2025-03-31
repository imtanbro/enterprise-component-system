import React, { memo, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../Common/Component/ThemeContext";
import { DASHBOARD, DATA_GRID, HIERARCHICAL_TREE, HOME_PAGE, MULTI_STEP_FORM } from "../../../Common/Constants/Routes";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={HOME_PAGE} className="brand">
          Brand
        </Link>

        <div className="nav-links">
          <Link to={HOME_PAGE}>Home</Link>
          <Link to={DASHBOARD}>Dashboard</Link>
          <Link to={DATA_GRID}>Data Grid</Link>
          <Link to={MULTI_STEP_FORM}>Multi Step Form</Link>
          <Link to={HIERARCHICAL_TREE}>Hierarchical Tree</Link>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <Link to={HOME_PAGE} onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to={DASHBOARD} onClick={() => setIsMenuOpen(false)}>
          Dashboard
        </Link>
        <Link to={DATA_GRID} onClick={() => setIsMenuOpen(false)}>
          Data Grid
        </Link>
        <Link to={MULTI_STEP_FORM} onClick={() => setIsMenuOpen(false)}>
          Multi Step Form
        </Link>
        <Link to={HIERARCHICAL_TREE} onClick={() => setIsMenuOpen(false)}>
          Hierarchical Tree
        </Link>
      </div>
    </nav>
  );
}

export default memo(Navbar);
