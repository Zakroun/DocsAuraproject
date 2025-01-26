import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="login">
      <h1 id="h1">Welcome back !</h1>
      <h3 id="h3">Please enter your details</h3>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <label className="cl-checkbox">
        <input type="checkbox" />
        <span className="spanme">Remember me for 30 days</span>
      </label>
      <Link to="/pages/forgetpass" id="link">
        Forget password?
      </Link>
      <button id="btn">Log In</button>
      <br />
      <button id="btn2"><img src="\Images\google.png" alt="img" id="google"/> Log In with Google</button>
      <br />
      <div className="signn">
        Don't have an account?{" "}
        <Link to="/pages/register" id="link2">
          Sign up
        </Link>
      </div>
    </div>
  );
}
