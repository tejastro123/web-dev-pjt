import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShoppingCart, User, Menu } from 'lucide-react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-extrabold text-primary italic">Zomato</h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8 max-w-2xl bg-white border border-gray-300 rounded-lg shadow-sm p-2 items-center space-x-2">
            <div className="flex items-center text-gray-400 border-r border-gray-300 pr-2">
              <MapPin className="h-5 w-5 mr-1" />
              <span className="text-sm">Location</span>
            </div>
            <Search className="h-5 w-5 text-gray-400" />
            <form onSubmit={handleSearch} className="flex-1">
              <input
                type="text"
                placeholder="Search for restaurant, cuisine or a dish"
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-6 text-lg text-gray-500 font-light">
            <Link to="/cart" className="hover:text-primary transition flex items-center">
              <ShoppingCart className="h-6 w-6 mr-1" />
              <span className="hidden sm:block">Cart</span>
            </Link>
            <Link to="/login" className="hover:text-primary transition flex items-center">
              <User className="h-6 w-6 mr-1" />
              <span className="hidden sm:block">Log in</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search - Below Navbar */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm p-2">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
