import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaPlus, FaCog, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-text">ReWear</span>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/browse" className="nav-link" onClick={closeMenu}>
              Browse Items
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link to="/add-item" className="nav-link" onClick={closeMenu}>
                  <FaPlus className="nav-icon" />
                  List Item
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="user-menu">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <span className="user-points">{user?.points || 0} pts</span>
                  <div className="user-dropdown">
                    <button className="user-button">
                      <FaUser className="user-icon" />
                      <span className="user-name">{user?.firstName}</span>
                    </button>
                    <div className="dropdown-menu">
                      <Link to="/dashboard" className="dropdown-item" onClick={closeMenu}>
                        <FaUser className="dropdown-icon" />
                        Dashboard
                      </Link>
                      <Link to={`/profile/${user?.id}`} className="dropdown-item" onClick={closeMenu}>
                        <FaUser className="dropdown-icon" />
                        Profile
                      </Link>
                      {user?.isAdmin && (
                        <Link to="/admin" className="dropdown-item" onClick={closeMenu}>
                          <FaCog className="dropdown-icon" />
                          Admin Panel
                        </Link>
                      )}
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt className="dropdown-icon" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu">
            <Link to="/" className="mobile-menu-item" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/browse" className="mobile-menu-item" onClick={closeMenu}>
              Browse Items
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="mobile-menu-item" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link to="/add-item" className="mobile-menu-item" onClick={closeMenu}>
                  List Item
                </Link>
                <Link to={`/profile/${user?.id}`} className="mobile-menu-item" onClick={closeMenu}>
                  Profile
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="mobile-menu-item" onClick={closeMenu}>
                    Admin Panel
                  </Link>
                )}
                <div className="mobile-menu-item mobile-user-info">
                  <span>Points: {user?.points || 0}</span>
                </div>
                <button className="mobile-menu-item mobile-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-menu-item" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="mobile-menu-item" onClick={closeMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;