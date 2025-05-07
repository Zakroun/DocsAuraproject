import { useSelector, useDispatch } from "react-redux";
import { acceptRequest, rejectRequest } from "../data/DocsauraSlice";
import { useState, useEffect } from "react";

export default function RequestsDashboard() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const requests = useSelector((state) => state.Docsaura.requests);
  const doctors = useSelector((state) => state.Docsaura.doctors);
  const clinics = useSelector((state) => state.Docsaura.clinics);
  const laboratories = useSelector((state) => state.Docsaura.laboratories);
  const visitors = useSelector((state) => state.Docsaura.visitors);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const dispatch = useDispatch();
  
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredRequests(requests);
  }, [requests]);

  // Get available years from requests
  const availableYears = [
    "All",
    ...new Set(
      requests.map((req) => new Date(req.date).getFullYear().toString())
    ),
  ].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : b - a));

  useEffect(() => {
    let result = [...requests];
    
    // Filter by year
    if (selectedYear !== "All") {
      result = result.filter(
        (req) => new Date(req.date).getFullYear().toString() === selectedYear
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (req) =>
          (req.email && req.email.toLowerCase().includes(query)) ||
          (getUserInfo(req.role, req.id)?.fullName?.toLowerCase().includes(query)) ||
          (req.role && req.role.toLowerCase().includes(query))
      );
    }
    
    setFilteredRequests(result);
  }, [requests, selectedYear, searchQuery]);

  const handleAccept = (id, role) => {
    if (!id || !role) {
      setErrorMessage("Invalid request data.");
      return;
    }
    dispatch(acceptRequest({ id, role }));
    setSuccessMessage("Request accepted successfully.");
    setShowDialog(false);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleReject = (id, role) => {
    if (!id || !role) {
      setErrorMessage("Invalid request data.");
      return;
    }
    dispatch(rejectRequest({ id, role }));
    setSuccessMessage("Request rejected successfully.");
    setShowDialog(false);
    setTimeout(() => setSuccessMessage(null), 3000);
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

  const showConfirmationDialog = (reqId, role, action) => {
    setSelectedRequest({
      reqid: reqId,
      role: role,
    });
    setActionType(action);
    setShowDialog(true);
  };

  return (
    <div className="requests-dashboard">
      {/* Notifications */}
      {successMessage && (
        <div className="request-notification success">
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="request-notification error">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Header Section */}
      <div className="request-header">
        <h1 className="request-title">Activation Requests</h1>
        <p className="request-subtitle">
          Review and manage account activation requests
        </p>
      </div>

      {/* Filters Section */}
      <div className="request-filters">
        <div className="filter-group">
          <label htmlFor="yearFilter" className="filter-label">
            Filter by Year:
          </label>
          <select
            id="yearFilter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="searchFilter" className="filter-label">
            Search:
          </label>
          <input
            id="searchFilter"
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search"
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className={`request-table-container ${showDialog ? "table-blur" : ""}`}>
        {filteredRequests.length === 0 ? (
          <div className="no-requests">
            <div className="no-data-icon">📭</div>
            <p>No activation requests found for the selected filters</p>
          </div>
        ) : (
          <table className="request-table">
            <thead>
              <tr>
                <th className="name-col">Name</th>
                <th className="role-col">Role</th>
                <th className="email-col">Email</th>
                <th className="info-col">Special Info</th>
                <th className="status-col">Status</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests
                .filter((req) => req && req.role && req.id)
                .map((req) => {
                  const user = getUserInfo(req.role, req.id);

                  return (
                    <tr key={req.id} className="request-row">
                      <td className="name-cell">{user?.fullName || "Unknown"}</td>
                      <td className="role-cell">
                        <span className={`role-badge ${req.role}`}>
                          {req.role}
                        </span>
                      </td>
                      <td className="email-cell">{req.email}</td>
                      <td className="info-cell">
                        <div className="info-details">
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
                              <strong>Medical Order:</strong> {req.medicalOrderNumber}
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
                        </div>
                      </td>
                      <td className="status-cell">
                        <span className={`status-badge ${req.status || "pending"}`}>
                          {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : "Pending"}
                        </span>
                      </td>
                      <td className="actions-cell">
                        {(!req.status || req.status === "pending") ? (
                          <div className="action-buttons">
                            <button
                              className="action-btn accept-btn"
                              onClick={() =>
                                showConfirmationDialog(
                                  req.id,
                                  req.role,
                                  "accept"
                                )
                              }
                            >
                              <span className="btn-icon">✓</span> Accept
                            </button>
                            <button
                              className="action-btn reject-btn"
                              onClick={() =>
                                showConfirmationDialog(
                                  req.id,
                                  req.role,
                                  "reject"
                                )
                              }
                            >
                              <span className="btn-icon">✕</span> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="action-status">
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
        )}
      </div>

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="request-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm {actionType === "accept" ? "Acceptance" : "Rejection"}</h3>
              <button
                className="close-modal"
                onClick={() => setShowDialog(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to {actionType} this request from{" "}
                <strong>{selectedRequest?.role}</strong>?
              </p>
              <p className="warning-text">
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className={`modal-btn ${actionType === "accept" ? "confirm-accept-btn" : "confirm-reject-btn"}`}
                onClick={() =>
                  actionType === "accept"
                    ? handleAccept(selectedRequest.reqid, selectedRequest.role)
                    : handleReject(selectedRequest.reqid, selectedRequest.role)
                }
              >
                {actionType === "accept" ? "Accept Request" : "Reject Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}