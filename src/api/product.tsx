import { ProductType } from "../pages/type/product";
import { isAthenticate } from "../utils/localstorage";
import instance from "./instance";

const { token , user} = isAthenticate()

export const listProducts = ()=>{
    const url = "/products"
    return instance.get(url)
}
export const detailProduct = (id: number  | undefined | string)=>{
    const url = `/products/${id}`
    return instance.get(url)
}
export const add = (product: ProductType )=>{
    const url = `/products/${user._id}`
    return instance.post(url,product,{
        headers:{
            "Authorization":`Bearer ${token}`
        }

    })
}

export const update = (product: ProductType )=>{
    const url = `/products/${product._id}`
    return instance.put(url,product)
}
export const remove = (id: Number | undefined)=>{
    const url = `/products/${id}`
    return instance.delete(url)
}
