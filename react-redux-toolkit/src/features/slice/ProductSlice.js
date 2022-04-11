import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { listProduct, remove, update, add } from '../../api/product'

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const { data } = await listProduct()
        return data
    }
)

export const getProductsQuery = createAsyncThunk(
    "products/getProductsQuery",
    async (query) => {
        if (query) {
            const { data } = await listProduct(query)
            return data
        } else {
            return []
        }
    }
)

export const addProducts = createAsyncThunk(
    "products/addProducts",
    async (product) => {
        const { data } = await add(product)
        return data
    }
)

export const editProducts = createAsyncThunk(
    "products/editProducts",
    async (product) => {
        const { data } = await update(product)
        return data
    }
)


export const deleteProducts = createAsyncThunk(
    "products/deleteProducts",
    async (id) => {
        // if (id.length > 0) {
        //     for (let index = 0; index < id.length; index++) {
        //         const { data } = await remove(id[index])
        //         return data

        //     }
        // }
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
    initialState: {
        value: [],
        valueQuery: [],
        detail: {},
        selected: [],
        arr: [],
        breadcrumb: ""
    },
    reducers: {
        changeDetail(state, action) {
            state.detail = action.payload

            // console.log(action.payload);
        },
        changeBreadcrumb(state, action) {
            state.breadcrumb = action.payload

            // console.log(action.payload);
        },
        onSelected(state, action) {
            state.selected = action.payload

            // console.log(action.payload);
        },
        addId(state, action) {
            state.arr.push(action.payload)
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(deleteProducts.fulfilled, (state, action) => {

            state.value = state.value.filter(item => item._id !== action.payload._id)

        })
        builder.addCase(addProducts.fulfilled, (state, action) => {

            state.value = [...state.value, action.payload]

        })
        builder.addCase(editProducts.fulfilled, (state, action) => {

            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)

        })
        builder.addCase(getProductsQuery.fulfilled, (state, action) => {
            state.valueQuery = action.payload
        })
        // builder.addCase(deleteAllProducts.fulfilled, (state,action)=>{

        //     state.value = state.value.filter(item => item._id !== action.payload._id)

        // })
    }
})

export const { onSelected, addId, changeBreadcrumb, changeDetail } = productSlice.actions

export default productSlice.reducer;