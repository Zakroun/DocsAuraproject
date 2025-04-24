import { useEffect, useState, useRef } from "react";
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

export default function AppointmentForm({ user, Use, onSubmitFeedback }) {
  // call duration state
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [localStream, setLocalStream] = useState(null);
  const videoRef = useRef(null);

  const toggleMute = () => setIsMuted((prev) => !prev);
  const toggleSpeaker = () => setSpeakerOn((prev) => !prev);
  const toggleCamera = () => setCameraOn((prev) => !prev);

  // useEffect(() => {
  //   const interval = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Permission error:", err);
        setErrorMessage("Camera/Mic permission denied.");
        setTimeout(() => setErrorMessage(""), 3000);
        setIsVideoCall(false);
        setCameraOn(false);
      }
    };

    if (isVideoCall && cameraOn && !localStream) {
      startStream();
    }

    if ((!isVideoCall || !cameraOn) && localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setLocalStream(null);
    }
  }, [isVideoCall, cameraOn, localStream]);

  const formatDuration = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [User, setuser] = useState(user);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [complete, setcomplete] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [call, setcall] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: "",
    prescription: "",
    resultsDescription: "",
    rating: "",
    feedback: "",
  });
  const toggleCallMode = () => {
    setIsVideoCall((prev) => !prev);
  };
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    if (rating === 0 || feedback.trim() === "") {
      setErrorMessage("Please provide a rating and feedback.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    if (onSubmitFeedback) {
      onSubmitFeedback({ rating, feedback });
      setSuccessMessage("Thank you for your feedback!");
    }

    setSuccessMessage("Thank you for your feedback!");
    setRating(0);
    setFeedback("");
    setuser(null);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
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
    if (cancelReason.trim() === "") {
      setErrorMessage("Veuillez entrer la raison d'annulation.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
    setSuccessMessage(`Appointment ${complete} successfully.`);
    setuser(null);
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  const handleSave = () => {
    if (formData.diagnosis && formData.prescription) {
      setIsSaved(true);
      setSuccessMessage("Details saved successfully!");
    } else {
      setErrorMessage("Please fill in all fields.");
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 4000);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Patient Medical Report", 10, 10);
    doc.text(`Diagnosis: ${formData.diagnosis}`, 10, 20);
    doc.text(`Prescription: ${formData.prescription}`, 10, 30);
    doc.save("medical_report.pdf");
    setSuccessMessage("PDF downloaded successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };
  const handleSaveResults = () => {
    if (formData.resultsDescription && selectedFile) {
      setIsSaved(true);
      setSuccessMessage("Results saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setErrorMessage("Please add results description and upload a PDF.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
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
      {successMessage && (
        <div className="custom-notification-top">
          <div className="custom-notification success">
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="custom-notification-top">
          <div className="custom-notification error">
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      {call !== true ? (
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
              <p className="user-type-appointemnt">{User.consultationType}</p>
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
                {User.status === "pending" && (
                  <FontAwesomeIcon icon={faClock} />
                )}
                {User.status === "canceled" && (
                  <FontAwesomeIcon icon={faTimesCircle} />
                )}
                {User.status}
              </span>
              <br />
              {User.status === "pending" &&
                (Use.Role === "laboratori" ||
                  Use.Role === "doctor" ||
                  Use.Role === "clinic") && (
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
                    {User.type ===
                      "online Conversation, voice or video call" && (
                      <button className="call" onClick={() => setcall(true)}>
                        Call
                      </button>
                    )}
                  </>
                )}
              {User.status === "pending" && Use.Role === "patient" && (
                <button
                  className="cancel"
                  onClick={() => setcomplete("canceled")}
                >
                  Cancel
                </button>
              )}
              {User.status === "completed" && Use.Role === "patient" && (
                <button className="confirm" onClick={handleConfirmAppointment}>
                  Confirmer
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="call-container">
          <h1>
            In {isVideoCall ? "Video" : "Voice"} Call with{" "}
            <span className="caller-name">{User.fullName}</span>
          </h1>

          <div className="user-info2">
            <img
              src={`../images/${User.image}`}
              alt="User"
              className="user-avatar"
            />
            <p>{User.fullName}</p>
            <span className="call-time">{formatDuration(callDuration)}</span>
          </div>

          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">Call in progress...</span>
          </div>

          {isVideoCall && cameraOn && (
            <div className="video-preview">
              <video ref={videoRef} autoPlay muted className="my-video" />
            </div>
          )}

          <div className="call-controls">
            <button onClick={toggleCallMode} className="toggle-call-mode">
              Switch to {isVideoCall ? "Voice" : "Video"} Call
            </button>
            <button onClick={toggleMute}>
              {isMuted ? "Unmute Mic" : "Mute Mic"}
            </button>
            <button onClick={toggleSpeaker}>
              {speakerOn ? "Disable Speaker" : "Enable Speaker"}
            </button>
            {isVideoCall && (
              <button onClick={toggleCamera}>
                {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
              </button>
            )}
            <button onClick={() => setcall(false)} className="end-call">
              End Call
            </button>
          </div>
        </div>
      )}

      <div className="appointment-form">
        {complete === "completed" ? (
          <div className="completform">
            <h1>Appointment Completed Form</h1>
            {Use.Role === "doctor" || Use.Role === "clinic" ? (
              <div>
                {/* <label>Diagnosis : </label> */}
                <textarea
                  name="diagnosis"
                  className="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  placeholder="Describe the medical condition..."
                />
                <br />
                <br />
                {/* <label>Prescription</label>
                <br /> */}
                <textarea
                  name="prescription"
                  className="prescription"
                  value={formData.prescription}
                  onChange={handleChange}
                  placeholder="Enter prescribed medication..."
                />
                <br />
                {!isSaved ? (
                  <button onClick={handleSave} className="Save">
                    Save Details
                  </button>
                ) : (
                  <>
                    <button onClick={handleDownloadPDF} className="Download">
                      Download as PDF
                    </button>
                    <button onClick={confirmStatus} className="Confirm">
                      Yes, Confirm
                    </button>
                  </>
                )}
              </div>
            ) : Use.Role === "laboratori" ? (
              <div>
                <textarea
                  name="resultsDescription"
                  className="resultsDescription"
                  value={formData.resultsDescription}
                  onChange={handleChange}
                  placeholder="Describe the test results..."
                />{" "}
                <br />
                <br />
                <label className="upload-btn">
                  Upload Results PDF
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <br />
                <br />
                {!isSaved ? (
                  <button className="Upload" onClick={handleSaveResults}>
                    Save Results
                  </button>
                ) : (
                  <button onClick={confirmStatus} className="Confirm">
                    Yes, Confirm
                  </button>
                )}
              </div>
            ) : Use.Role === "patient" ? (
              <div>
                <h4>Confirm Appointment & Leave Feedback</h4>
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
                <br />
                <textarea
                  className="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience..."
                />{" "}
                <br />
                <br />
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
            <br />
            {!showConfirm ? (
              <div>
                <textarea
                  className="cancel-reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter the reason for cancellation..."
                />{" "}
                <br />
                <button onClick={handleCancel} className="cancel_reason">
                  Cancel Appointment
                </button>
              </div>
            ) : (
              <div>
                <p>Are you sure you want to cancel this appointment?</p>
                <br />
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
            <br />
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
            <br />
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience..."
              className="feedback-textarea"
            />{" "}
            <br />
            <br />
            <button onClick={handleFeedbackSubmit} className="submit-feedback">
              Submit
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
