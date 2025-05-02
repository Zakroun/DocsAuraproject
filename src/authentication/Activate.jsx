import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { specializedDoctors } from "../data/data";
import { Addrequest } from "../data/DocsauraSlice";
// import { useNavigate } from "react-router-dom";
// import { changecurrentpage } from "../data/DocsauraSlice";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const role = props.data.Role;
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const requiredFields = ['address', 'email', 'specialty', 'medicalOrderNumber'];
    const missingField = requiredFields.find((field) => formData[field] === "");
  
    if (missingField) {
      setValid(true);
      setError("Please fill all the required fields");
    } else if (!emailRegex.test(formData.email)) {
      setValid(true);
      setError("Please enter a valid email address");
    } else {
      setValid(false);
      setError("");
      const today = new Date().toISOString().split('T')[0];
      let requestData = {
        id: props.data.id,
        role: role,
        status: "pending",
        date: today,
      };
      if (role === "doctor") {
        requestData = {
          ...requestData,
          amoCode: formData.amoCode,
          cnssCode: formData.cnssCode,
          address: formData.address,
          email: formData.email,
          specialty: formData.specialty,
          medicalOrderNumber: formData.medicalOrderNumber,
        };
      } else if (role === "clinic") {
        requestData = {
          ...requestData,
          amoCode: formData.amoCode,
          cnssCode: formData.cnssCode,
          address: formData.address,
          email: formData.email,
          clinicId: formData.clinicId,
          taxId: formData.taxId,
        };
      } else if (role === "laboratory") {
        requestData = {
          ...requestData,
          amoCode: formData.amoCode,
          cnssCode: formData.cnssCode,
          address: formData.address,
          email: formData.email,
          taxId: formData.taxId,
          patente: formData.patente,
        };
      } else if (role === "Patients") {
        requestData = {
          ...requestData,
          amoCode: formData.amoCode,
          cnssCode: formData.cnssCode,
          address: formData.address,
          email: formData.email,
          patientId: formData.patientId,
          emergencyContact: formData.emergencyContact,
        };
      }
      dispatch(Addrequest(requestData));
      navigate('/')
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
          />
        </div>
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label>Type of Assurance:</label>
          <div className="radio-group" style={{ display: "flex", gap: "10px" }}>
            <label
              className="radio-label"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
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
            <label
              className="radio-label"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
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
          />
        </div>
        <br />
        {role === "doctor" && (
          <>
            <div className="inputdiv">
              <select
              style={{height : '25px'}}
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
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
              />
            </div>
            <br />
          </>
        )}
        {role === "laboratory" && (
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
                placeholder="Patente & Tax ID"
              />
            </div>
            <br />
          </>
        )}
        {role === "clinic" && (
          <>
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
            <div className="inputdiv">
              <input
                style={{ height: "25px" }}
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="Tax ID"
              />
            </div>
            <br />
          </>
        )}
        {role === "Patients" && (
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
              />
            </div>
          </>
        )}
        <button type="submit" id="btn">
          Activate
        </button>
      </form>
    </div>
  );
}
