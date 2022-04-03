import  { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { listCate } from '../../api/category'


export const getCategory = createAsyncThunk(
    "category/getCategory",
    async ()=>{
        const {data} = await listCate()
        return data
    }
) 

const categorySlice = createSlice({
    name:"category",
    initialState:{
        value: []
    },
    extraReducers:(builder)=>{
        builder.addCase(getCategory.fulfilled, (state,action)=>{
            state.value = action.payload
            console.log(action.payload);
        })
    }

})

export default categorySlice.reducer
