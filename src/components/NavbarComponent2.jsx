import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";

import pqLogo from "../images/pq-logo.png";
import "../style/navbar.css"

const NavbarComponent = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
      <div className="">
        <ul className="navbar-flex">
          <li className="nav-item">
            <NavLink
              className="navlink"
              aria-current="page"
              to="/home"
              activeclassname="current-link"
            >
              Home
            </NavLink>
          </li>

          {loggedIn && (
            <li className="nav-item">
              <NavLink
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
