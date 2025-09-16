import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'aguaya_ui_v1';

const UIContext = createContext();

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

const defaultUIState = {
  address: '',
  deliveryTime: '',
  customerName: '',
  customerPhone: '',
  notes: ''
};

export const UIProvider = ({ children }) => {
  const [uiState, setUIState] = useState(defaultUIState);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  // Load UI state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUIState({ ...defaultUIState, ...parsed });
      }
    } catch (error) {
      console.error('Error loading UI state from localStorage:', error);
    }
  }, []);

  // Save UI state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uiState));
    } catch (error) {
      console.error('Error saving UI state to localStorage:', error);
    }
  }, [uiState]);

  const updateAddress = (address) => {
    setUIState(prev => ({ ...prev, address }));
  };

  const updateDeliveryTime = (deliveryTime) => {
    setUIState(prev => ({ ...prev, deliveryTime }));
  };

  const updateCustomerInfo = (info) => {
    setUIState(prev => ({ ...prev, ...info }));
  };

  const openAddressDialog = () => {
    setIsAddressDialogOpen(true);
  };

  const closeAddressDialog = () => {
    setIsAddressDialogOpen(false);
  };

  const value = {
    ...uiState,
    updateAddress,
    updateDeliveryTime,
    updateCustomerInfo,
    isAddressDialogOpen,
    openAddressDialog,
    closeAddressDialog,
    hasAddress: !!uiState.address,
    hasDeliveryTime: !!uiState.deliveryTime
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};