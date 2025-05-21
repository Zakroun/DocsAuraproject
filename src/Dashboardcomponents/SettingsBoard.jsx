import React, { useState, useEffect } from "react";
import { FaBell, FaBellSlash, FaSave, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SettingsBoard({ Use }) {
  console.log("image", Use.image);
  console.log(Use);
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
  const [showNotification, setShowNotification] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    level: "",
    width: "0%",
    color: "transparent",
  });
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  
  // Consultation type options
  const consultationTypeOptions = [
    "Online Conversation, voice or video call",
    "Consultation at the patient's home",
    "Consultation at the doctor's office",
    "Emergency consultation",
    "Follow-up consultation",
    "Specialist consultation"
  ];
  
  const [consultationTypes, setConsultationTypes] = useState(
    Use.consultationTypes || [
      {
        type: "Online Conversation, voice or video call",
        price: 250
      },
      {
        type: "Consultation at the patient's home",
        price: 300
      },
      {
        type: "Consultation at the doctor's office",
        price: 200
      }
    ]
  );
  const [workingHours, setWorkingHours] = useState(
    Use.working_hours || {
      from: "08:00",
      to: "18:00"
    }
  );

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "English",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    consultationReminder: false,
    labResultsNotification: false,
    appointmentConfirmation: true,
    newServiceAlert: false,
    ...(Use.role === "doctor" && {
      prescriptionExpiryAlert: true,
      patientFollowupReminder: false,
      emergencyCaseNotification: true,
    }),
    ...(Use.role === "clinic" && {
      doctorAvailabilityAlert: true,
      roomBookingConfirmation: false,
      patientArrivalNotification: true,
    }),
    ...(Use.role === "laboratory" && {
      testResultsReadyAlert: true,
      sampleCollectionReminder: false,
      criticalResultNotification: true,
    }),
  });

  const translations = {
    settingsTitle: "Settings Board",
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    phoneNo: "Phone",
    security: "Security",
    currentPassword: "Current Password",
    newPassword: "New Password",
    retypePassword: "Retype Password",
    forgotPassword: "Forgot password?",
    cancel: "Cancel",
    save: "Save",
    successfullyUpdated: "Settings updated successfully!",
    confirmCancel: "Are you sure you want to cancel? All changes will be lost.",
    confirm: "Confirm",
    general: "General",
    preferences: "Preferences",
    passwordStrength: "Password Strength",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    services: "Services",
    consultationTypes: "Consultation Types",
    workingHours: "Working Hours",
    description: "Description",
    yearsOfExperience: "Years of Experience",
    selectConsultationType: "Select Consultation Type",
    addNewType: "Add New Type",
    price: "Price",
    remove: "Remove"
  };

  const handleConsultationTypeChange = (index, field, value) => {
    const updatedTypes = [...consultationTypes];
    updatedTypes[index][field] = value;
    setConsultationTypes(updatedTypes);
  };

  const addConsultationType = () => {
    setConsultationTypes([
      ...consultationTypes,
      { type: "", price: 0 }
    ]);
  };

  const removeConsultationType = (index) => {
    const updatedTypes = [...consultationTypes];
    updatedTypes.splice(index, 1);
    setConsultationTypes(updatedTypes);
  };

  const getTranslation = (key) => {
    return translations[key] || key;
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length === 0) {
      return {
        level: "",
        width: "0%",
        color: "transparent",
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
        color: "#ff4d4f",
      };
    } else if (strength <= 4) {
      return {
        level: getTranslation("medium"),
        width: "66%",
        color: "#faad14",
      };
    } else {
      return {
        level: getTranslation("strong"),
        width: "100%",
        color: "#52c41a",
      };
    }
  };

  const handleSave = () => {
    if (
      !name ||
      !email ||
      !phoneNo ||
      !currentPassword ||
      !newPassword ||
      !retypePassword
    ) {
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
    setShowCancelConfirmation(false);
    setConsultationTypes(Use.consultationTypes || [
      {
        type: "Online Conversation, voice or video call",
        price: 250
      },
      {
        type: "Consultation at the patient's home",
        price: 300
      },
      {
        type: "Consultation at the doctor's office",
        price: 200
      }
    ]);
    setWorkingHours(Use.working_hours || {
      from: "08:00",
      to: "18:00"
    });
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

  const handleWorkingHoursChange = (field, value) => {
    setWorkingHours({
      ...workingHours,
      [field]: value
    });
  };


  const renderRoleSpecificFields = () => {
    switch (Use.role) {
      case "doctor":
        return (
          <>
            <div className="settings-item">
              <label>{getTranslation("workingHours")}</label>
              <div className="working-hours-container">
                <div className="time-range-input">
                  <label>From:</label>
                  <input
                    type="time"
                    value={workingHours.from}
                    onChange={(e) => handleWorkingHoursChange("from", e.target.value)}
                  />
                </div>
                <div className="time-range-input">
                  <label>To:</label>
                  <input
                    type="time"
                    value={workingHours.to}
                    onChange={(e) => handleWorkingHoursChange("to", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="settings-item">
              <label>{getTranslation("description")}</label>
              <textarea
                className="description_settings"
                value={Use.description || ""}
                rows="4"
              />
            </div>
            <div className="settings-item">
              <label>{getTranslation("yearsOfExperience")}</label>
              <input
                type="text"
                value={Use.years_of_experience || ""}
              />
            </div>
            <div className="settings-item">
              <label>{getTranslation("consultationTypes")}</label>
              <div className="consultation-types-container">
                {consultationTypes.map((consultation, index) => (
                  <div key={index} className="consultation-type-item">
                    <select
                      value={consultation.type}
                      onChange={(e) => handleConsultationTypeChange(index, "type", e.target.value)}
                    >
                      <option value="">{getTranslation("selectConsultationType")}</option>
                      {consultationTypeOptions.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder={getTranslation("price")}
                      value={consultation.price}
                      onChange={(e) => handleConsultationTypeChange(index, "price", e.target.value)}
                    />
                    <button
                      className="remove-consultation-type"
                      onClick={() => removeConsultationType(index)}
                    >
                      {getTranslation("remove")}
                    </button>
                  </div>
                ))}
                <button
                  className="add-consultation-type"
                  onClick={addConsultationType}
                >
                  + {getTranslation("addNewType")}
                </button>
              </div>
            </div>
          </>
        );
      case "clinic":
        return (
          <>
            <div className="settings-item">
              <label>{getTranslation("workingHours")}</label>
              <div className="working-hours-container">
                <div className="time-range-input">
                  <label>From:</label>
                  <input
                    type="time"
                    value={workingHours.from}
                    onChange={(e) => handleWorkingHoursChange("from", e.target.value)}
                  />
                </div>
                <div className="time-range-input">
                  <label>To:</label>
                  <input
                    type="time"
                    value={workingHours.to}
                    onChange={(e) => handleWorkingHoursChange("to", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="settings-item">
              <label>{getTranslation("description")}</label>
              <textarea
                className="description_settings"
                value={Use.description || ""}
                rows="4"
              />
            </div>
            <div className="settings-item">
              <label>{getTranslation("services")}</label>
              <input
                type="text"
                value={Use.services ? Use.services.join(", ") : ""}
              />
            </div>
            <div className="settings-item">
              <label>{getTranslation("consultationTypes")}</label>
              <input
                type="text"
                value={
                  Use.consultationTypes ? Use.consultationTypes.join(", ") : ""
                }
              />
            </div>
          </>
        );
      case "laboratory":
        return (
          <>
            <div className="settings-item">
              <label>{getTranslation("workingHours")}</label>
              <div className="working-hours-container">
                <div className="time-range-input">
                  <label>From:</label>
                  <input
                    type="time"
                    value={workingHours.from}
                    onChange={(e) => handleWorkingHoursChange("from", e.target.value)}
                  />
                </div>
                <div className="time-range-input">
                  <label>To:</label>
                  <input
                    type="time"
                    value={workingHours.to}
                    onChange={(e) => handleWorkingHoursChange("to", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="settings-item">
              <label>{getTranslation("description")}</label>
              <textarea
                className="description_settings"
                value={Use.description || ""}
                rows="4"
              />
            </div>
            <div className="settings-item">
              <label>{getTranslation("services")}</label>
              <input
                type="text"
                value={Use.services ? Use.services.join(", ") : ""}
              />
            </div>
          </>
        );
      default:
        return null;
    }
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
                  src={
                    Use.image
                      ? `${Use.image}`
                      : `/images/${
                          Use.role === "clinic"
                            ? "clinics/clinic2.jpeg"
                            : Use.role === "laboratory"
                            ? "laboratory/labo2.jpeg"
                            : Use.role === "doctor"
                            ? "doctors/doctor2.jpeg"
                            : "user.png"
                        }`
                  }
                  alt="Profile"
                  onClick={toggleFullImage}
                  style={{ cursor: "pointer" }}
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
                      setPasswordStrength(
                        evaluatePasswordStrength(e.target.value)
                      );
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
                      {getTranslation("passwordStrength")}:{" "}
                      <span style={{ color: passwordStrength.color }}>
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
                          transition: "all 0.3s ease",
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
                <button className="forgot-password">
                  {getTranslation("forgotPassword")}
                </button>
              </Link>
            </div>
          </>
        );
      case "Preferences":
        if (Use.role === "patient") {
          return null;
        }

        return (
          <div className="settings-section preferences">
            <h1>Professional Preferences</h1>
            {renderRoleSpecificFields()}
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
          <div className="custom-notification error">{errorMessage}</div>
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
              <button
                className="cancel-button"
                onClick={handleCancelConfirmation}
              >
                {getTranslation("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showFullImage && (
        <div className="full-image-modal" onClick={toggleFullImage}>
          <div
            className="full-image-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                Use.image
                  ? `${Use.image}`
                  : `/images/${
                      Use.role === "clinic"
                        ? "clinics/clinic2.jpeg"
                        : Use.role === "laboratory"
                        ? "laboratory/labo2.jpeg"
                        : Use.role === "doctor"
                        ? "doctors/doctor2.jpeg"
                        : "user.png"
                    }`
              }
              alt="Profile Full Size"
            />
            <button className="close-full-image" onClick={toggleFullImage}>
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
        {Use.role !== "patient" && (
          <button
            className={activeTab === "Preferences" ? "active" : ""}
            onClick={() => setActiveTab("Preferences")}
          >
            {getTranslation("preferences")}
          </button>
        )}
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