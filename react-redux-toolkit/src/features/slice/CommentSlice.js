import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { listComment,detailComment, remove, update, add } from '../../api/comment'

export const getComments = createAsyncThunk(
    "comments/getComments",
    async () => {
        const { data } = await listComment()
        return data
    }
)

export const getCommentDetail = createAsyncThunk(
    "comments/getCommentDetail",
    async (id) => {
        const { data } = await detailComment(id)
        return data
    }
)

export const addComments = createAsyncThunk(
    "comments/addComments",
    async (comment) => {
        const { data } = await add(comment)
        return data
    }
)

export const editComments = createAsyncThunk(
    "comments/editComments",
    async (comment) => {
        const { data } = await update(comment)
        return data
    }
)


export const deleteComments = createAsyncThunk(
    "comments/deleteComments",
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


const commentSlice = createSlice({
    name: "comments",
    initialState: {
        value: [],
        detail: [],
        selected: [],
        arr: [],
        breadcrumb: ""
    },
    reducers: {
        changeDetailComment(state, action) {
            // state.detail = [...state.detail, action.payload]
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
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(deleteComments.fulfilled, (state, action) => {

            state.value = state.value.filter(item => item._id !== action.payload._id)

        })
        builder.addCase(addComments.fulfilled, (state, action) => {

            state.value = [...state.value, action.payload]

        })
        builder.addCase(editComments.fulfilled, (state, action) => {

            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)

        })
        
       
    }
})

export const { onSelected, addId, changeBreadcrumb, changeDetailComment } = commentSlice.actions

export default commentSlice.reducer;