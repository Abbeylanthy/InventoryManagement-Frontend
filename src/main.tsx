
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
 <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer position="top-right" />
    </AuthProvider>
  </BrowserRouter>
</QueryClientProvider>
);