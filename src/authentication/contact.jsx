import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
export default function ContactForm() {
  const [state, handleSubmit] = useForm("mvgzaeyy");
  //   if (state.succeeded) {
  //       return <p>Thanks for joining!</p>;
  //   }
  const [formData, setFormData] = useState({ email: "", message: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    await handleSubmit(e);
    if (state.succeeded) {
      setFormData({ email: "", message: "" });
    }
  };
  return (
    <div className="ContactForm">
      <form onSubmit={handleFormSubmit}>
        <h2 id="h2email">Contact us</h2>

        <input
          placeholder="Your email address"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <br />

        <textarea
          placeholder="Your message..."
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <button id="btn" type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
