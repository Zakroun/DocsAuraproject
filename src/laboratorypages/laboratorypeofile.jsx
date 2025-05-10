import { useSelector } from "react-redux";
import { MdVerified, MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFlask,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LaboratoryProfile({ id }) {
  const navigate = useNavigate();
  const laboratoriesList = useSelector((state) => state.Docsaura.laboratories);
  const laboratory = laboratoriesList?.find((lab) => lab.id === id);
  const [activeTab, setActiveTab] = useState("about");

  const handleBookTest = (e) => {
    if (!localStorage.getItem('token')) {
      e.preventDefault();
      navigate('/pages/Login', {
        state: {
          from: `/laboratory/${id}`,
          message: "Please login to book a test"
        }
      });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  if (!laboratory) {
    return (
      <div className="profile-container loading">
        Loading laboratory profile...
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={`/images/laboratory/${laboratory.image}`}
            alt={`${laboratory.fullName}`}
            className="profile-image"
          />
          <div className="rating-badge">
            {laboratory.rating.toFixed(1)}
            <MdStar className="rating-icon" />
          </div>
        </div>

        <div className="profile-info">
          <h1 className="laboratory-name">
            {laboratory.fullName}
            {laboratory.Verified && (
              <MdVerified className="verification-badge" />
            )}
          </h1>

          <div className="rating-container">
            {renderRatingStars(laboratory.rating)}
            <span className="rating-text">
              {laboratory.rating.toFixed(1)} ({laboratory.comments.length}{" "}
              reviews)
            </span>
          </div>

          <Link
            to={localStorage.getItem('token') ? `/pages/reservelabo` : '#'}
            state={{ id: laboratory.id, role: laboratory.Role }}
            className="appointment-button"
            onClick={handleBookTest}
          >
            Book Test
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
            className={`tab-button ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Services ({laboratory.services.length})
          </button>
          <button
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({laboratory.comments.length})
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
              <h3>About {laboratory.fullName}</h3>
              <p>{laboratory.description}</p>
              <div className="contact-info">
                <p className="contact-item">
                  <FaMapMarkerAlt className="iconprofile" />
                  {laboratory.addressLoc}
                </p>
                <p className="contact-item">
                  <FaEnvelope className="iconprofile" />
                  {laboratory.email}
                </p>
                <p className="contact-item">
                  <FaPhone className="iconprofile" />
                  {laboratory.phone}
                </p>
              </div>
              <div className="key-info">
                <div className="info-card">
                  
                  <h4><FaFlask className="iconprofile" />Specialized Tests</h4>
                  <p>200+ available tests</p>
                </div>
                <div className="info-card">
                  
                  <h4><FaCalendarAlt className="iconprofile" />Opening Hours</h4>
                  <p>Mon-Sat: 7:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="services-section">
              <h3>Available Services</h3>
              <div className="services-grid">
                {laboratory.services.map((service, index) => (
                  <div key={index} className="service-card">
                    <FaFlask className="iconprofile" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-section">
              {laboratory.comments.length > 0 ? (
                laboratory.comments.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-author">
                        {review.patient || "Anonymous"}
                      </span>
                      <div className="review-rating">
                        {renderRatingStars(review.rating || laboratory.rating)}
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
              <h3>Laboratory Location</h3>
              <p className="location-address">
                <FaMapMarkerAlt className="iconprofile" />
                {laboratory.addressLoc}
              </p>
              <div className="map-container">
                <iframe
                  title={`Location of ${laboratory.fullName}`}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8241741085076!2d-85.7219484243674!3d38.21289738680233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88690d94db47e13b%3A0x73357ab7faf3550b!2sAlice%20H%20Johnson%2C%20MD!5e1!3m2!1sen!2sma!4v1738597550212!5m2!1sen!2sma"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="office-hours">
                <h4>Operating Hours</h4>
                <ul>
                  <li>Monday - Friday: 7:00 AM - 8:00 PM</li>
                  <li>Saturday: 8:00 AM - 6:00 PM</li>
                  <li>Sunday: 9:00 AM - 2:00 PM</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
