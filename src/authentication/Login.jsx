import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="login">
      {/* <img src="/images/Asset 13.png" alt="img" id="loginimg"/> */}
      <h3 id="h3">
        Welkom back, please login <br /> to your account.
      </h3>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Email"
      />
      <br />
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
      <label class="cl-checkbox">
        <input type="checkbox" />
        <span>remember me</span>
      </label>
      <button id="btn">Login</button>
      <br />
      <Link to="/pages/register">
        <button id="btn2">Register</button>
      </Link>
      <br />
      <Link to="/pages/forgetpass" id="link">
        Forget your password
      </Link>
    </div>
  );
}
