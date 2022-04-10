import { createSlice,createAsyncThunk }  from '@reduxjs/toolkit'





const userSlice = createSlice({
    name: "users",
    initialState:{
        value: {},
        
        
    },
    reducers:{
        changeUserValue(state, action){
            state.value = action.payload
        },
        logOut(state, action){
            state.value ={}
            localStorage.removeItem('user')
        }

    },
    extraReducers:(builder)=>{
        
    }
})
export const { changeUserValue,logOut } = userSlice.actions



export default userSlice.reducer;