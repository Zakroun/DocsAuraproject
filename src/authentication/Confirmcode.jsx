import { useState, useEffect } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  verifyRegistrationCode, 
  setAuthToken, 
  clearError,
  resendConfirmationCode 
} from "../data/authslice";
import { GiConfirmed } from "react-icons/gi";
import { changeprofile } from "../data/DocsauraSlice";

export default function CodeConfirm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get email from location state
  const email = location.state?.email || '';
  const { loading, token } = useSelector((state) => state.auth);

  // Countdown timer for resend button
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 500);
    
    if (countdown === 0) {
      setCanResend(true);
    }
    
    return () => clearInterval(timer);
  }, [countdown]);

  // Clear errors on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    if (code.length !== 6) {
      setError("Code must be 6 characters");
      return;
    }
  
    try {
      const result = await dispatch(verifyRegistrationCode({ email, code }));
      if (verifyRegistrationCode.fulfilled.match(result)) {
        navigate("/");
        dispatch(changeprofile(true));
      } else if (verifyRegistrationCode.rejected.match(result)) {
        setError(result.payload.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Verification error:", err);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    try {
      await dispatch(resendConfirmationCode(email)).unwrap();
      setCountdown(60);
      setCanResend(false);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message || "Failed to resend code");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="CodeConfirm">
      <button onClick={handleClose} className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h2 id="h2code">Please enter confirmation code</h2>
      <p className="email-notice">Code sent to: {email}</p>
      
      <form onSubmit={handleSubmit} method="post">
        {error && (
          <div className="error">
            <div className="error__icon">
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
            <div className="error__title">{error}</div>
          </div>
        )}
        
        <div className="inputdiv">
          <GiConfirmed size={25} className="icondivinput" />
          <input
            type="text"
            name="codeconfirmaccount"
            placeholder="Confirmation code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            autoComplete="one-time-code"
          />
        </div>
        
        <button 
          type="submit" 
          id="btn" 
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>

        <div className="resend-code-container">
          {canResend ? (
            <button 
              type="button" 
              className="resend-btn"
              onClick={handleResendCode}
              disabled={loading}
            >
              Resend Code
            </button>
          ) : (
            <p className="resend-timer">
              Resend code in {countdown} seconds
            </p>
          )}
        </div>
      </form>
    </div>
  );
}