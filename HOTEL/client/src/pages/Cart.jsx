import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    // Simple Guest Order Logic
    const orderData = {
      userAddress: "Guest Address, City", // Hardcoded for MVP or replace with prompt
      restaurant: cart[0].restaurantId,
      items: cart.map(item => ({
        foodItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: cartTotal,
      userName: "Guest User"
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      alert("Order Placed Successfully!");
      clearCart();
      navigate('/');
    } catch (error) {
      console.error("Order Failed", error);
      alert("Failed to place order.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <img src="https://b.zmtcdn.com/web_assets/b41537ed4053a22ae6c402e1771960151613543923.png" alt="Empty Cart" className="w-64 mx-auto mb-6" />
        <h3 className="text-xl font-bold text-gray-700">Cart is empty</h3>
        <p className="text-gray-500 mb-6">Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
        <Link to="/" className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 bg-gray-200 rounded mr-4">
            {/* Restaurant Image Placeholder */}
            <img src="https://b.zmtcdn.com/data/pictures/chains/1/50471/6a92ed20197b1029c2014b2161c77841.jpg" alt="" className="h-full w-full object-cover rounded" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{cart[0].restaurantName}</h3>
            <p className="text-gray-500 text-xs">Delivery in 30-40 mins</p>
          </div>
        </div>

        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-start">
                  <div className={item.isVeg ? "h-3 w-3 border border-green-600 rounded-sm p-[1px] mt-1 mr-2 flex justify-center items-center" : "h-3 w-3 border border-red-600 rounded-sm p-[1px] mt-1 mr-2 flex justify-center items-center"}>
                    <div className={item.isVeg ? "h-1.5 w-1.5 bg-green-600 rounded-full" : "h-1.5 w-1.5 bg-red-600 rounded-full"}></div>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">₹{item.price}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white shadow-sm">
                <button onClick={() => updateQuantity(item._id, -1)} className="text-primary font-bold px-2">-</button>
                <span className="text-primary text-sm font-bold mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)} className="text-primary font-bold px-2">+</button>
              </div>
              <div className="w-16 text-right text-gray-700 text-sm font-medium">
                ₹{item.price * item.quantity}
              </div>
              <button onClick={() => removeFromCart(item._id)} className="ml-4 text-gray-400 hover:text-red-500 text-xs">✕</button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Item Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Delivery Partner Fee</span>
            <span>₹40</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Platform Fee</span>
            <span>₹5</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>GST and Restaurant Charges</span>
            <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-800">
            <span>To Pay</span>
            <span>₹{(cartTotal + 45 + (cartTotal * 0.05)).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] md:static md:shadow-none md:bg-transparent md:p-0">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-primary text-white font-bold text-lg py-3 rounded-lg hover:bg-red-600 transition shadow-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
