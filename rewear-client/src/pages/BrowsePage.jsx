import React, { useState } from 'react';
import '../styles/BrowsePage.css';

const dummyItems = [
  {
    id: 1,
    image: '/assets/hero.jpg',
    title: 'Striped T-Shirt',
    size: 'M',
    condition: 'Gently Used',
    category: 'Tops'
  },
  {
    id: 2,
    image: '/assets/hero.jpg',
    title: 'Denim Jacket',
    size: 'L',
    condition: 'Used',
    category: 'Outerwear'
  },
  {
    id: 3,
    image: '/assets/hero.jpg',
    title: 'Floral Dress',
    size: 'S',
    condition: 'New',
    category: 'Dresses'
  },
];

const BrowsePage = () => {
  const [filters, setFilters] = useState({ category: '', condition: '' });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredItems = dummyItems.filter((item) => {
    const matchesCategory = filters.category ? item.category === filters.category : true;
    const matchesCondition = filters.condition ? item.condition === filters.condition : true;
    return matchesCategory && matchesCondition;
  });

  return (
    <div className="browse-container">
      <h2>Browse Clothing Items</h2>

      <div className="filters">
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Dresses">Dresses</option>
          <option value="Outerwear">Outerwear</option>
          <option value="Accessories">Accessories</option>
        </select>

        <select name="condition" value={filters.condition} onChange={handleFilterChange}>
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Gently Used">Gently Used</option>
          <option value="Used">Used</option>
        </select>
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>Size: {item.size}</p>
            <p>Condition: {item.condition}</p>
            <button className="btn secondary">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
