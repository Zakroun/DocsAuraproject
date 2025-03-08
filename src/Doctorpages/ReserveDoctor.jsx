import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PiVideoConferenceFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function DoctorReserve(props) {
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const Ldoctor = useSelector((s) => s.Docsaura.doctors);
  const doctor = Ldoctor.find((a) => a.id === props.id);
  const [content1, setcontent1] = useState("block");
  const [content2, setcontent2] = useState("none");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cin: "",
    date: "",
    time: "",
    description: "",
    consultationType: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content2 === "block") {
      if (formData.paymentMethod === "credit-card") {
        if (formData.cardNumber || formData.expiryDate || formData.cvv) {
          seterrorMessage("Please fill in all the credit card details");
          setTimeout(() => {
            seterrorMessage("");
          }, 3000);
          return;
        }
      }
    }
    setSuccessMessage("Appointment successfully booked");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const Next = () => {
    console.log(formData)
    if (
      formData.fullName === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.cin === "" ||
      formData.date === "" ||
      formData.time === "" ||
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
      {successMessage && (
        <div className="notification-top">
          <div className="notification success">
            Appointment added successfully
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="notification-top">
          <div className="notification error">{errorMessage}</div>
        </div>
      )}
      <h1>Book a consultation with , {doctor.fullName}</h1>
      <div className="part1serve">
        <div className="spancontent">
          <span className="spanserve">1 | Personal Information</span>
          <PiVideoConferenceFill size={35} className="iconspan" />
        </div>
        <div className="content1" style={{ display: content1 }}>
          <form onSubmit={handleSubmit} className="booking-form">
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
              type="text"
              id="descrption"
              name="description"
              placeholder="Small description of the case ..."
              value={formData.description}
              onChange={handleChange}
            />
            <select name="consultationType" id="consultationType" value={formData.consultationType} onChange={handleChange}>
              <option value=""> Select consultation type</option>
              {doctor.consultationTypes.map((c, i) => {
                return (
                  <option key={i} value={c.type}>
                    {c.type} - {c.price}
                  </option>
                );
              })}
            </select>
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
            />{" "}
            <br />
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
            <select
              name="paymentMethod"
              id="paymentMethod"
              style={{ marginBottom: "30px" }}
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="">Choose Payment Method</option>
              <option value="credit-card">Credit Card</option>
              <option value="cash">Cash on Arrival</option>
            </select>{" "}
            <br />
            {formData.paymentMethod === "credit-card" && (
              <>
                <input
                  style={{ marginRight: "10px" }}
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  style={{ marginRight: "10px" }}
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
                <input
                  style={{ marginRight: "10px" }}
                  type="text"
                  name="cvv"
                  id="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
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
