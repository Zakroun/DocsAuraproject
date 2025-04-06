import { useForm, ValidationError } from "@formspree/react";
import {  useEffect } from "react";

import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { changecurrentpage } from "../data/DocsauraSlice";
import { useDispatch } from "react-redux";
export default function ContactForm() {
  const [state, handleSubmit] = useForm("mvgzaeyy");
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ email: "", message: "" });
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000); // Redirect after 2 seconds
    }
  }, [state.succeeded]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Movetohome = () => {
    navigate("/");
    dispatch(changecurrentpage("home"));
  };
  return (
    <div className="ContactForm">
      <button onClick={Movetohome} className="X_button"><RiCloseLargeLine size={25}/></button>
      {submitted ? (
        <p>Thanks for your message! Redirecting...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 id="h2email">Contact us</h2>
          <input
            placeholder="Your email address"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <br />
          <textarea
            placeholder="Your message..."
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
          <button id="btn" type="submit" disabled={state.submitting}>
            {state.submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
