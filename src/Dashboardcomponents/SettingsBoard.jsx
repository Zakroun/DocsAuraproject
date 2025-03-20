import React, { useState } from "react";
import { FaSun, FaMoon, FaBell, FaBellSlash, FaSave, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

// الصورة الافتراضية
const defaultProfileImage = "https://www.gravatar.com/avatar/default?s=200&d=mp";

export default function SettingsBoard({ Use }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState(Use.email);
  const [phoneNo, setPhoneNo] = useState(Use.phone);
  const [name, setName] = useState(Use.fullName);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const [theme, setTheme] = useState("light");
  const [timeZone, setTimeZone] = useState("UTC+01:00) Europe/London");
  const [language, setLanguage] = useState("English (US)");
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [autoBackup, setAutoBackup] = useState(true);
  const [reminders, setReminders] = useState({ push: false, email: false, sms: false, doNotDisturb: false });
  const [comments, setComments] = useState({ push: false, email: false, sms: false, doNotDisturb: false });
  const [tags, setTags] = useState({ push: false, email: false, sms: false, doNotDisturb: false });
  const [showNotification, setShowNotification] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const evaluatePasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Weak";
    if (password.length >= 6 && password.length < 10) return "Medium";
    if (password.length >= 10 && /[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Strong";
    return "Medium";
  };

  const handleSave = () => {
    if (!name || !email || !phoneNo || !currentPassword || !newPassword || !retypePassword) {
      setErrorMessage("All fields must be filled");
      return;
    }

    if (newPassword !== retypePassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setRetypePassword("");
    setEmail("");
    setPhoneNo("");
    setName("");
    setProfileImage(defaultProfileImage);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowRetypePassword(false);
    setTheme("light");
    setTimeZone("UTC+01:00) Europe/London");
    setLanguage("English (US)");
    setBackupFrequency("daily");
    setAutoBackup(true);
    setReminders({ push: false, email: false, sms: false, doNotDisturb: false });
    setComments({ push: false, email: false, sms: false, doNotDisturb: false });
    setTags({ push: false, email: false, sms: false, doNotDisturb: false });

    setShowCancelConfirmation(false);
  };

  const handleCancelConfirmation = () => {
    setShowCancelConfirmation(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <>
            <div className="settings-section personal-info">
              <h1>Settings Board</h1>
              <br />
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
                <h2>Personal Information</h2>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="settings-item">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="settings-item">
                <label>Phone No</label>
                <input
                  type="tel"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
            </div>

            <div className="settings-section security">
              <h2>Security</h2>
              <div className="settings-item">
                <label>Current Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>
              <div className="settings-item">
                <label>New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordStrength(evaluatePasswordStrength(e.target.value));
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                  Password Strength: {passwordStrength}
                </div>
              </div>
              <div className="settings-item">
                <label>Retype Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowRetypePassword(!showRetypePassword)}
                  >
                    {showRetypePassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>
              <Link to="/pages/forgetpass">
                <button className="forgot-password">Forgot password?</button>
              </Link>
            </div>
          </>
        );
      case "Preferences":
        return (
          <div className="settings-section preferences">
            <h2>Preferences</h2>
            <div className="theme-selector">
              <button
                className={`theme-button ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
              >
                <FaSun /> Light Mode
              </button>
              <button
                className={`theme-button ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <FaMoon /> Dark Mode
              </button>
            </div>

            <h2>Time Zone</h2>
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="select"
            >
              <option value="UTC+01:00) Europe/London">
                (UTC+01:00) Europe/London
              </option>
            </select>

            <h2>Language</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="select"
            >
              <option value="English (US)">English (US)</option>
              <option value="Arabic">العربية</option>
              <option value="French">Français</option>
            </select>

            <h2>Backup Settings</h2>
            <div className="settings-item">
              <label>Backup Frequency</label>
              <select
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                className="select"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="settings-itemm">
              <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={autoBackup}
                  onChange={(e) => setAutoBackup(e.target.checked)}
                />
                Enable Auto Backup
              </label>
            </div>
          </div>
        );
      case "Notification":
        return (
          <div className="settings-section notification">
            <h2>Notification Settings</h2>
            <div className="notification-category">
              <h3>Appointments</h3>
              <p>
                Receive notifications for appointment updates.
              </p>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.email}
                    onChange={(e) =>
                      setReminders({ ...reminders, email: e.target.checked })
                    }
                  />
                  Email
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.sms}
                    onChange={(e) =>
                      setReminders({ ...reminders, sms: e.target.checked })
                    }
                  />
                  SMS
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.push}
                    onChange={(e) =>
                      setReminders({ ...reminders, push: e.target.checked })
                    }
                  />
                  <FaBell /> Push
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.doNotDisturb}
                    onChange={(e) =>
                      setReminders({ ...reminders, doNotDisturb: e.target.checked })
                    }
                  />
                  <FaBellSlash /> Do Not Disturb
                </label>
              </div>
            </div>
            <div className="notification-category">
              <h3>Prescriptions</h3>
              <p>
                Get notified when new prescriptions are available.
              </p>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={comments.email}
                    onChange={(e) =>
                      setComments({ ...comments, email: e.target.checked })
                    }
                  />
                  Email
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.sms}
                    onChange={(e) =>
                      setComments({ ...comments, sms: e.target.checked })
                    }
                  />
                  SMS
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.push}
                    onChange={(e) =>
                      setComments({ ...comments, push: e.target.checked })
                    }
                  />
                  <FaBell /> Push
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.doNotDisturb}
                    onChange={(e) =>
                      setComments({ ...comments, doNotDisturb: e.target.checked })
                    }
                  />
                  <FaBellSlash /> Do Not Disturb
                </label>
              </div>
            </div>
            <div className="notification-category">
              <h3>Health Reminders</h3>
              <p>
                Receive reminders for health check-ups and updates.
              </p>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={tags.email}
                    onChange={(e) =>
                      setTags({ ...tags, email: e.target.checked })
                    }
                  />
                  Email
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.sms}
                    onChange={(e) =>
                      setTags({ ...tags, sms: e.target.checked })
                    }
                  />
                  SMS
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.push}
                    onChange={(e) =>
                      setTags({ ...tags, push: e.target.checked })
                    }
                  />
                  <FaBell /> Push
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.doNotDisturb}
                    onChange={(e) =>
                      setTags({ ...tags, doNotDisturb: e.target.checked })
                    }
                  />
                  <FaBellSlash /> Do Not Disturb
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-board">
      {showNotification && (
        <div className="custom-notification-top">
          <div className="custom-notification success">
            Successfully Updated!
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="custom-notification-top">
          <div className="custom-notification error">
            {errorMessage}
          </div>
        </div>
      )}

      {showCancelConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Are you sure you want to cancel all changes?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirmCancel}>
                Confirm
              </button>
              <button className="cancel-button" onClick={handleCancelConfirmation}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="tabs">
        <button
          className={activeTab === "General" ? "active" : ""}
          onClick={() => setActiveTab("General")}
        >
          General
        </button>
        <button
          className={activeTab === "Preferences" ? "active" : ""}
          onClick={() => setActiveTab("Preferences")}
        >
          Preferences
        </button>
        <button
          className={activeTab === "Notification" ? "active" : ""}
          onClick={() => setActiveTab("Notification")}
        >
          Notification
        </button>
      </div>

      {renderContent()}

      <div className="settings-actions">
        <button className="cancel-button" onClick={handleCancel}>
          <FaTimes /> Cancel
        </button>
        <button className="save-button" onClick={handleSave}>
          <FaSave /> Save
        </button>
      </div>
    </div>
  );
}