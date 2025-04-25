import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PiVideoConferenceFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { changecurrentpage } from "../data/DocsauraSlice";
import { AddAppointemnt } from "../data/DocsauraSlice";
export default function LaboratoryReserve(props) {
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const Llabo = useSelector((s) => s.Docsaura.laboratories);
  const labo = Llabo.find((a) => a.id === props.id);
  const [content1, setcontent1] = useState("block");
  const [content2, setcontent2] = useState("none");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    cin: "",
    timeFrom: "",
    status: "pending",
    image: "user.png",
    timeTo: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    imageP: null,
    imagePreview: null,
  });
  const navigate = useNavigate();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageP: file,
          imagePreview: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("paymentMethod : ", formData.paymentMethod);

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
          }, 10000);
          return;
        }
      }
      const appointment = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cin: formData.cin,
        location: formData.location,
        status: formData.status,
        image: formData.image,
        date: formData.date,
        timeFrom: formData.timeFrom,
        timeTo: formData.timeTo,
        consultationType: formData.consultationType,
        description: formData.description,
        paymentMethod: formData.paymentMethod,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        imageP: formData.imageP,
        imagePreview: formData.imagePreview,
      };
      dispatch(
        AddAppointemnt({
          role: props.role,
          id: props.id,
          appointment: appointment,
        })
      );

      setSuccessMessage("Appointment successfully booked");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
        dispatch(changecurrentpage("home"));
      }, 3000);
    }
  };

  const Next = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.cin ||
      !formData.date ||
      !formData.timeFrom
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
        <div className="custom-notification-top">
          <div className="custom-notification success">{successMessage}</div>
        </div>
      )}

      {errorMessage && (
        <div className="custom-notification-top">
          <div className="custom-notification error">{errorMessage}</div>
        </div>
      )}
      <h1>Book a consultation with , {labo.fullName}</h1>
      <div className="part1serve">
        <div className="spancontent">
          <span className="spanserve">1 | Personal Information</span>
          <PiVideoConferenceFill size={35} className="iconspan" />
        </div>
        <div
          className="content1"
          style={{ display: content1, marginTop: "20px", marginLeft: "20px" }}
        >
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
                />
              </div>
            </div>
            <div className="inputdiv">
              <select
                id="cities"
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
            <div
              className="image-upload-container"
              style={{ marginTop: "20px" }}
            >
              <input
                type="file"
                id="image"
                name="imageP"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => document.getElementById("image").click()}
                className="upload-btn"
              >
                Choose Image
              </button>
              {formData.imagePreview && (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" width="100" />
                </div>
              )}
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
        <div
          className="content2"
          style={{ display: content2, marginTop: "20px" }}
        >
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
            </div>{" "}
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
                <br />
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
