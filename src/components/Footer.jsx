import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link
} from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 3,
        mt: 'auto',
        // Add bottom padding on mobile to account for BottomNav
        pb: { xs: 10, md: 3 }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            AguaYa
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Tu app de delivery de agua favorita
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © 2024 AguaYa. Todos los derechos reservados.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link href="/contact" color="primary" sx={{ mx: 1 }}>
              Contacto
            </Link>
            <Link href="#" color="primary" sx={{ mx: 1 }}>
              Términos
            </Link>
            <Link href="#" color="primary" sx={{ mx: 1 }}>
              Privacidad
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;