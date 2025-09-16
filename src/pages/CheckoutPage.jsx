import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useUI } from '../context/UIContext';
import { getStoreById } from '../data/stores';
import { openWhatsApp } from '../utils/whatsapp';

function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    items, 
    getTotalPrice, 
    getTotalItems,
    isEmpty,
    clearCart 
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

  const handleWhatsAppOrder = () => {
    const storeInfo = selectedStore || getStoreById(items[0]?.storeId);
    openWhatsApp(items, uiContext, uiContext, storeInfo);
    
    // Clear cart after ordering
    clearCart();
    
    // Navigate to confirmation or home
    navigate('/', { 
      state: { 
        message: 'Pedido enviado por WhatsApp. ¡Te contactaremos pronto!' 
      }
    });
  };

  const handleEditAddress = () => {
    uiContext.openAddressDialog();
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  // Redirect if cart is empty or no store
  if (isEmpty || !selectedStore) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <WarningIcon sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No hay items para procesar
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {isEmpty ? 'Tu carrito está vacío' : 'No has seleccionado una tienda'}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(isEmpty ? '/stores' : '/cart')}
            sx={{ borderRadius: 2 }}
          >
            {isEmpty ? 'Elegir tienda' : 'Ver carrito'}
          </Button>
        </Box>
      </Container>
    );
  }

  const storeInfo = selectedStore;
  const subtotal = getTotalPrice();
  const deliveryFee = storeInfo?.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  const isAddressComplete = uiContext.hasAddress;
  const isCustomerInfoComplete = uiContext.customerName && uiContext.customerPhone;

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Finalizar pedido
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Revisa tu pedido antes de enviarlo
          </Typography>
        </Box>

        {/* Validation Alerts */}
        {!isAddressComplete && (
          <Alert 
            severity="warning" 
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleEditAddress}>
                Completar
              </Button>
            }
          >
            Agrega tu dirección de entrega para continuar
          </Alert>
        )}

        {!isCustomerInfoComplete && (
          <Alert 
            severity="info" 
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleEditAddress}>
                Completar
              </Button>
            }
          >
            Agrega tu nombre y teléfono para facilitar la entrega
          </Alert>
        )}

        {/* Delivery Information */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Información de entrega
          </Typography>
          
          <List>
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary="Dirección"
                secondary={uiContext.address || 'No especificada'}
              />
              <Button variant="outlined" size="small" onClick={handleEditAddress}>
                Editar
              </Button>
            </ListItem>
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary="Horario de entrega"
                secondary={uiContext.deliveryTime || 'Lo antes posible'}
              />
            </ListItem>
            
            {uiContext.customerName && (
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Nombre"
                  secondary={uiContext.customerName}
                />
              </ListItem>
            )}
            
            {uiContext.customerPhone && (
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Teléfono"
                  secondary={uiContext.customerPhone}
                />
              </ListItem>
            )}
            
            {uiContext.notes && (
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Notas"
                  secondary={uiContext.notes}
                />
              </ListItem>
            )}
          </List>
        </Paper>

        {/* Order Summary */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Resumen del pedido
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'} de {storeInfo.name}
            </Typography>
          </Box>

          {/* Items List */}
          <List sx={{ mb: 2 }}>
            {items.map((item) => (
              <ListItem key={`${item.id}-${item.size || 'default'}`} sx={{ px: 0, py: 1 }}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1">
                        {item.quantity}x {item.name}
                      </Typography>
                      {item.size && (
                        <Chip label={item.size} size="small" variant="outlined" />
                      )}
                    </Box>
                  }
                  secondary={`${formatPrice(item.price)} c/u`}
                />
                <Typography variant="body1">
                  {formatPrice(item.price * item.quantity)}
                </Typography>
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>{formatPrice(subtotal)}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Envío</Typography>
            <Typography>{formatPrice(deliveryFee)}</Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            onClick={handleBackToCart}
            sx={{ flex: 1, borderRadius: 2 }}
          >
            Volver al carrito
          </Button>
          
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsAppOrder}
            disabled={!isAddressComplete}
            sx={{ 
              flex: 2, 
              borderRadius: 2,
              bgcolor: '#25D366',
              '&:hover': {
                bgcolor: '#128C7E'
              },
              '&:disabled': {
                bgcolor: 'action.disabled'
              }
            }}
          >
            Confirmar pedido por WhatsApp
          </Button>
        </Box>

        {/* Terms Notice */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Al confirmar tu pedido, aceptas nuestros términos y condiciones.
            Te contactaremos por WhatsApp para confirmar la disponibilidad.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default CheckoutPage;