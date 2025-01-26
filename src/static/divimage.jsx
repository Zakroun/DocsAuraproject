import React, { useState } from "react";
import { useEffect } from "react";
export default function Divimage() {
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
    <div className="divimage">
      <img src="/Images/Asset 9.png" alt="img" id='imgindiv'/>
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
  );
}
