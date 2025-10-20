import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [userInitials, setUserInitials] = useState("");

  // Get userName from localStorage on mount
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      const initials = name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("");
      setUserInitials(initials);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/"); // redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          Vigyaana
        </NavLink>

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

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/courses">
                Course Catalog
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <form className="d-flex me-2" role="search">
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

            {/* Show initials circle if user is logged in */}
            {userInitials && (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#1d4ed8",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  fontSize: "1rem",
                  marginRight: "10px",
                }}
                title={localStorage.getItem("userName")}
              >
                {userInitials}
              </div>
            )}

            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
