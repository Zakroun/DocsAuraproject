import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PiVideoConferenceFill } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";

export default function LaboratoryReserve(props) {
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
    time: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content2 === "block") {
      if (formData.paymentMethod === "credit-card") {
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
          alert("Please fill in all the credit card details!");
          return;
        }
      }
    }

    const submitData = new FormData();
    submitData.append("fullName", formData.fullName);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("date", formData.date);
    submitData.append("time", formData.time);
    submitData.append("paymentMethod", formData.paymentMethod);
    submitData.append("cardNumber", formData.cardNumber);
    submitData.append("expiryDate", formData.expiryDate);
    submitData.append("cvv", formData.cvv);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    console.log("Appointment Booked:", submitData);
    alert("Appointment successfully booked!");
  };

  const Next = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill in all personal information fields before proceeding.");
      return;
    }

    setcontent1("none");
    setcontent2("block");
  };

  return (
    <div className="divreserve">
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
              value={formData.phone}
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

            <div className="image-upload-container" style={{ marginTop: '20px' }}>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                required
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('image').click()}
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
