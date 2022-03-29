export const isAthenticate =  ()=>{
    if(!localStorage.getItem("user")) return
    return JSON.parse(localStorage.getItem("user") as "string")
}