import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmCodepass } from "../data/authslice";
import { RiCloseLargeLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

export default function CodeConfirm() {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state or from wherever you're storing it
  const email = location.state?.email || "";
  console.log("this the email : ", email);
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
          navigate("/pages/newpass", {
            state: {
              email,
              code,
            },
          });
        })
        .catch((err) => {
          setError(err.message || "Invalid reset code");
        });
    }
  };

  return (
    <div className="CodeConfirm">
      <button className="X_button" type="button">
        <RiCloseLargeLine size={25} />
      </button>
      <h2 id="h2code">Please enter confirmation code</h2>
      <form onSubmit={submit} method="post">
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
            id="code"
            placeholder="Confirmation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            required
          />
        </div>
        <button id="btn" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}
