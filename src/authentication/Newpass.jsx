import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../data/authslice";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function NewPass() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const passwordRegex = /^[A-Z][a-z]{4,}[@#$!%*?&][0-9]{1,}$/;

    if (newPass === "" || confirmPass === "") {
      setValid(true);
      setError("Please fill all the fields");
    } else if (!passwordRegex.test(newPass)) {
      setValid(true);
      setError(
        "Password must start with a capital letter, have 4+ lowercase letters, include a special character (e.g., @), a number, and be 8+ characters long"
      );
    } else if (newPass !== confirmPass) {
      setValid(true);
      setError("Passwords do not match");
    } else {
      setValid(false);
      setError("");
      dispatch(updatePassword({ newPassword: newPass, email: "userEmail@example.com" })) // Example email, replace with actual email
        .then(() => {
          navigate("/pages/Login"); // Navigate to login page after password update
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div className="NewPass">
      <button className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h2>Please enter the new Password</h2>
      <form>
        {valid && (
          <div className="error">
            <div className="error__title">{error}</div>
          </div>
        )}
        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <br />
        <div className="inputdiv">
          <RiLockPasswordFill size={25} className="icondivinput" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <button onClick={submit}>Confirm</button>
      </form>
    </div>
  );
}
