import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../Common/Component/ThemeContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          Brand
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/data-grid">Data Grid</Link>
          <Link to="/contact">Contact</Link>
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
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
          Dashboard
        </Link>
        <Link to="/data-grid" onClick={() => setIsMenuOpen(false)}>
          Data Grid
        </Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { navbar, container, brand, menuButton, navLinks, showMenu, themeToggle, dark } from "../Navbar.module.css";
// import { Moon, Sun, Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";

// function NavBar() {
//   console.log("NavBar Component Rendered");

//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

//   // Update the dark mode class on the body element
//   useEffect(() => {
//     if (isDarkMode) {
//       document.body.classList.add("dark"); // Add dark mode class to body
//     } else {
//       document.body.classList.remove("dark"); // Remove dark mode class from body
//     }
//   }, [isDarkMode]);

//   return (
//     <nav className={navbar}>
//       <div className={container}>
//         <h1 className={brand}>Brand</h1>

//         <button className={menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         <div className={`${navLinks} ${isMenuOpen ? showMenu : ""}`}>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/data-grid">Data Grid</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         </div>

//         <button className={themeToggle} onClick={() => setIsDarkMode(!isDarkMode)}>
//           {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
