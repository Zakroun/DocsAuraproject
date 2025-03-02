import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    navigate("/pages/Login");
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="logout-container">
        <br /><br /><br />
      <h1>Are you sure you want to log out?</h1><br />
      <button className="logout-button" onClick={handleLogoutClick}>
        Logout
      </button>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h2>Are you sure you want to log out?</h2>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirmLogout}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCancelLogout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
