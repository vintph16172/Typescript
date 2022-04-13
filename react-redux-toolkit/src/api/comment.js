import instance from './instance'


export const listComment = () => {
    const url = `/comments`
    return instance.get(url)
}
export const detailComment = (id) => {
    const url = `/comments/${id}`
    return instance.get(url)
}
export const add = (comment) => {
    const url = `/comments`
    return instance.post(url, comment)
}

export const update = (comment) => {
    const url = `/comments/${comment._id}`
    return instance.put(url, comment)
}
export const remove = (id) => {
    const url = `/comments/${id}`
    return instance.delete(url)
}