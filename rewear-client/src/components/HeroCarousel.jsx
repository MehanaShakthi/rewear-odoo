import React, { useState, useEffect } from 'react';
import '../styles/HeroCarousel.css';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    image: '/assets/hero1.jpg',
    heading: 'Sustainability Starts in Your Closet',
    subtext: 'Refresh your wardrobe the green way — exchange, reuse, and reduce your fashion footprint with every swap',
    button: 'SHOP NOW',
    route: '/browse',
  },
  {
    image: '/assets/hero2.jpg',
    heading: 'Declutter With Purpose',
    subtext: 'Send us your pre-loved clothes. We’ll inspect and list them — you earn rewards, and the planet breathes easier.',
    button: 'SELL WITH US',
    route: '/add-item',
  }
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const handleDotClick = (i) => setIndex(i);

  const handleUserInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleButtonClick = () => {
    navigate(slides[index].route);
  };

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-slide" style={{ backgroundImage: `url(${slides[index].image})` }}>
        <div className="carousel-content">
          <h1>{slides[index].heading}</h1>
          <p>{slides[index].subtext}</p>
          <button className="carousel-btn" onClick={handleButtonClick}>
            {slides[index].button}
          </button>
        </div>

        <button className="nav-btn left" onClick={() => { prevSlide(); handleUserInteraction(); }}>
          &#8592;
        </button>
        <button className="nav-btn right" onClick={() => { nextSlide(); handleUserInteraction(); }}>
          &#8594;
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? 'dot active' : 'dot'}
            onClick={() => { handleDotClick(i); handleUserInteraction(); }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
