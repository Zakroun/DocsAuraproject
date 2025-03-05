import React from "react";
import {
  FaStethoscope,
  FaUserMd,
  FaHospitalAlt,
  FaHandHoldingMedical,
  FaBookMedical,
} from "react-icons/fa";
import { FaUsers,FaCalendarCheck } from 'react-icons/fa';
import { RiVideoOnLine } from "react-icons/ri";
import { LuMessageSquareLock } from "react-icons/lu";
import Header from "../static/header";
import Footer from "../static/Footer";
import { GoMoveToTop } from "react-icons/go";
export const About = () => {
  return (
    <>
      <Header></Header>
      <GoMoveToTop></GoMoveToTop>
      <div className="about-container">
        <h1>About Docsaura</h1>
        <hr className="hrsevice" />
        <div className="about-description">
          <p>
            Docsaura is a cutting-edge healthcare platform designed to simplify
            the process of connecting patients with medical professionals and
            healthcare services. Whether you're looking for doctors, clinics, or
            laboratories, our app provides an easy and efficient way to book
            appointments, manage medical records, and communicate with
            healthcare providers securely.
            <br />
            With features like online consultations, appointment booking, secure
            messaging, and laboratory test services, Docsaura ensures that your
            health journey is convenient, accessible, and transparent.
          </p>
        </div>

        <div className="about-icons">
          <div className="icon-box">
            <FaStethoscope size={50} className="about-icon" />
            <h3>Comprehensive Healthcare</h3>
          </div>
          <div className="icon-box">
            <FaUserMd size={50} className="about-icon" />
            <h3>Expert Doctors</h3>
          </div>
          <div className="icon-box">
            <FaHospitalAlt size={50} className="about-icon" />
            <h3>Trusted Clinics</h3>
          </div>
        </div>

        <h1>Our Services</h1>
        <hr className="hrsevice" />
        <div className="services">
          <div className="servicea">
            <FaHandHoldingMedical size={40} className="service-icon" />
            <h3>Appointment Booking</h3>
            <p>
              You can schedule medical consultations or lab tests based on the
              availability of doctors, clinics, and laboratories.
            </p>
          </div>
          <div className="servicea">
            <LuMessageSquareLock size={40} className="service-icon" />
            <h3>Secure Messaging</h3>
            <p>
              You can communicate with doctors, clinics, and laboratories
              through a secure chat system for inquiries and follow-ups.
            </p>
          </div>
          <div className="servicea">
            <RiVideoOnLine size={40} className="service-icon" />
            <h3>Online Consultations</h3>
            <p>
              You can receive virtual consultations from doctors via video
              calls, allowing remote medical assistance.
            </p>
          </div>
          <div className="servicea">
            <FaBookMedical size={40} className="service-icon" />
            <h3>Record Management</h3>
            <p>
              You can access prescriptions, test results, and other medical
              documents securely shared by doctors and laboratories.
            </p>
          </div>
        </div>

        <h1>App Usage Statistics</h1>
        <hr className="hrsevice" />
        <div className="statistics">
          <div className="stat-box">
            <FaUsers size={40} className="stat-icon" />
            <h4>Total Users</h4>
            <p>+50,000</p>
          </div>
          <div className="stat-box">
            <FaUserMd size={40} className="stat-icon" />
            <h4>Doctors Available</h4>
            <p>+5,000</p>
          </div>
          <div className="stat-box">
            <FaCalendarCheck size={40} className="stat-icon" />
            <h4>Appointments Booked</h4>
            <p>+100,000</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
