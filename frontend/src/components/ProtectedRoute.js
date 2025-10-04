// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  // allow if user state exists or token exists
  if (user || token) return children;
  return <Navigate to="/login" replace />;
}
