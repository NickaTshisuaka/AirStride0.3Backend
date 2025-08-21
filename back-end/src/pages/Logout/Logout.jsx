import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../AuthContext";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthentication();

  useEffect(() => {
    logout();
    setTimeout(() => navigate("/signinlogin"), 1500);
  }, [logout, navigate]);

  return (
    <div className="logout-container">
      <h1>You have been logged out</h1>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default Logout;
