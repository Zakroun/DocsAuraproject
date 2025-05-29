import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiUser3Fill, RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdOutlineLocationCity } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { PiGenderIntersexFill } from "react-icons/pi";
import { BsCalendarDateFill } from "react-icons/bs";
import { registerUser } from "../data/authslice";
import { useSelector } from "react-redux";
export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    gender: "",
    city: "",
    birthyear: "",
    password: "",
    confirmpassword: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Z][a-z]{4,}[@#$!%*?&][0-9]{1,}$/;

    if (Object.values(formData).some((value) => value === "")) {
      setValid(true);
      setError("Please fill all the fields");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setValid(true);
      setError("Please enter a valid email address");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setValid(true);
      setError(
        "Password must start with a capital letter, have 4+ lowercase letters, include a special character, and a number"
      );
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setValid(true);
      setError("Passwords do not match");
      return;
    }

    setValid(false);
    setError("");

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        //console.log("Registration successful, navigating to code confirmation");
        navigate("/pages/codeconfirm", {
          state: { email: formData.email },
        });
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setValid(true);
        setError(err.message || "Registration failed");
      });
  };

  const Movetohome = () => {
    navigate("/");
  };

  return (
    <div className="Register">
      <button onClick={Movetohome} className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h1 id="h1">Create Account</h1>
      <form onSubmit={handleSubmit} method="post">
        {valid && (
          <div className="error">
            <div className="error__icon">
              <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
                <path
                  d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.31 0-2.61.26-3.83.76-1.21.5-2.31 1.24-3.24 2.17-1.87 1.87-2.93 4.42-2.93 7.07s1.06 5.2 2.93 7.07c.93.93 2.03 1.67 3.24 2.17 1.21.5 2.51.76 3.83.76 2.65 0 5.2-1.05 7.07-2.93s2.93-4.42 2.93-7.07c0-1.31-.26-2.61-.76-3.83-.5-1.21-1.24-2.31-2.17-3.24-.93-.93-2.03-1.67-3.24-2.17-1.21-.5-2.51-.76-3.83-.76z"
                  fill="#393a37"
                />
              </svg>
            </div>
            <div className="error__title">{error}</div>
          </div>
        )}

        <div className="inputdiv">
          <RiUser3Fill size={25} className="icondivinput" />
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="inputdiv">
          <MdEmail size={25} className="icondivinput" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputdiv">
          <FaUserPlus size={25} className="icondivinput" />
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Choose your Role</option>
            <option value="Patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="clinic">Clinic</option>
            <option value="laboratory">Laboratory</option>
          </select>
        </div>

        <div className="inputdiv">
          <PiGenderIntersexFill size={25} className="icondivinput" />
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Choose your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="n/a">N\A</option>
          </select>
        </div>

        <div className="inputdiv">
          <MdOutlineLocationCity size={25} className="icondivinput" />
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
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
            id="birthyear"
            name="birthyear"
            value={formData.birthyear}
            onChange={handleChange}
          />
        </div>

        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            id="confirmPassword"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        <button
          id="btnRegister"
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Registering..." : "Register"}
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
