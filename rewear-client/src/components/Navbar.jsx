import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">ReWear</Link>
      </div>
      <div className="nav-right">
        <Link to="/browse">Browse</Link>
        <Link to="/add-item">Add Item</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login" className="btn login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
