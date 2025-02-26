import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeboard } from "../data/DocsauraSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { changestatus } from "../data/DocsauraSlice";
import { jsPDF } from "jspdf";
import { useState } from "react";
export default function AppointmentForm({ user, doctor }) {
    const [User,setuser] = useState(user)
  const dispatch = useDispatch();
  const [complete, setcomplete] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: "",
    prescription: "",
  });
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {});
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

  const confirmStatus = () => {
    dispatch(
      changestatus({
        doctorId: doctor.id,
        appointmentId: User.id,
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
          </div>
        </div>
      </div>
      <div className="appointment-form">
        {complete === "completed" ? (
          <div className="completform">
            <h1>Appointment Completed Form</h1>
            {doctor.Role === "doctor" ||
            doctor.Role === "clinic" ||
            doctor.Role === "laboratory" ? (
              <div>
                <label>Diagnosis</label>
                <br />
                <textarea
                  name="diagnosis"
                  className="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  placeholder="Describe the medical condition..."
                />{" "}
                <br /> <br />
                <label>Prescription</label>
                <br />
                <textarea
                  name="prescription"
                  className="prescription"
                  value={formData.prescription}
                  onChange={handleChange}
                  placeholder="Enter prescribed medication..."
                />{" "}
                <br />
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
            ) : (
              <p>You do not have permission to access this form.</p>
            )}
          </div>
        ) : complete === "canceled" ? (
          <div className="cancelform">
            <h1>Appointment Canceled Form</h1>
            {!showConfirm ? (
              <div>
                <label>Reason for cancellation</label> <br />
                <textarea
                  value={cancelReason}
                  className="cancel-reason"
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter the reason for cancellation..."
                />
                <br /> <br />
                <button
                  onClick={handleCancel}
                  className="cancel"
                  style={{ width: "180px" }}
                >
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
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
