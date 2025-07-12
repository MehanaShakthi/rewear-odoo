import React, { useState } from 'react';
import '../styles/AdminPanelPage.css';

const AdminPanelPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Striped T-Shirt',
      uploader: 'mehana@example.com',
      status: 'pending',
      image: '/assets/hero.jpg'
    },
    {
      id: 2,
      title: 'Denim Skirt',
      uploader: 'anotheruser@example.com',
      status: 'pending',
      image: '/assets/hero.jpg'
    }
  ]);

  const handleApprove = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' } : item));
  };

  const handleReject = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <p>Moderate clothing items submitted by users</p>

      <div className="admin-items">
        {items.map(item => (
          <div key={item.id} className="admin-item-card">
            <img src={item.image} alt={item.title} />
            <div className="admin-item-info">
              <h4>{item.title}</h4>
              <p><strong>Uploader:</strong> {item.uploader}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <div className="admin-actions">
                <button className="btn approve" onClick={() => handleApprove(item.id)}>Approve</button>
                <button className="btn reject" onClick={() => handleReject(item.id)}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanelPage;
