import React, { useState } from "react";
import "./AccountSettings.css";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`account-container ${darkMode ? "dark" : ""}`}>
      <h1>Account Settings</h1>
      <p className="account-tagline">Manage your profile, preferences, and appearance</p>

      {/* Top Tab Navigation */}
      <div className="tab-nav">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={activeTab === "password" ? "active" : ""}
          onClick={() => setActiveTab("password")}
        >
          Password
        </button>
        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
        <button
          className={activeTab === "appearance" ? "active" : ""}
          onClick={() => setActiveTab("appearance")}
        >
          Appearance
        </button>
      </div>

      {/* Content */}
      <div className="account-content">
        {activeTab === "profile" && (
          <div className="account-card">
            <div className="profile-header">
              <img src="/profile-pic.jpg" alt="Profile" className="profile-avatar" />
              <div>
                <button className="btn">Upload New</button>
                <button className="btn delete">Delete Avatar</button>
              </div>
            </div>
            <form>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" defaultValue="Nicka" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" defaultValue="Tshisuaka" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="nicka@example.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue="+27 082 555 1122" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" defaultValue="123 Blue Street, Cape Town, SA" />
              </div>
              <button className="save-btn">Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="account-card">
            <h2>Change Password</h2>
            <form>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" />
              </div>
              <button className="save-btn">Update Password</button>
            </form>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="account-card">
            <h2>Notification Preferences</h2>
            <label>
              <input type="checkbox" defaultChecked /> Email Notifications
            </label>
            <label>
              <input type="checkbox" /> SMS Notifications
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Product Updates
            </label>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="account-card">
            <h2>Appearance</h2>
            <p>Toggle between Light and Dark Mode</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
