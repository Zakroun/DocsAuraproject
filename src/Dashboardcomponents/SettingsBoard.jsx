import React, { useState, useEffect } from "react";
import { FaBell, FaBellSlash, FaSave, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SettingsBoard({ Use }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState(Use.email);
  const [phoneNo, setPhoneNo] = useState(Use.phone);
  const [name, setName] = useState(Use.fullName);
  const [profileImage, setProfileImage] = useState(Use.image);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const [reminders, setReminders] = useState({ push: false, email: false, sms: false, doNotDisturb: false });
  const [comments, setComments] = useState({ push: false, email: false, sms: false, doNotDisturb: false });
  const [tags, setTags] = useState({ push: false, email: false, sms: false, doNotDisturb: false });
  const [showNotification, setShowNotification] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    level: "",
    width: "0%",
    color: "transparent"
  });
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const translations = {
    "English (US)": {
      settingsTitle: "Settings Board",
      personalInfo: "Personal Information",
      name: "Name",
      email: "Email",
      phoneNo: "Phone No",
      security: "Security",
      currentPassword: "Current Password",
      newPassword: "New Password",
      retypePassword: "Retype Password",
      forgotPassword: "Forgot password?",
      notificationSettings: "Notification Settings",
      appointments: "Appointments",
      prescriptions: "Prescriptions",
      healthReminders: "Health Reminders",
      cancel: "Cancel",
      save: "Save",
      successfullyUpdated: "Settings updated successfully!",
      confirmCancel: "Are you sure you want to cancel? All changes will be lost.",
      confirm: "Confirm",
      general: "General",
      notification: "Notification",
      passwordStrength: "Password Strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong"
    },
    "Arabic": {
      settingsTitle: "لوحة الإعدادات",
      personalInfo: "المعلومات الشخصية",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phoneNo: "رقم الهاتف",
      security: "الأمان",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      retypePassword: "أعد إدخال كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      notificationSettings: "إعدادات الإشعارات",
      appointments: "المواعيد",
      prescriptions: "الوصفات الطبية",
      healthReminders: "تذكيرات الصحة",
      cancel: "إلغاء",
      save: "حفظ",
      successfullyUpdated: "تم تحديث الإعدادات بنجاح!",
      confirmCancel: "هل أنت متأكد أنك تريد الإلغاء؟ سيتم فقدان جميع التغييرات.",
      confirm: "تأكيد",
      general: "عام",
      notification: "الإشعارات",
      passwordStrength: "قوة كلمة المرور",
      weak: "ضعيفة",
      medium: "متوسطة",
      strong: "قوية"
    },
  };

  const getTranslation = (key) => {
    return translations["English (US)"][key] || key;
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length === 0) {
      return {
        level: "",
        width: "0%",
        color: "transparent"
      };
    }
    
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    
    let strength = 0;
    
    if (password.length > 0) strength += 1;
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (hasSpecialChar) strength += 1;
    if (hasNumber) strength += 1;
    if (hasUpper && hasLower) strength += 1;
    
    if (strength <= 2) {
      return {
        level: getTranslation("weak"),
        width: "33%",
        color: "#ff4d4f"
      };
    } else if (strength <= 4) {
      return {
        level: getTranslation("medium"),
        width: "66%",
        color: "#faad14"
      };
    } else {
      return {
        level: getTranslation("strong"),
        width: "100%",
        color: "#52c41a"
      };
    }
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
      setShouldRefresh(true);
    }, 3000);
  };

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }
  }, [shouldRefresh]);

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
    setProfileImage(Use.image);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowRetypePassword(false);
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

  const toggleFullImage = () => {
    setShowFullImage(!showFullImage);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <>
            <div className="settings-section personal-info">
              <h1>{getTranslation("settingsTitle")}</h1>
              <br />
              <div className="profile-picture">
                <img 
                  src={`/images${Use.Role === 'doctor'?'/doctors/':Use.Role === 'clinic'?'/clinics/':Use.Role === 'laboratory'?'/laboratory/':''}/${profileImage}`} 
                  alt="Profile" 
                  onClick={toggleFullImage}
                  style={{ cursor: 'pointer' }}
                />
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
                <h2>{getTranslation("personalInfo")}</h2>
                <label>{getTranslation("name")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="settings-item">
                <label>{getTranslation("email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="settings-item">
                <label>{getTranslation("phoneNo")}</label>
                <input
                  type="tel"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
            </div>

            <div className="settings-section security">
              <h2>{getTranslation("security")}</h2>
              <div className="settings-item">
                <label>{getTranslation("currentPassword")}</label>
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
                <label>{getTranslation("newPassword")}</label>
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
                {newPassword.length > 0 && (
                  <div className="password-strength-container">
                    <div className="password-strength-label">
                      {getTranslation("passwordStrength")}: <span style={{ color: passwordStrength.color }}>
                        {passwordStrength.level}
                      </span>
                    </div>
                    <div className="password-strength-bar">
                      <div 
                        className="password-strength-progress"
                        style={{
                          width: passwordStrength.width,
                          backgroundColor: passwordStrength.color,
                          height: "4px",
                          borderRadius: "2px",
                          transition: "all 0.3s ease"
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="settings-item">
                <label>{getTranslation("retypePassword")}</label>
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
                <button className="forgot-password">{getTranslation("forgotPassword")}</button>
              </Link>
            </div>
          </>
        );
      case "Notification":
        return (
          <div className="settings-section notification">
            <h2>{getTranslation("notificationSettings")}</h2>
            <div className="notification-category">
              <h3>{getTranslation("appointments")}</h3>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.email}
                    onChange={(e) =>
                      setReminders({ ...reminders, email: e.target.checked })
                    }
                  />
                  {getTranslation("email")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.sms}
                    onChange={(e) =>
                      setReminders({ ...reminders, sms: e.target.checked })
                    }
                  />
                  {getTranslation("sms")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.push}
                    onChange={(e) =>
                      setReminders({ ...reminders, push: e.target.checked })
                    }
                  />
                  <FaBell /> {getTranslation("push")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={reminders.doNotDisturb}
                    onChange={(e) =>
                      setReminders({ ...reminders, doNotDisturb: e.target.checked })
                    }
                  />
                  <FaBellSlash /> {getTranslation("doNotDisturb")}
                </label>
              </div>
            </div>
            <div className="notification-category">
              <h3>{getTranslation("prescriptions")}</h3>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={comments.email}
                    onChange={(e) =>
                      setComments({ ...comments, email: e.target.checked })
                    }
                  />
                  {getTranslation("email")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.sms}
                    onChange={(e) =>
                      setComments({ ...comments, sms: e.target.checked })
                    }
                  />
                  {getTranslation("sms")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.push}
                    onChange={(e) =>
                      setComments({ ...comments, push: e.target.checked })
                    }
                  />
                  <FaBell /> {getTranslation("push")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={comments.doNotDisturb}
                    onChange={(e) =>
                      setComments({ ...comments, doNotDisturb: e.target.checked })
                    }
                  />
                  <FaBellSlash /> {getTranslation("doNotDisturb")}
                </label>
              </div>
            </div>
            <div className="notification-category">
              <h3>{getTranslation("healthReminders")}</h3>
              <div className="notification-options">
                <label>
                  <input
                    type="checkbox"
                    checked={tags.email}
                    onChange={(e) =>
                      setTags({ ...tags, email: e.target.checked })
                    }
                  />
                  {getTranslation("email")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.sms}
                    onChange={(e) =>
                      setTags({ ...tags, sms: e.target.checked })
                    }
                  />
                  {getTranslation("sms")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.push}
                    onChange={(e) =>
                      setTags({ ...tags, push: e.target.checked })
                    }
                  />
                  <FaBell /> {getTranslation("push")}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tags.doNotDisturb}
                    onChange={(e) =>
                      setTags({ ...tags, doNotDisturb: e.target.checked })
                    }
                  />
                  <FaBellSlash /> {getTranslation("doNotDisturb")}
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
            {getTranslation("successfullyUpdated")}
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
            <p>{getTranslation("confirmCancel")}</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirmCancel}>
                {getTranslation("confirm")}
              </button>
              <button className="cancel-button" onClick={handleCancelConfirmation}>
                {getTranslation("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showFullImage && (
        <div className="full-image-modal" onClick={toggleFullImage}>
          <div className="full-image-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={`/images${Use.Role === 'doctor'?'/doctors/':Use.Role === 'clinic'?'/clinics/':Use.Role === 'laboratory'?'/laboratory/':''}/${profileImage}`} 
              alt="Profile Full Size" 
            />
            <button 
              className="close-full-image" 
              onClick={toggleFullImage}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="tabs">
        <button
          className={activeTab === "General" ? "active" : ""}
          onClick={() => setActiveTab("General")}
        >
          {getTranslation("general")}
        </button>
        <button
          className={activeTab === "Notification" ? "active" : ""}
          onClick={() => setActiveTab("Notification")}
        >
          {getTranslation("notification")}
        </button>
      </div>

      {renderContent()}

      <div className="settings-actions">
        <button className="cancel-button" onClick={handleCancel}>
          <FaTimes /> {getTranslation("cancel")}
        </button>
        <button className="save-button" onClick={handleSave}>
          <FaSave /> {getTranslation("save")}
        </button>
      </div>
    </div>
  );
}