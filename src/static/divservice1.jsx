import { FaMicroscope } from "react-icons/fa6";
import { FaClinicMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

export default function DivService1() {
    return(
        <div className="services1">
            <div className="service">
                <FaUserDoctor size={40} className="iconbox"/>
                <h3>Doctors</h3>
                <p>Our medical services are designed to provide accurate and timely results to help you make informed decisions about your health.</p>
            </div>
            <div className="service">
                <FaMicroscope size={40} className="iconbox"/>
                <h3>LABORATORIES</h3>
                <p>Our medical services are designed to provide accurate and timely results to help you make informed decisions about your health.</p>
            </div>
            <div className="service">
                <FaClinicMedical size={40} className="iconbox"/>
                <h3>CLINICS</h3>
                <p>Our medical services are designed to provide accurate and timely results to help you make informed decisions about your health.</p>
            </div>
        </div>
    )
}