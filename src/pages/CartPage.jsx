import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
  Alert,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  WhatsApp as WhatsAppIcon,
  Store as StoreIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useUI } from '../context/UIContext';
import { getStoreById } from '../data/stores';
import { openWhatsApp } from '../utils/whatsapp';

function CartPage() {
  const navigate = useNavigate();
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice, 
    getTotalItems,
    isEmpty 
  } = useCart();
  const { selectedStore } = useStore();
  const uiContext = useUI();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    updateQuantity(item.id, item.size, newQuantity);
  };

  const handleRemoveItem = (item) => {
    removeItem(item.id, item.size);
  };

  const handleWhatsAppOrder = () => {
    const storeInfo = selectedStore || getStoreById(items[0]?.storeId);
    openWhatsApp(items, uiContext, uiContext, storeInfo);
  };

  const handleContinueShopping = () => {
    if (selectedStore) {
      navigate('/catalog');
    } else {
      navigate('/stores');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (isEmpty) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <CartIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Agrega productos para comenzar tu pedido
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinueShopping}
            sx={{ borderRadius: 2 }}
          >
            {selectedStore ? 'Ver catálogo' : 'Elegir tienda'}
          </Button>
        </Box>
      </Container>
    );
  }

  const storeInfo = selectedStore || getStoreById(items[0]?.storeId);
  const subtotal = getTotalPrice();
  const deliveryFee = storeInfo?.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Tu carrito
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'}
          </Typography>
        </Box>

        {/* Store Info */}
        {storeInfo && (
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StoreIcon color="primary" />
              <Typography variant="h6">{storeInfo.name}</Typography>
              <Chip 
                label={`🕒 ${storeInfo.etaMin} min`} 
                size="small" 
                variant="outlined"
              />
            </Box>
          </Paper>
        )}

        {/* Cart Items */}
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <List>
            {items.map((item, index) => (
              <React.Fragment key={`${item.id}-${item.size || 'default'}`}>
                <ListItem sx={{ py: 2 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 60, height: 60 }}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box>
                        <Typography variant="h6">
                          {item.name}
                        </Typography>
                        {item.size && (
                          <Chip 
                            label={item.size} 
                            size="small" 
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(item.price)} c/u
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                          {formatPrice(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    }
                    sx={{ ml: 2 }}
                  />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton 
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={item.quantity <= 1}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    
                    <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    
                    <IconButton 
                      onClick={() => handleQuantityChange(item, 1)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                    
                    <IconButton 
                      onClick={() => handleRemoveItem(item)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                
                {index < items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Order Summary */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Resumen del pedido
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>{formatPrice(subtotal)}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Envío</Typography>
            <Typography>{formatPrice(deliveryFee)}</Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {formatPrice(total)}
            </Typography>
          </Box>
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            variant="outlined"
            onClick={handleContinueShopping}
            sx={{ flex: 1, borderRadius: 2 }}
          >
            Seguir comprando
          </Button>
          
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsAppOrder}
            sx={{ 
              flex: 1, 
              borderRadius: 2,
              bgcolor: '#25D366',
              '&:hover': {
                bgcolor: '#128C7E'
              }
            }}
          >
            Ordenar por WhatsApp
          </Button>
          
          <Button
            variant="contained"
            onClick={handleCheckout}
            sx={{ flex: 1, borderRadius: 2 }}
          >
            Proceder al checkout
          </Button>
        </Box>

        {/* Clear Cart */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            color="error"
            onClick={clearCart}
            sx={{ borderRadius: 2 }}
          >
            Vaciar carrito
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CartPage;