import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LuSearch } from "react-icons/lu";
import { FaHospitalUser } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

export default function Homeboard(props) {
  const d = props.doctor;
  const [greeting, setGreeting] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");
  const [filteredAppointments, setFilteredAppointments] = useState(
    d.appointments
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, message: "New patient registered", time: "2 mins ago" },
    { id: 2, message: "Appointment rescheduled", time: "10 mins ago" },
    { id: 3, message: "New message from John", time: "30 mins ago" },
  ];

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  const handleDayChange = (e) => {
    const selected = e.target.value;
    setSelectedDay(selected);
    if (selected === "All") {
      setFilteredAppointments(d.appointments);
    } else {
      setFilteredAppointments(
        d.appointments.filter((appt) => appt.date === selected)
      );
    }
  };

  const patientData = d.patientData;
  const appointments = filteredAppointments;

  return (
    <div className="homeboard">
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
      <div className="homeboard__header">
        <div className="homeboard__header__title">
          <h1>
            {greeting} <br /> <span> {d.fullName} </span>
          </h1>
          <p>Have a nice day at the hospital!</p>
        </div>
        <div className="homeboard__header__image">
          <img src={`../images/doctor.png`} alt="Doctor imge" />
        </div>
      </div>

      <div className="weeklyReports">
        <div className="weeklyheader">
          <h2>Weekly Reports</h2>
          <select name="weeklyselect" id="weeklyselect">
            <option value="last week">Last Week</option>
            <option value="this week">This Week</option>
            <option value="last month">Last Month</option>
            <option value="this month">This Month</option>
            <option value="last year">Last Year</option>
            <option value="this year">This Year</option>
          </select>
        </div>
        <div className="weeklyReports__content">
          <div className="partweekly">
            <div className="partweekly__header">
              <FaHospitalUser
                size={30}
                color="#008481"
                style={{
                  backgroundColor: "#00848276",
                  padding: 7,
                  borderRadius: 10,
                }}
              />
            </div>
            <h3>Total Patients </h3>
            <h3 style={{ color: "#008481" }}>200</h3>
          </div>
          <div className="partweekly">
            <div className="partweekly__header">
              <IoCallSharp
                size={30}
                color="rgb(195, 101, 0)"
                style={{
                  backgroundColor: "rgba(195, 101, 0, 0.45)",
                  padding: 7,
                  borderRadius: 10,
                }}
              />
            </div>
            <h3>Phone Calls </h3>
            <h3 style={{ color: "rgb(195, 101, 0)" }}>20</h3>
          </div>
          <div className="partweekly">
            <div className="partweekly__header">
              <FaCalendarAlt
                size={30}
                color="rgb(153, 0, 0)"
                style={{
                  backgroundColor: "rgba(153, 0, 0, 0.46)",
                  padding: 7,
                  borderRadius: 10,
                }}
              />
            </div>
            <h3>Appointments </h3>
            <h3 style={{ color: "rgb(153, 0, 0)" }}>100</h3>
          </div>
          <div className="partweekly">
            <div className="partweekly__header">
              <MdMarkEmailUnread
                size={30}
                color="rgb(0, 0, 155)"
                style={{
                  backgroundColor: "rgba(0, 0, 155, 0.44)",
                  padding: 7,
                  borderRadius: 10,
                }}
              />
            </div>
            <h3>Unread Messages </h3>
            <h3 style={{ color: "rgb(0, 0, 155)" }}>10</h3>
          </div>
        </div>

        <div className="chart-container">
          <h2>Number of Patients Over the Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientData}>
              <XAxis dataKey="day" stroke="#555" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="thisWeek"
                fill="#008481"
                barSize={40}
                name="This Week"
              />
              <Bar
                dataKey="lastWeek"
                fill="rgba(197, 197, 197, 0.75)"
                barSize={40}
                name="Last Week"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="appointments-table">
        <div className="appointments_header">
          <h2>Upcoming Appointments</h2>
          <div className="appointment-day-filter">
            <label htmlFor="day-select">Select Day:</label>
            <select
              id="day-select"
              value={selectedDay}
              onChange={handleDayChange}
            >
              <option value="All">All</option>
              {appointments
                .map((appt) => appt.date)
                .map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr
                key={appt.id}
                className={appt.status === "completed" ? "completed" : ""}
              >
                <td>
                  <img
                    src={`/images/${appt.image}`}
                    alt="profile"
                    className="profile-img"
                  />
                  {appt.name}
                </td>
                <td>{appt.location}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>
                  {appt.status === "completed" ? (
                    <FaCircleCheck color="rgb(0, 88, 87)" size={25} />
                  ) : (
                    <MdOutlineIncompleteCircle color="orange" size={25} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
