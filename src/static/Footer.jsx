import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ text: "Please enter your email", type: "error" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: "Please enter a valid email", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post("http://localhost:8000/api/newsletter", {
        email: email
      });

      if (response.data.success) {
        setMessage({ 
          text: "Please check your email to confirm subscription!", 
          type: "success" 
        });
        setEmail("");
      } else {
        setMessage({ 
          //text: response.data.message || "Subscription failed", 
          type: "error" 
        });
      }
    } catch (error) {
      setMessage({ 
        //text: error.response?.data?.message || "An error occurred", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="divfooter">
        <div className="part1footer">
          <h1>DocsAura</h1>
          <span className="pfooter">
            <span id="spanfooter">PHONE : </span> +212 1234567890 <br />
            <span id="spanfooter">EMAIL : </span> DocsAura@outlook.com <br />
            <div className="socailmedia2">
              <a href="/" className="social-icon" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="/" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="/" className="social-icon" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="/" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </span>
        </div>
        <div className="footerlinks">
          <div className="p1">
            <span id="spanfooter">Useful Links</span>
            <br />
            <br />
            <div className="linksdiv2">
              <Link to="/" className="links2">
                Home
              </Link>
              <Link to="/pages/About" className="links2">
                About
              </Link>
              <Link to="/pages/Contact" className="links2">
                Contact
              </Link>
              <Link to="/pages/Terms" className="links2">
                Terms & Conditions
              </Link>
              <Link to="/pages/Privacy" className="links2">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="p2">
            <span id="spanfooter">Our Services</span>
            <br />
            <br />
            <div className="linksdiv2">
              <Link to="/pages/Doctors" className="links2">
                Doctors
              </Link>
              <Link to="/pages/Clinical" className="links2">
                Clinics
              </Link>
              <Link to="/pages/Laboratories" className="links2">
                Laboratories
              </Link>
            </div>
          </div>
        </div>
        <div className="part3footer">
          <span id="spanfooter">News Letter</span>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="Emailfootre"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <button 
              id="btnconfirm" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </button>
          </form>
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
      <hr />
      <p className="pfooter2">
        © Copyright <span id="spanfooter">DocsAura</span> All Rights Reserved
      </p>
    </footer>
  );
}