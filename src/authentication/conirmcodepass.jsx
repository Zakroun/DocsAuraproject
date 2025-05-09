import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmCodepass, resendConfirmationCode } from "../data/authslice";
import { RiCloseLargeLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Conirmcodepass() {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state
  const email = location.state?.email || "";
  const { loading } = useSelector((state) => state.auth);

  // Countdown timer for resend button
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const submit = (e) => {
    e.preventDefault();
    if (code === "") {
      setValid(true);
      setError("Please fill in the code");
    } else if (code.length !== 6) {
      setValid(true);
      setError("Code must be 6 characters");
    } else {
      setValid(false);
      setError("");
      dispatch(confirmCodepass({ email, code }))
        .unwrap()
        .then(() => {
          navigate("/pages/newpass", { state: { email, code } });
        })
        .catch((err) => {
          setError(err.message || "Invalid reset code");
        });
    }
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    
    dispatch(resendConfirmationCode(email))
      .unwrap()
      .then(() => {
        setCountdown(60);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Failed to resend code");
      });
  };

  return (
    <div className="CodeConfirm">
      <button 
        className="X_button" 
        type="button"
        onClick={() => navigate("/")}
      >
        <RiCloseLargeLine size={25} />
      </button>
      
      <h2 id="h2code">Please enter confirmation code to update password</h2>
      <p className="email-notice">Sent to: {email}</p>
      
      <form onSubmit={submit} method="post">
        {(valid || error) && (
          <div className="error">
            <div className="error__title">{error}</div>
          </div>
        )}
        
        <div className="inputdiv">
          <GiConfirmed size={25} className="icondivinput" />
          <input
            type="text"
            name="code"
            id="code"
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            required
            disabled={loading}
          />
        </div>
        
        <button 
          id="btn" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>
        
        <div className="resend-section">
          {countdown > 0 ? (
            <p className="resend-timer">Resend code in {countdown}s</p>
          ) : (
            <button 
              type="button" 
              className="resend-btn"
              onClick={handleResendCode}
              disabled={loading}
            >
              Resend Code
            </button>
          )}
        </div>
      </form>
    </div>
  );
}