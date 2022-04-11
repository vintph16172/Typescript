export const isAthenticate =  ()=>{
    if(!localStorage.getItem("user")) return
    return JSON.parse(localStorage.getItem("user"))
}

export const CartLocal =  ()=>{
    if(!localStorage.getItem("cart")) return []
    return JSON.parse(localStorage.getItem("cart"))
}