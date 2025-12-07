import App from "@/App";
import CartPage from "@/pages/CartPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import ProductPage from "@/pages/ProductPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
    ]
  }
])