import instance from "./instance";



export const listUsers = ()=>{
    const url = "/users"
    return instance.get(url)
}

export const signUp = (data )=>{
    const url = "/signup"
    return instance.post(url,data)
}

export const signIn = (data )=>{
    const url = "/signin"
    return instance.post(url,data)
}