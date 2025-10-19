// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, access }) => {
  // `access` is a boolean prop controlling access
  if (!access) {
    return <Navigate to="/" replace />; // redirect if access is false
  }
  return children;
};

export default ProtectedRoute;
