import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export default function Footer() {
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
          <input
            type="email"
            name="email"
            id="Emailfootre"
            placeholder="Email"
          />
          <button id="btnconfirm">Confirm</button>
        </div>
      </div>
      <hr />
      <p className="pfooter2">
        © Copyright <span id="spanfooter">DocsAura</span> All Rights Reserved
      </p>
    </footer>
  );
}
