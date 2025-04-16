import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changecurrentpage } from "../data/DocsauraSlice";
export default function Header() {
  const p = useSelector((s) => s.Docsaura.profile);
  const [profile, setprofile] = useState(p);
  useEffect(() => {
    setprofile(p);
  }, [p]);
  const currentpage = useSelector((s) => s.Docsaura.currentpage);
  const [pagestate, setpage] = useState(currentpage);
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
    setpage(currentpage);
    console.log(currentpage);
  }, [currentpage]);
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
  const dispatch = useDispatch();
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
          <h1>DocsAura</h1>
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
          {profile === false ? (
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
            to="/pages/Clinical"
            onClick={() => dispatch(changecurrentpage("Clinical"))}
            className={`links ${pagestate === "Clinical" ? "active" : ""}`}
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
        {profile === false ? (
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
