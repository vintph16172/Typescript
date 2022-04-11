import instance from './instance'
import { isAthenticate } from '../features/utils/localstorage'

export const listCate = ()=>{
    const url = "/category"
    return instance.get(url)
}

export const listCateProduct = (id )=>{
    const url = `/category/${id}`
    return instance.get(url)
}
export const addCate = (data)=>{
    if (isAthenticate()) {
        const { token, user } = isAthenticate()
        const url = `/category/${user._id}`
        return instance.post(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })
    }
}

export const updateCate = (data)=>{
    const url = `/category/${data._id}`
    return instance.put(url,data)
}
export const removeCate = (id)=>{
    const url = `/category/${id}`
    return instance.delete(url)
}