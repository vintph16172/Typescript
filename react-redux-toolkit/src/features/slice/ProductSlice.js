import { createSlice,createAsyncThunk }  from '@reduxjs/toolkit'
import { listProduct, remove } from '../../api/product'

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async ()=>{
        const { data } = await listProduct()
        return data
    }
)

export const deleteProducts = createAsyncThunk(
    "products/deleteProducts",
    async (id)=>{
        if(id.length > 0){
            for (let index = 0; index < id.length; index++) {
                const { data } = await remove(id[index])
                return data
                
            }
        }
        const { data } = await remove(id)
        return data
    }
)

// export const deleteAllProducts = createAsyncThunk(
//     "products/deleteProducts",
//     async (arr)=>{
        

        
//     }
// )

const productSlice = createSlice({
    name: "products",
    initialState:{
        value: [],
        selected:[],
        arr: [],
        breadcrumb: ""
    },
    reducers:{
        changeBreadcrumb(state,action){
            state.breadcrumb = action.payload 
            
            // console.log(action.payload);
        },
        onSelected(state,action){
            state.selected = action.payload 
            
            // console.log(action.payload);
        },
        addId(state,action){
            state.arr.push(action.payload ) 
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.fulfilled, (state,action)=>{
            state.value = action.payload
        })
        builder.addCase(deleteProducts.fulfilled, (state,action)=>{
            
            state.value = state.value.filter(item => item._id !== action.payload._id)
            
        })
        // builder.addCase(deleteAllProducts.fulfilled, (state,action)=>{
            
        //     state.value = state.value.filter(item => item._id !== action.payload._id)
            
        // })
    }
})

export const { onSelected,addId,changeBreadcrumb } = productSlice.actions

export default productSlice.reducer;