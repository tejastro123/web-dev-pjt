import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Bike, UtensilsCrossed, Wine } from 'lucide-react';
import SkeletonCard from '../components/SkeletonCard';
import Categories from '../components/Categories';
import Collections from '../components/Collections';
import Filters from '../components/Filters';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [activeTab, setActiveTab] = useState('Delivery');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filters, setFilters] = useState({
    sort: '',
    veg: false
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        // Build query string
        let query = `?search=${searchQuery}`;
        if (activeCategory && activeCategory !== 'All') query += `&category=${activeCategory}`;
        if (filters.sort) query += `&sort=${filters.sort}`;
        // In a real app, we would also filter by activeTab (e.g. type=dining)

        const res = await axios.get(`http://localhost:5000/api/restaurants${query}`);
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [searchQuery, activeCategory, filters, activeTab]);

  return (
    <div className="home-container">
      {/* Tabs Section */}
      <div className="tabs-container">
        <div
          className={`tab-item ${activeTab === 'Delivery' ? 'active' : ''}`}
          onClick={() => setActiveTab('Delivery')}
        >
          <div className="tab-icon-wrapper">
            <Bike className="tab-icon" />
          </div>
          <span className="tab-label">Delivery</span>
        </div>
        <div
          className={`tab-item ${activeTab === 'Dining Out' ? 'active' : ''}`}
          onClick={() => setActiveTab('Dining Out')}
        >
          <div className="tab-icon-wrapper">
            <UtensilsCrossed className="tab-icon" />
          </div>
          <span className="tab-label">Dining Out</span>
        </div>
        <div
          className={`tab-item ${activeTab === 'Nightlife' ? 'active' : ''}`}
          onClick={() => setActiveTab('Nightlife')}
        >
          <div className="tab-icon-wrapper">
            <Wine className="tab-icon" />
          </div>
          <span className="tab-label">Nightlife</span>
        </div>
      </div>

      {/* Conditionally Render Categories based on Tab (Mainly for Delivery) */}
      {activeTab === 'Delivery' && (
        <Categories activeCategory={activeCategory} onSelect={setActiveCategory} />
      )}

      {/* Collections - Only for Dining Out / Nightlife or all? Zomato usually shows on Home */}
      {/* Lets show it generally or strictly for dining out */}
      <Collections />

      {/* Filters - Available for all, potentially different options */}
      <Filters activeFilters={filters} setFilters={setFilters} />

      {/* Hero / Filter Section */}
      <div className="home-hero">
        <h2 className="home-title">
          {activeTab === 'Delivery' ? 'Delivery Restaurants in Your City' :
            activeTab === 'Dining Out' ? 'Best Dining Restaurants' :
              'Nightlife & Clubs'}
        </h2>
      </div>

      {loading ? (
        <div className="home-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : (
        <div className="home-grid">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="restaurant-card">

              <div className="card-image-container">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="card-image"
                />
                <div className="delivery-time">
                  {restaurant.deliveryTime}
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{restaurant.name}</h3>
                  <span className="rating-badge">{restaurant.rating} ★</span>
                </div>
                <p className="cuisine-text">{restaurant.cuisine}</p>
                <div className="card-footer">
                  <span>₹{restaurant.costForTwo} for two</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
