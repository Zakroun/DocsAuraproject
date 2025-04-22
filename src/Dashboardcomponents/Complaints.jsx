import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Deletecomplaint } from "../data/DocsauraSlice";

export default function Complaints() {
  const complaints = useSelector((state) => state.Docsaura.complaints);
  const [complaintList, setComplaintList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [viewedComplaint, setViewedComplaint] = useState(null);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const dispatch = useDispatch();

  const availableYears = [
    ...new Set(complaints.map((c) => new Date(c.date).getFullYear())),
  ];

  useEffect(() => {
    if (selectedYear === "All") {
      setComplaintList(complaints);
    } else {
      setComplaintList(
        complaints.filter(
          (complaint) =>
            new Date(complaint.date).getFullYear().toString() === selectedYear
        )
      );
    }
  }, [complaints, selectedYear]);

  const confirmDelete = (id) => {
    dispatch(Deletecomplaint(id));
    setSelectedToDelete(null);
  };

  return (
    <div className="complaints">
      <div className="filter-year mb-4">
        <h2 className="complaints__title">Complaints</h2>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="complaints__table-container">
        <table className="complaints__table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaintList.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No complaints found 😇
                </td>
              </tr>
            ) : (
              complaintList.map((complaint, index) => (
                <tr key={index}>
                  <td>{complaint.email}</td>
                  <td className="truncate">{complaint.message}</td>
                  <td>{new Date(complaint.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => setViewedComplaint(complaint)}
                    >
                      View
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => setSelectedToDelete(complaint)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Popup */}
      {viewedComplaint && (
        <div className="complaint-popup">
          <div className="complaint-popup__content">
            <h3>
              Complaint from <span>{viewedComplaint.email}</span>
            </h3>
            <p>{viewedComplaint.message}</p>
            <button
              className="btn-close"
              onClick={() => setViewedComplaint(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {selectedToDelete && (
        <div className="complaint-popup">
          <div className="complaint-popup__content">
            <h3>
              Confirm Delete for <span>{selectedToDelete.email}</span>?
            </h3>
            <p>Are you sure you want to delete this complaint?</p>
            <div className="popup-btn-group">
              <button
                className="btn-delete"
                onClick={() => confirmDelete(selectedToDelete.id)}
              >
                Yes, Delete
              </button>
              <button
                className="btn-close"
                onClick={() => setSelectedToDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
