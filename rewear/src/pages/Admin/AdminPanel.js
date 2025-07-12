import React from 'react';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Manage items and users</p>
        </div>
        
        <div className="admin-content">
          <div className="admin-stats">
            <div className="stat-card">
              <h3>Pending Items</h3>
              <p>0</p>
            </div>
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>0</p>
            </div>
          </div>
          
          <div className="admin-actions">
            <p>Admin functionality coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;