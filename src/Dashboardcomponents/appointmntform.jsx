import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeboard, changestatus } from "../data/DocsauraSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faTimesCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FaStar } from "react-icons/fa";
import { jsPDF } from "jspdf";

export default function AppointmentForm({ user, Use , onSubmitFeedback }) {
  const [User, setuser] = useState(user);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [complete, setcomplete] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: "",
    prescription: "",
    resultsDescription: "",
    rating: "",
    feedback: "",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    if (rating === 0 || feedback.trim() === "") {
      alert("Please provide a rating and feedback.");
      return;
    }

    if (onSubmitFeedback) {
      onSubmitFeedback({ rating, feedback });
    }

    alert("Thank you for your feedback!");
    setRating(0);
    setFeedback("");
    setuser(null);
  };

  useEffect(() => {
    if (!User) {
      dispatch(changeboard("home"));
    }
  }, [User, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    if (!cancelReason.trim()) {
      alert("Veuillez entrer la raison d'annulation.");
      return;
    }
    setShowConfirm(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const confirmStatus = () => {
    dispatch(
      changestatus({
        doctorId: Use.id,
        appointmentId: User.id,
        role: Use.Role,
        status: complete.toLowerCase(),
      })
    );
    alert(`Appointment ${complete} successfully.`);
    setuser(null);
  };

  const handleSave = () => {
    if (formData.diagnosis && formData.prescription) {
      setIsSaved(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Patient Medical Report", 10, 10);
    doc.text(`Diagnosis: ${formData.diagnosis}`, 10, 20);
    doc.text(`Prescription: ${formData.prescription}`, 10, 30);
    doc.save("medical_report.pdf");
  };

  const handleConfirmAppointment = () => {
    setConfirmed(true);
  };

  if (!User) {
    return (
      <div className="no-user">
        <p>No user found</p>
      </div>
    );
  }

  return (
    <>
      <div className="appointment-container">
        <div className="appointment_card">
          <div className="user-info">
            <img
              src={`../images/${User.image}`}
              alt={User.fullName}
              className="user-image"
            />
            <h2 className="user-name">{User.fullName}</h2>
            <p className="user-location">{User.location}</p>
            <p>
              📅 Date: <span>{User.date}</span>
            </p>
            <p>
              ⏰ Time:{" "}
              <span>
                {User.timeFrom} - {User.timeTo}
              </span>
            </p>
            <span
              className={`status ${User.status}`}
              style={{ width: "200px" }}
            >
              {User.status === "completed" && (
                <FontAwesomeIcon icon={faCheckCircle} />
              )}
              {User.status === "pending" && <FontAwesomeIcon icon={faClock} />}
              {User.status === "canceled" && (
                <FontAwesomeIcon icon={faTimesCircle} />
              )}
              {User.status}
            </span>
            <br />
            {User.status === "pending" && (
              <>
                <button
                  className="complet"
                  onClick={() => setcomplete("completed")}
                >
                  Complete
                </button>
                <button
                  className="cancel"
                  onClick={() => setcomplete("canceled")}
                >
                  Cancel
                </button>
              </>
            )}
            {User.status === "completed" && Use.Role === "patient" && (
              <button className="confirm" onClick={handleConfirmAppointment}>
                Confirmer
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="appointment-form">
        {complete === "completed" ? (
          <div className="completform">
            <h1>Appointment Completed Form</h1>
            {Use.Role === "doctor" || Use.Role === "clinic" ? (
              <div>
                <label>Diagnosis</label>
                <textarea
                  name="diagnosis"
                  className="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  placeholder="Describe the medical condition..."
                />
                <label>Prescription</label>
                <textarea
                  name="prescription"
                  className="prescription"
                  value={formData.prescription}
                  onChange={handleChange}
                  placeholder="Enter prescribed medication..."
                />
                {!isSaved ? (
                  <button onClick={handleSave} className="Save">
                    Save Details
                  </button>
                ) : (
                  <button onClick={handleDownloadPDF} className="Download">
                    Download as PDF
                  </button>
                )}
              </div>
            ) : Use.Role === "laboratori" ? (
              <div>
                <label>Results Description</label>
                <textarea
                  name="resultsDescription"
                  className="resultsDescription"
                  value={formData.resultsDescription}
                  onChange={handleChange}
                  placeholder="Describe the test results..."
                />
                <label>Upload Results PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="file"
                  onChange={handleFileChange}
                />
                <button className="Upload">Save Results</button>
              </div>
            ) : Use.Role === "patient" ? (
              <div>
                <h2>Confirm Appointment & Leave Feedback</h2>
                <button onClick={confirmStatus} className="Confirm">
                  Confirm Appointment
                </button>
                <h3>Rate the Doctor</h3>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className={`star ${star <= rating ? "filled" : ""}`}
                      onClick={() => setRating(star)}
                      style={{
                        cursor: "pointer",
                        color: star <= rating ? "gold" : "gray",
                      }}
                    />
                  ))}
                </div>
                <label>Leave a Feedback</label>
                <textarea
                  className="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience..."
                />
                <button
                  onClick={handleFeedbackSubmit}
                  className="SubmitFeedback"
                >
                  Submit Feedback
                </button>
              </div>
            ) : (
              <p>You do not have permission to access this form.</p>
            )}
          </div>
        ) : complete === "canceled" ? (
          <div className="cancelform">
            <h1>Appointment Canceled Form</h1>
            {!showConfirm ? (
              <div>
                <label>Reason for cancellation</label>
                <textarea
                  className="cancel-reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter the reason for cancellation..."
                />
                <button onClick={handleCancel} className="cancel">
                  Cancel Appointment
                </button>
              </div>
            ) : (
              <div>
                <p>Are you sure you want to cancel this appointment?</p>
                <button onClick={confirmStatus} className="Confirm">
                  Yes, Confirm
                </button>
                <button onClick={() => setShowConfirm(false)} className="Back">
                  No, Go Back
                </button>
              </div>
            )}
          </div>
        ) : confirmed && Use.Role === "patient" ? (
          <div className="complet_Review">
            <h1>Appointment Review</h1>
            <label>Doctor's Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      style={{ display: "none" }}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <label>Your Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience..."
              className="feedback-textarea"
            />
            <button onClick={handleFeedbackSubmit} className="submit-feedback">
              Submit
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
