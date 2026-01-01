import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const addToCart = (item, currentRestaurant) => {
    if (restaurant && restaurant._id !== currentRestaurant._id) {
      if (window.confirm("Start new order? You have items from another restaurant. Adding this will clear your current cart.")) {
        setCart([]);
        setRestaurant(currentRestaurant);
      } else {
        return;
      }
    } else if (!restaurant) {
      setRestaurant(currentRestaurant);
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(i => i._id === item._id);
      if (existingItem) {
        return prevCart.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const newCart = prevCart.reduce((acc, item) => {
        if (item._id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      if (newCart.length === 0) setRestaurant(null);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setRestaurant(null);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, restaurant, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
