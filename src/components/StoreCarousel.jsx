import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
// Importa los módulos desde 'swiper/modules' en Swiper 10/11
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * StoreCarousel
 * Props:
 *  - stores: [{ id, name, image, subtitle, rating, deliveryTime }]
 */
export default function StoreCarousel({ stores = [] }) {
  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1.1}
        breakpoints={{
          600: { slidesPerView: 2.2 },
          900: { slidesPerView: 3.2 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: true }}
        style={{ paddingBottom: 12 }}
      >
        {stores.map((store) => (
          <SwiperSlide key={store.id}>
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  height: 220,
                }}
                elevation={3}
                onClick={() => {
                  console.log("Open store", store.id);
                }}
              >
                {store.image && (
                  <CardMedia
                    component="img"
                    height="120"
                    image={store.image}
                    alt={store.name}
                    loading="lazy"
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flex: 1, pt: 1 }}>
                  <Typography variant="subtitle1" component="div" noWrap>
                    {store.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {store.subtitle}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      ⭐ {store.rating ?? "—"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      • {store.deliveryTime ?? "—"} min
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}