import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Divimage2({ profile }) {
  const images = ["/Images/img2.jpg", "/Images/img5.jpg", "/Images/img12.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  const nextSlide = useCallback(() => {
    setPrevIndex((prev) => prev === null ? 0 : prev);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsSliding(true);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setPrevIndex((prev) => prev === null ? 0 : prev);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsSliding(true);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
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
        <h1>Welcome to DocsAura</h1>
        <p>
          DocsAura is a platform that connects you with the best doctors and clinics in your area.
        </p>
        <Link to={profile ? "/pages/Dashboard" : "/pages/Login"}>
          <button className="loginbtn">Get started</button>
        </Link>
      </div>

      <div className="divimage2">
        <button onClick={prevSlide} className="slider-button prev">&#10094;</button>
        <div className="slider-wrapper">
          {prevIndex !== null && isSliding && (
            <img
              src={images[prevIndex]}
              className="slider-image sliding-out"
              alt="previous"
            />
          )}
          <img
            src={images[currentIndex]}
            className={`slider-image ${isSliding ? "sliding-in" : ""}`}
            alt="current"
          />
        </div>
        <button onClick={nextSlide} className="slider-button next">&#10095;</button>
      </div>
    </div>
  );
}
