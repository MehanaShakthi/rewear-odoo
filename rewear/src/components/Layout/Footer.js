import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">ReWear</h3>
            <p className="footer-text">
              Building a sustainable future through community-driven clothing exchange.
              Give your clothes a second life while discovering new styles.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/browse">Browse Items</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/safety">Safety Guidelines</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/feedback">Feedback</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/community">Community Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 ReWear. All rights reserved. Made with <FaHeart className="heart-icon" /> for a sustainable future.
            </p>
            <div className="footer-bottom-links">
              <a href="/accessibility">Accessibility</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;