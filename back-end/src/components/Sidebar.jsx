import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      {/* Hover zone */}
      <div className="navbar-hover-zone"></div>

      {/* Sidebar Navbar */}
      <nav className="side-navbar">
        <div className="app-icon">
          <i className="fas fa-running"></i>
          <span>AirStride</span>
        </div>
        <ul className="navbar-links">
          {/* Fixed signup/login links */}
          <li>
            <Link to="/signinlogin">
              <i className="fas fa-user-plus"></i> Sign In / Sign Up
            </Link>
          </li>
          <li>
            <Link to="/home">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/products">
              <i className="fas fa-list"></i> Products
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </li>
          <li className="has-submenu">
            <Link to="/about">
              <i className="fas fa-info-circle"></i> About Us
            </Link>
            <ul className="submenu">
              <li><Link to="#">About the Company</Link></li>
              <li><Link to="#">About Employees</Link></li>
              <li><Link to="#">About Products</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/faq">
              <i className="fas fa-question-circle"></i> FAQ
            </Link>
          </li>
          <li className="has-submenu">
            <Link to="/account">
              <i className="fas fa-user-cog"></i> Account Settings
            </Link>
            <ul className="submenu">
              <li><Link to="/account/profile">Profile</Link></li>
              <li><Link to="/account/security">Security</Link></li>
              <li><Link to="/account/preferences">Preferences</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
