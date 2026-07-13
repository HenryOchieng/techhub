import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Categories from "./pages/Categories"
import Deals from "./pages/Deals"
import About from "./pages/About"
import Contact from "./pages/Contact"
import CartDrawer from "./components/cart/CartDrawer"
import useUIStore from "./store/uiStore";
import ProductDetails from "./pages/ProductDetails"

function App() {
  const cartOpen = useUIStore(state => state.cartOpen)
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="product/:id" element={<ProductDetails />} />
      </Routes>
      {cartOpen && <CartDrawer />}
    </>
  )
}

export default App
