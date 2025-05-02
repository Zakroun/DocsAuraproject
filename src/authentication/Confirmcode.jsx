import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmCode,setAuthToken } from "../data/authslice"; // Import the action from authSlice
import { GiConfirmed } from "react-icons/gi";

export default function CodeConfirm() {
  const [code, setCode] = useState(""); // State for the confirmation code
  const [valid, setValid] = useState(false); // State to handle validation
  const [error, setError] = useState(""); // State to show errors

  const dispatch = useDispatch(); // To dispatch actions to Redux
  const navigate = useNavigate(); // For navigation

  // Getting the loading state and error from Redux
  const { loading, error: reduxError } = useSelector((state) => state.auth);

  // Function to handle form submission and dispatch the API call
  const Submit = async (e) => {
    e.preventDefault();

    // Check if the code is empty
    if (code === "") {
      setValid(true);
      setError("Please fill in the confirmation code.");
    } else {
      setValid(false);
      setError("");

      // Dispatch the confirmCode action to call the API and handle token
      try {
        const resultAction = await dispatch(confirmCode(code)); // Dispatch async action

        // If API call is successful and token is returned
        if (confirmCode.fulfilled.match(resultAction)) {
          const token = resultAction.payload;
          dispatch(setAuthToken(token)); // Store the token in Redux
          localStorage.setItem("authToken", token); // Optionally save token in localStorage
          navigate("/"); // Redirect to home page
        } else {
          // If the code was invalid or API call failed
          setError(resultAction.payload); // Show error from API response
        }
      } catch (err) {
        // Catch any errors
        setError("An error occurred. Please try again later.");
      }
    }
  };

  // Function to handle redirect to home page
  const Movetohome = () => {
    navigate("/");
  };

  return (
    <div className="CodeConfirm">
      <button onClick={Movetohome} className="X_button">
        <RiCloseLargeLine size={25} />
      </button>
      <h2 id="h2code">Please enter confirmation code</h2>
      <form action="" method="post">
        {valid && (
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
            <div className="error__title">{error || reduxError}</div>
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
          />
        </div>
        <br />
        <button id="btn" onClick={Submit} disabled={loading}>
          {loading ? "Verifying..." : "Confirm"}
        </button>
      </form>
    </div>
  );
}
