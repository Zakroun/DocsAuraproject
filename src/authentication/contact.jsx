import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../data/axios";
import { MdEmail } from "react-icons/md";
import { RiCloseLargeLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { changecurrentpage } from "../data/DocsauraSlice";

export default function ContactForm() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/contact", formData);
      
      if (response.data.success) {
        // Immediately navigate to home after successful submission
        navigate('/');
        dispatch(changecurrentpage("home"));
      }
    } catch (err) {
      console.error('Submission error:', err.response);
      setError(
        err.response?.data?.message || 
        "Failed to submit your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const moveToHome = () => {
    navigate("/");
    dispatch(changecurrentpage("home"));
  };

  return (
    <div className="ContactForm">
      <button onClick={moveToHome} className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <h2 id="h2email">Contact us</h2>
        <div className="inputdiv">
          <MdEmail size={30} className="icondivinput" />
          <input
            placeholder="Your email address"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <br />
        <textarea
          placeholder="Your message..."
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button id="btn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}