import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { useRef, useEffect } from "react";
export default function Header() {
  const menuRef = useRef(null);

  const toggleMenu = () => {
    if (menuRef.current) {
      if (menuRef.current.style.display === "block") {
        menuRef.current.style.display = "none";
      } else {
        menuRef.current.style.display = "block";
      }
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (menuRef.current) {
        menuRef.current.style.display = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
          <Link to="/">
            <img src="/Images/Asset 13.png" alt="Logo" id="hedearlogo" />
          </Link>
        </div>
        <div className="btnmenu">
          <button id="buttonmenu" onClick={toggleMenu}>
            ☰ Menu
          </button>
        </div>
        <div className="menu" id="menu" ref={menuRef}>
          <Link to="/">
            <h1>DocsAura</h1>
          </Link>
          <div className="linksmenu">
            <Link to="/" className="linksm">
              HOME
            </Link>
            <Link to="/pages/About" className="linksm">
              ABOUT
            </Link>
            <Link to="/pages/Doctors" className="linksm">
              DOCTORS
            </Link>
            <Link to="/pages/Clinical" className="linksm">
              CLINICS
            </Link>
            <Link to="/pages/Laboratories" className="linksm">
              LABORATORIES
            </Link>
            <Link to="/pages/Contact" className="linksm">
              CONTACT
            </Link>
          </div>
          <div className="btnmenu">
            <Link to={"/pages/Login"}>
              <button className="loginbtn2">LOGIN</button>
            </Link>
            <Link to={"/pages/register"}>
              <button className="signupbtn">SIGN UP</button>
            </Link>
          </div>
        </div>
        <div className="linksdiv">
          <Link to="/" className="links">
            HOME
          </Link>
          <Link to="/pages/About" className="links">
            ABOUT
          </Link>
          <Link to="/pages/Doctors" className="links">
            DOCTORS
          </Link>
          <Link to="/pages/Clinical" className="links">
            CLINICS
          </Link>
          <Link to="/pages/Laboratories" className="links">
            LABORATORIES
          </Link>
          <Link to="/pages/Contact" className="links">
            CONTACT
          </Link>
        </div>
        <div className="btnuser">
          <Link to={"/pages/Login"}>
            <button className="loginbtn">LOGIN</button>
          </Link>
          <Link to={"/pages/register"}>
            <button className="signupbtn">SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
