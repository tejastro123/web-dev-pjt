import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, restaurant, removeFromCart, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please login to place order');
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        user: user.name, // Or ID if available in specific format
        restaurant: restaurant._id,
        items: cart.map(item => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: cartTotal
      };

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { 'x-auth-token': token }
      });

      alert('Order Placed Successfully!');
      clearCart();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  if (cart.length === 0) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}><h2>Your Cart is Empty</h2></div>;
  }

  return (
    <div className="container">
      <div className="cart-summary">
        <h2>Cart</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>From: {restaurant.name}</p>

        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={`veg-icon ${item.isVeg ? 'veg' : 'non-veg'}`} style={{ marginRight: '1rem' }}>
                <div className="dot"></div>
              </div>
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price * item.quantity}</p>
              </div>
            </div>
            <div className="qty-controls">
              <button className="qty-btn" onClick={() => removeFromCart(item._id)}>-</button>
              <span>{item.quantity}</span>
              {/* Reuse add logic if needed or keep simple */}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>To Pay</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
