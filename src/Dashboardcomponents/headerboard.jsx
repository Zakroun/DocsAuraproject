import { LuSearch } from "react-icons/lu";
import { IoNotificationsSharp } from "react-icons/io5";
import { useState } from "react";
export default function HeaderBoard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, message: "New patient registered", time: "2 mins ago" },
    { id: 2, message: "Appointment rescheduled", time: "10 mins ago" },
    { id: 3, message: "New message from John", time: "30 mins ago" },
  ];
  return (
    <header className="header-board">
      <div className="searchadd">
        <div className="searchdiv">
          <input type="text" placeholder="Search ..." className="inputsearch" />
          <button className="searchbtn">
            <LuSearch className="iconsearch" size={15} />
          </button>
        </div>
        <div className="add">
          <button className="addbtn">+ Add Patients</button>
          <div className="notification-container">
            <div
              className="icon-wrapper"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <IoNotificationsSharp
                size={24}
                color="#008481"
                className="notification-icon"
              />
              {notifications.length > 0 && (
                <span className="notification-badge">
                  {notifications.length}
                </span>
              )}
            </div>
            {showNotifications && (
              <div className="notification-dropdown">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="notification-item">
                      {notif.message}
                      <span className="time">{notif.time}</span>
                    </div>
                  ))
                ) : (
                  <p>No notifications for now</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
