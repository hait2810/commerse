import { UserType } from "../types/UserType";
import instance from "./config";


export const signup = (user:UserType) => {
    const url = "/signup"
    return instance.post(url,user)
}
export const signin = (user:UserType) => {
    const url = "/signin"
    return instance.post(url,user)
}
export const ListUser = () => {
    const url = "/users"
    return instance.get(url)
}
export const readUser = (id: string) => {
    const url = `user/${id}`
    return instance.get(url)
}
export const updateUser = (user: UserType) => {
    const url = `user/${user._id}`
    return instance.put(url,user)
}