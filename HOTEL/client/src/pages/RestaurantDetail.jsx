import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;
  if (!restaurant) return <div className="container">Restaurant not found</div>;

  return (
    <div>
      <div className="detail-header">
        <img src={restaurant.image} alt={restaurant.name} className="detail-img" />
      </div>

      <div className="detail-info">
        <h1>{restaurant.name}</h1>
        <p className="cuisine">{restaurant.cuisine.join(', ')}</p>
        <div className="meta">
          <span>{restaurant.address}</span>
          <span>{restaurant.deliveryTime} mins • {restaurant.rating} ★</span>
        </div>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
        {restaurant.menu.map(item => (
          <div key={item._id} className="menu-item">
            <div className="menu-left">
              <div className={`veg-icon ${item.isVeg ? 'veg' : 'non-veg'}`}>
                <div className="dot"></div>
              </div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{item.description}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              {item.image && <img src={item.image} alt={item.name} className="menu-img" />}
              <div>
                <button className="add-btn" onClick={() => addToCart(item, restaurant)}>ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
