import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import Categories from '../components/Categories';
import Filters from '../components/Filters';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

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

        const res = await axios.get(`http://localhost:5000/api/restaurants${query}`);
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [searchQuery, activeCategory, filters]);

  return (
    <div className="home-container">
      {/* Categories */}
      <Categories activeCategory={activeCategory} onSelect={setActiveCategory} />

      {/* Filters */}
      <Filters activeFilters={filters} setFilters={setFilters} />

      {/* Hero / Filter Section - Simplified for MVP */}
      <div className="home-hero">
        <h2 className="home-title">Delivery Restaurants in Your City</h2>
      </div>

      {loading ? (
        <div className="loading-container">Loading...</div>
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
