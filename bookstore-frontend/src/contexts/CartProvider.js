import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Define a computed property that returns the cart items for the current user
  const addToCart = async (item) => {
    setCartItems([...cartItems, item]);
  };

  // Define a function to remove an item from the cart
  const removeFromCart = async (itemId) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Define a function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Define a computed property that returns the cart items for the current user
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};