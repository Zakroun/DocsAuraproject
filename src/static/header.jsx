import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export default function Header() {
  function toggleMenu() {
    var x = document.getElementById("menu");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  window.addEventListener("scroll", function () {
    var menu = document.getElementById("menu");
    menu.style.display = "none";
  });
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
        <div className="btnmenu">
          <button id="buttonmenu" onClick={toggleMenu}>
            ☰ Menu
          </button>
        </div>
        <div className="menu" id="menu">
          <h1>DocsAura</h1>
        <div className="linksmenu">
          <Link to="/" className="linksm">
            HOME
          </Link>
          <Link to="/About" className="linksm">
            ABOUT
          </Link>
          <Link to="/Contact" className="linksm">
            CONTACT
          </Link>
          <Link to="/Doctors" className="linksm">
            DOCTORS
          </Link>
          <Link to="/Clinical" className="linksm">
            CLINICS
          </Link>
          <Link to="/Laboratories" className="linksm">
            LABORATORIES
          </Link>
        </div>
        <div className="btnmenu">
          <button className="loginbtn2">LOGIN</button>
          <button className="signupbtn">SIGN UP</button>
        </div>
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
        <div className="btnuser">
          <button className="loginbtn">LOGIN</button>
          <button className="signupbtn">SIGN UP</button>
        </div>
      </div>
    </div>
  );
}
