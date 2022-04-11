import instance from "./instance";



export const listUsers = ()=>{
    const url = "/users"
    return instance.get(url)
}

export const listUserDetail = (id)=>{
    const url = `/users/${id}`
    return instance.get(url)
}

export const updateUser = (data)=>{
    const url = `/users/${data._id}`
    return instance.put(url, data)
}

export const signUp = (data )=>{
    const url = "/signup"
    return instance.post(url,data)
}

export const signIn = (data )=>{
    const url = "/signin"
    return instance.post(url,data)
}