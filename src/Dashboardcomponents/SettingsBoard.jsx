import React, { useState } from "react";

const SettingsBoard = ({doctor}) => {
  console.log(doctor);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState("uibulbubd@gmail.com");
  const [phoneNo, setPhoneNo] = useState("+8801951627518");
  const [name, setName] = useState("Albert Flores");

  const handleSave = () => {
    console.log("Settings saved");
  };

  return (
    <div className="settings-board">
      <div className="tabs">
        <button className="active">General</button>
        <button>Preferences</button>
        <button>Notification</button>
        <button>User Permissions</button>
      </div>
      
      <div className="settings-section personal-info">
        <h2>Personal Information</h2>
        <div className="profile-picture">
          <img src="" alt="Profile" />
          <button className="edit-picture">✎</button>
        </div>
        <div className="settings-item">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="settings-item">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="settings-item">
          <label>Phone No</label>
          <input type="tel" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
        </div>
      </div>

      <div className="settings-section security">
        <h2>Security</h2>
        <div className="settings-item">
          <label>Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="settings-item">
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="settings-item">
          <label>Retype Password</label>
          <input type="password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
        </div>
        <button className="forgot-password">Forgot password?</button>
      </div>

      <div className="settings-actions">
        <button className="cancel-button">Cancel</button>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default SettingsBoard;
