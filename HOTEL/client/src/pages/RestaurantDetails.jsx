import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Star, Clock, Plus, Minus } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-gray-500">{restaurant.cuisine}</p>
            <p className="text-gray-400 text-sm mt-1">{restaurant.deliveryTime} delivery</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center bg-green-700 text-white px-3 py-1.5 rounded-lg shadow cursor-default">
            <span className="text-lg font-bold mr-1">{restaurant.rating}</span>
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>
      </div>

      {/* Menu */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Menu</h2>
      <div className="space-y-6">
        {restaurant.menu.map((item) => (
          <div key={item._id} className="flex justify-between items-start border-b border-dotted border-gray-300 pb-6">
            <div className="flex-1 pr-4">
              <div className="flex items-center mb-1">
                {item.isVeg ? (
                  <span className="border border-green-600 rounded-sm p-[1px] mr-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  </span>
                ) : (
                  <span className="border border-red-600 rounded-sm p-[1px] mr-2">
                    <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                  </span>
                )}
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              </div>
              <p className="text-gray-900 font-medium text-sm">₹{item.price}</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
            </div>

            <div className="relative w-32 h-24 flex-shrink-0">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              )}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 shadow-lg bg-white rounded-lg border border-gray-200 w-24 flex items-center justify-between p-1">
                {getQuantity(item._id) > 0 ? (
                  <>
                    <button onClick={() => updateQuantity(item._id, -1)} className="text-primary font-bold px-2">-</button>
                    <span className="text-sm font-bold text-primary">{getQuantity(item._id)}</span>
                    <button onClick={() => addToCart(item, restaurant._id, restaurant.name)} className="text-primary font-bold px-2">+</button>
                  </>
                ) : (
                  <button onClick={() => addToCart(item, restaurant._id, restaurant.name)} className="w-full text-primary font-bold text-sm py-1">ADD</button>
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
