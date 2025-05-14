import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changecurrentpage } from "../data/DocsauraSlice";

export default function Header() {
  const [hasToken, setHasToken] = useState(false);
  const currentpage = useSelector((s) => s.Docsaura.currentpage);
  const [pagestate, setpage] = useState(currentpage);
  const menuRef = useRef(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in localStorage when component mounts
    const token = localStorage.getItem('token');
    setHasToken(!!token);
    
    // Set up listener for storage changes
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setHasToken(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setpage(currentpage);
    //console.log(currentpage);
  }, [currentpage]);

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
            docsaura1@gmail.com
          </a>
        </div>
        <div className="socailmedia">
          <a href="/" className="social-icon" id="Facebook" aria-label="Facebook">
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
          <img src="\Images\Asset 10.png" alt="logo" className="logo-menu"/>
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
            <Link to="/pages/clinics" className="linksm">
              CLINICS
            </Link>
            <Link to="/pages/Laboratories" className="linksm">
              LABORATORIES
            </Link>
            <Link to="/pages/Contact" className="linksm">
              CONTACT
            </Link>
          </div>
          {!hasToken ? (
            <div className="btnmenu">
              <Link to={"/pages/Login"}>
                <button className="loginbtn2">LOGIN</button>
              </Link>
              <Link to={"/pages/register"}>
                <button className="signupbtn">SIGN UP</button>
              </Link>
            </div>
          ) : (
            <div className="Profilemenu">
              <Link to={"/pages/Dashboard"}>
                <button className="btnProfile2">
                  <FaRegUserCircle />
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="linksdiv">
          <Link
            to="/"
            onClick={() => dispatch(changecurrentpage("home"))}
            className={`links ${pagestate === "home" ? "active" : ""}`}
          >
            HOME
          </Link>
          <Link
            to="/pages/About"
            onClick={() => dispatch(changecurrentpage("About"))}
            className={`links ${pagestate === "About" ? "active" : ""}`}
          >
            ABOUT
          </Link>
          <Link
            to="/pages/Doctors"
            onClick={() => dispatch(changecurrentpage("Doctors"))}
            className={`links ${pagestate === "Doctors" ? "active" : ""}`}
          >
            DOCTORS
          </Link>
          <Link
            to="/pages/clinics"
            onClick={() => dispatch(changecurrentpage("clinics"))}
            className={`links ${pagestate === "clinics" ? "active" : ""}`}
          >
            CLINICS
          </Link>
          <Link
            to="/pages/Laboratories"
            onClick={() => dispatch(changecurrentpage("Laboratories"))}
            className={`links ${pagestate === "Laboratories" ? "active" : ""}`}
          >
            LABORATORIES
          </Link>
          <Link to="/pages/Contact" className="links">
            CONTACT
          </Link>
        </div>
        {!hasToken ? (
          <div className="btnuser">
            <Link to={"/pages/Login"}>
              <button className="loginbtn">LOGIN</button>
            </Link>
            <Link to={"/pages/register"}>
              <button className="signupbtn">SIGN UP</button>
            </Link>
          </div>
        ) : (
          <div className="Profile">
            <Link to={"/pages/Dashboard"}>
              <button className="btnProfile">
                <FaRegUserCircle />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}