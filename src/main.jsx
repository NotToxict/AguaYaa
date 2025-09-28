import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import HomePage from "./pages/HomePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // ajusta si tu export es default

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Aquí vive el Header
    children: [
      { index: true, element: <HomePage /> },
      { path: "checkout", element: <CheckoutPage /> },
      // Puedes ir agregando más rutas hijas aquí
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2200}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </CartProvider>
  </React.StrictMode>
);