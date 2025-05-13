import { useSelector, useDispatch } from "react-redux";
import { acceptRequest, rejectRequest } from "../data/DocsauraSlice";
import { useState, useEffect } from "react";
import axios from "../data/axios";

export default function RequestsDashboard() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
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

  // Fetch requests from API
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await axios.get("/requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      // Handle different response structures
      const requestsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.requests || [];

      // Here you would dispatch the data to your Redux store
      // For example: dispatch(setRequests(requestsData));

      setFilteredRequests(requestsData);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      //setErrorMessage(err.response?.data?.message || "Failed to load requests");
      setFilteredRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle request confirmation
  const handleConfirmRequest = async (id, action) => {
    try {
      setLoading(true);

      const endpoint =
        action === "accept"
          ? `/requests/${id}/confirm`
          : `/requests/${id}/reject`;

      const response = await axios.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // setSuccessMessage(
        //   `Request ${
        //     action === "accept" ? "accepted" : "rejected"
        //   } successfully`
        // );
        fetchRequests(); // Refresh the list

        // Also dispatch to Redux if needed
        if (action === "accept") {
          dispatch(acceptRequest({ id, role: selectedRequest?.role }));
        } else {
          dispatch(rejectRequest({ id, role: selectedRequest?.role }));
        }
      } else {
        throw new Error(response.data.message || `Failed to ${action} request`);
      }
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
      // setErrorMessage(
      //   err.response?.data?.message || `Failed to ${action} request`
      // );
    } finally {
      setLoading(false);
      setShowDialog(false);
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
    }
  };

  // Filter requests
  useEffect(() => {
    let results = [...requests];

    // Filter by year
    if (selectedYear !== "All") {
      results = results.filter((req) => {
        if (!req.date) return false;
        return new Date(req.date).getFullYear().toString() === selectedYear;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter((req) => {
        const user = getUserInfo(req.role, req.id);
        return (
          req.email?.toLowerCase().includes(query) ||
          user?.fullName?.toLowerCase().includes(query) ||
          req.role?.toLowerCase().includes(query)
        );
      });
    }

    setFilteredRequests(results);
  }, [requests, selectedYear, searchQuery]);

  const availableYears = [
    "All",
    ...new Set(
      requests
        .filter((req) => req.date)
        .map((req) => new Date(req.date).getFullYear().toString())
    ),
  ].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : b - a));

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

  const showConfirmationDialog = (reqId, role, action, request) => {
    setSelectedRequest({
      reqid: reqId,
      role: role,
      requestData: request,
    });
    setActionType(action);
    setShowDialog(true);
  };

  return (
    <div className="requests-dashboard">
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

      <div className="request-header">
        <h1 className="request-title">Activation Requests</h1>
        <p className="request-subtitle">
          Review and manage account activation requests
        </p>
      </div>

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

      <div
        className={`request-table-container ${showDialog ? "table-blur" : ""}`}
      >
        {filteredRequests.length === 0 ? (
          <div className="no-requests">
            <div className="no-data-icon">📭</div>
            <p>No activation requests found for the selected filters</p>
          </div>
        ) : (
          <table className="request-table">
            <thead>
              <tr>
                <th className="date-col">Date</th>
                <th className="email-col">Email</th>
                <th className="role-col">role</th>
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
                      <td className="date-cell">
                        {new Date(req.date).toLocaleDateString()}
                      </td>
                      <td className="email-cell">{req.email}</td>
                      <td className="role-cell">
                        <span className="role-text">
                          {req.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="status-cell">
                        <span
                          className={`status-badge ${req.status || "pending"}`}
                        >
                          {req.status
                            ? req.status.charAt(0).toUpperCase() +
                              req.status.slice(1)
                            : "Pending"}
                        </span>
                      </td>
                      <td className="actions-cell">
                        {!req.status || req.status === "pending" ? (
                          <div className="action-buttons">
                            <button
                              className="action-btn accept-btn"
                              onClick={() =>
                                showConfirmationDialog(
                                  req.id,
                                  req.role,
                                  "accept",
                                  req
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
                                  "reject",
                                  req
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

      {showDialog && (
        <div className="request-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                Confirm {actionType === "accept" ? "Acceptance" : "Rejection"}
              </h3>
              <button
                className="close-modal"
                onClick={() => setShowDialog(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to {actionType} this{" "}
                {selectedRequest?.role.toLowerCase()} request?
              </p>

              <div className="request-details">
                <h4>Request Details</h4>
                <div className="detail-row"></div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    {selectedRequest?.requestData?.email}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Request Type:</span>
                  <span className="detail-value">
                    {selectedRequest?.role.toUpperCase()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(
                      selectedRequest?.requestData?.date
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Doctor Specific Information */}
                {selectedRequest?.role === "doctor" && (
                  <>
                    {selectedRequest?.requestData?.specialty && (
                      <div className="detail-row">
                        <span className="detail-label">Specialty:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.specialty}
                        </span>
                      </div>
                    )}
                    {selectedRequest?.requestData?.licenseNumber && (
                      <div className="detail-row">
                        <span className="detail-label">License #:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.licenseNumber}
                        </span>
                      </div>
                    )}
                    {selectedRequest?.requestData?.qualifications && (
                      <div className="detail-row">
                        <span className="detail-label">Qualifications:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.qualifications}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* Clinic Specific Information */}
                {selectedRequest?.role === "clinic" && (
                  <>
                    {selectedRequest?.requestData?.clinicId && (
                      <div className="detail-row">
                        <span className="detail-label">Clinic ID:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.clinicId}
                        </span>
                      </div>
                    )}
                    {selectedRequest?.requestData?.address && (
                      <div className="detail-row">
                        <span className="detail-label">Address:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.address}
                        </span>
                      </div>
                    )}
                    {selectedRequest?.requestData?.phone && (
                      <div className="detail-row">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.phone}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* Laboratory Specific Information */}
                {selectedRequest?.role === "laboratory" && (
                  <>
                    {selectedRequest?.requestData?.labId && (
                      <div className="detail-row">
                        <span className="detail-label">Lab ID:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.labId}
                        </span>
                      </div>
                    )}
                    {selectedRequest?.requestData?.accreditation && (
                      <div className="detail-row">
                        <span className="detail-label">Accreditation:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.accreditation}
                        </span>
                      </div>
                    )}
                    {selectedRequest?.requestData?.services && (
                      <div className="detail-row">
                        <span className="detail-label">Services:</span>
                        <span className="detail-value">
                          {selectedRequest.requestData.services}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className={`modal-btn ${
                  actionType === "accept"
                    ? "confirm-accept-btn"
                    : "confirm-reject-btn"
                }`}
                onClick={() =>
                  handleConfirmRequest(selectedRequest.reqid, actionType)
                }
              >
                {actionType === "accept"
                  ? "Confirm Acceptance"
                  : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
