import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaShoppingBag, FaExchangeAlt, FaUser } from 'react-icons/fa';
import './Pages.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.firstName}!</h1>
          <p>Manage your items and swaps from your dashboard</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingBag />
            </div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Items Listed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaExchangeAlt />
            </div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Swaps Made</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUser />
            </div>
            <div className="stat-content">
              <h3>{user?.points || 0}</h3>
              <p>Points</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <div className="action-card">
            <FaPlus className="action-icon" />
            <h3>List New Item</h3>
            <p>Upload photos and details of items you want to swap</p>
            <button className="btn btn-primary">Add Item</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;