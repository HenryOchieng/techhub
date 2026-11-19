import { useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import useProductStore from "./store/productStore"
import useAuthStore from "./store/authStore";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import CustomerLayout from "./components/layout/CustomerLayout"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Categories from "./pages/Categories"
import Deals from "./pages/Deals"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import Payment from "./pages/Payment"
import OrderSuccess from "./pages/OrderSuccess"
import Orders from "./pages/Orders"
import OrderDetails from "./pages/OrderDetails"
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account"
import Login from "./pages/Login"
import Register from "./pages/Register"

import AdminLayout from "./components/admin/AdminLayout"
import AdminDashBoard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts"
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminInventoryHistory from "./pages/admin/AdminInventoryHistory";

function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const fetchCurrentUser = useAuthStore(
    (state) => state.fetchCurrentUser
  )

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return (
    <Routes>

        {/* Customer Side */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/categories" element={<Categories />}/>
          <Route path="/deals" element={<Deals />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/product/:id" element={<ProductDetails />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/wishlist" element={<Wishlist />}/>

          {/* Protected customer pages */}
          <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/payment" element={<Payment />}/>
            <Route path="/order-success" element={<OrderSuccess />}/>
            <Route path="/orders" element={<Orders />}/>
            <Route path="/order/:orderNumber" element={<OrderDetails />}/>
            <Route path="/account" element={<Account />}/>
          </Route>
        </Route>

        {/* Protected admin pages */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashBoard />}/>
            <Route path="orders" element={<AdminOrders />}/>
            <Route path="products" element={<AdminProducts />}/>
            <Route path="customers" element={<AdminCustomers />}/>
            <Route path="categories" element={<AdminCategories />}/>
            <Route path="inventory-history" element={<AdminInventoryHistory />} />
          </Route>
        </Route>
    </Routes>
  )
}

export default App
