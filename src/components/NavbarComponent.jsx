import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../store/authSlice.js";

import pqLogo from "../images/transp-dark-pq.png";

const NavbarComponent = () => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();

    const handleLogout =  () => {
       dispatch(logout());
  }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              style={{ height: 60 + "px", margin: 0, padding: 0 }}
              src={pqLogo}
              alt="Po-Quo Logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
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
                    className="nav-link"
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
                    className="nav-link"
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
                    className="nav-link"
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
                    className="nav-link"
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
                    className="nav-link"
                    aria-current="page"
                    to="/login"
                    activeclassname="current-link"
                  >
                    Login
                  </NavLink>
                </li>
              )}

              {!loggedIn && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/signup"
                    activeclassname="current-link"
                  >
                    Sign-Up
                  </NavLink>
                </li>
              )}
            </ul>

            {loggedIn && (
              <button
                className="btn btn-outline-dark d-flex"
                type="button"
                aria-current="page"
                onClick={handleLogout}
                activeclassname="current-link"
              >
                Log - out
              </button>
            )}
          </div>
        </div>
      </nav>
    );

}

export default NavbarComponent;