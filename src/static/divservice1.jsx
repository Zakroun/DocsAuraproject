import { FaMicroscope } from "react-icons/fa6";
import { FaClinicMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function DivService1() {
    return (
        <div className="services1">
            {[
                { icon: <FaUserDoctor size={40} className="iconbox" />, title: "Doctors" },
                { icon: <FaMicroscope size={40} className="iconbox" />, title: "LABORATORIES" },
                { icon: <FaClinicMedical size={40} className="iconbox" />, title: "CLINICS" },
            ].map((service, index) => (
                <motion.div
                    key={index}
                    className="service"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                    {service.icon}
                    <h3>{service.title}</h3>
                    <p>Our medical services are designed to provide accurate and timely results to help you make informed decisions about your health.</p>
                </motion.div>
            ))}
        </div>
    );
}
