import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PiVideoConferenceFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { changecurrentpage } from "../data/DocsauraSlice";
// import { useEffect } from "react";
export default function DoctorReserve(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const Ldoctor = useSelector((s) => s.Docsaura.doctors);
  const doctor = Ldoctor.find((a) => a.id === props.id);
  const role = props.role;
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
    consultationType: "",
    description: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // useEffect(() => {
  //   if (formData.paymentMethod === "") {
  //     seterrorMessage("Please fill payment Method");
  //     setTimeout(() => {
  //       seterrorMessage("");
  //     }, 3000);
  //     return;
  //   }
  // }, [formData.paymentMethod]);

  const handleSubmit = (e) => {
    console.log("paymentMethod : ", formData.paymentMethod);
    e.preventDefault();
    if (content2 === "block") {
      if (formData.paymentMethod === "credit-card") {
        if (
          formData.cardNumber === "" ||
          formData.expiryDate === "" ||
          formData.cvv === ""
        ) {
          seterrorMessage("Please fill in all the credit card details");
          setTimeout(() => {
            seterrorMessage("");
          }, 3000);
          return;
        }
      } else {
        setSuccessMessage("Appointment successfully booked");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
          dispatch(changecurrentpage("home"));
        }, 3000);
      }
    }
  };

  const Next = () => {
    console.log(formData);
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
      <h1>Book a consultation with , {doctor.fullName}</h1>
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
                  id="fullname"
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
                  {doctor.consultationTypes.map((c, i) => {
                    return (
                      <option key={i} value={c.type}>
                        {c.type} - {c.price}
                      </option>
                    );
                  })}
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
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.timeFrom}
                  onChange={handleChange}
                />{" "}
              </div>
            </div>
              <div className="inputdiv">
                <select
                  id="cities"
                  name="cities"
                  value={formData.location}
                  onChange={(e) => handleChange(e.target.value)}
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
