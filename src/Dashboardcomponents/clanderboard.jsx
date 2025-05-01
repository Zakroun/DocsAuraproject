import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faTimesCircle,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AddAppointemnt } from "../data/DocsauraSlice";
import { useDispatch } from "react-redux";

export default function Calendar(props) {
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const appointments = props.appointments || [];
  const [Listeappointments, setappointments] = useState(appointments);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("02");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [formAdd, setFormAdd] = useState(true);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cin: "",
    location: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    status: "pending",
    image: "user.png",
    consultationType: "Emergency Care",
    notes: "",
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedFormData = { ...prevData, [name]: value };
  
      if (name === "timeFrom") {
        const [hours, minutes] = value.split(":").map(Number);
        const startDate = new Date();
        startDate.setHours(hours);
        startDate.setMinutes(minutes + 30);
  
        const newTimeTo = startDate.toTimeString().slice(0, 5);
        updatedFormData.timeTo = newTimeTo;
      }
  
      return updatedFormData;
    });
  };

  const handleMonthChange = (direction) => {
    let newMonth = parseInt(selectedMonth);
    let newYear = parseInt(selectedYear);

    if (direction === "prev") {
      if (newMonth === 1) {
        newMonth = 12;
        newYear--;
      } else {
        newMonth--;
      }
    } else {
      if (newMonth === 12) {
        newMonth = 1;
        newYear++;
      } else {
        newMonth++;
      }
    }

    setSelectedMonth(newMonth.toString().padStart(2, "0"));
    setSelectedYear(newYear.toString());
  };

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

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredAppointments = Listeappointments.filter((appointment) =>
        appointment.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setappointments(filteredAppointments);
    } else {
      setappointments(appointments);
    }
  }, [searchQuery, appointments, Listeappointments]);

  useEffect(() => {
    setappointments(appointments);
  }, [appointments]);

  const Add = () => {
    if (
      formData.fullName !== "" &&
      formData.email !== "" &&
      formData.phone !== "" &&
      formData.cin !== "" &&
      formData.date !== "" &&
      formData.timeFrom !== ""
    ) {
      const newAppointment = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cin: formData.cin,
        location: formData.location,
        date: formData.date,
        image: "user.png",
        timeFrom: formData.timeFrom,
        timeTo:
          formData.timeTo ||
          new Date(
            new Date(`1970-01-01T${formData.timeFrom}`).getTime() + 30 * 60000
          )
            .toTimeString()
            .slice(0, 5),
        status: formData.status,
        consultationType: formData.consultationType,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        createdBy: props.role,
      };

      dispatch(
        AddAppointemnt({
          role: props.role,
          id: props.id,
          appointment: newAppointment,
        })
      );

      setSuccessMessage("Appointment added successfully");
      setFormAdd(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cin: "",
        location: "Rabat",
        date: "",
        timeFrom: "",
        timeTo: "",
        status: "pending",
        image: "user.png",
        consultationType: "Emergency Care",
      });
    } else {
      seterrorMessage("Please fill all required fields");
    }

    setTimeout(() => {
      setSuccessMessage("");
      seterrorMessage("");
    }, 3000);
  };

  return (
    <div className="calendar-container">
      {successMessage && (
        <div className="notification-top">
          <div className="notification success">
            Appointment added successfully!
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="notification-top">
          <div className="notification error">{errorMessage}</div>
        </div>
      )}

      {formAdd ? (
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

          <div className="legend-and-navigation">
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

            <div className="month-navigation">
              <button 
                className="nav-button prev-button"
                onClick={() => handleMonthChange("prev")}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              
              <div className="current-month">
                {monthNames[parseInt(selectedMonth) - 1]} {selectedYear}
              </div>
              
              <button 
                className="nav-button next-button"
                onClick={() => handleMonthChange("next")}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {daysInMonth.map((date, key) => (
              <div key={key} className="calendar-day">
                <h4 className="calendar-date">{date}</h4>
                {groupedAppointments[date] &&
                groupedAppointments[date].length > 0 ? (
                  groupedAppointments[date]
                    .filter(
                      (appointment) =>
                        selectedStatus === "all" ||
                        appointment.status === selectedStatus
                    )
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
            <div className="divinputs">
              <div className="inputdiv">
                <input
                  type="text"
                  name="fullName"
                  id="fullname"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputdiv">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="divinputs">
              <div className="inputdiv">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputdiv">
                <input
                  type="text"
                  name="cin"
                  id="cin"
                  placeholder="CIN"
                  value={formData.cin}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="divinputs">
              <div className="inputdiv">
                <select
                  name="location"
                  id="cities"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a city in Morocco</option>
                  <option value="casablanca">Casablanca</option>
                  <option value="rabat">Rabat</option>
                  <option value="marrakech">Marrakech</option>
                  <option value="fes">Fès</option>
                  <option value="meknes">Meknès</option>
                  <option value="tangier">Tangier</option>
                  <option value="agadir">Agadir</option>
                  <option value="oujda">Oujda</option>
                  <option value="tetouan">Tétouan</option>
                  <option value="safi">Safi</option>
                  <option value="el-jadida">El Jadida</option>
                  <option value="nador">Nador</option>
                  <option value="kenitra">Kénitra</option>
                  <option value="temara">Témara</option>
                  <option value="settat">Settat</option>
                  <option value="berrechid">Berrechid</option>
                  <option value="khemisset">Khémisset</option>
                  <option value="beni-mellal">Beni Mellal</option>
                  <option value="taroudant">Taroudant</option>
                  <option value="errachidia">Errachidia</option>
                  <option value="laayoune">Laâyoune</option>
                  <option value="dakhla">Dakhla</option>
                  <option value="ouarzazate">Ouarzazate</option>
                  <option value="taza">Taza</option>
                  <option value="guelmim">Guelmim</option>
                  <option value="sidi-kacem">Sidi Kacem</option>
                  <option value="sidi-slimane">Sidi Slimane</option>
                  <option value="oualidia">Oualidia</option>
                  <option value="zoumi">Zoumi</option>
                  <option value="youssoufia">Youssoufia</option>
                  <option value="chefchaouen">Chefchaouen</option>
                  <option value="asfi">Asfi</option>
                  <option value="al-hoceima">Al Hoceima</option>
                  <option value="midelt">Midelt</option>
                  <option value="azilal">Azilal</option>
                  <option value="taourirt">Taourirt</option>
                  <option value="ifran">Ifrane</option>
                  <option value="tiznit">Tiznit</option>
                  <option value="essaouira">Essaouira</option>
                  <option value="tan-tan">Tan-Tan</option>
                  <option value="chichaoua">Chichaoua</option>
                  <option value="smara">Smara</option>
                </select>
              </div>
              <div className="inputdiv">
                <select
                  name="consultationType"
                  id="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                  required
                >
                  {props.role === "doctor" && (
                    <>
                      <option value="online Conversation, voice or video call">
                        Online Consultation (250 DH)
                      </option>
                      <option value="Consultation at the patient's home">
                        Home Visit (300 DH)
                      </option>
                      <option value="Consultation at the doctor's office">
                        Doctor's Office (200 DH)
                      </option>
                    </>
                  )}
                  {props.role === "clinic" && (
                    <>
                      <option value="online Conversation, voice or video call">
                        Online Consultation (250 DH)
                      </option>
                      <option value="Consultation at the clinic office">
                        Clinic Visit (200 DH)
                      </option>
                    </>
                  )}
                  {props.role === "lab" && (
                    <>
                      <option value="Blood Test">Blood Test (150 DH)</option>
                      <option value="Medical Imaging">
                        Medical Imaging (300 DH)
                      </option>
                      <option value="Urine Analysis">
                        Urine Analysis (100 DH)
                      </option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="divinputs">
              <div className="inputdiv">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputdiv">
                <input
                  type="time"
                  id="date"
                  name="timeFrom"
                  value={formData.timeFrom}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="divinputs">
              <div className="inputdiv">
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                type="button"
                className="cancelbtn"
                onClick={() => setFormAdd(true)}
              >
                Cancel
              </button>

              <button id="btn" type="button" onClick={Add}>
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}