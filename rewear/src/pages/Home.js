import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRecycle, FaUsers, FaShoppingBag, FaLeaf } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await axios.get('/api/items/featured');
        setFeaturedItems(response.data);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  const features = [
    {
      icon: <FaRecycle />,
      title: 'Sustainable Fashion',
      description: 'Reduce textile waste by giving your clothes a second life through our community exchange platform.'
    },
    {
      icon: <FaUsers />,
      title: 'Community Driven',
      description: 'Connect with like-minded individuals who share your passion for sustainable living and fashion.'
    },
    {
      icon: <FaShoppingBag />,
      title: 'Easy Trading',
      description: 'Simple swap system with both direct exchanges and point-based redemption options.'
    },
    {
      icon: <FaLeaf />,
      title: 'Eco-Friendly',
      description: 'Every swap helps reduce environmental impact and promotes a circular economy.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Items Exchanged' },
    { number: '5,000+', label: 'Happy Users' },
    { number: '50+', label: 'Cities Served' },
    { number: '2,000+', label: 'Successful Swaps' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Swap, Style, <span className="gradient-text">Sustain</span>
              </h1>
              <p className="hero-subtitle">
                Join the sustainable fashion revolution. Exchange your unused clothes, 
                discover new styles, and reduce textile waste together.
              </p>
              <div className="hero-buttons">
                {isAuthenticated ? (
                  <>
                    <Link to="/browse" className="btn btn-primary btn-lg">
                      Start Browsing
                      <FaArrowRight className="ml-2" />
                    </Link>
                    <Link to="/add-item" className="btn btn-outline btn-lg">
                      List an Item
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg">
                      Start Swapping
                      <FaArrowRight className="ml-2" />
                    </Link>
                    <Link to="/browse" className="btn btn-outline btn-lg">
                      Browse Items
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-placeholder">
                <FaRecycle className="hero-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ReWear?</h2>
            <p className="section-subtitle">
              Discover the benefits of community-driven sustainable fashion
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="featured-items">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Items</h2>
            <p className="section-subtitle">
              Discover the most popular items in our community
            </p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="items-grid">
              {featuredItems.slice(0, 8).map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img 
                      src={item.images[0] || '/placeholder-image.jpg'} 
                      alt={item.title}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="item-overlay">
                      <Link to={`/item/${item.id}`} className="btn btn-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="item-content">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-owner">by {item.owner?.firstName}</p>
                    <div className="item-footer">
                      <span className="item-points">{item.pointsValue} pts</span>
                      <span className="item-condition">{item.condition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="section-cta">
            <Link to="/browse" className="btn btn-primary">
              View All Items
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Sustainable Journey?</h2>
            <p className="cta-text">
              Join thousands of users who are already making a difference through conscious clothing exchange.
            </p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Join ReWear Today
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    Already have an account?
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;