import instance from './instance'

export const listDetailCart = ()=>{
    const url = "/detailcart"
    return instance.get(url)
}

export const listDetailCartById = (id )=>{
    const url = `/detailcart/${id}`
    return instance.get(url)
}
export const addDetailCart = (cart) => {
    const url = `/detailcart`
    return instance.post(url, cart)

}

export const updateDetailCart = (cart) => {
    const url = `/detailcart/${cart._id}`
    return instance.put(url, cart)
}
export const removeDetailCart = (id) => {
    const url = `/detailcart/${id}`
    return instance.delete(url)
}