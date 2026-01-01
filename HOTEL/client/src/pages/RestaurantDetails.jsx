import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Star, MapPin, Clock } from 'lucide-react';
import Reviews from '../components/Reviews';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart, updateQuantity } = useCart();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(res.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!restaurant) return <div className="text-center py-20">Restaurant not found</div>;

  const getQuantity = (itemId) => {
    const item = cart.find(i => i._id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="restaurant-details-container">
      {/* Header */}
      <div className="restaurant-header">
        <div className="restaurant-header-content">
          <div>
            <h1 className="restaurant-title">{restaurant.name}</h1>
            <p className="restaurant-cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-delivery">{restaurant.deliveryTime} delivery</p>
          </div>
          <div className="rating-container">
            <span className="rating-text">{restaurant.rating}</span>
            <Star className="rating-icon fill-current" />
          </div>
        </div>
      </div>

      {/* Menu */}
      <h2 className="menu-title">Menu</h2>
      <div className="menu-list">
        {restaurant.menu.map((item) => (
          <div key={item._id} className="menu-item">
            <div className="menu-item-info">
              <div className="menu-item-header">
                {item.isVeg ? (
                  <span className="veg-indicator">
                    <div className="veg-dot"></div>
                  </span>
                ) : (
                  <span className="non-veg-indicator">
                    <div className="non-veg-dot"></div>
                  </span>
                )}
                <h3 className="menu-item-name">{item.name}</h3>
              </div>
              <p className="menu-item-price">₹{item.price}</p>
              <p className="menu-item-desc">{item.description}</p>
            </div>

            <div className="menu-item-image-container">
              {item.image && (
                <img src={item.image} alt={item.name} className="menu-item-image" />
              )}
              <div className="add-button-container">
                {getQuantity(item._id) > 0 ? (
                  <>
                    <button onClick={() => updateQuantity(item._id, -1)} className="control-btn">-</button>
                    <span className="quantity-text">{getQuantity(item._id)}</span>
                    <button onClick={() => addToCart(item, restaurant._id, restaurant.name)} className="control-btn">+</button>
                  </>
                ) : (
                  <button onClick={() => addToCart(item, restaurant._id, restaurant.name)} className="add-btn">ADD</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
