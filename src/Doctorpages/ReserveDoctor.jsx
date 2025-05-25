import { useDispatch } from "react-redux";
import { useState } from "react";
import { PiVideoConferenceFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { changecurrentpage, addAppointment } from "../data/DocsauraSlice";

export default function DoctorReserve() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const doctor = location.state?.doctor;
  const [content1, setcontent1] = useState("block");
  const [content2, setcontent2] = useState("none");

  // Get working hours from doctor object with fallback
  const workingHours = doctor?.working_hours || { from: "08:00", to: "18:00" };

  // Generate 15-minute time slots within working hours
  const generateTimeSlots = () => {
    const slots = [];
    const [startHour, startMinute] = workingHours.from.split(':').map(Number);
    const [endHour, endMinute] = workingHours.to.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const time = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
      slots.push(time);
      
      // Increment by 15 minutes
      currentMinute += 15;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cin: "",
    location: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    consultationType: "",
    description: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleTimeChange = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + 15);
    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");
    const endTime = `${newHours}:${newMinutes}`;
    
    setFormData(prev => ({
      ...prev,
      timeFrom: time,
      timeTo: endTime
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content2 === "block") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
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
        const appointment = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          cin: formData.cin,
          location: formData.location,
          date: formData.date,
          timeFrom: formData.timeFrom,
          timeTo: formData.timeTo,
          consultationType: formData.consultationType || null,
          description: formData.description || null,
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
          status: "pending",
          id_visiteur: user.id,
          id_doctor: doctor.id,
          doctorAppointment: true,
          clinicAppointment: false,
          laboAppointment: false,
          id_clinic: null,
          id_labo: null,
          imageP: null
        };

        const resultAction = await dispatch(addAppointment(appointment));
        
        if (addAppointment.fulfilled.match(resultAction)) {
          setSuccessMessage("Appointment booked successfully!");
          setTimeout(() => {
            navigate("/");
            dispatch(changecurrentpage("home"));
          }, 3000);
        }
      } catch (error) {
        console.error("Appointment error:", error);
        seterrorMessage("Failed to book appointment. Please check all fields.");
        setTimeout(() => seterrorMessage(""), 5000);
      }
    }
  };

  const Next = () => {
    if (
      formData.fullName === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.cin === "" ||
      formData.date === "" ||
      formData.timeFrom === "" ||
      formData.description === "" ||
      formData.consultationType === ""
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

  return (
    <div className="divreserve">
      <div className="custom">
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
      </div>
      <h1>Book a consultation with Dr. {doctor?.fullName}</h1>
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
                <select
                  name="consultationType"
                  id="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                >
                  <option value=""> Select consultation type</option>
                  {doctor?.consultationTypes?.map((c, i) => (
                    <option key={i} value={c.type}>
                      {c.type} - {c.price}
                    </option>
                  ))}
                </select>
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
                <select
                id="timeFrom"
                  name="timeFrom"
                  value={formData.timeFrom}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
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
                <option value="credit-card">Credit Card</option>
                <option value="cash">Cash on Arrival</option>
              </select>
            </div>
            <br />
            {formData.paymentMethod === "credit-card" && (
              <>
                <div className="divinputs">
                  <div className="inputdiv">
                    <input
                      style={{ marginRight: "10px" }}
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputdiv">
                    <input
                      style={{ marginRight: "10px" }}
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="Expiry Date (MM/YY)"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="inputdiv">
                  <input
                    style={{ marginRight: "10px" }}
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
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
  );
}