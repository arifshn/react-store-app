import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../features/HomePage";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetailsPage from "../features/catalog/ProductDetailsPage";
import ErrorPage from "../features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";
import LoginPage from "../features/account/LoginPage";
import RegisterPage from "../features/account/RegisterPage";
import AdminLayout from "../features/admin/AdminLayout";
import OrdersPage from "../features/admin/OrdersPage";
import ProductsPage from "../features/admin/ProductsPage";
import CustomersPage from "../features/admin/CustomersPage";
import IntegrationPage from "../features/admin/IntegrationPage";
import CheckoutPage from "../features/checkout/CheckoutPage";
import AuthGuard from "./AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "cart", element: <ShoppingCartPage /> },
      { path: "catalog/:id", element: <ProductDetailsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <AuthGuard />,
        children: [{ path: "checkout", element: <CheckoutPage /> }],
      },
      { path: "error", element: <ErrorPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate to={"/not-found"} /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin/products", element: <ProductsPage /> },
      { path: "/admin/orders", element: <OrdersPage /> },
      { path: "/admin/customers", element: <CustomersPage /> },
      { path: "/admin/integration", element: <IntegrationPage /> },
    ],
  },
]);
