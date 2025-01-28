import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Divimage2() {
  const images = [
    "/Images/img2.jpg",
    "/Images/img5.jpg",
    "/Images/img12.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    console.log(currentIndex);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="divcontent">
        <div className="start">
            <h1>Welcom to DocsAura</h1>
            <p>DocsAura is a platform that connects you with the best doctors and clinics in your area.</p>
            <Link to={'/pages/Login'}><button className="loginbtn">Get start</button></Link>
        </div>
    <div className="divimage2">

      <button onClick={prevSlide} className="slider-button prev">
        &#10094;
      </button> 
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        id="imagediv"
      />
      <button onClick={nextSlide} className="slider-button next">
        &#10095; 
      </button>
    </div>
    </div>
  );
}
