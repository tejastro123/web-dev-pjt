import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    // Simple Guest Order Logic or User Order
    const orderData = {
      userAddress: user ? user.address || "Saved Address, City" : "Guest Address, City", // Use user address if avail
      restaurant: cart[0].restaurantId,
      items: cart.map(item => ({
        foodItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: cartTotal,
      userName: user ? user.username : "Guest User",
      userId: user ? user._id : null
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      alert("Order Placed Successfully!");
      clearCart();
      navigate(user ? '/profile' : '/');
    } catch (error) {
      console.error("Order Failed", error);
      alert("Failed to place order.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <img src="https://b.zmtcdn.com/web_assets/b41537ed4053a22ae6c402e1771960151613543923.png" alt="Empty Cart" className="cart-empty-img" />
        <h3 className="cart-empty-title">Cart is empty</h3>
        <p className="cart-empty-text">Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
        <Link to="/" className="browse-btn">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-page-title">Your Cart</h1>
      <div className="cart-card">
        <div className="restaurant-info">
          <div className="restaurant-img-placeholder">
            {/* Restaurant Image Placeholder */}
            <img src="https://b.zmtcdn.com/data/pictures/chains/1/50471/6a92ed20197b1029c2014b2161c77841.jpg" alt="" className="restaurant-img" />
          </div>
          <div>
            <h3 className="restaurant-name">{cart[0].restaurantName}</h3>
            <p className="delivery-info">Delivery in 30-40 mins</p>
          </div>
        </div>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="item-details">
                <div className="item-info-flex">
                  <div className={item.isVeg ? "veg-icon-container" : "non-veg-icon-container"}>
                    <div className={item.isVeg ? "veg-dot-sm" : "non-veg-dot-sm"}></div>
                  </div>
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                </div>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item._id, -1)} className="qty-btn">-</button>
                <span className="qty-text">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)} className="qty-btn">+</button>
              </div>
              <div className="item-total">
                ₹{item.price * item.quantity}
              </div>
              <button onClick={() => removeFromCart(item._id)} className="remove-btn">✕</button>
            </div>
          ))}
        </div>

        <div className="bill-details">
          <div className="bill-row">
            <span>Item Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="bill-row">
            <span>Delivery Partner Fee</span>
            <span>₹40</span>
          </div>
          <div className="bill-row">
            <span>Platform Fee</span>
            <span>₹5</span>
          </div>
          <div className="bill-row">
            <span>GST and Restaurant Charges</span>
            <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
          </div>
          <div className="to-pay-row">
            <span>To Pay</span>
            <span>₹{(cartTotal + 45 + (cartTotal * 0.05)).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="place-order-sticky">
        <button
          onClick={handlePlaceOrder}
          className="place-order-btn"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
