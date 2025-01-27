import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="divfooter">
        <div className="part1footer">
          <h1>DocsAura</h1>
          <p className="pfooter">
            <span id="spanfooter">Phone : </span> +212 1234567890 <br />
            <span id="spanfooter">Email : </span> DocsAura@gmail.com <br />
            <div className="socailmedia2">
              <a href="/">
                <img
                  src="\icons\facebook (4).png"
                  alt="socailmedia"
                  id="socailmedia"
                />
              </a>
              <a href="/">
                <img
                  src="\icons\instagram (2).png"
                  alt="socailmedia"
                  id="socailmedia"
                />
              </a>
              <a href="/">
                <img
                  src="\icons\tiktok (2).png"
                  alt="socailmedia"
                  id="socailmedia"
                />
              </a>
              <a href="/">
                <img
                  src="\icons\twitter (1).png"
                  alt="socailmedia"
                  id="socailmedia"
                />
              </a>
            </div>
          </p>
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
              <Link to="/About" className="links2">
                About
              </Link>
              <Link to="/Contact" className="links2">
                Contact
              </Link>
              <Link to="/Terms" className="links2">
                Terms & Conditions
              </Link>
              <Link to="/Privacy" className="links2">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="p2">
            <span id="spanfooter">Our Services</span>
            <br />
            <br />
            <div className="linksdiv2">
              <Link to="/Doctors" className="links2">
                Doctors
              </Link>
              <Link to="/Clinical" className="links2">
                Clinical
              </Link>
              <Link to="/Laboratories" className="links2">
                Laboratories
              </Link>
            </div>
          </div>
        </div>
        <div className="part3footer">
            <span id="spanfooter">Newsletter</span>
            <br />
            <br />
            <input type="email" name="email" id="Emailfootre" placeholder="Email"/><button id="btnconfirm">Confirm</button>
          </div>
      </div>
      <hr />
      <p className="pfooter2">
        © Copyright <span id="spanfooter">DocsAura</span> All Rights Reserved
      </p>
    </footer>
  );
}
