import React, { useState } from 'react';
import '../styles/Auth.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Connect to backend
    alert('Registered (dummy)');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Your ReWear Account</h2>
        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn primary">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
