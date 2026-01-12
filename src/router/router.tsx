import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/sites/Home";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import Catalogue from "../pages/CataloguePage/Catalogue";
import Contact from "../pages/ContactPage/Contact";
import CartPage from "../pages/ShoopingCartPage/CartPage";
import ProductDetails from "../pages/ProductDetailPage/ProductDetails";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import TermsOfService from "../pages/TermsofService/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Sitemap from "../pages/Sitemap/Sitemap";

const router = createBrowserRouter([
      // Auth
  // {
  //   path: "/auth",
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: "sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       path: "sign-up",
  //       element: <SignUp />,
  //     },
  //     {
  //       path: "forget-password",
  //       element: <ForgetPassword />,
  //     },
  //     {
  //       path: "verify-otp",
  //       element: <VerifyOtp />,
  //     },
  //     {
  //       path: "new-password-set",
  //       element: <NewPasswordSet />,
  //     },
  //   ],
  // },  
  {
    path: "/",
    element: <Layout />, // Public layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/catalog", element: <Catalogue /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/sitemap", element: <Sitemap /> },

      // Add more public pages here
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />, // Admin layout
    children: [
      // /dashboard/add-admin
      // Add more admin pages here
    ],
  },
]);

export default router;
