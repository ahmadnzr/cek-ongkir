import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem("isAuth");

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
