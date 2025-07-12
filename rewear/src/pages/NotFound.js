import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import './Pages.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-image">
            <h1 className="not-found-number">404</h1>
          </div>
          <div className="not-found-text">
            <h2 className="not-found-title">Oops! Page Not Found</h2>
            <p className="not-found-description">
              The page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </p>
            <div className="not-found-actions">
              <Link to="/" className="btn btn-primary">
                <FaHome className="mr-2" />
                Go Home
              </Link>
              <Link to="/browse" className="btn btn-outline">
                <FaSearch className="mr-2" />
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;