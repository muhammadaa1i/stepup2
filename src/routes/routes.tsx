import App from "@/App";
import CartPage from "@/pages/cart/cart";
import HomePage from "@/pages/home";
import LoginPage from "@/features/auth/login/login";
import ProductPage from "@/pages/products/ProductPage";
import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/register/register";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
    ]
  }
])