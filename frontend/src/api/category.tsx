import { CategoryType } from "../types/CategoryType";
import instance from "./config";

export const readCategory = (id:string) => {
    const url = `categorys/${id}`
    return instance.get(url)
}

export const ListCategorys = () => {
    const url = `categorys`
    return instance.get(url)
}

export const AddCategory = (category:CategoryType) => {
    const url = `categorys`
    return instance.post(url,category)
}

export const UpdateCategory = (category: CategoryType) => {
    const url = `categorys/${category._id}`
    return instance.put(url,category)
}
export const RemoveCategory = (id:string) => {
    const url = `categorys/${id}`
    return instance.delete(url)
}