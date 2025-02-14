import { useState, useEffect } from "react";
import { specializedDoctors } from "../data/data";

export default function Activate(props) {
    const [formData, setFormData] = useState({
        address: "",
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
            <h1>Activate Your Account</h1>
            {valid && (
                <div className="error">
                    <div className="error__icon">
                        <svg
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                                fill="#393a37"
                            ></path>
                        </svg>
                    </div>
                    <div className="error__title">{error}</div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <br />
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Complete Address" />
                <br />
                <input type="text" id="amoCode" name="amoCode" value={formData.amoCode} onChange={handleChange} placeholder="AMO Code" />
                <br />
                <input type="text" id="cnssCode" name="cnssCode" value={formData.cnssCode} onChange={handleChange} placeholder="CNSS Code" />
                <br />
                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                <br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Professional Email" />
                <br />
                {role === "doctor" && (
                    <>
                        <select type="text" id="specialty" name="specialty" value={formData.specialty} onChange={handleChange}>
                            <option value="Medical Specialty">Medical Specialty</option>
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
