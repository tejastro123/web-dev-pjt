import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShoppingCart, User, Menu } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-flex">
          {/* Logo */}
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Zomato</h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="search-bar-desktop">
            <div className="location-container">
              <MapPin className="location-icon" />
              <span className="location-text">Location</span>
            </div>
            <Search className="search-icon" />
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search for restaurant, cuisine or a dish"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* Right Menu */}
          <div className="nav-links">
            <Link to="/cart" className="nav-item">
              <ShoppingCart className="nav-icon" />
              <span className="nav-text">Cart</span>
            </Link>
            {user ? (
              <div className="nav-item cursor-pointer group relative">
                <div className="flex items-center">
                  <User className="nav-icon" />
                  <span className="nav-text">{user.username}</span>
                </div>
                {/* Simple Dropdown for Logout */}
                <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2 hidden group-hover:block w-32 border border-gray-100 z-50">
                  <Link to="/profile" className="block text-gray-700 w-full text-left p-2 hover:bg-gray-50 rounded text-sm mb-1">Profile</Link>
                  <button onClick={logout} className="text-red-500 font-bold w-full text-left p-2 hover:bg-gray-50 rounded text-sm">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="nav-item">
                <User className="nav-icon" />
                <span className="nav-text">Log in</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search - Below Navbar */}
      <div className="mobile-search-container">
        <div className="mobile-search-box">
          <Search className="search-icon mr-2" />
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              placeholder="Search..."
              className="mobile-search-input"
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
