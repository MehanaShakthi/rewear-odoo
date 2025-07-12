import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;

  const uploadedItems = [
    { title: 'Striped T-Shirt', status: 'Available' },
    { title: 'Denim Skirt', status: 'Swapped' },
  ];

  const swapHistory = [
    { item: 'Floral Dress', type: 'Received', date: '2025-07-10' },
    { item: 'Sneakers', type: 'Swapped', date: '2025-07-08' },
  ];

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}</h2>
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Points:</strong> {user.points}</p>
      </div>

      <section className="dashboard-section">
        <h3>Your Uploaded Items</h3>
        <ul className="item-list">
          {uploadedItems.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span>
              <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard-section">
        <h3>Swap History</h3>
        <ul className="swap-history">
          {swapHistory.map((record, index) => (
            <li key={index}>
              <span>{record.item}</span>
              <span>{record.type}</span>
              <span>{record.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
