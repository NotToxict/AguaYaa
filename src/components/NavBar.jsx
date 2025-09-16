import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Chip,
  Box,
  IconButton,
  Badge
} from '@mui/material';
import {
  Store as StoreIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedStore } = useStore();
  const { getTotalItems } = useCart();

  const handleStoreClick = () => {
    navigate('/stores');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const isCartPage = location.pathname === '/cart';

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={handleHomeClick}
        >
          AguaYa
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Store Chip */}
          <Chip
            icon={<StoreIcon />}
            label={selectedStore ? selectedStore.name : 'Elegir tienda'}
            onClick={handleStoreClick}
            variant={selectedStore ? 'filled' : 'outlined'}
            color={selectedStore ? 'secondary' : 'default'}
            sx={{
              color: selectedStore ? 'white' : 'inherit',
              borderColor: selectedStore ? 'secondary.main' : 'rgba(255,255,255,0.5)',
              '&:hover': {
                backgroundColor: selectedStore ? 'secondary.dark' : 'rgba(255,255,255,0.1)'
              }
            }}
          />

          {/* Cart Icon - Hidden on xs/sm (mobile) since we have FloatingCartFab */}
          {!isCartPage && (
            <IconButton
              color="inherit"
              onClick={handleCartClick}
              sx={{ 
                display: { xs: 'none', md: 'inline-flex' }
              }}
            >
              <Badge badgeContent={getTotalItems()} color="error">
                <CartIcon />
              </Badge>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;