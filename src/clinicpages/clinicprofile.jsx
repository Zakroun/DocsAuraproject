import { useSelector } from "react-redux";
import { MdVerified, MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaHospital,
  FaCalendarAlt,
  FaUserMd
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ClinicProfile({ id }) {
  const navigate = useNavigate();
  const clinicsList = useSelector((state) => state.Docsaura.clinics);
  const clinic = clinicsList?.find((clinic) => clinic.id === id);
  const [activeTab, setActiveTab] = useState("about");

  const handleBookAppointment = (e) => {
    if (!localStorage.getItem('token')) {
      e.preventDefault();
      navigate('/pages/Login', {
        state: {
          from: `/clinic/${id}`,
          message: "Please login to book an appointment"
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

  if (!clinic) {
    return (
      <div className="profile-container loading">Loading clinic profile...</div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={clinic.image ? `http://localhost:8000/storage/${clinic.image}` : '/images/clinics/clinic2.jpeg'}
            alt={`${clinic.fullName}`}
            className="profile-image"
          />
          <div className="rating-badge">
            {/* {clinic.rating.toFixed(1)} */}
            <MdStar className="rating-icon" />
          </div>
        </div>

        <div className="profile-info">
          <h1 className="clinic-name">
            {clinic.fullName}
            {clinic.verified && <MdVerified className="verification-badge" />}
          </h1>
          
          <div className="rating-container">
            {renderRatingStars(clinic.rating)}
            <span className="rating-text">
               {/* ({clinic.comments.length}  */}
               reviews</span>
          </div>

          <Link 
          to={localStorage.getItem('token') ? `/pages/reserveclinic` : '#'}
          state={{ clinic:clinic}}
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
            Services 
            {/* ({clinic.services.length}) */}
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
            Reviews 
            {/* ({clinic.comments.length}) */}
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
              <p>{clinic.description}</p>
              
              <div className="key-info">
                <div className="info-card">
                  
                  <h4><FaHospital className="iconprofile" /> Facilities</h4>
                  <p>State-of-the-art equipment</p>
                </div>
                <div className="info-card">
                  
                  <h4><FaCalendarAlt className="iconprofile" />Opening Hours</h4>
                  <p>Mon-Sat: 8:00 AM - 8:00 PM</p>
                </div>
                <div className="info-card">
                  
                  <h4><FaUserMd className="iconprofile" />Specialists</h4>
                  <p>20+ experienced doctors</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="services-section">
              <h3>Our Services</h3>
              <div className="services-grid">
                {clinic.services.map((service, index) => (
                  <div key={index} className="service-card">
                    <div className="service-icon-container">
                      <FaHospital className="iconprofile" />
                      <span>{service}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "doctors" && (
            <div className="doctors-section">
              <h3>Our Medical Team</h3>
              <p>Meet our team of experienced healthcare professionals:</p>
              
              <div className="doctors-grid">
                {/* Sample doctors - in a real app, this would come from your data */}
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
              {/* {clinic.comments.length > 0 ? (
                clinic.comments.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-author">{review.patient || "Anonymous"}</span>
                      <div className="review-rating">
                        {renderRatingStars(review.rating || clinic.rating)}
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                    <span className="review-date">{review.date || "2 weeks ago"}</span>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to review!</p>
              )} */}
            </div>
          )}

          {activeTab === "location" && (
            <div className="location-section">
              <h3>Clinic Location</h3>
              <p className="location-address">
                <FaMapMarkerAlt className="iconprofile" />
                {clinic.addressLoc}
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
                <h4>Clinic Hours</h4>
                <ul>
                  <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                  <li>Saturday: 9:00 AM - 5:00 PM</li>
                  <li>Sunday: 10:00 AM - 2:00 PM</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}