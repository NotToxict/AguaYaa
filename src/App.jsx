import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import NavBar from './components/NavBar';
import AddressBar from './components/AddressBar';
import AddressDialog from './components/AddressDialog';
import ProductQuickView from './components/ProductQuickView';
import FloatingCartFab from './components/FloatingCartFab';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';

function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <UIProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }}
          >
            <NavBar />
            <AddressBar />
            
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Outlet />
            </Box>
            
            <Footer />
            
            {/* Mobile Components */}
            <FloatingCartFab />
            <BottomNav />
            
            {/* Dialogs and Overlays */}
            <AddressDialog />
          </Box>
        </UIProvider>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;