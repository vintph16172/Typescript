import { UserType } from "../pages/type/user";
import instance from "./instance";

type User = {
    email: string,
    password: string
}

export const listUsers = ()=>{
    const url = "/users"
    return instance.get(url)
}

export const signUp = (data: User )=>{
    const url = "/signup"
    return instance.post(url,data)
}

export const signIn = (data: User )=>{
    const url = "/signin"
    return instance.post(url,data)
}