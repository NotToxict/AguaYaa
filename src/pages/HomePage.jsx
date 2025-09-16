import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AnimatedHero from "../components/AnimatedHero";
import StoreCarousel from "../components/StoreCarousel";
// Si ya tienes un archivo con stores, importa ese array:
import stores from "../data/stores";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <AnimatedHero
        title="AguaYa — Tiendas cerca de ti"
        subtitle="Ofertas y productos destacadas de tus tiendas favoritas"
        ctaText="Ver tiendas"
        onCta={() => {
          // navegar a stores o abrir modal
          window.scrollTo({ top: 400, behavior: "smooth" });
        }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Tiendas destacadas
        </Typography>
        <StoreCarousel stores={stores} />
      </Box>

      {/* Más secciones: ofertas, categorías, productos recomendados */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ofertas para ti
        </Typography>
        {/* aquí podrías poner otro carrusel de productos */}
      </Box>
    </Container>
  );
}