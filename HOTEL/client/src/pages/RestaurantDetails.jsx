import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { Star, MapPin, Clock, Bookmark, Heart } from 'lucide-react';
import Reviews from '../components/Reviews';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart, updateQuantity } = useCart();
  const { user } = useAuth(); // Refresh user might be needed or just local state
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [activeTab, setActiveTab] = useState('Order Online');

  useEffect(() => {
    if (user && user.bookmarks && restaurant) {
      setIsBookmarked(user.bookmarks.includes(restaurant._id));
    }
  }, [user, restaurant]);

  const handleBookmark = async () => {
    if (!user) {
      import('react-hot-toast').then(({ toast }) => toast.error("Please login to bookmark"));
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/user/bookmark/${id}`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setIsBookmarked(res.data.bookmarks.includes(id));
      import('react-hot-toast').then(({ toast }) => toast.success(res.data.msg));
      // Optionally update global user context but local state is enough for UI immediate feedback
    } catch (error) {
      console.error("Bookmark error", error);
    }
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="tab-content">
            <h3 className="section-title">About this place</h3>
            <div className="overview-section">
              <h4>Cuisine</h4>
              <p>{restaurant.cuisine}</p>

              <h4>Average Cost</h4>
              <p>₹{restaurant.costForTwo} for two people (approx.)</p>

              {restaurant.features && (
                <>
                  <h4>More Info</h4>
                  <ul className="features-list">
                    {restaurant.features.map((f, i) => <li key={i}>- {f}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>
        );
      case 'Order Online':
        return (
          <div className="tab-content">
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
      case 'Reviews':
        return <Reviews restaurantId={id} />;
      case 'Photos':
        return (
          <div className="photos-grid">
            {restaurant.photos && restaurant.photos.length > 0 ? (
              restaurant.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Restaurant ${index}`} className="photo-item" />
              ))
            ) : <p>No photos available</p>}
          </div>
        )
      case 'Menu':
        return (
          <div className="photos-grid">
            {restaurant.menuImages && restaurant.menuImages.length > 0 ? (
              restaurant.menuImages.map((photo, index) => (
                <img key={index} src={photo} alt={`Menu ${index}`} className="photo-item" />
              ))
            ) : <p>No menu images available</p>}
          </div>
        )
      case 'Book a Table':
        return (
          <div className="tab-content">
            <h3 className="section-title">Book a Table</h3>
            <div className="booking-form-container" style={{ maxWidth: '500px', border: '1px solid #e8e8e8', padding: '2rem', borderRadius: '0.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Date</label>
                <input type="date" className="login-input" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Time</label>
                <select className="login-input">
                  <option>7:00 PM</option>
                  <option>7:30 PM</option>
                  <option>8:00 PM</option>
                  <option>8:30 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Guests</label>
                <select className="login-input">
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>
              </div>
              <button
                className="login-btn"
                onClick={() => {
                  import('react-hot-toast').then(({ toast }) => toast.success("Table Booked Successfully!"));
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="restaurant-details-container">
      {/* Header */}
      <div className="restaurant-header">
        <div className="restaurant-header-content">
          <div className="header-gallery">
            {/* Simplified Gallery for MVP - just show one hero or 3 if avail? For now pure text logic as before */}
            {/*  Ideally we render gallery here but keeping text for now as per design */}
          </div>
          <div>
            <h1 className="restaurant-title">{restaurant.name}</h1>
            <p className="restaurant-cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-delivery">{restaurant.deliveryTime} delivery</p>
            <p style={{ color: '#828282', fontSize: '0.9rem' }}>{restaurant.address || "Mumbai, India"}</p>
          </div>
          <div className="rating-container">
            <span className="rating-text">{restaurant.rating}</span>
            <Star className="rating-icon fill-current" />
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={handleBookmark}
            className="bookmark-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              border: '1px solid #e8e8e8',
              borderRadius: '0.5rem',
              background: isBookmarked ? '#ffecec' : 'white',
              color: isBookmarked ? '#ef4f5f' : 'inherit',
              cursor: 'pointer'
            }}
          >
            <Bookmark className={isBookmarked ? "fill-current" : ""} size={20} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="res-tabs-container">
        {['Overview', 'Order Online', 'Reviews', 'Photos', 'Menu', 'Book a Table'].map(tab => (
          <button
            key={tab}
            className={`res-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <hr className="tab-divider" />

      {/* Content */}
      <div className="res-content-area">
        {renderContent()}
      </div>
    </div>
  );
}; // End Component

export default RestaurantDetails;
