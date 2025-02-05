import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
export default function ClinicReserve(props){
    const dispatch = useDispatch()
    const Lclinic = useSelector(s=>s.Docsaura.clinics)
    const clinic = Lclinic.find(a=>a.id === props.id)
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
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        
        console.log("Appointment Booked:", formData);
        alert("Appointment successfully booked!");
      };
    
      const Next = () => {
        if (!formData.fullName || !formData.email || !formData.phone || !formData.date || !formData.time) {
          alert("Please fill in all personal information fields before proceeding.");
          return;
        }
    
        setcontent1("none");
        setcontent2("block");
      };
      return (
        <div className="divreserve">
          <h1>Book a consultation with , {clinic.name}</h1>
          <div className="part1serve">
            <span className="spanserve">1 | Personal Information</span>
            <div className="content1" style={{ display: content1,marginTop:'20px',marginLeft:'20px' }}>
              <form onSubmit={handleSubmit} className="booking-form">
                <input
                style={{marginRight:'20px'}}
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
                style={{marginRight:'20px'}}
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
                style={{marginRight:'20px'}}
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
                /> <br />
                <button id="btn" type="button" onClick={Next}>
                  Next
                </button>
              </form>
            </div>
          </div>
          <div className="part2serve">
            <span className="spanserve">2 | Payment Information</span>
            <div className="content2" style={{ display: content2,marginTop:'20px' }}>
              <form onSubmit={handleSubmit} className="booking-form">
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  style={{marginBottom:'30px'}}
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">Choose Payment Method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="cash">Cash on Arrival</option>
                </select> <br />
    
                {formData.paymentMethod === "credit-card" && (
                  <>
                    <input
                    style={{marginRight:'10px'}}
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                    <input
                    style={{marginRight:'10px'}}
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="Expiry Date (MM/YY)"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                    <input
                    style={{marginRight:'10px'}}
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
                <button disabled={formData.paymentMethod === ""}  id="btn" type="submit" className="btn-submit">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
    