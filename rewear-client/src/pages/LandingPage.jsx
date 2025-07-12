import HeroCarousel from '../components/HeroCarousel';
import React from 'react';
import '../styles/LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <HeroCarousel />

      <div className="landing-container">
        <header className="hero-section">
          <div className="hero-content">
            <h1>ReWear</h1>
            <p>Swap. Redeem. Reuse. Join the sustainable fashion revolution.</p>
            <div className="hero-buttons">
              <Link to="/browse"><button className="btn primary">Browse Items</button></Link>
              <Link to="/add-item"><button className="btn secondary">List an Item</button></Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/hero.jpg" alt="Fashion Swap" />
          </div>
        </header>

        <section className="features-section">
          <h2>How It Works</h2>
          <div className="features">
            <div className="feature-card">
              <img src="/assets/swap.png" alt="Swap" />
              <h3>Swap Clothes</h3>
              <p>Find preloved garments from others and request a swap instantly.</p>
            </div>
            <div className="feature-card">
              <img src="/assets/redeem.png" alt="Redeem" />
              <h3>Redeem Points</h3>
              <p>Earn points by uploading clothes and redeem them for new finds.</p>
            </div>
            <div className="feature-card">
              <img src="/assets/eco.png" alt="Sustainable" />
              <h3>Sustainable Fashion</h3>
              <p>Reduce textile waste and support conscious consumption.</p>
            </div>
          </div>
        </section>

        <section className="featured-items">
          <h2>Featured Items</h2>
          <div className="featured-grid">
            <div className="item-card">
              <img src="/assets/hero.jpg" alt="T-Shirt" />
              <h4>Boho T-Shirt</h4>
              <p>Size: M | Condition: Gently Used</p>
            </div>
            <div className="item-card">
              <img src="/assets/hero.jpg" alt="Dress" />
              <h4>Summer Dress</h4>
              <p>Size: S | Condition: New</p>
            </div>
            <div className="item-card">
              <img src="/assets/hero.jpg" alt="Jacket" />
              <h4>Denim Jacket</h4>
              <p>Size: L | Condition: Used</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>© 2025 ReWear | Made for the Odoo Hackathon ❤️</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
