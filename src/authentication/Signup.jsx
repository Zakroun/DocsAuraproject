import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { changecurrentpage } from "../data/DocsauraSlice";
import { useDispatch } from "react-redux";
import { RiUser3Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { PiGenderIntersexFill } from "react-icons/pi";
import { MdOutlineLocationCity } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { registerUser } from "../data/authslice";  // Assuming you have this action for registration

export default function Register() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [gender, setgender] = useState("");
  const [cities, setcities] = useState("");
  const [birthyear, setbirthyear] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [valid, setvalid] = useState(false);
  const [error, seterror] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Z][a-z]{4,}[@#$!%*?&][0-9]{1,}$/;

    if (
      fullname === "" ||
      email === "" ||
      role === "" ||
      gender === "" ||
      cities === "" ||
      birthyear === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      setvalid(true);
      seterror("Please fill all the fields");
    } else if (!emailRegex.test(email)) {
      setvalid(true);
      seterror("Please enter a valid email address");
    } else if (!passwordRegex.test(password)) {
      setvalid(true);
      seterror(
        "Password must start with a capital letter, have 4+ lowercase letters, include a special character (e.g., @), a number, and be 8+ characters long"
      );
    } else if (password !== confirmpassword) {
      setvalid(true);
      seterror("Passwords do not match");
    } else {
      setvalid(false);
      seterror("");
      // Dispatch the register action
      dispatch(registerUser({ fullname, email, role, gender, cities, birthyear, password }));

      // Redirect to confirmation page after registration success
      navigate("/pages/codeconfirm");
    }
  };

  const Movetohome = () => {
    navigate("/");
    dispatch(changecurrentpage("home"));
  };

  return (
    <div className="Register">
      <button onClick={Movetohome} className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h1 id="h1">Create Account</h1>
      <form action="" method="post">
        {valid && (
          <div className="error">
            <div className="error__icon">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                  fill="#393a37"
                ></path>
              </svg>
            </div>
            <div className="error__title">{error}</div>
          </div>
        )}
        <div className="inputdiv">
          <RiUser3Fill size={25} className="icondivinput" />
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={fullname}
            placeholder="Full Name"
            onChange={(e) => setfullname(e.target.value)}
          />
        </div>
        <div className="inputdiv">
          <MdEmail size={25} className="icondivinput" />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="inputdiv">
          <FaUserPlus size={25} className="icondivinput" />
          <select
            name="Role"
            value={role}
            id="Role"
            onChange={(e) => setrole(e.target.value)}
          >
            <option value="">Choose your Role</option>
            <option value="Patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="laboratory">Laboratory</option>
          </select>
        </div>
        <div className="inputdiv">
          <PiGenderIntersexFill size={25} className="icondivinput" />
          <select
            name="gender"
            value={gender}
            id="gender"
            onChange={(e) => setgender(e.target.value)}
          >
            <option value="">Choose your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="inputdiv">
          <MdOutlineLocationCity size={25} className="icondivinput" />
          <select
            id="cities"
            name="cities"
            value={cities}
            onChange={(e) => setcities(e.target.value)}
          >
            <option value="">Choose a city in Morocco</option>
            <option value="casablanca">Casablanca</option>
            <option value="rabat">Rabat</option>
            <option value="marrakech">Marrakech</option>
            <option value="fes">Fès</option>
            <option value="meknes">Meknès</option>
            <option value="tangier">Tangier</option>
            <option value="agadir">Agadir</option>
            <option value="oujda">Oujda</option>
            <option value="tetouan">Tétouan</option>
            <option value="safi">Safi</option>
            <option value="el-jadida">El Jadida</option>
            <option value="nador">Nador</option>
            <option value="kenitra">Kénitra</option>
            <option value="temara">Témara</option>
            <option value="settat">Settat</option>
            <option value="berrechid">Berrechid</option>
            <option value="khemisset">Khémisset</option>
            <option value="beni-mellal">Beni Mellal</option>
            <option value="taroudant">Taroudant</option>
            <option value="errachidia">Errachidia</option>
            <option value="laayoune">Laâyoune</option>
            <option value="dakhla">Dakhla</option>
            <option value="ouarzazate">Ouarzazate</option>
            <option value="taza">Taza</option>
            <option value="guelmim">Guelmim</option>
            <option value="sidi-kacem">Sidi Kacem</option>
            <option value="sidi-slimane">Sidi Slimane</option>
            <option value="oualidia">Oualidia</option>
            <option value="zoumi">Zoumi</option>
            <option value="youssoufia">Youssoufia</option>
            <option value="chefchaouen">Chefchaouen</option>
            <option value="asfi">Asfi</option>
            <option value="al-hoceima">Al Hoceima</option>
            <option value="midelt">Midelt</option>
            <option value="azilal">Azilal</option>
            <option value="taourirt">Taourirt</option>
            <option value="ifran">Ifrane</option>
            <option value="tiznit">Tiznit</option>
            <option value="essaouira">Essaouira</option>
            <option value="tan-tan">Tan-Tan</option>
            <option value="chichaoua">Chichaoua</option>
            <option value="smara">Smara</option>
          </select>
        </div>
        <div className="inputdiv">
          <BsCalendarDateFill size={25} className="icondivinput" />
          <input
            type="date"
            name="birthyear"
            id="birthyear"
            placeholder="Your Birth Year"
            value={birthyear}
            onChange={(e) => setbirthyear(e.target.value)}
          />
        </div>
        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </div>
        <button id="btnRegister" onClick={Submit}>
          Register
        </button>
        <div className="login-redirect">
          <p>
            Already have an account?{" "}
            <Link to="/pages/Login" className="login-link">
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
