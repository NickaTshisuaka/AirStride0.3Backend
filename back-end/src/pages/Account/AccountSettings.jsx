import React, { useState } from "react";
import "./AccountSettings.css";

const AccountSettings = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profilePic: "/default-profile.jpg",
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profilePic: URL.createObjectURL(file) });
    }
  };

  const toggleDarkMode = () => {
    setUser({ ...user, darkMode: !user.darkMode });
    document.body.classList.toggle("dark-mode");
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className={`account-container ${user.darkMode ? "dark" : ""}`}>
      <h1>Account Settings</h1>

      <div className="profile-circle">
        <img src={user.profilePic} alt="Profile" />
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
      </div>

      <div className="account-card">
        <div className="form-section">
          <label>
            First Name
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
          </label>

          <label>
            Last Name
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
          </label>

          <label>
            Email
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter new password" />
          </label>

          <div className="preferences">
            <label className="toggle-switch">
              <input type="checkbox" checked={user.darkMode} onChange={toggleDarkMode} />
              <span className="slider"></span>
              Dark Mode
            </label>
          </div>

          <button className="save-btn" onClick={handleSave}>Save Changes</button>
          <button className="delete-btn">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
