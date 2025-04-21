import { useSelector, useDispatch } from "react-redux";
import { acceptRequest, rejectRequest } from "../data/DocsauraSlice";
import { useState, useEffect } from "react";

export default function Requests() {
  const requests = useSelector((state) => state.Docsaura.requests);
  const doctors = useSelector((state) => state.Docsaura.doctors);
  const clinics = useSelector((state) => state.Docsaura.clinics);
  const laboratories = useSelector((state) => state.Docsaura.laboratories);
  const visitors = useSelector((state) => state.Docsaura.visitors);
  const [reqts, setrequests] = useState(requests);
  const dispatch = useDispatch();
  useEffect(() => {
    setrequests(requests);
  });
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleAccept = (id, role) => {
    dispatch(acceptRequest({ id, role }));
    setShowDialog(false);
  };

  const handleReject = (id, role) => {
    dispatch(rejectRequest({ id, role }));
    setShowDialog(false);
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

  const showConfirmationDialog = (reqId, action) => {
    setSelectedRequest(reqId);
    setActionType(action);
    setShowDialog(true);
  };

  return (
    <div className="requests">
      <h2 className="requests__title">Activation Requests</h2>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="confirmation-dialog__content">
            <h3>Are you sure you want to {actionType} this request?</h3>
            <div className="confirmation-dialog__actions">
              <button
                onClick={() =>
                  actionType === "accept"
                    ? handleAccept(selectedRequest, actionType)
                    : handleReject(selectedRequest, actionType)
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
            {reqts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No pending requests 🚫
                </td>
              </tr>
            ) : (
                reqts.map((req) => {
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
                          <strong>Order #:</strong> {req.medicalOrderNumber}
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
                    <td>{req.Verified ? "✅" : "❌ Not Verified"}</td>
                    <td>
                      <button
                        className="btn-accept"
                        onClick={() => showConfirmationDialog(req.id, "accept")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => showConfirmationDialog(req.id, "reject")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
