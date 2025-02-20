import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Login from "./components/Login/Login.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {" "}
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
