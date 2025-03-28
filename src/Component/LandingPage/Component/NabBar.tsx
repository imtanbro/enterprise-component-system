import React, { useState, useEffect } from "react";
import { navbar, container, brand, menuButton, navLinks, showMenu, themeToggle, dark } from "../Navbar.module.css";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Update the dark mode class on the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark"); // Add dark mode class to body
    } else {
      document.body.classList.remove("dark"); // Remove dark mode class from body
    }
  }, [isDarkMode]);

  return (
    <nav className={navbar}>
      <div className={container}>
        <h1 className={brand}>Brand</h1>

        <button className={menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${navLinks} ${isMenuOpen ? showMenu : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/data-grid">Data Grid</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <button className={themeToggle} onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
