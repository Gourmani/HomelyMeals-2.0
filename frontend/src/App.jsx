import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./utils/ProtectedRoute"

import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import MealDetails from "./pages/MealDetails"
import Subscriptions from "./pages/Subscriptions"
import Footer from "./components/Footer"
import AdminDashboard from "./admin/AdminDashboard"
import AdminMeals from "./admin/AdminMeals"
import AdminOrders from "./admin/AdminOrders"
import AdminUsers from "./admin/AdminUsers"
import CartProvider from "./context/CartContext"
import OrderSuccess from "./pages/OrderSuccess"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyEmail from "./pages/VerifyEmail"

function App() {
  return (
    <CartProvider>
      <BrowserRouter>

        <Toaster position="top-right" />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/meal/:id" element={<MealDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/meals" element={<AdminMeals />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </CartProvider>
  )
}

export default App