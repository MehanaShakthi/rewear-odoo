import React, { useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import '../styles/ItemDetailPage.css';
import { AuthContext } from '../context/AuthContext';
const dummyItems = [
    {
      id: 1,
      title: 'Boho T-Shirt',
      category: 'tops',
      size: 'M',
      condition: 'gently used',
      image: '/assets/boho.jpg',
      description: 'A comfy bohemian-style tee perfect for summer.',
      owner: {
        name: 'Mehana Shakthi',
        email: 'mehana@example.com',
        points: 120
      }
    },
    {
      id: 2,
      title: 'Summer Dress',
      category: 'dresses',
      size: 'S',
      condition: 'new',
      image: '/assets/sumdress.jpg',
      description: 'Lightweight and breezy, perfect for sunny days.',
      owner: {
        name: 'Aisha Verma',
        email: 'aisha@example.com',
        points: 200
      }
    },
    {
      id: 3,
      title: 'Denim Jacket',
      category: 'outerwear',
      size: 'L',
      condition: 'used',
      image: '/assets/denim.jpg',
      description: 'Classic denim jacket with vintage vibe.',
      owner: {
        name: 'Ravi Kumar',
        email: 'ravi@example.com',
        points: 80
      }
    },
    {
      id: 4,
      title: 'Corduroy Pants',
      category: 'bottoms',
      size: 'M',
      condition: 'gently used',
      image: '/assets/co.jpg',
      description: 'Retro-style corduroy pants in great condition.',
      owner: {
        name: 'Priya Menon',
        email: 'priya@example.com',
        points: 95
      }
    },
    {
      id: 5,
      title: 'Vintage Hat',
      category: 'accessories',
      size: 'Free',
      condition: 'used',
      image: '/assets/hat.jpg',
      description: 'Stylish vintage hat for all outfits.',
      owner: {
        name: 'Rahul Das',
        email: 'rahul@example.com',
        points: 110
      }
    },
    {
      id: 6,
      title: 'Knitted Sweater',
      category: 'tops',
      size: 'L',
      condition: 'new',
      image: '/assets/swe.jpg',
      description: 'Warm and cozy knitted sweater for winter.',
      owner: {
        name: 'Sneha Iyer',
        email: 'sneha@example.com',
        points: 170
      }
    }
  ];
  

  const ItemDetailPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
  
    const item = dummyItems.find((item) => item.id.toString() === id);
  
    if (!item) return <p>Item not found</p>;
    if (!user) return <Navigate to="/login" />;
  
    return (
      <div className="item-detail">
        <img src={item.image} alt={item.title} />
        <div className="item-info">
          <h2>{item.title}</h2>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Condition:</strong> {item.condition}</p>
          <p><strong>Description:</strong> {item.description}</p>
  
          <div className="owner-info">
            <h4>Listed by: {item.owner.name}</h4>
            <p>Email: {item.owner.email}</p>
            <p><strong>Owner Points:</strong> {item.owner.points}</p>
          </div>
  
          <div className="actions">
            <button className="btn">Swap Request</button>
            <button className="btn secondary">Redeem via Points</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ItemDetailPage;