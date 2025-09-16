import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import {
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { BUSINESS_PHONE } from '../config/app';

function ContactPage() {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Hola, tengo una consulta sobre AguaYa.');
    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${message}`, '_blank');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <PhoneIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ¿Necesitas ayuda? Estamos aquí para ti
          </Typography>
        </Box>

        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Información de contacto
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <WhatsAppIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="WhatsApp"
                secondary="La forma más rápida de contactarnos"
              />
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                onClick={handleWhatsAppContact}
                sx={{
                  bgcolor: '#25D366',
                  '&:hover': {
                    bgcolor: '#128C7E'
                  }
                }}
              >
                Chatear
              </Button>
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Teléfono"
                secondary={BUSINESS_PHONE || 'Próximamente disponible'}
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Email"
                secondary="contacto@aguaya.com"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <LocationIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Dirección"
                secondary="Servicio a domicilio en toda la ciudad"
              />
            </ListItem>
          </List>
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Horarios de atención
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Lunes a Viernes:</strong> 8:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Sábados:</strong> 9:00 AM - 5:00 PM
            </Typography>
            <Typography variant="body1">
              <strong>Domingos:</strong> 10:00 AM - 4:00 PM
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default ContactPage;