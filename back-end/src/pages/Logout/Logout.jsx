// src/pages/Logout/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user"); // Clear session
    setTimeout(() => navigate("/login"), 1500); // Redirect after delay
  }, [navigate]);

  return (
    <div className="logout-container">
      <h1>You have been logged out</h1>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default Logout;
