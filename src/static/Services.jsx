import React from "react";
import { FaMicroscope, FaUserDoctor, FaBookMedical, FaHandHoldingMedical } from "react-icons/fa6";
import { RiVideoOnLine } from "react-icons/ri";
import { LuMessageSquareLock } from "react-icons/lu";

export default function Services() {
  return (
    <div>
      <div className="countainerservices">
        <h1 className="h1services">Services</h1>
        <hr className="hrsevice" />
        <div className="services2">
          <div className="service2">
            <div className="divicon">
              <FaUserDoctor size={40} className="iconbox2" />
            </div>
            <h3>Doctor and Clinic Search</h3>
            <hr className="hrsevice" />
            <p>
              You can search for doctors, clinics, and laboratories based on your
              medical needs using filters for specialties and locations.
            </p>
          </div>
          <div className="service2">
            <div className="divicon">
              <FaHandHoldingMedical size={40} className="iconbox2" />
            </div>
            <h3>Appointment Booking</h3>
            <hr className="hrsevice" />
            <p>
              You can schedule medical consultations or lab tests based on the
              availability of doctors, clinics, and laboratories.
            </p>
          </div>
          <div className="service2">
            <div className="divicon">
              <LuMessageSquareLock size={40} className="iconbox2" />
            </div>
            <h3>Secure Messaging</h3>
            <hr className="hrsevice" />
            <p>
              You can communicate with doctors, clinics, and laboratories through
              a secure chat system for inquiries and follow-ups.
            </p>
          </div>
        </div>
        <div className="services3">
          <div className="service2">
            <div className="divicon">
              <RiVideoOnLine size={40} className="iconbox2" />
            </div>
            <h3>Online Consultations</h3>
            <hr className="hrsevice" />
            <p>
              You can receive virtual consultations from doctors via video calls,
              allowing remote medical assistance.
            </p>
          </div>
          <div className="service2">
            <div className="divicon">
              <FaBookMedical size={40} className="iconbox2" />
            </div>
            <h3>Medical Record Management</h3>
            <hr className="hrsevice" />
            <p>
              You can access prescriptions, test results, and other medical
              documents securely shared by doctors and laboratories.
            </p>
          </div>
          <div className="service2">
            <div className="divicon">
              <FaMicroscope size={40} className="iconbox2" />
            </div>
            <h3>Laboratory Test Services</h3>
            <hr className="hrsevice" />
            <p>
              You can book lab tests, receive test results, and consult with
              specialists for further guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
