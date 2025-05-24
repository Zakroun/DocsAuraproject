import { useSelector } from "react-redux";
import { MdVerified, MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaHospital,
  FaCalendarAlt,
  FaUserMd,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ClinicProfile({ id }) {
  const navigate = useNavigate();
  const clinicsList = useSelector((state) => state.Docsaura.clinics);
  const clinic = clinicsList?.find((clinic) => clinic.id === id);
  const [activeTab, setActiveTab] = useState("about");
  const [validServices, setValidServices] = useState([]);

  // Clean and validate services data
  useEffect(() => {
    if (clinic?.services) {
      let services = clinic.services;
      
      // Handle case where services might be a string
      if (typeof services === 'string') {
        try {
          services = JSON.parse(services);
        } catch {
          services = [services];
        }
      }
      
      // Ensure we have an array and filter out empty values
      const cleanedServices = Array.isArray(services) 
        ? services.filter(service => service && service.trim() !== '')
        : [];
      
      setValidServices(cleanedServices);
      // console.log('Services cleaned:', {
      //   original: clinic.services,
      //   cleaned: cleanedServices
      // });
    } else {
      setValidServices([]);
    }
  }, [clinic]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce(
      (total, comment) => total + (comment.rating || 0),
      0
    );
    return sum / reviews.length;
  };

  const handleBookAppointment = (e) => {
    if (!localStorage.getItem("token")) {
      e.preventDefault();
      navigate("/pages/Login", {
        state: {
          from: `/clinic/${id}`,
          message: "Please login to book an appointment",
        },
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

  if (!clinic) {
    return (
      <div className="profile-container loading">Loading clinic profile...</div>
    );
  }

  const averageRating = calculateAverageRating(clinic.reviews);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={
              clinic.image
                ? `http://localhost:8000/storage/${clinic.image}`
                : "/images/clinics/clinic2.jpeg"
            }
            alt={clinic.fullName}
            className="profile-image"
          />
          {clinic.reviews?.length > 0 && (
            <div className="rating-badge">
              {averageRating.toFixed(1)} <MdStar className="rating-icon" />
            </div>
          )}
        </div>

        <div className="profile-info">
          <h1 className="clinic-name">
            {clinic.fullName}
            {clinic.verified && <MdVerified className="verification-badge" />}
          </h1>

          <div className="rating-container">
            {clinic.reviews?.length > 0 ? (
              <>
                {renderRatingStars(averageRating)}
                <span className="rating-text">
                  {averageRating.toFixed(1)} ({clinic.reviews.length} reviews)
                </span>
              </>
            ) : (
              <span className="rating-text">No reviews yet</span>
            )}
          </div>
          <br />
          <Link
            to={localStorage.getItem("token") ? "/pages/reserveclinic" : "#"}
            state={{ clinic }}
            className="appointment-button"
            onClick={handleBookAppointment}
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
            className={`tab-button ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Services {validServices.length > 0 && `(${validServices.length})`}
          </button>
          <button
            className={`tab-button ${activeTab === "doctors" ? "active" : ""}`}
            onClick={() => setActiveTab("doctors")}
          >
            Our Doctors
          </button>
          <button
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews {clinic.reviews && `(${clinic.reviews.length})`}
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
              <h3>About {clinic.fullName}</h3>
              {clinic.description ? (
                <p>{clinic.description}</p>
              ) : (
                <p className="no-description">No description available.</p>
              )}
              <div className="contact-info">
                <p className="contact-item">
                  <FaMapMarkerAlt className="iconprofile" />
                  {clinic.address}
                </p>
                <p className="contact-item">
                  <FaEnvelope className="iconprofile" />
                  {clinic.email}
                </p>
                <p className="contact-item">
                  <FaPhone className="iconprofile" />
                  {clinic.phone}
                </p>
              </div>
              <div className="key-info">
                <div className="info-card">
                  <h4>
                    <FaHospital className="iconprofile" /> Facilities
                  </h4>
                  <p>State-of-the-art equipment</p>
                </div>
                <div className="info-card">
                  <h4>
                    <FaCalendarAlt className="iconprofile" /> Opening Hours
                  </h4>
                  <p>Mon-Sat: 8:00 AM - 8:00 PM</p>
                </div>
                <div className="info-card">
                  <h4>
                    <FaUserMd className="iconprofile" /> Specialists
                  </h4>
                  <p>20+ experienced doctors</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="services-section">
              <h3>Our Services</h3>
              {validServices.length > 0 ? (
                <div className="services-grid">
                  {validServices.map((service, index) => (
                    <div key={index} className="service-card">
                      <FaHospital className="iconprofile" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No services available</p>
              )}
              {clinic.services?.length !== validServices.length && (
                <div className="data-warning">
                  {/* Showing {validServices.length} valid services (original: {clinic.services?.length}) */}
                </div>
              )}
            </div>
          )}

          {activeTab === "doctors" && (
            <div className="doctors-section">
              <h3>Our Medical Team</h3>
              <div className="doctors-grid">
                <div className="doctor-card">
                  <div className="doctor-image"></div>
                  <h4>Dr. Sarah Johnson</h4>
                  <p>Cardiologist</p>
                </div>
                <div className="doctor-card">
                  <div className="doctor-image"></div>
                  <h4>Dr. Michael Chen</h4>
                  <p>Pediatrician</p>
                </div>
                <div className="doctor-card">
                  <div className="doctor-image"></div>
                  <h4>Dr. Emily Wilson</h4>
                  <p>Dermatologist</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-section">
              {clinic.reviews?.length > 0 ? (
                clinic.reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <img
                          src={
                            review.visitor?.image
                              ? `http://localhost:8000/storage/${review.visitor.image}`
                              : "/images/default-user.png"
                          }
                          alt={review.visitor?.fullName || "Anonymous"}
                          className="reviewer-avatar"
                        />
                        <span className="review-author">
                          {review.visitor?.fullName || "Anonymous"}
                        </span>
                      </div>
                      <div className="review-meta">
                        <div className="review-rating">
                          {renderRatingStars(review.rating)}
                        </div>
                        <span className="review-date">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
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
              <h3>Clinic Location</h3>
              <p className="location-address">
                <FaMapMarkerAlt className="iconprofile" />
                {clinic.address}
              </p>
              <div className="map-container">
                <iframe
                  title={`Location of ${clinic.fullName}`}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8241741085076!2d-85.7219484243674!3d38.21289738680233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88690d94db47e13b%3A0x73357ab7faf3550b!2sAlice%20H%20Johnson%2C%20MD!5e1!3m2!1sen!2sma!4v1738597550212!5m2!1sen!2sma"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="office-hours">
                <h4>Operating Hours</h4>
                <ul>
                  <li>Monday - Saturday: 8:00 AM - 8:00 PM</li>
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