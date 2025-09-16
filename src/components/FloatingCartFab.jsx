import React from 'react';
import {
  Fab,
  Badge,
  Box
} from '@mui/material';
import {
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function FloatingCartFab() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems, isEmpty } = useCart();

  const handleCartClick = () => {
    navigate('/cart');
  };

  // Don't show on cart page or if cart is empty
  if (location.pathname === '/cart' || isEmpty) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 80, // Above the BottomNav
        right: 16,
        zIndex: 1001,
        display: { xs: 'block', md: 'none' } // Only show on mobile
      }}
    >
      <Badge badgeContent={getTotalItems()} color="error">
        <Fab
          color="primary"
          onClick={handleCartClick}
          sx={{
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6
            }
          }}
        >
          <CartIcon />
        </Fab>
      </Badge>
    </Box>
  );
}

export default FloatingCartFab;