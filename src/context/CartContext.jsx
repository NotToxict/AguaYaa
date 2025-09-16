import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'aguaya_cart_v1';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (product, quantity = 1, size = null) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        // Add new item
        return [...prevItems, {
          id: product.id,
          storeId: product.storeId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          size: size || (product.sizes && product.sizes[0]) || null
        }];
      }
    });
  };

  const removeItem = (productId, size = null) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size = null, quantity) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const clearCartForStore = (storeId) => {
    setItems(prevItems => prevItems.filter(item => item.storeId !== storeId));
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartStoreId = () => {
    return items.length > 0 ? items[0].storeId : null;
  };

  const hasItemsFromDifferentStore = (storeId) => {
    const cartStoreId = getCartStoreId();
    return cartStoreId && cartStoreId !== storeId;
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    clearCartForStore,
    getTotalItems,
    getTotalPrice,
    getCartStoreId,
    hasItemsFromDifferentStore,
    isEmpty: items.length === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};