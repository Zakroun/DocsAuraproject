import { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmCodepass } from "../data/authslice"; // Import the action
import { RiCloseLargeLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function CodeConfirm() {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (code === "") {
      setValid(true);
      setError("Please fill in the code");
    } else {
      setValid(false);
      setError("");
      dispatch(confirmCodepass({ code, email: "userEmail@example.com" })) // Example email, replace with actual email
        .then(() => {
          navigate("/pages/newpass"); // Navigate to password reset page
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div className="CodeConfirm">
      <button className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h2>Please enter confirmation code</h2>
      <form>
        {valid && (
          <div className="error">
            <div className="error__title">{error}</div>
          </div>
        )}
        <div className="inputdiv">
          <GiConfirmed size={25} className="icondivinput" />
          <input
            type="text"
            name="code"
            placeholder="Confirmation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button onClick={submit}>Confirm</button>
      </form>
    </div>
  );
}
