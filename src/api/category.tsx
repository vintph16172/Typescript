import { CategoryType } from "../pages/type/category";
import instance from "./instance";

type Category = {
    _id?: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export const listCate = ()=>{
    const url = "/category"
    return instance.get(url)
}

export const listCateProduct = (id:number )=>{
    const url = `/category/${id}`
    return instance.get(url)
}

