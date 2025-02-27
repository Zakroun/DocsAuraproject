import React, { useState } from "react";

const SettingsBoard = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [activeTab, setActiveTab] = useState("General");

  const [theme, setTheme] = useState('light');
  const [timeZone, setTimeZone] = useState('UTC+01:00) Europe/London');
  const [language, setLanguage] = useState('English (US)');
  const [sidebarSize, setSidebarSize] = useState('Medium 300px');
  const [iconsSize, setIconsSize] = useState('Medium 32px');

  const [reminders, setReminders] = useState({ push: false, email: false, sms: false });
  const [comments, setComments] = useState({ push: false, email: false, sms: false });
  const [tags, setTags] = useState({ push: false, email: false, sms: false });

  const [permissions, setPermissions] = useState({
    view: false,
    edit: false,
    delete: false,
  });

  const handleSave = () => {
    console.log("Settings saved");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions({
      ...permissions,
      [name]: checked,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <>
            <div className="settings-section personal-info">
              <h2>Personal Information</h2>
              <div className="profile-picture">
                <img src={profileImage} alt="Profile" />
                <label className="edit-picture">
                  ✎
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
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
                <div style={{ position: 'relative' }}>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>
              <div className="settings-item">
                <label>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>
              <div className="settings-item">
                <label>Retype Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowRetypePassword(!showRetypePassword)}
                  >
                    {showRetypePassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>
              <button className="forgot-password">Forgot password?</button>
            </div>
          </>
        );
      case "Preferences":
        return (
          <div className="settings-section preferences">
            <h2>Preferences</h2>
            <div className="theme-selector">
              <button
                className={`theme-button ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                Light Mode
              </button>
              <button
                className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                Dark Mode
              </button>
            </div>

            <h2>Time Zone</h2>
            <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
              <option value="UTC+01:00) Europe/London">(UTC+01:00) Europe/London</option>
              {/* Add more time zones as needed */}
            </select>

            <h2>Language</h2>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="English (US)">English (US)</option>
              {/* Add more languages as needed */}
            </select>

            <h2>Sidebar Size</h2>
            <select value={sidebarSize} onChange={(e) => setSidebarSize(e.target.value)}>
              <option value="Medium 300px">Medium 300px</option>
              {/* Add more sizes as needed */}
            </select>

            <h2>Icons Size</h2>
            <select value={iconsSize} onChange={(e) => setIconsSize(e.target.value)}>
              <option value="Medium 32px">Medium 32px</option>
              {/* Add more sizes as needed */}
            </select>
          </div>
        );
      case "Notification":
        return (
          <div className="settings-section notification">
            <h2>Notification Settings</h2>
            <div className="notification-category">
              <h3>Reminders</h3>
              <p>These are notifications to remind you of updates you might have missed.</p>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.push}
                    onChange={(e) => setReminders({ ...reminders, push: e.target.checked })}
                  />
                  Push
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.email}
                    onChange={(e) => setReminders({ ...reminders, email: e.target.checked })}
                  />
                  Email
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.sms}
                    onChange={(e) => setReminders({ ...reminders, sms: e.target.checked })}
                  />
                  SMS
                </label>
              </div>
            </div>

            <div className="notification-category">
              <h3>Comments</h3>
              <p>These are notifications for comments on your posts and replies to your comments.</p>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={comments.push}
                    onChange={(e) => setComments({ ...comments, push: e.target.checked })}
                  />
                  Push
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.email}
                    onChange={(e) => setComments({ ...comments, email: e.target.checked })}
                  />
                  Email
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.sms}
                    onChange={(e) => setComments({ ...comments, sms: e.target.checked })}
                  />
                  SMS
                </label>
              </div>
            </div>

            <div className="notification-category">
              <h3>Tags</h3>
              <p>These are notifications for when someone tags you in a comment, post or story.</p>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={tags.push}
                    onChange={(e) => setTags({ ...tags, push: e.target.checked })}
                  />
                  Push
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.email}
                    onChange={(e) => setTags({ ...tags, email: e.target.checked })}
                  />
                  Email
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.sms}
                    onChange={(e) => setTags({ ...tags, sms: e.target.checked })}
                  />
                  SMS
                </label>
              </div>
            </div>
          </div>
        );
      case "User Permissions":
        return (
          <div className="settings-section user-permissions">
            <h2>User Permissions</h2>
            <div className="permissions-form">
              <label className="permission-item">
                <input
                  type="checkbox"
                  name="view"
                  checked={permissions.view}
                  onChange={handlePermissionChange}
                />
                View Patient Records
              </label>
              <label className="permission-item">
                <input
                  type="checkbox"
                  name="edit"
                  checked={permissions.edit}
                  onChange={handlePermissionChange}
                />
                Edit Patient Records
              </label>
              <label className="permission-item">
                <input
                  type="checkbox"
                  name="delete"
                  checked={permissions.delete}
                  onChange={handlePermissionChange}
                />
                Delete Patient Records
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-board">
      <div className="tabs">
        <button className={activeTab === "General" ? "active" : ""} onClick={() => setActiveTab("General")}>General</button>
        <button className={activeTab === "Preferences" ? "active" : ""} onClick={() => setActiveTab("Preferences")}>Preferences</button>
        <button className={activeTab === "Notification" ? "active" : ""} onClick={() => setActiveTab("Notification")}>Notification</button>
        <button className={activeTab === "User Permissions" ? "active" : ""} onClick={() => setActiveTab("User Permissions")}>User Permissions</button>
      </div>
      
      {renderContent()}

      <div className="settings-actions">
        <button className="cancel-button">Cancel</button>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default SettingsBoard;