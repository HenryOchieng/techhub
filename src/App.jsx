import { Routes, Route } from "react-router-dom";

import CustomerLayout from "./components/layout/CustomerLayout"

//import Navbar from "./components/layout/Navbar"
//import Footer from "./components/layout/Footer"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Categories from "./pages/Categories"
import Deals from "./pages/Deals"
import About from "./pages/About"
import Contact from "./pages/Contact"
//import CartDrawer from "./components/cart/CartDrawer"
//import useUIStore from "./store/uiStore";
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import Payment from "./pages/Payment"
import OrderSuccess from "./pages/OrderSuccess"
import Orders from "./pages/Orders"
import OrderDetails from "./pages/OrderDetails"
import Wishlist from "./pages/wishlist";
import Account from "./pages/Account"

import AdminLayout from "./components/admin/AdminLayout"
import AdminDashBoard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts"
import AdminCustomers from "./pages/admin/AdminCustomers";

function App() {
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

          <Route path="/product:id" element={<ProductDetails />}/>

          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/payment" element={<Payment />}/>
          <Route path="/order-success" element={<OrderSuccess />}/>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/order/:orderNumber" element={<OrderDetails />}/>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/account" element={<Account />}/>
        </Route>

        {/* Admin Side */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashBoard />}/>
          <Route path="orders" element={<AdminOrders />}/>
          <Route path="products" element={<AdminProducts />}/>
          <Route path="customers" element={<AdminCustomers />}/>
        </Route>
    </Routes>
  )
}

export default App
