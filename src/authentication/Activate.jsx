import { Link } from "react-router-dom";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { specializedDoctors } from "../data/data";

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
        emergencyContact: ""
    });

    const [valid, setValid] = useState(false);
    const [error, setError] = useState("");

    const role = props.data.Role;

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (Object.values(formData).some(value => value === "")) {
            setValid(true);
            setError("Please fill all the fields");
        } else if (!emailRegex.test(formData.email)) {
            setValid(true);
            setError("Please enter a valid email address");
        } else {
            setValid(false);
            setError("");
            console.log("Activation Data:", formData);
        }
    };

    return (
        <div className="activate-form">
            <Link to={'/pages/Dashboard'}><button className="X_button"><RiCloseLargeLine size={25}/></button></Link>
            <h1>Activate Your Account</h1>
            {valid && (
                <div className="error">
                    <div className="error__title">{error}</div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Complete Address" />
                <br />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <label>Type of Assurance:</label>
                    <div className="radio-group" style={{ display: "flex", gap: "10px" }}>
                        <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <input type="radio" name="insuranceType" value="AMO" checked={formData.insuranceType === "AMO"} onChange={handleChange} className="custom-radio" style={{ accentColor: '#018786' }} /> AMO
                        </label>
                        <label className="radio-label" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <input type="radio" name="insuranceType" value="CNSS" checked={formData.insuranceType === "CNSS"} onChange={handleChange} className="custom-radio" style={{ accentColor: '#018786' }} /> CNSS
                        </label>
                    </div>
                </div>
                {formData.insuranceType === "AMO" && (
                    <input type="text" id="amoCode" name="amoCode" value={formData.amoCode} onChange={handleChange} placeholder="Your AMO Code" />
                )}
                {formData.insuranceType === "CNSS" && (
                    <input type="text" id="cnssCode" name="cnssCode" value={formData.cnssCode} onChange={handleChange} placeholder="Your CNSS Code" />
                )}
                <br />
                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                <br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Professional Email" />
                <br />
                {role === "doctor" && (
                    <>
                        <select id="specialty" name="specialty" value={formData.specialty} onChange={handleChange}>
                            <option value="">Medical Specialty</option>
                            {specializedDoctors.map((a, d) => (
                                <option value={a} key={d}>{a}</option>
                            ))}
                        </select>
                        <br />
                        <input type="text" id="medicalOrderNumber" name="medicalOrderNumber" value={formData.medicalOrderNumber} onChange={handleChange} placeholder="Medical Order Registration Number" />
                        <br />
                    </>
                )}
                {role === "laboratori" && (
                    <>
                        <input type="text" id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} placeholder="Tax ID" />
                        <br />
                        <input type="text" id="patente" name="patente" value={formData.patente} onChange={handleChange} placeholder="Patente & Tax ID" />
                        <br />
                    </>
                )}
                {role === "clinic" && (
                    <>
                        <input type="text" id="clinicId" name="clinicId" value={formData.clinicId} onChange={handleChange} placeholder="Clinic ID" />
                        <br />
                        <input type="text" id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} placeholder="Tax ID" />
                        <br />
                    </>
                )}
                {role === "Patients" && (
                    <>
                        <input type="text" id="patientId" name="patientId" value={formData.patientId} onChange={handleChange} placeholder="Patient ID" />
                        <br />
                        <input type="text" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Emergency Contact Number" />
                        <br />
                    </>
                )}
                <button type="submit" id="btn">Activate</button>
            </form>
        </div>
    );
}
