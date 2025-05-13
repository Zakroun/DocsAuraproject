import { useSelector } from "react-redux";
import { MdVerified, MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DoctorProfile({ id }) {
  const navigate = useNavigate();
  console.log(id)
  const doctorsList = useSelector((state) => state.Docsaura.doctors);
  const doctor = doctorsList?.find((doc) => doc.id === id);
  console.log('doctor : ',doctor)
  const [activeTab, setActiveTab] = useState("about");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAppointmentClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      navigate('/pages/Login', { 
        state: { message: "Veuillez vous connecter pour prendre rendez-vous" } 
      });
    }
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<MdStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<MdStarHalf key={i} className="star half" />);
      } else {
        stars.push(<MdStarOutline key={i} className="star empty" />);
      }
    }

    return stars;
  };

  if (!doctor) {
    return (
      <div className="profile-container loading">Loading doctor profile...</div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={doctor.image ? `http://localhost:8000/storage/${doctor.image}` : '/images/doctors/doctor3.jpeg'}
            alt={`${doctor.fullName}`}
            className="profile-image"
          />
          <div className="rating-badge">
            {/* {doctor.rating.toFixed(1)} */}
            <MdStar className="rating-icon" />
          </div>
        </div>

        <div className="profile-info">
          <h1 className="doctor-name">
            Dr. {doctor.fullName}
            {doctor.Verified && <MdVerified className="verification-badge" />}
          </h1>
          <div className="rating-container">
            {renderRatingStars(doctor.rating)}
            {/* <span className="rating-text">{doctor.rating.toFixed(1)} (125 reviews)</span> */}
          </div>
          <br />
          <Link
            to={localStorage.getItem('token') ? `/pages/reservedoc` : '#'}
            state={{ id: doctor.id, role: doctor.Role }}
            className="appointment-button"
            onClick={handleAppointmentClick}
          >
            Book Appointment
          </Link>
        </div>
      </div>

      <div className="profile-content">
        <nav className="profile-tabs">
          <button
            className={`tab-button ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            {/* Reviews ({doctor.comments.length}) */}
          </button>
          <button
            className={`tab-button ${activeTab === "location" ? "active" : ""}`}
            onClick={() => setActiveTab("location")}
          >
            Location
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === "about" && (
            <div className="about-section">
              <h3>About Dr. {doctor.fullName}</h3>
              <p className="doctor-specialty">
                <FaBriefcaseMedical className="iconprofile" />
                {doctor.specialty}
              </p>
              <div className="contact-info">
                <p className="contact-item">
                  <FaMapMarkerAlt className="iconprofile" />
                  {doctor.address}
                </p>
                <p className="contact-item">
                  <FaEnvelope className="iconprofile" />
                  {doctor.email}
                </p>
                <p className="contact-item">
                  <FaPhone className="iconprofile" />
                  {doctor.phone}
                </p>
              </div>
              <p>
                Dr. {doctor.fullName} is a board-certified {doctor.specialty}{" "}
                with over 10 years of experience.{" "}
                {doctor.fullName.split(" ")[0]} completed medical training at
                Harvard Medical School and has been practicing in{" "}
                {/* {doctor.address.split(",")[1]?.trim() || doctor.address} */}
                since 2015.
              </p>
              <h4>Education</h4>
              <ul>
                <li>MD, Harvard Medical School, 2010</li>
                <li>Residency at Massachusetts General Hospital, 2010-2014</li>
                <li>
                  Fellowship in {doctor.specialty}, Johns Hopkins Hospital,
                  2014-2015
                </li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-section">
              {doctor.comments.length > 0 ? (
                doctor.comments.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-author">
                        {review.patient || "Anonymous"}
                      </span>
                      <div className="review-rating">
                        {renderRatingStars(review.rating || doctor.rating)}
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                    <span className="review-date">
                      {review.date || "2 weeks ago"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-reviews">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          )}

          {activeTab === "location" && (
            <div className="location-section">
              <h3>Office Location</h3>
              <p className="location-address">
                <FaMapMarkerAlt className="iconprofile" />
                {doctor.address}
              </p>
              <div className="map-container">
                <iframe
                  title={`Location of Dr. ${doctor.fullName}`}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8241741085076!2d-85.7219484243674!3d38.21289738680233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88690d94db47e13b%3A0x73357ab7faf3550b!2sAlice%20H%20Johnson%2C%20MD!5e1!3m2!1sen!2sma!4v1738597550212!5m2!1sen!2sma"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="office-hours">
                <h4>Office Hours</h4>
                <ul>
                  <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
                  <li>Saturday: 9:00 AM - 1:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}