import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { changecurrentpage, changeprofile } from "../data/DocsauraSlice";
import { loginUser } from "../data/authslice";
import { changeboard } from "../data/DocsauraSlice";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");

    if (!email || !password) {
      seterror("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      dispatch(changeprofile(true));
      dispatch(changeboard("home"));
      navigate("/");
    } catch (err) {
      seterror("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const moveToHome = () => {
    navigate("/");
    dispatch(changecurrentpage("home"));
  };

  return (
    <div className="login">
      <button onClick={moveToHome} className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h1 id="h1">Welcome back!</h1>
      <h3 id="h3">Please enter your details</h3>
      <form onSubmit={handleSubmit} method="post">
        {error && (
          <div className="error">
            <div className="error__icon">
              <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="#393a37"
                  d="M13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.31 0-2.61.26-3.83.76a9.02 9.02 0 0 0-3.24 2.17A9.97 9.97 0 0 0 2 12a9.97 9.97 0 0 0 2.93 7.07c.93.93 2.03 1.67 3.24 2.17A9.9 9.9 0 0 0 12 22a9.97 9.97 0 0 0 7.07-2.93A9.97 9.97 0 0 0 22 12c0-1.31-.26-2.61-.76-3.83a9.02 9.02 0 0 0-2.17-3.24A9.97 9.97 0 0 0 12 2z"
                />
              </svg>
            </div>
            <div className="error__title">{error}</div>
          </div>
        )}

        <div className="inputdiv">
          <MdEmail size={30} className="icondivinput" />
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            required
          />
        </div>
        <br />
        <div className="inputdiv">
          <RiLockPasswordFill size={30} className="icondivinput" />
          <input
            type="password"
            value={password}
            id="password"
            autoComplete="current-password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            required
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
        <button id="btn" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        <br />
        <button id="btn2" type="button">
          <img src="\Images\google.png" alt="img" id="google" /> Log In with Google
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