import  { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { listCate,listCateProduct,addCate,updateCate,removeCate } from '../../api/category'


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

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (cate)=>{
        const {data} = await addCate(cate)
        return data
    }
) 

export const editCategory = createAsyncThunk(
    "category/editCategory",
    async (cate)=>{
        const {data} = await updateCate(cate)
        return data
    }
) 

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id)=>{
        const {data} = await removeCate(id)
        return data
    }
) 


const categorySlice = createSlice({
    name:"category",
    initialState:{
        value: [],
        productCate:[],
        selected: [],
        arr: [],
        breadcrumb: ""
    },
    reducers:{
        onSelected(state, action) {
            state.selected = action.payload

            // console.log(action.payload);
        },
        changeBreadcrumb(state, action) {
            state.breadcrumb = action.payload

            // console.log(action.payload);
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getCategory.fulfilled, (state,action)=>{
            state.value = action.payload
            
        })
        builder.addCase(getProductCategory.fulfilled, (state,action)=>{
            state.productCate = action.payload
           
        })
        builder.addCase(addCategory.fulfilled, (state,action)=>{
            state.value = [...state.value, action.payload]
            
        })
        builder.addCase(editCategory.fulfilled, (state,action)=>{
            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
         
        })
        builder.addCase(deleteCategory.fulfilled, (state,action)=>{
            state.value = state.value.filter(item => item._id !== action.payload._id)
            
        })
    }

})
export const { onSelected,changeBreadcrumb } = categorySlice.actions

export default categorySlice.reducer
