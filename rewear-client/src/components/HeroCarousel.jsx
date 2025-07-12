import React, { useState } from 'react';
import '../styles/HeroCarousel.css';

const slides = [
  {
    image: '/assets/hero1.jpg',
    heading: 'Summer plus something new',
    subtext: 'Bring in the last days of summer with sunny day-ready styles plus essentials for in between seasons',
    button: 'SHOP NOW',
  },
  {
    image: '/assets/hero2.jpg',
    heading: 'Get 50% off Clean Out fees',
    subtext: 'Selling made easy. We inspect, list, and ship your gently-worn clothes for you.',
    button: 'SELL WITH US',
  }
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="hero-carousel">
      <div className="carousel-slide" style={{ backgroundImage: `url(${slides[index].image})` }}>
        <div className="carousel-content">
          <h1>{slides[index].heading}</h1>
          <p>{slides[index].subtext}</p>
          <button className="carousel-btn">{slides[index].button}</button>
        </div>
        <button className="nav-btn left" onClick={prevSlide}>&#8592;</button>
        <button className="nav-btn right" onClick={nextSlide}>&#8594;</button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? 'dot active' : 'dot'}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
