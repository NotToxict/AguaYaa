import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  LocalShipping as DeliveryIcon,
  Store as StoreIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { stores } from '../data/stores';

function StoresPage() {
  const navigate = useNavigate();
  const { selectStore } = useStore();
  const { clearCart, isEmpty, getCartStoreId } = useCart();
  const [confirmDialog, setConfirmDialog] = useState({ open: false, store: null });

  const handleStoreSelect = (store) => {
    const cartStoreId = getCartStoreId();
    
    // If cart has items from a different store, show confirmation
    if (!isEmpty && cartStoreId !== store.id) {
      setConfirmDialog({ open: true, store });
    } else {
      // No conflict, proceed directly
      selectStore(store);
      navigate('/catalog');
    }
  };

  const handleConfirmStoreChange = () => {
    const { store } = confirmDialog;
    clearCart();
    selectStore(store);
    setConfirmDialog({ open: false, store: null });
    navigate('/catalog');
  };

  const handleCancelStoreChange = () => {
    setConfirmDialog({ open: false, store: null });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <StoreIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Elige tu tienda
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Selecciona la tienda de tu preferencia para ver su catálogo
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {stores.map((store) => (
            <Grid key={store.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  },
                  transition: 'all 0.2s'
                }}
              >
                <Box
                  sx={{
                    height: 120,
                    backgroundImage: `url(${store.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  <Chip
                    icon={<Rating value={store.rating} readOnly size="small" />}
                    label={store.rating}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.9)'
                    }}
                  />
                </Box>
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {store.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {store.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {store.etaMin} min
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DeliveryIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Envío: {formatPrice(store.deliveryFee)}
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleStoreSelect(store)}
                    sx={{ borderRadius: 2 }}
                  >
                    Entrar a la tienda
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCancelStoreChange}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cambiar de tienda</DialogTitle>
        <DialogContent>
          <Typography>
            Cambiar de tienda vaciará tu carrito actual. ¿Deseas continuar?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelStoreChange}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmStoreChange} 
            variant="contained"
            color="primary"
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default StoresPage;