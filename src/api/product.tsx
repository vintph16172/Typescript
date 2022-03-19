import instance from "./instance";

export const listProducts = ()=>{
    const url = "/products"
    return instance.get(url)
}
export const remove = (id: Number)=>{
    const url = `/products/${id}`
    return instance.delete(url)
}
