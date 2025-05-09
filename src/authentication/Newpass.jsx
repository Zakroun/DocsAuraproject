import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../data/authslice";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

export default function NewPass() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { email, code } = location.state || {};

  const submit = (e) => {
    e.preventDefault();
    const passwordRegex = /^[A-Z][a-z]{4,}[@#$!%*?&][0-9]{1,}$/;

    if (newPass === "" || confirmPass === "") {
      setValid(true);
      setError("Please fill all the fields");
    } else if (!passwordRegex.test(newPass)) {
      setValid(true);
      setError(
        "Password must start with a capital letter, have 4+ lowercase letters, include a special character (e.g., @), and a number"
      );
    } else if (newPass !== confirmPass) {
      setValid(true);
      setError("Passwords do not match");
    } else {
      setValid(false);
      setError("");
      dispatch(updatePassword({ email, code, password: newPass })) // Only send password
        .unwrap()
        .then(() => {
          navigate("/pages/Login");
        })
        .catch((err) => {
          setError(err.message || "Password reset failed");
          console.error("Error details:", err);
        });
    }
  };

  return (
    <div className="NewPass">
      <button className="X_button" type="button">
        <RiCloseLargeLine size={25} />
      </button>
      <h2 id="h2code">Please enter the new Password</h2>
      <form onSubmit={submit}>
        {valid && (
          <div className="error">
            <div className="error__title">{error}</div>
          </div>
        )}
        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            id="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>
        <button id="btn" type="submit">Confirm</button>
      </form>
    </div>
  );
}