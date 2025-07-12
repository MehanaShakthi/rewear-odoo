import React, { useState } from 'react';
import '../styles/BrowsePage.css';
import { Link } from 'react-router-dom'; // ✅ Add at top



const dummyItems = [
  {
    id: 1,
    title: 'Boho T-Shirt',
    category: 'tops',
    size: 'M',
    condition: 'gently used',
    image: '/assets/boho.jpg',
  },
  {
    id: 2,
    title: 'Summer Dress',
    category: 'dresses',
    size: 'S',
    condition: 'new',
    image: '/assets/sumdress.jpg',
  },
  {
    id: 3,
    title: 'Denim Jacket',
    category: 'outerwear',
    size: 'L',
    condition: 'used',
    image: '/assets/denim.jpg',
  },
  {
    id: 4,
    title: 'Corduroy Pants',
    category: 'bottoms',
    size: 'M',
    condition: 'gently used',
    image: '/assets/co.jpg',
  },
  {
    id: 5,
    title: 'Vintage Hat',
    category: 'accessories',
    size: 'Free',
    condition: 'used',
    image: '/assets/hat.jpg',
  },
  {
    id: 6,
    title: 'Knitted Sweater',
    category: 'tops',
    size: 'L',
    condition: 'new',
    image: '/assets/swe.jpg',
  }
];

const BrowsePage = () => {
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    condition: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredItems = dummyItems.filter((item) => {
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesSize = !filters.size || item.size === filters.size;
    const matchesCondition = !filters.condition || item.condition === filters.condition;
  
    return matchesCategory && matchesSize && matchesCondition;
  });
  

  return (
    <div className="browse-container">
      <h2>Browse Items</h2>

      <div className="filter-bar">
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All Categories</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="dresses">Dresses</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessories">Accessories</option>
        </select>

        <select name="size" value={filters.size} onChange={handleChange}>
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="Free">Free</option>
        </select>

        <select name="condition" value={filters.condition} onChange={handleChange}>
          <option value="">All Conditions</option>
          <option value="new">New</option>
          <option value="gently used">Gently Used</option>
          <option value="used">Used</option>
        </select>
      </div>

      <div className="item-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.category} | Size: {item.size}</p>
            <p>Condition: {item.condition}</p>
            
            <Link to={`/items/${item.id}`}>
            <button className="btn">View Details</button>
            </Link>
          </div>
        ))}

        {filteredItems.length === 0 && <p>No items match your filter.</p>}
      </div>
    </div>
  );
};

export default BrowsePage;
