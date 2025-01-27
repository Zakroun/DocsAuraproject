import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="header">
      <div className="part1header">
        <div className="email">
          <a href="/" id="emaillink">
            DocsAura@gmail.com
          </a>
        </div>
        <div className="socailmedia">
          <a href="/">
            <img
              src="\icons\facebook (3).png"
              alt="socailmedia"
              id="socailmedia"
            />
          </a>
          <a href="/">
            <img
              src="\icons\instagram (1).png"
              alt="socailmedia"
              id="socailmedia"
            />
          </a>
          <a href="/">
            <img
              src="\icons\tiktok (1).png"
              alt="socailmedia"
              id="socailmedia"
            />
          </a>
          <a href="/">
            <img
              src="\icons\twitter.png"
              alt="socailmedia"
              id="socailmedia"
            />
          </a>
        </div>
      </div>
      <div className="part2header">
        <div className="logo">
          <img src="/Images/Asset 13.png" alt="Logo" id="hedearlogo" />
        </div>
        <div className="linksdiv">
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/About" className="links">
            About
          </Link>
          <Link to="/Contact" className="links">
            Contact
          </Link>
          <Link to="/Doctors" className="links">
            Doctors
          </Link>
          <Link to="/Clinical" className="links">
            Clinical
          </Link>
          <Link to="/Laboratories" className="links">
            Laboratories
          </Link>
        </div>
        <div>
          <button className="loginbtn">Login</button>
          <button className="signupbtn">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
