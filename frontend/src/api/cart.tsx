import { CartType } from "../types/CartType"
import instance from "./config"

export const sendorder = (order:any) => {
    const url = `carts`
    return instance.post(url,order)
}
export const readcart = (id:string) => {
    const url = `carts/${id}`
    return instance.get(url)
}

export const listCart = () => {
    const url = `carts`
    return instance.get(url)
}
export const updateCart = (cart:CartType) => {
    const url = `carts/${cart._id}`
    return instance.put(url,cart)
}
export const removeCarta = (id: string) => {
    const url = `carts/${id}`
    return instance.delete(url)
}