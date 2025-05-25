import React, { useState, useEffect } from "react";
import { FaSave, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SettingsBoard({ user }) {
  const [formData, setFormData] = useState(initializeFormData(user));
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.image);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const [passwordStrength, setPasswordStrength] = useState({
    level: "",
    width: "0%",
    color: "transparent",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [newService, setNewService] = useState("");

  const addNewService = () => {
    if (newService.trim() === "") {
      showNotification("Please enter a service name", "error");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, newService.trim()],
    }));
    setNewService("");
  };

  const consultationTypeOptions = [
    "Online Consultation (voice/video call)",
    "In-person Consultation (patient's home)",
    "In-person Consultation (clinic/office)",
    "Emergency Consultation",
    "Follow-up Consultation",
    "Specialist Consultation",
  ];

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  function initializeFormData(user) {
    return {
      name: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      retypePassword: "",
      city: user.city || "",
      gender: user.gender || "",
      birth_date: user.birth_date || "",
      blood_type: user.blood_type || "",
      description: user.description || "",
      working_hours: user.working_hours || { from: "08:00", to: "18:00" },
      consultationTypes: user.consultationTypes || [
        { type: "Online Consultation (voice/video call)", price: 250 },
        { type: "In-person Consultation (patient's home)", price: 300 },
        { type: "In-person Consultation (clinic/office)", price: 200 },
      ],
      years_of_experience: user.years_of_experience || "",
      services: user.services || [],
      emergency_contact: user.emergency_contact || "",
    };
  }

  const cleanServices = (services) => {
    if (!services) return [];
    if (typeof services === "string") {
      try {
        const parsed = JSON.parse(services);
        return Array.isArray(parsed) ? parsed : [services];
      } catch {
        return [services];
      }
    }
    return Array.isArray(services)
      ? services.filter((service) => service && service.trim() !== "")
      : [];
  };

  const [validServices, setValidServices] = useState(
    cleanServices(user.services || [])
  );

  useEffect(() => {
    const cleaned = cleanServices(formData.services);
    setValidServices(cleaned);
  }, [formData.services]);

  useEffect(() => {
    const initialData = initializeFormData(user);
    const currentData = {
      ...formData,
      password: "",
      retypePassword: "",
    };

    const changesDetected =
      Object.keys(currentData).some((key) => {
        if (key === "working_hours") {
          return (
            JSON.stringify(currentData[key]) !==
            JSON.stringify(initialData[key])
          );
        }
        if (key === "consultationTypes" || key === "services") {
          return (
            JSON.stringify(currentData[key]) !==
            JSON.stringify(initialData[key])
          );
        }
        return currentData[key] !== initialData[key];
      }) || imageFile !== null;

    setHasChanges(changesDetected);
  }, [formData, imageFile, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleConsultationTypeChange = (index, field, value) => {
    const updatedTypes = [...formData.consultationTypes];
    updatedTypes[index][field] =
      field === "price" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, consultationTypes: updatedTypes }));
  };

  const addConsultationType = () => {
    setFormData((prev) => ({
      ...prev,
      consultationTypes: [...prev.consultationTypes, { type: "", price: 0 }],
    }));
  };

  const removeConsultationType = (index) => {
    const updatedTypes = formData.consultationTypes.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, consultationTypes: updatedTypes }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        showNotification("Please select a valid image file", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showNotification("Image size should be less than 2MB", "error");
        return;
      }
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const toggleImagePreview = () => {
    setShowImagePreview(!showImagePreview);
  };

  const evaluatePasswordStrength = (password) => {
    if (!password) return { level: "", width: "0%", color: "transparent" };

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

    if (strength <= 2) return { level: "Weak", width: "33%", color: "#ff4d4f" };
    if (strength <= 4)
      return { level: "Medium", width: "66%", color: "#faad14" };
    return { level: "Strong", width: "100%", color: "#52c41a" };
  };

  const updateLocalStorageUser = (updatedFields) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const updatedUser = { ...storedUser, ...updatedFields };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const handleSave = async () => {
    if (formData.password && formData.password !== formData.retypePassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);

      if (formData.password) {
        data.append("password", formData.password);
        data.append("password_confirmation", formData.retypePassword);
      }

      data.append("city", formData.city);
      data.append("gender", formData.gender);
      data.append("birth_date", formData.birth_date);
      data.append("blood_type", formData.blood_type);

      if (imageFile) data.append("image", imageFile);

      if (user.role !== "patient") {
        data.append("description", formData.description);
        data.append("working_hours[from]", formData.working_hours.from);
        data.append("working_hours[to]", formData.working_hours.to);

        if (user.role === "doctor") {
          data.append("years_of_experience", formData.years_of_experience);
          formData.consultationTypes.forEach((type, index) => {
            data.append(`consultationTypes[${index}][type]`, type.type);
            data.append(`consultationTypes[${index}][price]`, type.price);
          });
        }

        if (user.role === "clinic" || user.role === "laboratory") {
          validServices.forEach((service) => {
            data.append("services[]", service);
          });
        }
      } else {
        data.append("emergency_contact", formData.emergency_contact);
      }

      const baseurl = `http://localhost:8000/api/`;
      const response = await axios.post(
        `${baseurl}settings/${user.id}/update`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Prepare updated user data for localStorage
      const updatedUserData = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        gender: formData.gender,
        birth_date: formData.birth_date,
        blood_type: formData.blood_type,
        description: formData.description,
        working_hours: formData.working_hours,
        years_of_experience: formData.years_of_experience,
        consultationTypes: formData.consultationTypes,
        services: validServices,
        emergency_contact: formData.emergency_contact,
      };

      // Update image if changed
      if (imageFile) {
        updatedUserData.image = previewImage;
      }

      // Update localStorage
      updateLocalStorageUser(updatedUserData);

      showNotification("Settings updated successfully", "success");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error updating settings:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join("\n") ||
        "Failed to update settings";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    if (
      hasChanges &&
      !window.confirm("Are you sure you want to discard all changes?")
    ) {
      return;
    }
    setFormData(initializeFormData(user));
    setImageFile(null);
    setPreviewImage(user.image);
  };

  const renderRoleSpecificFields = () => {
    switch (user.role) {
      case "doctor":
        return (
          <>
            <div className="settings-item">
              <label>Working Hours</label>
              <div className="working-hours-container">
                <div className="time-range-input">
                  <label>From:</label>
                  <input
                    type="time"
                    value={formData.working_hours.from}
                    onChange={(e) =>
                      handleNestedChange(
                        "working_hours",
                        "from",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="time-range-input">
                  <label>To:</label>
                  <input
                    type="time"
                    value={formData.working_hours.to}
                    onChange={(e) =>
                      handleNestedChange("working_hours", "to", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="settings-item">
              <label>Description</label>
              <textarea
                className="description_settings"
                value={formData.description}
                rows="4"
                onChange={(e) =>
                  handleChange({
                    target: { name: "description", value: e.target.value },
                  })
                }
                placeholder="Tell patients about your expertise and approach..."
              />
            </div>
            <div className="settings-item">
              <label>Years of Experience</label>
              <input
                type="number"
                min="0"
                value={formData.years_of_experience}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "years_of_experience",
                      value: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="settings-item">
              <label>Consultation Types</label>
              <div className="consultation-types-container">
                {[0, 1, 2].map((index) => {
                  const consultation = user?.consultationTypes?.[index] || {
                    type: "",
                    price: "",
                  };
                  return (
                    <div
                      key={`default-${index}`}
                      className="consultation-type-item"
                    >
                      <select
                        value={consultation.type}
                        onChange={(e) =>
                          handleConsultationTypeChange(
                            index,
                            "type",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">Select Consultation Type</option>
                        {consultationTypeOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        placeholder="Price"
                        value={consultation.price}
                        onChange={(e) =>
                          handleConsultationTypeChange(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        required
                      />
                      {!user?.consultationTypes?.[index] && (
                        <button
                          type="button"
                          className="remove-consultation-type"
                          onClick={() => removeConsultationType(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  );
                })}

                {formData.consultationTypes
                  .slice(3)
                  .map((consultation, index) => (
                    <div
                      key={`extra-${index + 3}`}
                      className="consultation-type-item"
                    >
                      <select
                        value={consultation.type}
                        onChange={(e) =>
                          handleConsultationTypeChange(
                            index + 3,
                            "type",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">Select Consultation Type</option>
                        {consultationTypeOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        placeholder="Price"
                        value={consultation.price}
                        onChange={(e) =>
                          handleConsultationTypeChange(
                            index + 3,
                            "price",
                            e.target.value
                          )
                        }
                        required
                      />
                      <button
                        type="button"
                        className="remove-consultation-type"
                        onClick={() => removeConsultationType(index + 3)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                {formData.consultationTypes.length <
                  consultationTypeOptions.length && (
                  <button
                    type="button"
                    className="add-consultation-type"
                    onClick={addConsultationType}
                  >
                    + Add New Type
                  </button>
                )}
              </div>
            </div>
          </>
        );
      case "clinic":
      case "laboratory":
        return (
          <>
            <div className="settings-item">
              <label>Working Hours</label>
              <div className="working-hours-container">
                <div className="time-range-input">
                  <label>From:</label>
                  <input
                    type="time"
                    value={formData.working_hours.from}
                    onChange={(e) =>
                      handleNestedChange(
                        "working_hours",
                        "from",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="time-range-input">
                  <label>To:</label>
                  <input
                    type="time"
                    value={formData.working_hours.to}
                    onChange={(e) =>
                      handleNestedChange("working_hours", "to", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="settings-item">
              <label>Description</label>
              <textarea
                className="description_settings"
                value={formData.description}
                rows="4"
                onChange={(e) =>
                  handleChange({
                    target: { name: "description", value: e.target.value },
                  })
                }
                placeholder={`Tell patients about your ${
                  user.role === "clinic" ? "clinic" : "laboratory"
                }...`}
              />
            </div>
            <div className="settings-item">
              <label>Services</label>
              <div className="services-container">
                {validServices.map((service, index) => (
                  <div key={index} className="service-item">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => {
                        const newServices = [...validServices];
                        newServices[index] = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          services: newServices,
                        }));
                      }}
                      placeholder="Service name"
                    />
                    <button
                      type="button"
                      className="remove-service"
                      onClick={() => {
                        const newServices = validServices.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          services: newServices,
                        }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="add-service-container">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Enter new service name"
                    className="new-service-input"
                  /> 
                  <br />
                  <button
                    type="button"
                    className="add-service"
                    onClick={addNewService}
                  >
                    + Add Service
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case "patient":
        return (
          <div className="settings-item">
            <label>Emergency Contact</label>
            <input
              type="tel"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              placeholder="+1234567890"
            />
          </div>
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
              <h1>Personal Information</h1>
              <div className="profile-picture">
                <img
                  src={
                    previewImage ||
                    `/images/${
                      user.role === "clinic"
                        ? "clinics/clinic2.jpeg"
                        : user.role === "laboratory"
                        ? "laboratory/labo2.jpeg"
                        : user.role === "doctor"
                        ? "doctors/doctor2.jpeg"
                        : "user.png"
                    }`
                  }
                  alt="Profile"
                  onClick={toggleImagePreview}
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
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </div>
              <div className="settings-item">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </div>
              <div className="settings-item">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="settings-item">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="settings-item">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="settings-item">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="settings-item">
                <label>Blood Type</label>
                <select
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="settings-section security">
              <h2>Security</h2>
              <div className="settings-item">
                <label>New Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    autoComplete="new-password"
                    onChange={(e) => {
                      handleChange(e);
                      setPasswordStrength(
                        evaluatePasswordStrength(e.target.value)
                      );
                    }}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                {formData.password && (
                  <div className="password-strength-container">
                    <div className="password-strength-label">
                      Password Strength:{" "}
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
                        }}
                      ></div>
                    </div>
                    <div className="password-hints">
                      {formData.password.length < 8 && (
                        <span>At least 8 characters</span>
                      )}
                      {!/[A-Z]/.test(formData.password) && (
                        <span>At least one uppercase letter</span>
                      )}
                      {!/[0-9]/.test(formData.password) && (
                        <span>At least one number</span>
                      )}
                      {!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) && (
                        <span>At least one special character</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="settings-item">
                <label>Confirm Password</label>
                <div className="password-input-container">
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    name="retypePassword"
                    value={formData.retypePassword}
                    onChange={(e) => {
                      handleChange(e);
                      setPasswordStrength(
                        evaluatePasswordStrength(e.target.value)
                      );
                    }}
                    placeholder="Retype your new password"
                  />
                </div>
                {formData.retypePassword && (
                  <div className="password-strength-container">
                    <div className="password-strength-label">
                      Password Strength:{" "}
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
                        }}
                      ></div>
                    </div>
                    <div className="password-hints">
                      {formData.password.length < 8 && (
                        <span>At least 8 characters</span>
                      )}
                      {!/[A-Z]/.test(formData.password) && (
                        <span>At least one uppercase letter</span>
                      )}
                      {!/[0-9]/.test(formData.password) && (
                        <span>At least one number</span>
                      )}
                      {!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) && (
                        <span>At least one special character</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
          </>
        );
      case "Preferences":
        return (
          <div className="settings-section preferences">
            <h1>
              {user.role === "patient"
                ? "Personal Preferences"
                : "Professional Preferences"}
            </h1>
            {renderRoleSpecificFields()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-board">
      {notification.message && (
        <div className="custom-notification-top">
          <div className="custom-notification success">
            {notification.message}
          </div>
        </div>
      )}

      {showImagePreview && (
        <div className="image-preview-modal" onClick={toggleImagePreview}>
          <div
            className="image-preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-preview" onClick={toggleImagePreview}>
              &times;
            </button>
            <img
              src={
                previewImage ||
                `/images/${
                  user.role === "clinic"
                    ? "clinics/clinic2.jpeg"
                    : user.role === "laboratory"
                    ? "laboratory/labo2.jpeg"
                    : user.role === "doctor"
                    ? "doctors/doctor2.jpeg"
                    : "user.png"
                }`
              }
              alt="Profile Preview"
            />
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
        {user.role !== "Patient" ? (
          <button
            className={activeTab === "Preferences" ? "active" : ""}
            onClick={() => setActiveTab("Preferences")}
          >
            {user.role !== "Patient" ? "Preferences" : "Professional"}
          </button>
        ) : (
          ""
        )}
      </div>

      <form
        className="settings-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {renderContent()}

        <div className="settings-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={resetForm}
            disabled={!hasChanges || isLoading}
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            className="save-button"
            disabled={!hasChanges || isLoading}
          >
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <FaSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}