import { categories } from "../data/categories"

export const getCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(categories)
        }, 500)
    })
}