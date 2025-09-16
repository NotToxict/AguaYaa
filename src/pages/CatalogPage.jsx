import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  Button,
  Chip
} from '@mui/material';
import {
  Store as StoreIcon,
  ShoppingBasket as CatalogIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { getProductsByStoreId } from '../data/stores';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';

function CatalogPage() {
  const navigate = useNavigate();
  const { selectedStore } = useStore();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // Redirect to stores if no store selected
  useEffect(() => {
    if (!selectedStore) {
      navigate('/stores');
      return;
    }

    // Load products for selected store
    const storeProducts = getProductsByStoreId(selectedStore.id);
    setProducts(storeProducts);
  }, [selectedStore, navigate]);

  const handleProductQuickView = (product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    setSelectedProduct(null);
  };

  // Don't render if no store (will redirect)
  if (!selectedStore) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Store Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <StoreIcon color="primary" />
            <Typography variant="h5" component="h1">
              {selectedStore.name}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {selectedStore.description}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`⭐ ${selectedStore.rating}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`🕒 ${selectedStore.etaMin} min`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`🚚 ${formatPrice(selectedStore.deliveryFee)}`}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Products Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CatalogIcon color="primary" />
            <Typography variant="h6">
              Productos disponibles
            </Typography>
          </Box>

          {products.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body1">
                Esta tienda no tiene productos disponibles en este momento.
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/stores')}
                sx={{ mt: 1 }}
              >
                Cambiar de tienda
              </Button>
            </Alert>
          ) : (
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard 
                    product={product} 
                    onQuickView={handleProductQuickView}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Product Quick View */}
      <ProductQuickView
        product={selectedProduct}
        open={quickViewOpen}
        onClose={handleCloseQuickView}
      />
    </Container>
  );
}

export default CatalogPage;