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
  AreaChart,
  Area,
} from "recharts";
import { FaHospitalUser } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Homeboard(props) {
  const appointemntsuser = useSelector((s) => s.Docsaura.appointments);
  const patientDatamonth = useMemo(() => {
    const monthlyCounts = Array(12).fill(0);

    appointemntsuser.forEach((appointment) => {
      if (appointment.date) {
        const date = new Date(appointment.date);
        const month = date.getMonth();
        monthlyCounts[month]++;
      }
    });

    return [
      { month: "Jan", patients: monthlyCounts[0] },
      { month: "Feb", patients: monthlyCounts[1] },
      { month: "Mar", patients: monthlyCounts[2] },
      { month: "Apr", patients: monthlyCounts[3] },
      { month: "May", patients: monthlyCounts[4] },
      { month: "Jun", patients: monthlyCounts[5] },
      { month: "Jul", patients: monthlyCounts[6] },
      { month: "Aug", patients: monthlyCounts[7] },
      { month: "Sep", patients: monthlyCounts[8] },
      { month: "Oct", patients: monthlyCounts[9] },
      { month: "Nov", patients: monthlyCounts[10] },
      { month: "Dec", patients: monthlyCounts[11] },
    ];
  }, [appointemntsuser]);

  const totalappointemnt = appointemntsuser.length;
  const completappointemnt = appointemntsuser.reduce(
    (count, appointment) =>
      appointment.status === "confirmed" ? count + 1 : count,
    0
  );
  const pendingappointemnt = appointemntsuser.reduce(
    (count, appointment) =>
      appointment.status === "pending" ? count + 1 : count,
    0
  );
  const canxeldappointemnt = appointemntsuser.reduce(
    (count, appointment) =>
      appointment.status === "canceled" ? count + 1 : count,
    0
  );

  const statusData = [
    { name: "Confirmed", value: completappointemnt },
    { name: "Pending", value: pendingappointemnt },
    { name: "Canceled", value: canxeldappointemnt },
  ];

  const COLORS = ["#018786", "#FFBB28", "#FF8042"];

  const getMonthlyAppointments = () => {
    const monthlyData = Array(12).fill(0);
    appointemntsuser.forEach((appointment) => {
      const date = new Date(appointment.date);
      const month = date.getMonth();
      monthlyData[month]++;
    });

    return monthlyData.map((count, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "short" }),
      appointments: count,
    }));
  };

  const monthlyAppointmentsData = getMonthlyAppointments();

  const d = props.Use;
  const [user, setUser] = useState(d);
  const [greeting, setGreeting] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointemntsuser);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users");
        const data = await response.json();
        setUsersData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    if (user.role === "admin") {
      fetchUsers();
    }
  }, [user.role]);

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

  // Prepare data for admin charts
  const getUsersByRole = () => {
    const roles = {};
    usersData.forEach((user) => {
      const role = user.role.toLowerCase();
      roles[role] = (roles[role] || 0) + 1;
    });
    return Object.entries(roles).map(([name, value]) => ({ name, value }));
  };

  const getUsersByVerification = () => {
    const verified = usersData.filter((user) => user.verified).length;
    const unverified = usersData.length - verified;
    return [
      { name: "Verified", value: verified },
      { name: "Unverified", value: unverified },
    ];
  };

  const getMonthlyUserGrowth = () => {
    const monthlyCounts = Array(12).fill(0);
    usersData.forEach((user) => {
      const date = new Date(user.created_at);
      const month = date.getMonth();
      monthlyCounts[month]++;
    });
    return monthlyCounts.map((count, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "short" }),
      users: count,
    }));
  };

  const getUsersByType = () => {
    const types = {};
    usersData.forEach((user) => {
      const type = user.type || "Unknown";
      types[type] = (types[type] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  };

  const getRecentUsers = () => {
    return usersData
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  };

  const patientData = d.patientData;
  const appointments = filteredAppointments;
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  );

  if (loading && user.role === "admin") {
    return <div className="loading">Loading user data...</div>;
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
                  <h3 style={{ color: "#018786" }}>{completappointemnt}</h3>
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

            <div
              className="charts-container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                className="chart-container"
                style={{ flex: 1, minWidth: "300px" }}
              >
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
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div
                className="chart-container"
                style={{ flex: 1, minWidth: "300px" }}
              >
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
                  {pendingAppointments.length > 0 ? <th>Actions</th> : null}
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
                      {pendingAppointments.length > 0 ? (
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
                      ) : null}
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
                <h3 style={{ color: "#018786" }}>{completappointemnt}</h3>
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

          <div
            className="charts-container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              className="chart-container"
              style={{ flex: 1, minWidth: "300px" }}
            >
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
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div
              className="chart-container"
              style={{ flex: 1, minWidth: "300px" }}
            >
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
                  {pendingAppointments.length > 0 ? <th>Actions</th> : null}
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
                    {pendingAppointments.length > 0 ? (
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
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : user.role === "admin" ? (
        <div className="admin-dashboard">
          <h1 className="admin-title">Admin Dashboard</h1>

          {/* User Statistics Overview Cards */}
          <div className="stats-overview">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{usersData.length}</p>
            </div>
            <div className="stat-card">
              <h3>Verified Users</h3>
              <p>{usersData.filter((user) => user.verified).length}</p>
            </div>
            <div className="stat-card">
              <h3>Patients</h3>
              <p>
                {
                  usersData.filter(
                    (user) => user.role.toLowerCase() === "patient"
                  ).length
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>Doctors</h3>
              <p>
                {
                  usersData.filter(
                    (user) => user.role.toLowerCase() === "doctor"
                  ).length
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>Clinics</h3>
              <p>
                {
                  usersData.filter(
                    (user) => user.role.toLowerCase() === "clinic"
                  ).length
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>Laboratories</h3>
              <p>
                {
                  usersData.filter(
                    (user) => user.role.toLowerCase() === "laboratory"
                  ).length
                }
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="admin-charts-container">
            <div className="container-chart-both">
              {/* User Distribution by Role */}
              <div className="admin-chart">
                <h2>User Distribution by Role</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getUsersByRole()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {getUsersByRole().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Verification Status */}
              <div className="admin-chart">
                <h2>Verification Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getUsersByVerification()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {getUsersByVerification().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#018786" : "#FF8042"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Monthly User Growth */}
            <div className="admin-chart second">
              <h2>Monthly User Growth ({selectedYear})</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={getMonthlyUserGrowth()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#018786"
                    fill="rgba(1, 135, 134, 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* User Distribution by Type */}
            <div className="admin-chart second">
              <h2>User Distribution by Type</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getUsersByType()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#018786" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="recent-users second">
            <h2>Recently Registered Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {getRecentUsers().map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.verified ? (
                        <span className="verified">Yes</span>
                      ) : (
                        <span className="not-verified">No</span>
                      )}
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Link to={"/pages/Activate"} state={{ object: d }}>
          <button className="verfier">Activate my account</button>
        </Link>
      )}
    </div>
  );
}

function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return total / reviews.length;
}
