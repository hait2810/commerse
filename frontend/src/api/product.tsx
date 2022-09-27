import instance from "./config";
import {ProductType} from '../types/ProductType'

export const ListProducts = () => {
    const url = "/products/";
    return instance.get(url)
}
export const ListProduct = (id: string) => {
    const url = `product/${id}`;
    return instance.get(url);
}
export const UpdateProduct = (product: ProductType) => {
    const url = `products/${product._id}`
    return instance.put(url,product)
}
export const createProduct = (product: ProductType) => {
      const url = "products/"
      return instance.post(url,product)  
}
export const removeProduct = (id:string) => {
    const url = `products/${id}`;
    return instance.delete(url)
}