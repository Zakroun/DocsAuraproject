import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAppointment } from "../data/DocsauraSlice";
import { PiVideoConferenceFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { useSelector } from "react-redux";
export default function Calendar() {
  const appointemntsuser = useSelector(s=>s.Docsaura.appointments) 
  console.log(appointemntsuser)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //const appointments = props.appointments || [];
  const [Listeappointments, setappointments] = useState(appointemntsuser || []);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("05");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [formAdd, setFormAdd] = useState(true);
  const [content1, setcontent1] = useState("block");
  const [content2, setcontent2] = useState("none");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cin: "",
    location: "",
    status: "pending",
    image: "user.png",
    date: "",
    timeFrom: "",
    timeTo: "",
    consultationType: "General Consultation - 200 MAD",
    description: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    if (name === "timeFrom") {
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes + 15);
      const newHours = String(date.getHours()).padStart(2, "0");
      const newMinutes = String(date.getMinutes()).padStart(2, "0");
      updatedForm.timeTo = `${newHours}:${newMinutes}`;
    }

    setFormData(updatedForm);
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

  const filterAppointmentsByStatus = (appointments) => {
    if (selectedStatus === "all") {
      return appointments;
    }
    return appointments.filter(
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
      setappointments(appointemntsuser);
    }
  }, [searchQuery]);

  const Next = () => {
    if (
      formData.fullName === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.cin === "" ||
      formData.date === "" ||
      formData.timeFrom === "" ||
      formData.description === ""
    ) {
      seterrorMessage(
        "Please fill in all personal information fields before proceeding."
      );
      setTimeout(() => {
        seterrorMessage("");
      }, 3000);
      return;
    }
    setcontent1("none");
    setcontent2("block");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (content2 === "block") {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    // Check if user is logged in
    if (!user) {
      seterrorMessage("Please login to book an appointment");
      setTimeout(() => seterrorMessage(""), 3000);
      return;
    }

    // Validate required fields
    const requiredFields = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      cin: formData.cin,
      location: formData.location,
      date: formData.date,
      timeFrom: formData.timeFrom,
      timeTo: formData.timeTo,
      paymentMethod: formData.paymentMethod
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      seterrorMessage(`Missing required fields: ${missingFields.join(', ')}`);
      setTimeout(() => seterrorMessage(""), 5000);
      return;
    }

    // Validate credit card details if payment method is credit-card
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        seterrorMessage("Please fill in all credit card details");
        setTimeout(() => seterrorMessage(""), 3000);
        return;
      }
    }

    try {
      // Determine the appointment type based on user role
      let appointmentType = {
        doctorAppointment: false,
        clinicAppointment: false,
        laboAppointment: false,
        id_doctor: null,
        id_clinic: null,
        id_labo: null,
        id_visiteur: null
      };

      // Set the appropriate IDs based on user role
      if (user.role === "doctor") {
        appointmentType.doctorAppointment = true;
        appointmentType.id_doctor = user.id_doctor;
      } else if (user.role === "clinic") {
        appointmentType.clinicAppointment = true;
        appointmentType.id_clinic = user.id_clinic;
      } else if (user.role === "laboratory") {
        appointmentType.laboAppointment = true;
        appointmentType.id_labo = user.id_labo;
      }
      // Note: Removed the else block for regular users

      const appointment = {
        // Personal information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cin: formData.cin,
        location: formData.location,

        // Appointment details
        date: formData.date,
        timeFrom: formData.timeFrom,
        timeTo: formData.timeTo,
        consultationType: formData.consultationType || null,
        description: formData.description || null,

        // Payment information
        paymentMethod: formData.paymentMethod,
        ...(formData.paymentMethod === "credit-card" ? {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        } : {
          cardNumber: null,
          expiryDate: null,
          cvv: null
        }),

        // System fields
        status: "pending",
        ...appointmentType,
        imageP: null
      };

      const resultAction = await dispatch(addAppointment(appointment));
      
      if (addAppointment.fulfilled.match(resultAction)) {
        setSuccessMessage("Appointment booked successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (addAppointment.rejected.match(resultAction)) {
        seterrorMessage(resultAction.payload || "Failed to book appointment");
        setTimeout(() => seterrorMessage(""), 5000);
      }
    } catch (error) {
      console.error("Appointment error:", error);
      seterrorMessage("Failed to book appointment. Please try again.");
      setTimeout(() => seterrorMessage(""), 5000);
    }
  }
};

  return (
    <div className="calendar-container">
      {successMessage && (
        <div className="custom-notification-top">
          <div className="custom-notification success">{successMessage}</div>
        </div>
      )}

      {errorMessage && (
        <div className="custom-notification-top">
          <div className="custom-notification error">{errorMessage}</div>
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
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
              <option value="2034">2034</option>
              <option value="2035">2035</option>
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
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
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
            {daysInMonth.map((date,k) => (
              <div key={k} className="calendar-day">
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
        <div className="divreserve2">
          <h2 className="calendar-title">Book an Appointment</h2>
          <div className="part1serve">
            <div className="spancontent">
              <span className="spanserve">1 | Personal Information</span>
              <PiVideoConferenceFill size={35} className="iconspan" />
            </div>
            <div className="content1" style={{ display: content1 }}>
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="divinputs">
                  <div className="inputdiv">
                    <input
                      style={{ marginRight: "20px" }}
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
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
                    />
                  </div>
                </div>
                <div className="divinputs">
                  <div className="inputdiv">
                    <input
                      style={{ marginRight: "20px" }}
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                    />
                  </div>
                </div>
                <div className="divinputs">
                  <div className="inputdiv">
                    <input
                      type="text"
                      id="descrption"
                      name="description"
                      placeholder="Small description of the case ..."
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputdiv">
                    <input
                      type="text"
                      id="consultationType"
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="divinputs">
                  <div className="inputdiv">
                    <input
                      style={{ marginRight: "20px" }}
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputdiv">
                    <input
                      type="time"
                      id="time"
                      name="timeFrom"
                      value={formData.timeFrom}
                      onChange={handleChange}
                    />{" "}
                  </div>
                </div>
                <div className="inputdiv">
                  <select
                    id="city"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
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
                <button id="btn" type="button" onClick={Next}>
                  Next
                </button>
              </form>
            </div>
          </div>
          <div className="part2serve">
            <div className="spancontent">
              <span className="spanserve">2 | Payment Information </span>
              <MdOutlinePayment size={35} className="iconspan" />
            </div>
            <div className="content2" style={{ display: content2 }}>
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="inputdiv">
                  <select
                    name="paymentMethod"
                    id="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="">Choose Payment Method</option>
                    <option value="cash">Cash on Arrival</option>
                  </select>
                </div>
                <br />
                <button
                  disabled={formData.paymentMethod === ""}
                  id="btn"
                  type="submit"
                  className="btn-submit"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
