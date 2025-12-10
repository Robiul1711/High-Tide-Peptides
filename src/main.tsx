import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
  <ToastContainer/>
  <CartProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  </CartProvider>
  </StrictMode>
);
