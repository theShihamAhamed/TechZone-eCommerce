import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/signUpPage.jsx";
import HomePage from "./pages/homePage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import { useUserStore } from "./store/useUserStore.js";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useCartStore } from "./store/useCartStore.js";
import Dashboard from "./pages/DashboardPage.jsx";
import Navbar from "./components/Navbar.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import { Toaster } from "react-hot-toast";
import ProductDetailsPage from "./pages/productDetailPage.jsx";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();
  const { getCartItems } = useCartStore();

  const isAdmin = user?.role === "admin";
  const isSeller = user?.role === "seller";
  const secretDashboard = isAdmin || isSeller;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth || user === undefined) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/sign-up"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/secret-dashboard"
          element={
            secretDashboard ? (
              <Dashboard />
            ) : (
              (console.log("Unauthorized access, redirecting to home"),
              (<Navigate to="/" />))
            )
          }
        />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:productID" element={<ProductDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
