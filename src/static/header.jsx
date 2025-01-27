import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export default function Header() {
  return (
    <div className="header">
      <div className="part1header">
        <div className="email">
          <a href="/" id="emaillink">
            DocsAura@outlook.com
          </a>
        </div>
        <div className="socailmedia">
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
      </div>
      <div className="part2header">
        <div className="logo">
          <img src="/Images/Asset 13.png" alt="Logo" id="hedearlogo" />
        </div>
        <div className="linksdiv">
          <Link to="/" className="links">
            HOME
          </Link>
          <Link to="/About" className="links">
            ABOUT
          </Link>
          <Link to="/Contact" className="links">
            CONTACT
          </Link>
          <Link to="/Doctors" className="links">
            DOCTORS
          </Link>
          <Link to="/Clinical" className="links">
            CLINICS
          </Link>
          <Link to="/Laboratories" className="links">
            LABORATORIES
          </Link>
        </div>
        <div>
          <button className="loginbtn">LOGIN</button>
          <button className="signupbtn">SIGN UP</button>
        </div>
      </div>
    </div>
  );
}
