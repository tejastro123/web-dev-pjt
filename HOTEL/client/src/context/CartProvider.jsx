import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem('zomato-cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zomato-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, restaurantId, restaurantName) => {
    setCart(prevCart => {
      // Check if adding from different restaurant. Zomato usually limits to one restaurant per order or clears previous.
      // For MVP, if cart has items from different restaurant, we can prompt or clear. Let's just clear for simplicity if different.
      if (prevCart.length > 0 && prevCart[0].restaurantId !== restaurantId) {
        if (!window.confirm("Start a new basket? Previous items will be cleared.")) return prevCart;
        return [{ ...item, quantity: 1, restaurantId, restaurantName }];
      }

      const existingItem = prevCart.find(i => i._id === item._id);
      if (existingItem) {
        return prevCart.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1, restaurantId, restaurantName }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(i => i._id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prevCart => prevCart.map(i => {
      if (i._id === itemId) return { ...i, quantity: Math.max(0, i.quantity + delta) };
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
