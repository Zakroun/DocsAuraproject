import React from "react";


const CallToAction = () => {
  return (
    <section id="call-to-action" className="call-to-action section accent-background">
      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h1>Facing an Emergency? Get Immediate Assistance</h1>
              <p>
              If you require urgent medical attention, do not hesitate to seek assistance. 
   Our professionals are here to provide you with prompt and reliable care. 
   Your well-being is our priority.
              </p>
              <a className="cta-btn" href="#appointment">Schedule an Appointment</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
