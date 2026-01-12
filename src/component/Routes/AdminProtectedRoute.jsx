import React from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("tokenId");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
<ToastContainer
        position="top-right"
        autoClose={2500}
        pauseOnHover
        theme="colored"
      />

  return children;
};

export default AdminProtectedRoute;
