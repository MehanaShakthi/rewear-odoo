import React from 'react';
import './Pages.css';

const Browse = () => {
  return (
    <div className="browse-page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Items</h1>
          <p>Discover amazing items from our community</p>
        </div>
        
        <div className="browse-content">
          <div className="filters">
            <h3>Filters</h3>
            <p>Filter functionality coming soon...</p>
          </div>
          
          <div className="items-grid">
            <div className="empty-state">
              <h3>No items found</h3>
              <p>Check back later for more items!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;