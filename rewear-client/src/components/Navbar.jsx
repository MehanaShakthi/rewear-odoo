import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">ReWear</Link>
      </div>
      <div className="nav-right">
      <Link to="/">Home</Link>
        <Link to="/browse">Browse</Link>
        <Link to="/add-item">Add Item</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={logout} className="logout-btn">Logout</button>
        <Link to="/login" className="btn login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
