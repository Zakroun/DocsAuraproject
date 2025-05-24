import { useEffect, useState } from "react";
import axios from 'axios';

export default function ComplaintsDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [viewedComplaint, setViewedComplaint] = useState(null);
  const [complaintToDelete, setComplaintToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaints from API
  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8000/api/complaints');
      setComplaints(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError('Failed to load complaints. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete complaint from API
  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/complaints/${id}`);
      // Refresh the complaints list after deletion
      await fetchComplaints();
    } catch (err) {
      console.error('Error deleting complaint:', err);
      setError('Failed to delete complaint. Please try again.');
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints whenever complaints, selectedYear, or searchQuery changes
  useEffect(() => {
    let result = [...complaints];
    
    if (selectedYear !== "All") {
      result = result.filter(
        (complaint) =>
          new Date(complaint.date).getFullYear().toString() === selectedYear
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (complaint) =>
          complaint.email.toLowerCase().includes(query) ||
          complaint.message.toLowerCase().includes(query)
      );
    }
    
    setFilteredComplaints(result);
  }, [complaints, selectedYear, searchQuery]);

  const handleDelete = (id) => {
    deleteComplaint(id);
    setComplaintToDelete(null);
  };

  const availableYears = [
    "All",
    ...new Set(
      complaints.map((c) => new Date(c.date).getFullYear().toString())
    ),
  ].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : b - a));

  if (isLoading) {
    return (
      <div className="complaint-dashboard">
        <div className="loading-spinner">
          {/* <div className="spinner"></div> */}
          {/* <p>Loading complaints...</p> */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="complaint-dashboard">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchComplaints}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="complaint-dashboard">
      <div className="complaint-header">
        <h1 className="complaint-title">Patient Complaints</h1>
        <p className="complaint-subtitle">
          Manage and review patient feedback and concerns
        </p>
      </div>

      <div className="complaint-filters">
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
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search"
          />
        </div>
      </div>

      <div className="complaint-table-container">
        {filteredComplaints.length === 0 ? (
          <div className="no-complaints">
            <div className="no-data-icon">📭</div>
            <p>No complaints found for the selected filters</p>
          </div>
        ) : (
          <table className="complaint-table">
            <thead>
              <tr>
                <th className="email-col">Email</th>
                <th className="message-col">Message</th>
                <th className="date-col">Date</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="complaint-row">
                  <td className="email-cell">{complaint.email}</td>
                  <td className="message-cell">
                    {complaint.message.length > 50
                      ? `${complaint.message.substring(0, 50)}...`
                      : complaint.message}
                  </td>
                  <td className="date-cell">
                    {new Date(complaint.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="action-btn view-btn"
                      onClick={() => setViewedComplaint(complaint)}
                    >
                      <span className="btn-icon">👁️</span> View
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => setComplaintToDelete(complaint)}
                    >
                      <span className="btn-icon">🗑️</span> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {viewedComplaint && (
        <div className="complaint-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Complaint Details</h3>
              <button
                className="close-modal"
                onClick={() => setViewedComplaint(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">From:</span>
                <span className="detail-value">{viewedComplaint.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">
                  {new Date(viewedComplaint.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="detail-row full-width">
                <span className="detail-label">Message:</span>
                <p className="complaint-message">{viewedComplaint.message}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn close-btn"
                onClick={() => setViewedComplaint(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {complaintToDelete && (
        <div className="complaint-modal">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button
                className="close-modal"
                onClick={() => setComplaintToDelete(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete the complaint from{" "}
                <strong>{complaintToDelete.email}</strong>?
              </p>
              <p className="warning-text">
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setComplaintToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="modal-btn confirm-delete-btn"
                onClick={() => handleDelete(complaintToDelete.id)}
              >
                Delete Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}