import instance from './instance'

export const listCart = ()=>{
    const url = "/cart"
    return instance.get(url)
}

export const listCartDetail = (email )=>{
    const url = `/cart/${email}`
    return instance.get(url)
}
export const addCart = (cart) => {
    const url = `/cart`
    return instance.post(url, cart)

}

export const updateCart = (cart) => {
    const url = `/cart/${cart._id}`
    console.log("url", url);
    console.log("api Cart", cart);
    return instance.put(url, cart)
}
export const removeCart = (id) => {
    const url = `/cart/${id}`
    return instance.delete(url)
}