import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export default function Calendar(props) {
  const appointments = props.appointments || [];
  const [Listeappointments, setappointments] = useState(appointments);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("02");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [formAdd, setFormAdd] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cin : "",
    date: "",
    time: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const navigate = useNavigate();
  const groupedAppointments = Listeappointments.reduce((acc, appointment) => {
    const formattedDate = new Date(appointment.date)
      .toISOString()
      .split("T")[0];
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(appointment);
    return acc;
  }, {});

  const generateDaysInMonth = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
      days.push(date.toISOString().split("T")[0]);
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = generateDaysInMonth(selectedYear, selectedMonth);

  const filterAppointmentsByStatus = (appointments) => {
    if (selectedStatus === "all") {
      return appointments;
    }
    return Listeappointments.filter(
      (appointment) => appointment.status === selectedStatus
    );
  };
  useEffect(() => {
    if (searchQuery !== "") {
      const filteredAppointments = Listeappointments.filter((appointment) =>
        appointment.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setappointments(filteredAppointments);
    } else {
      setappointments(appointments);
    }
  }, [searchQuery, Listeappointments, appointments]);

  const Add = () => {
    if (
      formData.fullName !== "" &&
      formData.date !== "" &&
      formData.time !== ""
    ) {
      const obj = {
        fullName: formData.fullName,
        date: formData.date,
        time: formData.time,
        status: "pending"
      };
      alert('Appointment Added sussessfully');
    setFormAdd(true)
    }else{
      alert('Please fill all the fields');
    }
  };
  return (
    <div className="calendar-container">
      {formAdd === true ? (
        <>
          <h2 className="calendar-title">Medical Appointments</h2>

          <div className="filters">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>

            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="calendar-actions">
            <button
              className="add-appointment"
              onClick={() => setFormAdd(false)}
            >
              + Add Appointment
            </button>
          </div>

          <div className="legend">
            <div>
              <span className="status completed">
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>{" "}
              Completed
            </div>
            <div>
              <span className="status pending">
                <FontAwesomeIcon icon={faClock} />
              </span>{" "}
              Pending
            </div>
            <div>
              <span className="status canceled">
                <FontAwesomeIcon icon={faTimesCircle} />
              </span>{" "}
              Canceled
            </div>
          </div>

          <div className="calendar-grid">
            {daysInMonth.map((date) => (
              <div key={date} className="calendar-day">
                <h4 className="calendar-date">{date}</h4>
                {groupedAppointments[date] &&
                groupedAppointments[date].length > 0 ? (
                  filterAppointmentsByStatus(groupedAppointments[date])
                    .filter((appointment) =>
                      appointment.fullName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((appointment) => (
                      <Link
                        key={appointment.id}
                        className="Link"
                        to={`/pages/Dashboard`}
                        state={{ user: appointment }}
                      >
                        <div
                          className={`appointment-card ${appointment.status}`}
                        >
                          <div className="appointment-info">
                            <p className="appointment-name">
                              {appointment.fullName}
                            </p>
                            <p className="appointment-time">
                              {appointment.timeFrom} - {appointment.timeTo}
                            </p>
                            <span className={`status ${appointment.status}`}>
                              {appointment.status === "completed" && (
                                <FontAwesomeIcon icon={faCheckCircle} />
                              )}
                              {appointment.status === "pending" && (
                                <FontAwesomeIcon icon={faClock} />
                              )}
                              {appointment.status === "canceled" && (
                                <FontAwesomeIcon icon={faTimesCircle} />
                              )}
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                ) : (
                  <p className="noappointments">No appointments</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="Form_Appointemnt">
          <h2 className="calendar-title">Form Appointemnt</h2>
          <form action="" method="post">
            <input
              style={{ marginRight: "20px" }}
              type="text"
              name="fullName"
              id="fullname"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              style={{ marginRight: "20px" }}
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cin"
              id="cin"
              placeholder="CIN"
              value={formData.cin}
              onChange={handleChange}
              required
            />
            <br />
            <input
              style={{ marginRight: "20px" }}
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <br />
            <button id="btn" type="button" onClick={Add}>
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
