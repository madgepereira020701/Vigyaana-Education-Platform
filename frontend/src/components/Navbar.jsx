import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm py-3">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          Vigyaana
        </NavLink>

        {/* Toggler (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          {/* Left-aligned links */}
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/">
                Course Catalog
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          </ul>

          {/* Right-aligned search form */}
          <form className="d-flex mt-3 mt-lg-0" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "220px" }}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
