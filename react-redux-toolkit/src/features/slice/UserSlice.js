import { createSlice,createAsyncThunk }  from '@reduxjs/toolkit'





const userSlice = createSlice({
    name: "users",
    initialState:{
        value: {},
        
    },
    reducers:{
        changeUserValue(state, action){
            state.value = action.payload
        }

    },
    extraReducers:(builder)=>{
        
    }
})
export const { changeUserValue } = userSlice.actions



export default userSlice.reducer;