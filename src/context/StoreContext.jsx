import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'aguaya_store_v1';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  // Load store from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSelectedStore(parsed);
      }
    } catch (error) {
      console.error('Error loading store from localStorage:', error);
    }
  }, []);

  // Save store to localStorage whenever it changes
  useEffect(() => {
    try {
      if (selectedStore) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedStore));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving store to localStorage:', error);
    }
  }, [selectedStore]);

  const selectStore = (store) => {
    setSelectedStore(store);
  };

  const clearStore = () => {
    setSelectedStore(null);
  };

  const value = {
    selectedStore,
    selectStore,
    clearStore,
    hasStore: !!selectedStore
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};