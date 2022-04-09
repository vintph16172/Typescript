import  { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { listCate,listCateProduct } from '../../api/category'


export const getCategory = createAsyncThunk(
    "category/getCategory",
    async ()=>{
        const {data} = await listCate()
        return data
    }
) 

export const getProductCategory = createAsyncThunk(
    "category/getProductCategory",
    async (id)=>{
        const {data} = await listCateProduct(id)
        return data
    }
) 

const categorySlice = createSlice({
    name:"category",
    initialState:{
        value: [],
        productCate:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(getCategory.fulfilled, (state,action)=>{
            state.value = action.payload
            console.log(action.payload);
        })
        builder.addCase(getProductCategory.fulfilled, (state,action)=>{
            state.productCate = action.payload
            console.log(action.payload);
        })
    }

})

export default categorySlice.reducer
