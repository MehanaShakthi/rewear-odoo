import React from 'react';
import '../styles/ItemDetailPage.css';

const ItemDetailPage = () => {
  const item = {
    title: 'Striped T-Shirt',
    description: 'A lightly worn striped t-shirt in good condition.',
    size: 'M',
    condition: 'Gently Used',
    category: 'Tops',
    uploader: 'mehana@example.com',
    image: '/assets/hero.jpg',
    available: true,
  };

  return (
    <div className="item-detail-container">
      <div className="image-gallery">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="item-info">
        <h2>{item.title}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Size:</strong> {item.size}</p>
        <p><strong>Condition:</strong> {item.condition}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Uploaded by:</strong> {item.uploader}</p>

        <div className="action-buttons">
          {item.available ? (
            <>
              <button className="btn primary">Swap Request</button>
              <button className="btn secondary">Redeem via Points</button>
            </>
          ) : (
            <p className="unavailable">This item is no longer available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
