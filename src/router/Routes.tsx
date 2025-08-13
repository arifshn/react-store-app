import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../features/pages/HomePage";
import AboutPage from "../features/pages/AboutPage";
import ContactPage from "../features/pages/ContactPage";
import ErrorPage from "../features/pages/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/pages/ShoppingCartPage";
import RegisterPage from "../features/account/pages/RegisterPage";
import ProductsPage from "../features/admin/pages/ProductsPage";
import IntegrationPage from "../features/admin/pages/IntegrationPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import AuthGuard from "./AuthGuard";
import OrderList from "../features/orders/pages/OrderList";
import CategoriesPage from "../features/admin/pages/CategoriesPage";
import FavoritePage from "../features/favorite/pages/FavoritePage";
import CatalogPage from "../features/catalog/pages/CatalogPage";
import ProductDetailsPage from "../features/catalog/pages/ProductDetailsPage";
import LoginPage from "../features/account/pages/LoginPage";
import AdminLayout from "../features/admin/pages/AdminLayout";
import OrdersPage from "../features/admin/pages/OrdersPage";
import ReviewPage from "../features/review/pages/ReviewTestPage";

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
      { path: "favorities", element: <FavoritePage /> },
      { path: "review", element: <ReviewPage /> },
      {
        element: <AuthGuard />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "orders", element: <OrderList /> },
        ],
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
      { path: "/admin/categories", element: <CategoriesPage /> },
      { path: "/admin/integration", element: <IntegrationPage /> },
    ],
  },
]);
