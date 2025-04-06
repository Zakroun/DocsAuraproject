
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { changecurrentpage } from "../data/DocsauraSlice";
import { useDispatch } from "react-redux";
export default function NewPass() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [valid, setvalid] = useState(false);
  const [error, seterror] = useState("");
  const Submit = (e) => {
    e.preventDefault();
    const passwordRegex = /^[A-Z][a-z]{4,}[@#$!%*?&][0-9]{1,}$/;
    if (newPass === "" || confirmPass === "") {
      setvalid(true);
      seterror("Please fill all the fields");
    } else if (!passwordRegex.test(newPass)) {
      setvalid(true);
      seterror(
        "Password must start with a capital letter, have 4+ lowercase letters, include a special character (e.g., @), a number, and be 8+ characters long"
      );
    } else if (newPass !== confirmPass) {
      setvalid(true);
      seterror("Passwords do not match");
    } else {
      setvalid(false);
      seterror("");
      window.location.href = "/";
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Movetohome = () => {
    navigate("/");
    dispatch(changecurrentpage("home"));
  };
  return (
    <div className="NewPass">
      <button onClick={Movetohome} className="X_button"><RiCloseLargeLine size={25}/></button>
      <h2 id="h2code">Please enter the new Password</h2>
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
            <div className="error__title">{error}</div>
            {/* <div className="error__close">
              <svg
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                  fill="#393a37"
                ></path>
              </svg>
            </div> */}
          </div>
        )}
        <input
          type="password"
          name="newpass"
          id="newpass"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        ></input>
        <br />
        <input
          type="password"
          name="confirmpass"
          id="confirmpass"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        ></input>
        <br />
        <button id="btn" onClick={Submit}>
          confirm
        </button>
      </form>
    </div>
  );
}
