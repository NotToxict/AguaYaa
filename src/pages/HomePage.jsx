import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" component="h1">
        Bienvenido a AguaYa
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Página inicial lista. Dime qué contenido agregamos y lo implemento.
      </Typography>
    </Container>
  );
}