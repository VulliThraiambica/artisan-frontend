import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter }
from "react-router-dom";

import App from "./App.jsx";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/auth.css";
import "./styles/home.css";
import "./styles/products.css";
import "./styles/productDetails.css";
import "./styles/cart.css";
import "./styles/profile.css";
import "./styles/orders.css";
import "./styles/admin.css";
import "./styles/responsive.css";
import { CartProvider }
from "./store/cartStore";

import { AuthProvider }
from "./store/authStore";

import { Toaster }
from "react-hot-toast";


// load razorpay script
const script =
  document.createElement(
    "script"
  );

script.src =
  "https://checkout.razorpay.com/v1/checkout.js";

script.async = true;

document.body.appendChild(
  script
);


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <CartProvider>

          <Toaster
            position="top-right"
          />

          <App />

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);