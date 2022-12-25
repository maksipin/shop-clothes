import MainPage from "./pages/MainPage";
import ProductsListPage from "./pages/ProductsListPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductLayout from "./layout/ProductLayout";
import ShoppingCartLayout from "./layout/ShoppingCartLayout";
import ProductPage from "./pages/ProductPage";
import DashboardLayout from "./layout/DashboardLayout";
import Types from "./pages/admin/Types";
import Products from "./pages/admin/Products";
import Sizes from "./pages/admin/Sizes";
import Colors from "./pages/admin/Colors";
import EditProduct from "./components/Admin/EditProduct";
import SignLayout from "./layout/SignLayout";
import RegisterForm from "./components/form/registerForm";
import LoginForm from "./components/form/loginForm";
import LogOut from "./layout/logOut";
import FavoritePage from "./pages/FavoritesPage";
import CartOrder from "./pages/CartOrder";
import { Navigate } from "react-router-dom";

const routes = (auth, location) => [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "auth",
    element: <SignLayout />,
    children: [
      {
        path: "",
        element: <LoginForm />,
      },
      {
        path: "signIn",
        element: <RegisterForm />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
    ],
  },

  {
    path: "products",
    // element: <ProductLayout />,
    children: [
      {
        path: "",
        element: <ProductLayout />,
      },
      {
        path: ":productType",
        element: <ProductsListPage />,
      },
      {
        path: ":productType/:productId",
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "favorite",
    element: <FavoritePage />,
  },
  {
    path: "shopping-cart",
    element: <ShoppingCartLayout />,
    children: [
      { path: "", element: <ShoppingCartPage /> },
      { path: "order", element: <CartOrder /> },
    ],
  },
  {
    path: "dashboard",
    element: auth?.role ? <DashboardLayout /> : <Navigate to="../" />,

    children: [
      {
        path: "type",
        element: <Types />,
      },
      {
        path: "product",
        element: <Products />,
      },
      {
        path: "product/:productId",
        element: <EditProduct />,
      },

      {
        path: "size",
        element: <Sizes />,
      },
      {
        path: "color",
        element: <Colors />,
      },
    ],
  },
];

export default routes;
