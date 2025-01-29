import React, { useState } from "react";


const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqData = [
    {
      question: "What should I do if I feel unwell and need medical attention?",
      answer: "If you're feeling unwell, we recommend scheduling an appointment with a primary care physician who can assess your symptoms. In case of an emergency, visit the nearest urgent care facility or emergency room. Early intervention can prevent complications."
    },
    {
      question: "How can I prepare for my first consultation with a specialist?",
      answer: "For your first specialist consultation, it's important to bring a list of your medical history, including current medications, past surgeries, and any allergies. Prepare to discuss your symptoms in detail, as this will assist the specialist in providing the best care possible."
    },
    {
      question: "What is the difference between a general physician and a specialist?",
      answer: "A general physician, or primary care doctor, handles a wide range of health issues and focuses on overall well-being. A specialist, on the other hand, is a doctor who has expertise in a specific area of medicine, such as cardiology or neurology, and addresses more complex or focused health concerns."
    },
    {
      question: "How do I know when it's time to see a doctor for my symptoms?",
      answer: "If you're experiencing symptoms that don't improve after a few days, worsen, or interfere with your daily life, it’s important to consult a doctor. Additionally, if you experience persistent pain, shortness of breath, or sudden changes in health, seeking medical attention is crucial."
    },
    {
      question: "Can I schedule an appointment for a routine check-up?",
      answer: "Yes, routine check-ups are essential for maintaining good health. Regular physical exams help identify potential health issues early. During your appointment, your physician will perform a general health assessment and may recommend screenings or tests based on your age and risk factors."
    },
    {
      question: "What happens during a medical consultation?",
      answer: "During a medical consultation, the doctor will ask about your medical history, current symptoms, and lifestyle habits. Based on your answers, they may perform a physical exam, recommend diagnostic tests, or prescribe treatment. The goal is to provide you with an accurate diagnosis and personalized care plan."
    }
  ];

  return (
    <section id="faq" className="faq section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Medical Frequently Asked Questions</h2>
        <hr className="hrsevice" />
        <p>Answers to your most common medical questions. We are here to assist you in understanding your health better.</p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
            <div className="faq-container">
              {faqData.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <h3 onClick={() => toggleFaq(index)}>
                    {faq.question}
                    <button className="faq-toggle-btn">
                      {activeIndex === index ? '-' : '+'}
                    </button>
                  </h3>
                  {activeIndex === index && (
                    <div className="faq-content">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
