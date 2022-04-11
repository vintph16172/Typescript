import instance from './instance'
import { isAthenticate } from '../features/utils/localstorage'

// const { token , user} = isAthenticate()

export const listProduct = (query) => {
    if(query){
        const url = `/products${query}`
        return instance.get(url)
    }
    const url = `/products`
    return instance.get(url)
}
export const detailProduct = (id) => {
    const url = `/products/${id}`
    return instance.get(url)
}
export const add = (product) => {
    if (isAthenticate()) {
        const { token, user } = isAthenticate()
        const url = `/products/${user._id}`
        return instance.post(url, product, {
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })
    }

}

export const update = (product) => {
    const url = `/products/${product._id}`
    return instance.put(url, product)
}
export const remove = (id) => {
    const url = `/products/${id}`
    return instance.delete(url)
}