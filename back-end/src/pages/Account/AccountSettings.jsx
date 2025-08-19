import React, { useState } from "react";
import "./AccountSettings.css";
import Footer from "../../components/Footer/Footer";

const AccountSettings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className="account-page">
      <h1>Account Settings</h1>
      <div className="settings-grid">

        {/* Profile Card */}
        <div className="settings-card">
          <h2>Profile</h2>
          <div className="profile-section">
            <img src="/profile-placeholder.png" alt="Profile" className="profile-pic" />
            <button className="upload-btn">Change Picture</button>
          </div>
          <input type="text" placeholder="First Name" defaultValue="John" />
          <input type="text" placeholder="Last Name" defaultValue="Doe" />
          <input type="email" placeholder="Email" defaultValue="john@example.com" />
          <button className="save-btn">Save Changes</button>
        </div>

        {/* Security */}
        <div className="settings-card">
          <h2>Security</h2>
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm Password" />
          <button className="save-btn">Update Password</button>
        </div>

        {/* Preferences */}
        <div className="settings-card">
          <h2>Preferences</h2>
          <label>
            <input type="checkbox" /> Receive Notifications
          </label>
          <label>
            <input type="checkbox" /> Make Profile Private
          </label>
          <button onClick={toggleDarkMode} className="save-btn">
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default AccountSettings;
