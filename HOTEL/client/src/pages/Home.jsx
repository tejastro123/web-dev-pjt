import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/restaurants?search=${searchQuery}`);
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero / Filter Section - Simplified for MVP */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Delivery Restaurants in Your City</h2>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="group hover:shadow-xl transition rounded-xl overflow-hidden border border-transparent hover:border-gray-200">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-xs font-bold shadow">
                  {restaurant.deliveryTime}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-gray-900 truncate">{restaurant.name}</h3>
                  <span className="bg-green-600 text-white text-sm px-1.5 py-0.5 rounded font-bold">{restaurant.rating} ★</span>
                </div>
                <p className="text-gray-500 text-sm truncate">{restaurant.cuisine}</p>
                <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
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
