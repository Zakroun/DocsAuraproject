import { useSelector, useDispatch } from "react-redux";
import { acceptRequest, rejectRequest } from "../data/DocsauraSlice";
import { useState, useEffect } from "react";

export default function Requests() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const requests = useSelector((state) => state.Docsaura.requests);
  const doctors = useSelector((state) => state.Docsaura.doctors);
  const clinics = useSelector((state) => state.Docsaura.clinics);
  const laboratories = useSelector((state) => state.Docsaura.laboratories);
  const visitors = useSelector((state) => state.Docsaura.visitors);
  const [reqts, setrequests] = useState(requests);
  const dispatch = useDispatch();
  useEffect(() => {
    setrequests(requests);
  }, [requests]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);
  console.log(selectedRequest);
  const handleAccept = (id, role) => {
    if (!id || !role) {
      setErrorMessage("Invalid request data.");
      return;
    }
    dispatch(acceptRequest({ id, role }));
    setSuccessMessage("Request accepted successfully.");
    setShowDialog(false);
    setTimeout(() => {
      setTimeout(() => {
        setSuccessMessage(null);
        setSelectedRequest(null);
        setActionType(null);
      }, 3000);
    });
  };

  const handleReject = (id, role) => {
    if (!id || !role) {
      setErrorMessage("Invalid request data.");
      return;
    }
    dispatch(rejectRequest({ id, role }));
    setSuccessMessage("Request rejected successfully.");
    setShowDialog(false);
    setTimeout(() => {
      setTimeout(() => {
        setSuccessMessage(null);
        setSelectedRequest(null);
        setActionType(null);
      }, 3000);
    });
  };

  const getUserInfo = (role, id) => {
    switch (role) {
      case "doctor":
        return doctors.find((user) => user.id === id);
      case "clinic":
        return clinics.find((user) => user.id === id);
      case "laboratory":
        return laboratories.find((user) => user.id === id);
      case "patient":
        return visitors.find((user) => user.id === id);
      default:
        return null;
    }
  };
  const [selectedYear, setSelectedYear] = useState("All");

  // Extraire les années uniques des requêtes
  const years = Array.from(
    new Set(requests.map((req) => new Date(req.date).getFullYear()))
  );
  years.sort((a, b) => b - a); // Tri descendant

  // Fonction de filtrage
  const filteredRequests =
    selectedYear === "All"
      ? reqts
      : reqts.filter(
          (req) => new Date(req.date).getFullYear().toString() === selectedYear
        );

  const showConfirmationDialog = (reqId, role, action) => {
    setSelectedRequest({
      reqid: reqId,
      role: role,
    });
    setActionType(action);
    setShowDialog(true);
  };

  return (
    <div className="requests__container">
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
      <div className="requests">
        <br />
        <div className="requests__filters">
        <h2 className="requests__title">Activation Requests</h2>
          <select
          id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {showDialog && (
          <div className="confirmation-dialog">
            <div className="confirmation-dialog__content">
              <h3>Are you sure you want to {actionType} this request?</h3>
              <div className="confirmation-dialog__actions">
                <button
                  onClick={() =>
                    actionType === "accept"
                      ? handleAccept(
                          selectedRequest.reqid,
                          selectedRequest.role
                        )
                      : handleReject(
                          selectedRequest.reqid,
                          selectedRequest.role
                        )
                  }
                >
                  Yes
                </button>
                <button onClick={() => setShowDialog(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className={showDialog ? "table-blur" : ""}>
          <table className="requests__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Special Info</th>
                <th>Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests
                .filter((req) => req && req.role && req.id) // filtre les valeurs invalides
                .map((req) => {
                  const user = getUserInfo(req.role, req.id);

                  return (
                    <tr key={req.id}>
                      <td>{user?.fullName || "Unknown"}</td>
                      <td>{req.role}</td>
                      <td>{req.email}</td>
                      <td>
                        {req.specialty && (
                          <div>
                            <strong>Specialty:</strong> {req.specialty}
                          </div>
                        )}
                        {req.amoCode && (
                          <div>
                            <strong>AMO:</strong> {req.amoCode}
                          </div>
                        )}
                        {req.cnssCode && (
                          <div>
                            <strong>CNSS:</strong> {req.cnssCode}
                          </div>
                        )}
                        {req.taxId && (
                          <div>
                            <strong>Tax ID:</strong> {req.taxId}
                          </div>
                        )}
                        {req.medicalOrderNumber && (
                          <div>
                            <strong>Medical Order Number:</strong>{" "}
                            {req.medicalOrderNumber}
                          </div>
                        )}
                        {req.clinicId && (
                          <div>
                            <strong>Clinic ID:</strong> {req.clinicId}
                          </div>
                        )}
                        {req.patientId && (
                          <div>
                            <strong>Patient ID:</strong> {req.patientId}
                          </div>
                        )}
                      </td>
                      <td>{req.Verified ? "verified" : "Unverified"}</td>
                      <td>
                        {req.status === "pending" ? (
                          <>
                            <button
                              className="btn-accept"
                              onClick={() =>
                                showConfirmationDialog(
                                  req.id,
                                  req.role,
                                  "accept"
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn-reject"
                              onClick={() =>
                                showConfirmationDialog(
                                  req.id,
                                  req.role,
                                  "reject"
                                )
                              }
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span
                            style={{
                              color:
                                req.status === "accepted"
                                  ? "#007b79"
                                  : "#ff1a1a",
                            }}
                          >
                            {req.status.charAt(0).toUpperCase() +
                              req.status.slice(1)}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
