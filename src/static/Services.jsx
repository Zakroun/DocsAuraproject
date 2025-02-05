import React from "react";
import {
  FaMicroscope,
  FaUserDoctor,
  FaBookMedical,
  FaHandHoldingMedical,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { RiVideoOnLine } from "react-icons/ri";
import { LuMessageSquareLock } from "react-icons/lu";

export default function Services() {
  const servicesRow1 = [
    {
      icon: <FaUserDoctor size={40} className="iconbox2" />,
      title: "Doctor and Clinic Search",
      text: "You can search for doctors, clinics, and laboratories based on your medical needs using filters for specialties and locations.",
    },
    {
      icon: <FaHandHoldingMedical size={40} className="iconbox2" />,
      title: "Appointment Booking",
      text: "You can schedule medical consultations or lab tests based on the availability of doctors, clinics, and laboratories.",
    },
    {
      icon: <LuMessageSquareLock size={40} className="iconbox2" />,
      title: "Secure Messaging",
      text: "You can communicate with doctors, clinics, and laboratories through a secure chat system for inquiries and follow-ups.",
    },
  ];

  const servicesRow2 = [
    {
      icon: <RiVideoOnLine size={40} className="iconbox2" />,
      title: "Online Consultations",
      text: "You can receive virtual consultations from doctors via video calls, allowing remote medical assistance.",
    },
    {
      icon: <FaBookMedical size={40} className="iconbox2" />,
      title: "Record Management",
      text: "You can access prescriptions, test results, and other medical documents securely shared by doctors and laboratories.",
    },
    {
      icon: <FaMicroscope size={40} className="iconbox2" />,
      title: "Laboratory Test Services",
      text: "You can book lab tests, receive test results, and consult with specialists for further guidance.",
    },
  ];
  return (
    <div>
      <div className="countainerservices">
        <h1 className="h1services">Services</h1>
        <hr className="hrsevice" />
        <div className="services2">
          {servicesRow1.map((service, index) => (
            <motion.div
              key={index}
              className="service2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="divicon">{service.icon}</div>
              <h3>{service.title}</h3>
              <hr className="hrsevice" />
              <p>{service.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="services3">
          {servicesRow2.map((service, index) => (
            <motion.div
              key={index}
              className="service2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="divicon">{service.icon}</div>
              <h3>{service.title}</h3>
              <hr className="hrsevice" />
              <p>{service.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
