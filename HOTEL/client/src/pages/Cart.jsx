import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('UPI');
  const [isAddressEditing, setIsAddressEditing] = React.useState(false);

  React.useEffect(() => {
    if (user && user.address) {
      setAddress(user.address);
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    if (!address) {
      toast.error("Please provide a delivery address");
      return;
    }

    const orderData = {
      userAddress: address,
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
      toast.success("Order Placed Successfully!");
      clearCart();
      navigate('/order-tracking');
    } catch (error) {
      console.error("Order Failed", error);
      toast.error("Failed to place order.");
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

      <div className="cart-card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '600' }}>Delivery Address</h2>
        {(!address || isAddressEditing) ? (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ flex: 1, padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem' }}
            />
            <button onClick={() => setIsAddressEditing(false)} style={{ padding: '0 1rem', background: '#e23744', color: 'white', border: 'none', borderRadius: '0.5rem' }}>Save</button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e8e8e8', borderRadius: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ background: '#f8f8f8', padding: '0.5rem', borderRadius: '50%' }}>🏠</span>
              <div>
                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>Home</p>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>{address}</p>
              </div>
            </div>
            <button onClick={() => setIsAddressEditing(true)} style={{ color: '#e23744', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>CHANGE</button>
          </div>
        )}

        <h2 style={{ fontSize: '1.2rem', margin: '1.5rem 0 1rem', fontWeight: '600' }}>Payment Method</h2>
        <div className="payment-options" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['UPI', 'Credit/Debit Cards', 'Net Banking', 'Cash on Delivery'].map(method => (
            <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${paymentMethod === method ? '#e23744' : '#e8e8e8'}`, borderRadius: '0.5rem', cursor: 'pointer', background: paymentMethod === method ? '#fff5f6' : 'white' }}>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                style={{ accentColor: '#e23744' }}
              />
              <span style={{ fontWeight: '500', color: '#1c1c1c' }}>{method}</span>
            </label>
          ))}
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
};
export default Cart;
