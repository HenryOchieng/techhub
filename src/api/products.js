import { products } from "../data/products"

export const getFeaturedProducts = () => 
    new Promise((resolve) => {
        setTimeout(() => resolve(products), 600)
    })