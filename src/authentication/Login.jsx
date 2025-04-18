import { Link } from "react-router-dom";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { changecurrentpage } from "../data/DocsauraSlice";
import { useDispatch } from "react-redux";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { changeprofile } from "../data/DocsauraSlice";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [valid, setvalid] = useState(false);
  const [error, seterror] = useState("");
  const Submit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setvalid(true);
      seterror("Please fill all the fields");
    } else {
      setvalid(false);
      seterror("");
      dispatch(changeprofile(true));
      navigate("/");
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Movetohome = () => {
    navigate("/");
    dispatch(changecurrentpage("home"));
  };
  return (
    <div className="login">
      <button onClick={Movetohome} className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h1 id="h1">Welcome back !</h1>
      <h3 id="h3">Please enter your details</h3>
      <form action="" method="post">
        {valid && (
          <div class="error">
            <div class="error__icon">
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
            <div class="error__title">{error}</div>
            {/* <div class="error__close">
              <svg
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                  fill="#393a37"
                ></path>
              </svg>
            </div> */}
          </div>
        )}
        <div className="inputdiv">
          <MdEmail size={30} className="icondivinput"></MdEmail>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <br />
        <div className="inputdiv">
          <RiLockPasswordFill size={30} className="icondivinput"></RiLockPasswordFill>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
        />
        </div>
        <br />
        <label className="cl-checkbox">
          <input type="checkbox" />
          <span className="spanme">Remember me for 30 days</span>
        </label>
        <Link to="/pages/forgetpass" id="link">
          Forget password?
        </Link>
        <button id="btn" onClick={Submit}>
          Log In
        </button>
        <br />
        <button id="btn2">
          <img src="\Images\google.png" alt="img" id="google" /> Log In with
          Google
        </button>
        <br />
        <div className="signn">
          Don't have an account?{" "}
          <Link to="/pages/register" id="link2">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
