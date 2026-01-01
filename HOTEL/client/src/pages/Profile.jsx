import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // orders, info

  useEffect(() => {
    if (activeTab === 'orders') {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = { headers: { 'x-auth-token': token } };
          const res = await axios.get('http://localhost:5000/api/orders/myorders', config);
          setOrders(res.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab]);

  return (
    <div className="profile-container">
      {/* Sidebar / Header Info */}
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user?.username}</h1>
          <p className="profile-email">{user?.email}</p>
        </div>
        <button onClick={logout} className="logout-btn-mobile">Logout</button>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Account Settings
        </button>
      </div>

      {/* Content */}
      <div className="profile-content">
        {activeTab === 'orders' && (
          <div className="orders-list">
            <h2 className="section-title">Past Orders</h2>
            {loading ? <p>Loading orders...</p> : orders.length === 0 ? (
              <p className="no-orders text-gray-500">No orders found.</p>
            ) : (
              orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div className="order-restaurant-info">
                      <img src={order.restaurant?.image || 'https://b.zmtcdn.com/data/pictures/chains/1/50471/6a92ed20197b1029c2014b2161c77841.jpg'} className="order-rest-img" alt="" />
                      <div>
                        <h3 className="order-rest-name">{order.restaurant?.name || 'Restaurant'}</h3>
                        <p className="order-rest-location">{order.restaurant?.address || 'Location'}</p>
                      </div>
                    </div>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-items">
                    <p>ITEM: {order.items.map(i => `${i.name} x ${i.quantity}`).join(', ')}</p>
                    <p className="order-date">ORDERED ON: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <div className="order-footer">
                    <span className="total-amount">Total Amount: ₹{order.totalAmount}</span>
                    {/* <button className="reorder-btn">Reorder</button> */}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="account-settings">
            <h2 className="section-title">Edit Profile</h2>
            <p className="text-gray-500">Feature coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
