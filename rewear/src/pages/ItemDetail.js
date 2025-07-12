import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();

  return (
    <div className="item-detail-page">
      <div className="container">
        <div className="item-detail">
          <h1>Item Detail</h1>
          <p>Item ID: {id}</p>
          <p>Item details coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;