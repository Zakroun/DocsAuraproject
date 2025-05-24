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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ControlPanel from "./Controlpanel";
import { FaHospitalUser } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Homeboard(props) {
  const appointemntsuser = useSelector((s) => s.Docsaura.appointments);
  const patientDatamonth = useMemo(() => {
    const monthlyCounts = Array(12).fill(0); // Initialize array for 12 months
    
    appointemntsuser.forEach(appointment => {
      if (appointment.date) {
        const date = new Date(appointment.date);
        const month = date.getMonth(); // 0-11
        monthlyCounts[month]++;
      }
    });

    return [
      { month: 'Jan', patients: monthlyCounts[0] },
      { month: 'Feb', patients: monthlyCounts[1] },
      { month: 'Mar', patients: monthlyCounts[2] },
      { month: 'Apr', patients: monthlyCounts[3] },
      { month: 'May', patients: monthlyCounts[4] },
      { month: 'Jun', patients: monthlyCounts[5] },
      { month: 'Jul', patients: monthlyCounts[6] },
      { month: 'Aug', patients: monthlyCounts[7] },
      { month: 'Sep', patients: monthlyCounts[8] },
      { month: 'Oct', patients: monthlyCounts[9] },
      { month: 'Nov', patients: monthlyCounts[10] },
      { month: 'Dec', patients: monthlyCounts[11] },
    ];
  }, [appointemntsuser]);
  // Total appointments (just the length of the array)
  const totalappointemnt = appointemntsuser.length;

  // confirmed appointments (status === 'completed')
  const completappointemnt = appointemntsuser.reduce(
    (count, appointment) =>
      appointment.status === "confirmed" ? count + 1 : count,
    0
  );

  // Pending appointments (status === 'pending')
  const pendingappointemnt = appointemntsuser.reduce(
    (count, appointment) =>
      appointment.status === "pending" ? count + 1 : count,
    0
  );

  // Canceled appointments (status === 'canceled')
  const canxeldappointemnt = appointemntsuser.reduce(
    (count, appointment) =>
      appointment.status === "canceled" ? count + 1 : count,
    0
  );

  // Prepare data for status distribution chart
  const statusData = [
    { name: "Confirmed", value: completappointemnt },
    { name: "Pending", value: pendingappointemnt },
    { name: "Canceled", value: canxeldappointemnt },
  ];

  const COLORS = ["#018786", "#FFBB28", "#FF8042"]; // Updated color for Confirmed

  // Prepare data for monthly appointments chart
  const getMonthlyAppointments = () => {
    const monthlyData = Array(12).fill(0);
    appointemntsuser.forEach((appointment) => {
      const date = new Date(appointment.date);
      const month = date.getMonth();
      monthlyData[month]++;
    });
    
    return monthlyData.map((count, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'short' }),
      appointments: count,
    }));
  };

  const monthlyAppointmentsData = getMonthlyAppointments();

  const d = props.Use;
  const [user, setUser] = useState(d);
  // const patientDatamonth = d.patientDatamonth;
  const [greeting, setGreeting] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");
  
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointemntsuser);

  useEffect(() => {
    setFilteredAppointments(appointemntsuser);
  }, [appointemntsuser]);

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
      setFilteredAppointments(appointemntsuser || []);
    } else {
      setFilteredAppointments(
        (appointemntsuser || []).filter((appt) => appt.date === selected)
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

  const availableYears = useMemo(() => {
    const years = new Set(userDataYearly.map((d) => d.year));
    return Array.from(years).sort((a, b) => b - a);
  }, [userDataYearly]);

  const filteredData = useMemo(() => {
    return userDataYearly.filter((d) => d.year.toString() === selectedYear);
  }, [userDataYearly, selectedYear]);

  function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  }

  return (
    <div className="homeboard">
      <div className="homeboard__header">
        <div className="homeboard__header__title">
          <h1>
            {greeting} <br />{" "}
            <span>
              {" "}
              {user.fullName}{" "}
              {user.verified ? <MdVerified className="verif" /> : ""}{" "}
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
            <div className="stars">
              {generateStars(calculateAverageRating(user.reviews))}
            </div>
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
      user.verified ? (
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
                  <h3>Total Appointments </h3>
                  <h3 style={{ color: "rgb(0, 0, 155)" }}>
                    {totalappointemnt}
                  </h3>
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
                  <h3 style={{ color: "rgb(195, 101, 0)" }}>
                    {pendingappointemnt}
                  </h3>
                </div>
                <div className="partweekly">
                  <div className="partweekly__header">
                    <MdMarkEmailUnread
                      size={30}
                      color="#018786"
                      style={{
                        backgroundColor: "rgba(1, 135, 134, 0.2)",
                        padding: 7,
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  <h3>Confirmed Appointments </h3>
                  <h3 style={{ color: "#018786" }}>
                    {completappointemnt}
                  </h3>
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
                  <h3 style={{ color: "rgb(153, 0, 0)" }}>
                    {canxeldappointemnt}
                  </h3>
                </div>
              </div>
            </div>
            
            {/* New Charts Section */}
            <div className="charts-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
              <div className="chart-container" style={{ flex: 1, minWidth: '300px' }}>
                <h2>Appointment Status Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="chart-container" style={{ flex: 1, minWidth: '300px' }}>
                <h2>Monthly Appointments</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyAppointmentsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#018786" />
                  </BarChart>
                </ResponsiveContainer>
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
                    stroke="#018786"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="appointments-table">
            <div className="appointments_header">
              <h2>Upcoming Appointments</h2>
              <div className="appointment-day-filter">
                <select
                  id="weeklyselect"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  <option value="All">All</option>
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
              {appointments.length > 0 ? (
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
                          src={`/images/user.png`}
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
                        {appt.status === "completed" ||
                        appt.status === "confirmed" ? (
                          <div>
                            <span
                              className="status completed"
                              style={{
                                width: "78px",
                                background: "none",
                                color: "#018786",
                                fontSize: "15px",
                              }}
                            >
                              <FontAwesomeIcon icon={faCheckCircle} />
                              {appt.status}
                            </span>
                          </div>
                        ) : appt.status === "canceled" ? (
                          <div>
                            <span
                              className="status canceled"
                              style={{
                                width: "78px",
                                background: "none",
                                color: "rgb(255, 64, 64)",
                                fontSize: "15px",
                              }}
                            >
                              <FontAwesomeIcon icon={faTimesCircle} />
                              Canceled
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span
                              className="status pending"
                              style={{
                                width: "78px",
                                background: "none",
                                color: "rgb(255, 182, 47)",
                                fontSize: "15px",
                              }}
                            >
                              <FontAwesomeIcon icon={faClock} />
                              Pending
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="actions">
                        {appt.status !== "completed" &&
                        appt.status !== "confirmed" &&
                        appt.status !== "canceled" ? (
                          <>
                            <Link
                              to={`/pages/Dashboard`}
                              state={{ appointment: appt }}
                            >
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
              ) : (
                ""
              )}
            </table>
          </div>{" "}
        </>
      ) : user.role === "Patient" && user.verified ? (
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
                    color="rgb(0, 0, 155)"
                    style={{
                      backgroundColor: "rgba(0, 0, 155, 0.38)",
                      padding: 7,
                      borderRadius: 10,
                    }}
                  />
                </div>
                <h3>Total Appointments </h3>
                <h3 style={{ color: "rgb(0, 0, 155)" }}>{totalappointemnt}</h3>
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
                <h3 style={{ color: "rgb(195, 101, 0)" }}>
                  {pendingappointemnt}
                </h3>
              </div>
              <div className="partweekly">
                <div className="partweekly__header">
                  <MdMarkEmailUnread
                    size={30}
                    color="#018786"
                    style={{
                      backgroundColor: "rgba(1, 135, 134, 0.2)",
                      padding: 7,
                      borderRadius: 10,
                    }}
                  />
                </div>
                <h3>Confirmed Appointments </h3>
                <h3 style={{ color: "#018786" }}>
                  {completappointemnt}
                </h3>
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
                <h3 style={{ color: "rgb(153, 0, 0)" }}>
                  {canxeldappointemnt}
                </h3>
              </div>
            </div>
          </div>
          
          {/* Charts for Patient View */}
          <div className="charts-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
            <div className="chart-container" style={{ flex: 1, minWidth: '300px' }}>
              <h2>Your Appointment Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-container" style={{ flex: 1, minWidth: '300px' }}>
              <h2>Your Monthly Appointments</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyAppointmentsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="#018786" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="appointments-table">
            <div className="appointments_header">
              <h2>Upcoming Appointments</h2>
              <div className="appointment-day-filter">
                <select
                  id="weeklyselect"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  <option value="All">All</option>
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
                        src={`/images/user.png`}
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
                      {appt.status === "completed" ||
                      appt.status === "confirmed" ? (
                        <div>
                          <span
                            className="status confirmed"
                            style={{
                              width: "78px",
                              background: "none",
                              color: "#018786",
                              fontSize: "15px",
                            }}
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                            {appt.status}
                          </span>
                        </div>
                      ) : appt.status === "canceled" ? (
                        <div>
                          <span
                            className="status canceled"
                            style={{
                              width: "78px",
                              background: "none",
                              color: "rgb(255, 64, 64)",
                              fontSize: "15px",
                            }}
                          >
                            <FontAwesomeIcon icon={faTimesCircle} />
                            Canceled
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span
                            className="status pending"
                            style={{
                              width: "78px",
                              background: "none",
                              color: "rgb(255, 182, 47)",
                              fontSize: "15px",
                            }}
                          >
                            <FontAwesomeIcon icon={faClock} />
                            Pending
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="actions">
                      {appt.status !== "completed" &&
                      appt.status !== "confirmed" &&
                      appt.status !== "canceled" ? (
                        <>
                          <Link
                            to={`/pages/Dashboard`}
                            state={{ appointment: appt }}
                          >
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
                  stroke="#018786"
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