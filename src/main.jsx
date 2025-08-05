import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavoritesProvider } from "./services/FavoritesContext"; // путь проверь
import { CartProvider } from "./services/CartContext";          // если используешь
import { AuthProvider } from "./services/AuthContext";          // если используешь

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  </AuthProvider>
);
