import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseCatalog from "./pages/CourseCatalog";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useState, useEffect } from "react";
import Auth from "./components/Authentication/Auth/Auth";
// import ChangePassword from "./components/Authentication/ChangePassword/ChangePassword";
// import ConfirmEmail from "./components/Authentication/ConfirmEmail/ConfirmEmail";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token) setIsAuthenticated(true);
    if (name) setUserName(name);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && (
          <Navbar userName={userName} setIsAuthenticated={setIsAuthenticated} />
        )}
        <main className="p-6">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Auth
                    setIsAuthenticated={setIsAuthenticated}
                    setUserName={setUserName}
                  />
                )
              }
            />
                      {/* <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/confirmemail" element={<ConfirmEmail/>} /> */}

            <Route
              path="/courses"
              element={
                <ProtectedRoute
                  element={<CourseCatalog />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={<Dashboard />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
