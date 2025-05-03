import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
export default function Divimage2({ profile }) {
  const slides = [
    {
      image: "/Images/img2.jpg",
      title: "Smart Medical Platform",
      text: "Manage your medical appointments easily, anywhere, with a clean and user-friendly interface.",
    },
    {
      image: "/Images/img5.jpg",
      title: "Doctors, Clinics & Labs Connected",
      text: "A complete solution for healthcare professionals to organize consultations and manage availability.",
    },
    {
      image: "/Images/img12.jpg",
      title: "Patients in Control of Their Health",
      text: "Book appointments, track your medical history, and communicate with healthcare providers effortlessly.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  const nextSlide = useCallback(() => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsSliding(true);
  }, [currentIndex, slides.length]);

  const prevSlide = useCallback(() => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsSliding(true);
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    if (isSliding) {
      const timeout = setTimeout(() => {
        setIsSliding(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSliding]);

  return (
    <div className="divcontent">
      <div className="start">
        <h1>{slides[currentIndex].title}</h1>
        <p>{slides[currentIndex].text}</p>
        <Link to={profile ? "/pages/Dashboard" : "/pages/Login"}>
          <button className="loginbtn">Get started</button>
        </Link>
      </div>

      <div className="divimage2">
        <button onClick={prevSlide} className="slider-button prev">
          &#10094;
        </button>
        <div className="slider-wrapper">
          {prevIndex !== null && isSliding && (
            <img
              src={slides[prevIndex].image}
              className="slider-image sliding-out"
              alt="previous"
            />
          )}
          <img
            src={slides[currentIndex].image}
            className={`slider-image ${isSliding ? "sliding-in" : ""}`}
            alt="current"
          />
        </div>
        <button onClick={nextSlide} className="slider-button next">
          &#10095;
        </button>
        <div className="dots-container">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => {
                setPrevIndex(currentIndex);
                setCurrentIndex(index);
                setIsSliding(true);
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
