import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import CartDrawer from "../cart/CartDrawer"
import useUIStore from "../../store/uiStore"

function CustomerLayout() {
    const cartOpen = useUIStore((state) => state.cartOpen)

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            {cartOpen && <CartDrawer />}
        </>
    )
}

export default CustomerLayout