import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ControlPanel from "./Controlpanel";
import { FaHospitalUser } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { useSelector } from "react-redux";
export default function Homeboard(props) {
  
  const d = props.Use;
  console.log('curent user ' , d)
  const [user, setUser] = useState(d);
  console.log(user)
  const role = d.role;
  const doctors = useSelector((s) => s.Docsaura.doctors);
  const clinics = useSelector((s) => s.Docsaura.clinics);
  const laboratories = useSelector((s) => s.Docsaura.laboratories);

  // useEffect(() => {
  //   let data = [];

  //   if (role === "doctor") {
  //     data = doctors;
  //   } else if (role === "clinic") {
  //     data = clinics;
  //   } else if (role === "laboratory") {
  //     data = laboratories;
  //   }

  //   const foundUser = data.find((a) => a.id === user.id);
  //   if (foundUser) {
  //     setUser(foundUser);
  //   }
  // }, [doctors, clinics, laboratories, role, user.id]);

  const patientDatamonth = d.patientDatamonth;
  const [greeting, setGreeting] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");
  const [filteredAppointments, setFilteredAppointments] = useState(
    user.appointments
  );

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
  function generateStars(rating) {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) {
        return (
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else if (i < rating) {
        return (
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        return (
          <span key={i} className="star empty">
            ☆
          </span>
        );
      }
    });
  }
  const patientData = d.patientData;
  const appointments = filteredAppointments;
  const userDataYearly = useSelector((s) => s.Docsaura.userDataYearly);
  const [selectedYear, setSelectedYear] = useState("2025");

  // Extraire les années distinctes depuis les données
  const availableYears = useMemo(() => {
    const years = new Set(userDataYearly.map((d) => d.year));
    return Array.from(years).sort((a, b) => b - a);
  }, [userDataYearly]);
  console.log('username : ' , user.fullName)
  // Filtrer les données selon l'année sélectionnée
  const filteredData = useMemo(() => {
    return userDataYearly.filter((d) => d.year.toString() === selectedYear);
  }, [userDataYearly, selectedYear]);
  return (
    <div className="homeboard">
      {/* <div className="searchadd">
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
      </div> */}
      <div className="homeboard__header">
        <div className="homeboard__header__title">
          <h1>
            {greeting} <br />{" "}
            <span>
              {" "}
              {user.fullName }{" "}
              {user.Verified ? <MdVerified className="verif" /> : ""}{" "}
            </span>
          </h1>
          {user.role === "Patient" ? (
            <p>Have a nice day!</p>
          ) : (
            <p>Have a nice day at the hospital!</p>
          )}
          {user.role === "Patient" || user.role === "admin" ? (
            ""
          ) : (
            <div className="stars">{generateStars(user.rating)}</div>
          )}
        </div>

        <div className="homeboard__header__image">
          <img
            src={
              user.role === "Patient"
                ? `../Images/examination.png`
                : d.role === "doctor"
                ? `../images/doctor.png`
                : d.role === "clinic"
                ? `../images/hospital.png`
                : d.role === "admin"
                ? `../images/admin.png`
                : `../images/research.png`
            }
            alt={`${d.role} icon`}
          />
        </div>
      </div>

      {(user.role === "doctor" ||
        user.role === "clinic" ||
        user.role === "laboratory") &&
      user.Verified === true ? (
        <>
          <div className="weeklyReports">
            <div className="weeklypart1">
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
                      color="rgb(0, 0, 155)"
                      style={{
                        backgroundColor: "rgba(0, 0, 155, 0.38)",
                        padding: 7,
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  <h3>Total Patients </h3>
                  <h3 style={{ color: "rgb(0, 0, 155)" }}>200</h3>
                </div>
                <div className="partweekly">
                  <div className="partweekly__header">
                    <IoCallSharp
                      size={30}
                      color="rgb(195, 101, 0)"
                      style={{
                        backgroundColor: "rgba(236, 122, 0, 0.45)",
                        padding: 7,
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  <h3>Pending Appointments </h3>
                  <h3 style={{ color: "rgb(195, 101, 0)" }}>20</h3>
                </div>
                <div className="partweekly">
                  <div className="partweekly__header">
                    <FaCalendarAlt
                      size={30}
                      color="rgb(153, 0, 0)"
                      style={{
                        backgroundColor: "rgba(219, 0, 0, 0.46)",
                        padding: 7,
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  <h3>Canceled Appointments </h3>
                  <h3 style={{ color: "rgb(153, 0, 0)" }}>100</h3>
                </div>
                <div className="partweekly">
                  <div className="partweekly__header">
                    <MdMarkEmailUnread
                      size={30}
                      color="rgb(0, 113, 128)"
                      style={{
                        backgroundColor: "rgba(0, 113, 128, 0.39)",
                        padding: 7,
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  <h3>Completed Appointments </h3>
                  <h3 style={{ color: "rgb(0, 113, 128)" }}>10</h3>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <div className="weeklyheader">
                <h2>Number of Patients Per Month</h2>
                <select name="weeklyselect" id="weeklyselect">
                  <option value="last year">Last Year</option>
                  <option value="this year">This Year</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientDatamonth}>
                  <XAxis dataKey="month" stroke="#555" />
                  <YAxis />
                  <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#008481"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-container">
              <div className="weeklyheader">
                <h2>Number of Patients Over the Week</h2>
                <select name="weeklyselect" id="weeklyselect">
                  <option value="last week">Last Week</option>
                  <option value="this week">This Week</option>
                  <option value="last month">Last Month</option>
                  <option value="this month">This Month</option>
                  <option value="last year">Last Year</option>
                  <option value="this year">This Year</option>
                </select>
              </div>
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
                {/* <label htmlFor="day-select">Select Day:</label> */}
                <select
                  id="weeklyselect"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  <option value="All">All</option>
                  {appointments
                    .map((appt) => appt.date)
                    .map((day, k) => (
                      <option key={k} value={day}>
                        {day}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time From</th>
                  <th>Time To</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className={
                      appt.status === "completed"
                        ? "completed"
                        : appt.status === "canceled"
                        ? "canceled"
                        : ""
                    }
                  >
                    <td>
                      <img
                        src={`/images/${appt.image}`}
                        alt="profile"
                        className="profile-img"
                      />
                    </td>
                    <td>{appt.fullName}</td>
                    <td>{appt.location}</td>
                    <td>{appt.date}</td>
                    <td>{appt.timeFrom}</td>
                    <td>{appt.timeTo}</td>
                    <td>
                      {appt.status === "completed" ? (
                        <div>
                          <span className="status completed" style={{width:'78px',background:'none',color:'rgb(26, 225, 26)',fontSize:'15px'}}>
                            <FontAwesomeIcon icon={faCheckCircle} />Completed
                          </span>
                        </div>
                      ) : appt.status === "canceled" ? (
                        <div>
                          <span className="status canceled" style={{width:'78px',background:'none',color:'rgb(255, 64, 64)',fontSize:'15px'}}>
                            <FontAwesomeIcon icon={faTimesCircle} />Canceled
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="status pending" style={{width:'78px',background:'none',color:'rgb(255, 182, 47)',fontSize:'15px'}}>
                            <FontAwesomeIcon icon={faClock} />Pending
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="actions">
                      {appt.status !== "completed" &&
                      appt.status !== "canceled" ? (
                        <>
                          <Link to={`/pages/Dashboard`} state={{ user: appt }}>
                            <button className="complet">Update</button>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
        </>
      ) : user.role === "patient" && user.Verified === true ? (
        <>
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
                <h3>Total Patients</h3>
                <h3 style={{ color: "#008481" }}>200</h3>
              </div>

              <div className="partweekly">
                <div className="partweekly__header">
                  <IoCallSharp
                    size={30}
                    color="rgb(195, 101, 0)"
                    style={{
                      backgroundColor: "rgba(236, 122, 0, 0.45)",
                      padding: 7,
                      borderRadius: 10,
                    }}
                  />
                </div>
                <h3>Phone Calls</h3>
                <h3 style={{ color: "rgb(195, 101, 0)" }}>20</h3>
              </div>

              <div className="partweekly">
                <div className="partweekly__header">
                  <FaCalendarAlt
                    size={30}
                    color="rgb(153, 0, 0)"
                    style={{
                      backgroundColor: "rgba(219, 0, 0, 0.46)",
                      padding: 7,
                      borderRadius: 10,
                    }}
                  />
                </div>
                <h3>Appointments</h3>
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
                <h3>Unread Messages</h3>
                <h3 style={{ color: "rgb(0, 0, 155)" }}>10</h3>
              </div>
            </div>
          </div>
          <div className="appointments-table">
            <div className="appointments_header">
              <h2>Upcoming Appointments</h2>
              <div className="appointment-day-filter">
                {/* <label htmlFor="day-select">Select Day:</label> */}
                <select
                  id="weeklyselect"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  <option value="All">All</option>
                  {appointments
                    .map((appt) => appt.date)
                    .map((day, k) => (
                      <option key={k} value={day}>
                        {day}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time From</th>
                  <th>Time To</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className={
                      appt.status === "completed"
                        ? "completed"
                        : appt.status === "canceled"
                        ? "canceled"
                        : ""
                    }
                  >
                    <td>
                      <img
                        src={`/images/${appt.image}`}
                        alt="profile"
                        className="profile-img"
                      />
                    </td>
                    <td>{appt.fullName}</td>
                    <td>{appt.location}</td>
                    <td>{appt.date}</td>
                    <td>{appt.timeFrom}</td>
                    <td>{appt.timeTo}</td>
                    <td>
                      {appt.status === "completed" ? (
                        <div>
                          <span className="status completed" style={{width:'78px',background:'none',color:'rgb(26, 225, 26)',fontSize:'15px'}}>
                            <FontAwesomeIcon icon={faCheckCircle} />Completed
                          </span>
                        </div>
                      ) : appt.status === "canceled" ? (
                        <div>
                          <span className="status canceled" style={{width:'78px',background:'none',color:'rgb(255, 64, 64)',fontSize:'15px'}}>
                            <FontAwesomeIcon icon={faTimesCircle} />Canceled
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="status pending" style={{width:'78px',background:'none',color:'rgb(255, 182, 47)',fontSize:'15px'}}>
                            <FontAwesomeIcon icon={faClock} />Pending
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="actions">
                      {appt.status !== "completed" &&
                      appt.status !== "canceled" ? (
                        <>
                          <Link to={`/pages/Dashboard`} state={{ user: appt }}>
                            <button className="complet">Update</button>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : user.role === "admin" ? (
        <div>
          <div className="mt-6" id="divchart">
            <div className="mb-4" id="divselect">
              <h2 className="text-xl font-semibold mb-4">
                User Statistics Over the Year
              </h2>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="95%" height={300}>
              <LineChart data={filteredData}>
                <XAxis dataKey="month" stroke="#555" />
                <YAxis />
                <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#008481"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <ControlPanel />
        </div>
      ) : (
        <Link to={"/pages/Activate"} state={{ object: d }}>
          <button className="verfier">Activate my account</button>
        </Link>
      )}
    </div>
  );
}
