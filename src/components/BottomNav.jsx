import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ListAlt as OrdersIcon,
  Phone as ContactIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getRouteValue = (pathname) => {
    if (pathname === '/') return 0;
    if (pathname === '/catalog' || pathname === '/stores') return 1;
    if (pathname === '/orders') return 2;
    if (pathname === '/contact') return 3;
    return 0;
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/catalog');
        break;
      case 2:
        navigate('/orders');
        break;
      case 3:
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        display: { xs: 'block', md: 'none' } // Only show on mobile
      }} 
      elevation={8}
    >
      <BottomNavigation
        value={getRouteValue(location.pathname)}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction
          label="Inicio"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Catálogo"
          icon={<StoreIcon />}
        />
        <BottomNavigationAction
          label="Pedidos"
          icon={<OrdersIcon />}
        />
        <BottomNavigationAction
          label="Contacto"
          icon={<ContactIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;