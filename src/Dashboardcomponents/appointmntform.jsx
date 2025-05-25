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
import axios from "axios";

// Base URL constant
const BASE_URL = "http://localhost:8000/api";

export default function Appointmentform({
  appointment,
  Use,
  onSubmitFeedback,
}) {
  // State declarations (keep all existing states)
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [localStream, setLocalStream] = useState(null);
  const videoRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [User, setuser] = useState(appointment);
  const [selectedFile, setSelectedFile] = useState(null);
  const [complete, setcomplete] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [call, setcall] = useState(false);
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
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comments: "",
    doctorReview: false,
    clinicReview: false,
    laboReview: false,
  });

  const dispatch = useDispatch();

  // Toggle functions (keep existing)
  const toggleMute = () => setIsMuted((prev) => !prev);
  const toggleSpeaker = () => setSpeakerOn((prev) => !prev);
  const toggleCamera = () => setCameraOn((prev) => !prev);
  const toggleCallMode = () => setIsVideoCall((prev) => !prev);

  // Media stream handling (keep existing)
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

  // Format duration (keep existing)
  const formatDuration = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Call timer (keep existing)
  const handleCallTimer = (call, setCallDuration) => {
    if (call) {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCallDuration(0);
    }
  };

  useEffect(() => {
    const cleanup = handleCallTimer(call, setCallDuration);
    return cleanup;
  }, [call]);

  useEffect(() => {
    if (!User) {
      dispatch(changeboard("home"));
    }
  }, [User, dispatch]);

  // Updated functions using Axios
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    if (cancelReason.trim() === "") {
      setErrorMessage("Please enter cancellation reason.");
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
      return;
    }
    setShowConfirm(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleDownloadPDF = () => {
    if (!selectedFile) {
      setErrorMessage("No PDF generated yet");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    // Download the already generated file
    const url = URL.createObjectURL(selectedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = selectedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleFileUpload = async () => {
    if (!selectedFile) {
      //setErrorMessage("Please select a file first");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("user_id", Use.id);
      formData.append("appointment_id", User.id);
      formData.append("type", "medical_report");
      formData.append("description", "Medical report for appointment");

      const response = await axios.post(
        `${BASE_URL}/appointments/upload-file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("File uploaded successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("File upload error:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "File upload failed");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleSaveResults = () => {
    if (formData.resultsDescription && selectedFile) {
      setIsSaved(true);
      setSuccessMessage("Results saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setErrorMessage("Please add results description and upload a PDF");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };
  const confirmStatus = async () => {
    if (!User?.id || !complete) {
      setErrorMessage("Error: Missing appointment data");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      // Base payload with required fields
      const payload = {
        status: complete.toLowerCase(),
        user_id: Use.id, // The current user performing the action
      };

      // Add cancellation reason if canceling
      if (complete.toLowerCase() === "canceled") {
        payload.cancelReason = cancelReason;
      }

      // Add review data if confirming as patient
      if (
        complete.toLowerCase() === "confirmed" &&
        Use.role.toLowerCase() === "patient"
      ) {
        payload.rating = reviewData.rating;
        payload.comments = reviewData.comments;
      }

      // Add professional reference based on appointment type
      if (User.doctorAppointment) {
        payload.doctor_id = User.id_doctor;
      } else if (User.clinicAppointment) {
        payload.clinic_id = User.id_clinic;
      } else if (User.laboAppointment) {
        payload.lab_id = User.id_labo;
      }

      const response = await axios.put(
        `${BASE_URL}/appointments/${User.id}/status`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      handleFileUpload();
      // Dispatch to Redux with minimal required data
      dispatch(
        changestatus({
          appointmentId: User.id,
          status: complete.toLowerCase(),
          ...(complete.toLowerCase() === "canceled" && { cancelReason }),
        })
      );

      setSuccessMessage(`Appointment ${complete} successfully`);
      setTimeout(() => {
        setSuccessMessage("");
        setuser(null);
      }, 3000);
    } catch (error) {
      console.error("Appointment update error:", error.response?.data);

      let errorMsg = "Error updating appointment status";
      if (error.response) {
        // Handle validation errors
        if (error.response.status === 422 && error.response.data.errors) {
          errorMsg = Object.values(error.response.data.errors).join(", ");
        }
        // Handle other API errors
        else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      }

      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleSave = () => {
    if (formData.diagnosis && formData.prescription) {
      try {
        // 1. Generate PDF immediately when saving
        const doc = new jsPDF();
        doc.text("Patient Medical Report", 10, 10);
        doc.text(`Diagnosis: ${formData.diagnosis}`, 10, 20);
        doc.text(`Prescription: ${formData.prescription}`, 10, 30);

        // 2. Create File object and set to state
        const pdfBlob = doc.output("blob");
        const pdfFile = new File(
          [pdfBlob],
          `medical_report_${Date.now()}.pdf`,
          {
            type: "pdf",
            lastModified: Date.now(),
          }
        );

        setSelectedFile(pdfFile);
        setIsSaved(true);

        // 3. Show success message (no auto-download)
        setSuccessMessage("Details saved and PDF generated!");
        setTimeout(() => setSuccessMessage(""), 4000);

        // 4. Debug log
        console.log("Generated PDF:", {
          name: pdfFile.name,
          size: pdfFile.size,
          type: pdfFile.type,
        });
      } catch (error) {
        setErrorMessage("Failed to generate PDF");
        setTimeout(() => setErrorMessage(""), 4000);
      }
    } else {
      setErrorMessage("Please fill in all fields");
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  // Modified download function (optional)
  const handleConfirmAppointment = async () => {
    if (reviewData.rating === 0) {
      setErrorMessage("Please provide a rating.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/appointments/${User.id}/confirm`,
        {
          user_id: Use.id,
          rating: reviewData.rating,
          comments: reviewData.comments,
        }
      );

      console.log("Full API response:", response);

      setTimeout(() => {
        setSuccessMessage("");
        setuser(null);
      }, 3000);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Full error details:", {
        error: error,
        response: error.response,
        request: error.request,
        config: error.config,
      });

      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to confirm appointment";

      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (rating === 0 || feedback.trim() === "") {
      setErrorMessage("Please provide a rating and feedback.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      if (onSubmitFeedback) {
        await onSubmitFeedback({ rating, feedback });
      }

      // Additional API call if needed
      await axios.post(`${BASE_URL}/feedback`, {
        appointmentId: User.id,
        userId: Use.id,
        rating,
        feedback,
      });

      setSuccessMessage("Thank you for your feedback!");
      setRating(0);
      setFeedback("");
      setuser(null);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage("Failed to submit feedback");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  // Render function (keep existing HTML structure)
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
                //src={`../images/${User.image}`}
                src={`../images/user.png`}
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
                (Use.role === "laboratory" ||
                  Use.role === "doctor" ||
                  Use.role === "clinic") && (
                  <div className="appointment-actions">
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
                  </div>
                )}
              {User.status === "pending" && Use.role === "Patient" && (
                <button
                  className="cancel"
                  onClick={() => setcomplete("canceled")}
                >
                  Cancel
                </button>
              )}
              {User.status === "completed" && Use.role === "Patient" && (
                <button className="confirm" onClick={() => setConfirmed(true)}>
                  Confirme
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
            {Use.role === "doctor" || Use.role === "clinic" ? (
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
                    {/* <button onClick={handleFileUpload} className="Download">
                      Upload File
                    </button> */}
                    <button onClick={confirmStatus} className="Confirm">
                      Yes, Confirm
                    </button>
                  </>
                )}
              </div>
            ) : Use.role === "laboratory" ? (
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
            ) : Use.role === "patient" ? (
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
        ) : confirmed === true && Use.role === "Patient" ? (
          <div className="complet_Review">
            <h1>Appointment Review</h1>
            <label>Rating</label>
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
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: ratingValue })
                      }
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingValue <= (hover || reviewData.rating)
                          ? "#ffc107"
                          : "#e4e5e9"
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
              value={reviewData.comments}
              onChange={(e) =>
                setReviewData({ ...reviewData, comments: e.target.value })
              }
              placeholder="Share your experience..."
              className="feedback-textarea"
            />
            <br />
            <br />
            <button
              onClick={handleConfirmAppointment}
              className="submit-feedback"
            >
              Confirm Appointment & Review
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
