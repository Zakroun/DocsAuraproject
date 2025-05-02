import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendConfirmationCode } from "../data/authslice"; // Import the action
import { RiCloseLargeLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setValid(true);
      setError("Please fill in your email");
    } else if (!emailRegex.test(email)) {
      setValid(true);
      setError("Please enter a valid email address");
    } else {
      setValid(false);
      setError("");
      dispatch(sendConfirmationCode(email)) // Dispatching the action
        .then(() => {
          navigate("/pages/codeconfirmforget"); // Navigate to the code confirmation page
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div className="ForgetPass">
      <form action="" method="post">
        <button className="X_button">
          <RiCloseLargeLine size={25} />
        </button>
        <h2>Please enter your Email to send confirmation code</h2>
        {valid && (
          <div className="error">
            <div className="error__title">{error}</div>
          </div>
        )}
        <div className="inputdiv">
          <MdEmail size={25} className="icondivinput" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={submit}>Send</button>
      </form>
    </div>
  );
}
