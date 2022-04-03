import instance from './instance'

export const listCate = ()=>{
    const url = "/category"
    return instance.get(url)
}

export const listCateProduct = (id )=>{
    const url = `/category/${id}`
    return instance.get(url)
}
// export const add = (product)=>{
//     const url = `/products/${user._id}`
//     return instance.post(url,product,{
//         headers:{
//             "Authorization":`Bearer ${token}`
//         }

//     })
// }

// export const update = (product)=>{
//     const url = `/products/${product._id}`
//     return instance.put(url,product)
// }
// export const remove = (id)=>{
//     const url = `/products/${id}`
//     return instance.delete(url)
// }