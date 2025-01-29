import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";



const CallToAction = () => {
  return (
    <section id="call-to-action" className="call-to-action section accent-background">
      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h1>Immediate Care, Trusted Experts, Zero Hassle</h1>
              <p>
              Your health isn’t just important—it’s everything. Whether you need urgent medical attention or a routine checkup, our top-rated professionals are ready to provide fast, reliable, and compassionate care. No delays, no uncertainty—just quality healthcare when you need it most. To get started with us, having an account is required. If you don’t have one yet, sign up now and enjoy trusted care anytime you need it.
              </p>
              <Link to={"/pages/register"}>
              <button className="signupbtn">Take Care Now</button>
            </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
