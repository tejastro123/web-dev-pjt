import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
      <img src={restaurant.image} alt={restaurant.name} className="card-img" />
      <div className="card-info">
        <div className="card-header">
          <div className="card-name">{restaurant.name}</div>
          <div className="rating">{restaurant.rating} ★</div>
        </div>
        <div className="cuisine">{restaurant.cuisine.join(', ')}</div>
        <div className="meta">
          <div>{restaurant.address}</div>
          <div>{restaurant.deliveryTime} mins</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
