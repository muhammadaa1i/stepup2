import App from "@/App";
import CartPage from "@/pages/cart/cart";
import HomePage from "@/pages/dashboard";
import LoginPage from "@/pages/login/login";
import ProductPage from "@/pages/products/product";
import RegisterPage from "@/pages/register/register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
    ]
  }
])