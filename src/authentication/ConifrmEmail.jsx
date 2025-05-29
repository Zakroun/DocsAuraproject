import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendConfirmationCode } from "../data/authslice";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
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
      dispatch(sendConfirmationCode(email))
        .unwrap()
        .then(() => {
          navigate("/pages/codeconfirmforget", { state: { email } });
        })
        .catch((err) => {
          setError(err.message || "Failed to send reset code");
        });
    }
  };

  return (
    <div className="ForgetPass">
      <form onSubmit={submit} method="post">
        <button className="X_button" type="button">
          <RiCloseLargeLine size={25} />
        </button>
        <h2 id="h2code">Please enter your Email to send confirmation code</h2>
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
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button id="btn" type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
