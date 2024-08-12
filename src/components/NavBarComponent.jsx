import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "./styles/NavBar.module.css";

const NavBar = ({ toggleForm, formOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to track the menu open/close status
  const [activeLink, setActiveLink] = useState(""); // State to track the active link based on the current route

  const location = useLocation(); // Hook to get the current location object from react-router

  useEffect(() => {
    setActiveLink(location.pathname); // Update the active link whenever the location changes
  }, [location]);
  
  return (
    <nav className={style.navbar}>
      <div className={style.navbarContainer}>
        <NavLink to="/overview" className={style.navbarLogo}>
          <img src="./logo-globant.png" alt="Logo" />
        </NavLink>
        <button
          data-testid="menu-toggle"
          type="button"
          className={style.navbarToggle}
          aria-controls="navbar-solid-bg"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)} // Toggle the menu open/close state
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <section
          className={`${style.navbarMenu} ${menuOpen ? style.navbarMenuOpen : style.navbarMenuClosed}`}
          id="navbar-solid-bg"
        >
          <ul className={style.navbarMenu}>
            <li>
              <NavLink
                to="/overview"
                className={`${style.navbarItem} ${activeLink === "/overview" ? style.navbarItemActive : style.navbarItemDisabled}`}
                aria-current="page"
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={`${style.navbarItem} ${activeLink === "/contacts" ? style.navbarItemActive : style.navbarItemDisabled}`}
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={`${style.navbarItem} ${activeLink === "/favorites" ? style.navbarItemActive : style.navbarItemDisabled}`}
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <a className={style.navbarItem}>
                <button onClick={toggleForm} className={style.navbarButton}>
                  {!formOpen ? "+ New" : "Close"} 
                  {/* Toggle button text based on form open state*/}
                </button>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
