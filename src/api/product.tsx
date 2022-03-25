import { ProductType } from "../pages/type/product";
import instance from "./instance";


export const listProducts = ()=>{
    const url = "/products"
    return instance.get(url)
}
export const detailProduct = (id: number  | undefined)=>{
    const url = `/products/${id}`
    return instance.get(url)
}
export const add = (product: ProductType )=>{
    const url = "/products"
    return instance.post(url,product)
}

export const update = (product: ProductType )=>{
    const url = `/products/${product.id}`
    return instance.put(url,product)
}
export const remove = (id: Number | undefined)=>{
    const url = `/products/${id}`
    return instance.delete(url)
}
