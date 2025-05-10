import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { specializedDoctors } from "../data/data";
import { Addrequest } from "../data/DocsauraSlice";
import { useDispatch } from "react-redux";
import axios from "../data/axios";

export default function Activate(props) {
  const [formData, setFormData] = useState({
    address: "",
    insuranceType: "",
    amoCode: "",
    cnssCode: "",
    specialty: "",
    phoneNumber: "",
    email: "",
    medicalOrderNumber: "",
    taxId: "",
    patente: "",
    patientId: "",
    emergencyContact: "",
  });

  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const role = props.data.role;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    // Common required fields for all roles
    const requiredFields = ["address", "email", "phoneNumber"];
    
    // Role-specific required fields
    const roleSpecificFields = {
      doctor: ["specialty", "medicalOrderNumber"],
      clinic: ["taxId"],
      laboratory: ["taxId", "patente"],
      Patient: ["patientId", "emergencyContact"]
    };

    // Combine common and role-specific required fields
    const allRequiredFields = [...requiredFields, ...(roleSpecificFields[role] || [])];
    
    // Check for missing fields
    const missingField = allRequiredFields.find(field => !formData[field]?.trim());

    if (missingField) {
      setError(`Please fill all the required fields (${missingField} is missing)`);
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValid(false);
    setError("");

    if (!validateForm()) {
      setValid(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        user_id: props.data.id,
        role: role,
        address: formData.address,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        amoCode: formData.amoCode,
        cnssCode: formData.cnssCode,
        specialty: formData.specialty,
        medicalOrderNumber: formData.medicalOrderNumber,
        taxId: formData.taxId,
        patente: formData.patente,
        patientId: formData.patientId,
        emergencyContact: formData.emergencyContact,
        date: new Date().toISOString().split("T")[0],
        status: "pending"
      };

      // Remove empty values
      Object.keys(payload).forEach(key => {
        if (payload[key] === "" || payload[key] == null) {
          delete payload[key];
        }
      });

      const response = await axios.post("/requests", payload);

      if (response.status >= 200 && response.status < 300) {
        dispatch(Addrequest(response.data.request));
        navigate("/");
      } else {
        throw new Error(response.data?.message || "Failed to submit request");
      }
    } catch (error) {
      setValid(true);
      if (error.response) {
        // Handle backend validation errors
        if (error.response.data?.errors) {
          const errors = Object.values(error.response.data.errors).flat();
          setError(errors.join(', '));
        } else {
          setError(error.response.data?.message || "Server error occurred");
        }
      } else {
        setError(error.message || "Network error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of your component (showRoleSpecificFields and return) remains exactly the same
  // Only the handling functions above have been updated

  const showRoleSpecificFields = () => {
    switch (role) {
      case "doctor":
        return (
          <>
            <div className="inputdiv">
              <select
                style={{ height: "25px" }}
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Medical Specialty</option>
                {specializedDoctors.map((a, d) => (
                  <option value={a} key={d}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="medicalOrderNumber"
                name="medicalOrderNumber"
                value={formData.medicalOrderNumber}
                onChange={handleChange}
                placeholder="Medical Order Registration Number"
                required
              />
            </div>
            <br />
          </>
        );
      case "laboratory":
        return (
          <>
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="Tax ID"
                required
              />
            </div>
            <br />
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="patente"
                name="patente"
                value={formData.patente}
                onChange={handleChange}
                placeholder="Patente"
                required
              />
            </div>
            <br />
          </>
        );
      case "clinic":
        return (
          <>
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="Tax ID"
                required
              />
            </div>
            <br />
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="clinicId"
                name="clinicId"
                value={formData.clinicId}
                onChange={handleChange}
                placeholder="Clinic ID"
              />
            </div>
            <br />
          </>
        );
      case "Patient":
        return (
          <>
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="Patient ID"
                required
              />
            </div>
            <br />
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency Contact Number"
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="activate-form">
      <Link to={"/pages/Dashboard"}>
        <button className="X_button">
          <RiCloseLargeLine size={25} />
        </button>
      </Link>
      <h1>Activate Your Account</h1>
      <br />
      {valid && (
        <div className="error">
          <div className="error__title">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="inputdiv">
          <input
            style={{ height: "25px" }}
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Complete Address"
            required
          />
        </div>
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label>Type of Assurance:</label>
          <div className="radio-group" style={{ display: "flex", gap: "10px" }}>
            <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="radio"
                name="insuranceType"
                value="AMO"
                checked={formData.insuranceType === "AMO"}
                onChange={handleChange}
                className="custom-radio"
                style={{ accentColor: "#018786" }}
              />{" "}
              AMO
            </label>
            <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="radio"
                name="insuranceType"
                value="CNSS"
                checked={formData.insuranceType === "CNSS"}
                onChange={handleChange}
                className="custom-radio"
                style={{ accentColor: "#018786" }}
              />{" "}
              CNSS
            </label>
          </div>
          <br />
        </div>
        {formData.insuranceType === "AMO" && (
          <div className="inputdiv">
            <input
              style={{ height: "25px" }}
              type="text"
              id="amoCode"
              name="amoCode"
              value={formData.amoCode}
              onChange={handleChange}
              placeholder="Your AMO Code"
            />
          </div>
        )}
        {formData.insuranceType === "CNSS" && (
          <div className="inputdiv">
            <input
              style={{ height: "25px" }}
              type="text"
              id="cnssCode"
              name="cnssCode"
              value={formData.cnssCode}
              onChange={handleChange}
              placeholder="Your CNSS Code"
            />
          </div>
        )}
        <br />
        <div className="inputdiv">
          <input
            style={{ height: "25px" }}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <br />
        <div className="inputdiv">
          <input
            style={{ height: "25px" }}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Professional Email"
            required
          />
        </div>
        <br />

        {showRoleSpecificFields()}

        <button type="submit" id="btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Activate"}
        </button>
      </form>
    </div>
  );
}