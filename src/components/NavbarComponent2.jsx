import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";

import pqLogo from "../images/pq-logo.png";
import "../style/navbar.css";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileNavClass, setMobileNavClass] = useState("");

  useEffect(() => {
    if (mobileNav) {
      setMobileNavClass("mobile-navbar-active");
    } else {
      setMobileNavClass("");
    }
  }, [mobileNav]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  const handleMobileNavRouting = () => {
    if (mobileNav) {
      setMobileNav(!mobileNav);
    }
  };

  return (
    <nav className="cust-navbar">
      <NavLink className="pq-logo" to="/">
        <img
          style={{ height: 60 + "px", margin: 0, padding: 0 }}
          src={pqLogo}
          alt="Po-Quo Logo"
        />
      </NavLink>
      <div className={mobileNavClass}>
        <button
          type="button"
          className="mobile-nav-btn"
          onClick={handleMobileNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="navbar-flex">
          <li className="nav-item">
            <NavLink
              onClick={handleMobileNavRouting}
              className="navlink"
              aria-current="page"
              to="/home"
              activeclassname="current-link"
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              onClick={handleMobileNavRouting}
              className="navlink"
              aria-current="page"
              to="/about"
              activeclassname="current-link"
            >
              About
            </NavLink>
          </li>

          {loggedIn && (
            <li className="nav-item">
              <NavLink
                onClick={handleMobileNavRouting}
                className="navlink"
                aria-current="page"
                to="/quotes"
                activeclassname="current-link"
              >
                Quotes
              </NavLink>
            </li>
          )}

          {loggedIn && (
            <li className="nav-item">
              <NavLink
                onClick={handleMobileNavRouting}
                className="navlink"
                aria-current="page"
                to="/addquote"
                activeclassname="current-link"
              >
                Add Quote
              </NavLink>
            </li>
          )}

          {loggedIn && (
            <li className="nav-item">
              <NavLink
                onClick={handleMobileNavRouting}
                className="navlink"
                aria-current="page"
                to="/userquotes"
                activeclassname="current-link"
              >
                My Quotes
              </NavLink>
            </li>
          )}

          {loggedIn && (
            <li className="nav-item">
              <NavLink
                onClick={handleMobileNavRouting}
                className="navlink"
                aria-current="page"
                to="/profile"
                activeclassname="current-link"
              >
                Profile
              </NavLink>
            </li>
          )}

          {!loggedIn && (
            <li className="nav-item">
              <NavLink
                onClick={handleMobileNavRouting}
                className="navlink"
                aria-current="page"
                to="/login"
                activeclassname="current-link"
              >
                Login
              </NavLink>
            </li>
          )}

          {!loggedIn && (
            <li className="nav-item ">
              <NavLink
                onClick={handleMobileNavRouting}
                className="navlink"
                aria-current="page"
                to="/signup"
                activeclassname="current-link"
              >
                Sign-Up
              </NavLink>
            </li>
          )}

          {loggedIn && (
            <li className="nav-item logout-item">
              <button
                className="navlink logout-btn"
                type="button"
                aria-current="page"
                onClick={handleLogout}
                activeclassname="current-link"
              >
                Log - out
              </button>
            </li>
          )}
        </ul>
        <button
          className=""
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=""></span>
        </button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
